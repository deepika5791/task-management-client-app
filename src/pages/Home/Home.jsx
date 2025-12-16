import React, { useEffect, useState } from "react";
import API from "../../api";
import { NavLink } from "react-router-dom";
import "./Home.css";
import Board from "../../components/Board/Board";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [formError, setFormError] = useState("");

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const res = await API.get("/boards", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBoards(res.data || []);
    } catch (err) {
      console.error(err);
      // showNotification("First login in to page", "error");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setFormError("Board name cannot be empty");
      return;
    }
    if (
      boards.some((b) => b.name.toLowerCase() === trimmedName.toLowerCase())
    ) {
      setFormError("Board with this name already exists");
      return;
    }
    try {
      await API.post(
        "/boards",
        { name: trimmedName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setName("");
      fetchBoards();
      showNotification("Board created successfully", "success");
    } catch (err) {
      console.error(err);
      setFormError("Failed to create board");
    }
  };

  const requestDeleteBoard = (id) => setConfirmDelete(id);
  const cancelDelete = () => setConfirmDelete(null);

  const deleteBoard = async (id) => {
    try {
      await API.delete(`/boards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchBoards();
      showNotification("Board deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to delete board", "error");
    } finally {
      setConfirmDelete(null);
    }
  };

  const startEdit = (board) => {
    setEditingId(board._id);
    setEditingName(board.name);
  };

  const saveEdit = async (id) => {
    if (!editingName.trim()) {
      showNotification("Board name cannot be empty", "error");
      return;
    }
    try {
      await API.put(
        `/boards/${id}`,
        { name: editingName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEditingId(null);
      setEditingName("");
      fetchBoards();
      showNotification("Board updated successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update board", "error");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const filtered = boards.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  const skeletonCount = Math.max(boards.length, 6);

  return (
    <div className="home-page">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {confirmDelete && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete this board?</p>
            <div className="confirm-actions">
              <button
                className="primary small"
                onClick={() => deleteBoard(confirmDelete)}
              >
                Yes
              </button>
              <button className="muted small" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="home-header">
        <h2>Your Boards</h2>
        <div className="controls">
          <input
            className="search-input"
            placeholder="Search boards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <form className="new-board-form" onSubmit={createBoard}>
        <div>
          <input
            type="text"
            placeholder="Create a new board (e.g. Project Alpha)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFormError("");
            }}
          />

          {formError && <p className="input-error">{formError}</p>}
        </div>
        <button type="submit" className="primary">
          Add Board
        </button>
      </form>

      <div className="board-list">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <div key={idx} className="board-wrap">
                <Skeleton
                  height={200}
                  borderRadius={16}
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
            ))
          : filtered.map((board) => (
              <div key={board._id} className="board-wrap">
                {editingId === board._id ? (
                  <div className="board-card editing">
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                    <div className="card-actions">
                      <button
                        onClick={() => saveEdit(board._id)}
                        className="primary small"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="muted small"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <Board
                    board={board}
                    onDelete={() => requestDeleteBoard(board._id)}
                    onEdit={() => startEdit(board)}
                  />
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
