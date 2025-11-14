import React, { useEffect, useState } from "react";
import API from "../../api";
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

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchBoard = async () => {
    try {
      const res = await API.get("/boards", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBoards(res.data || []);
    } catch (err) {
      console.log(err);
      showNotification("Failed to fetch boards", "error");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!name.trim()) {
      showNotification("Board name cannot be empty", "error");
      return;
    }
    const exists = boards.some(
      (b) => b.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
      showNotification("Board with this name already exists", "error");
      return;
    }

    try {
      await API.post(
        "/boards",
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setName("");
      fetchBoard();
      showNotification("Board created successfully", "success");
    } catch (err) {
      console.error("Create board error:", err);
      showNotification("Failed to create board", "error");
    }
  };

  const requestDeleteBoard = (id) => {
    setConfirmDelete(id);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const deleteBoard = async (id) => {
    try {
      await API.delete(`/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBoard();
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditingId(null);
      setEditingName("");
      fetchBoard();
      showNotification("Board updated successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Failed to update board", "error");
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const filtered = boards.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

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
        <input
          type="text"
          placeholder="Create a new board (e.g. Project Alpha)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="primary">
          Add Board
        </button>
      </form>

      {loading ? (
        <div className="board-list">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="board-wrap">
              <Skeleton height={200} borderRadius={12} />
            </div>
          ))}
        </div>
      ) : (
        <div className="board-list">
          {filtered.map((board) => (
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
      )}
    </div>
  );
};

export default Home;
