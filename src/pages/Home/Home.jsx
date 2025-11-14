import React, { useEffect, useState } from "react";
import API from "../../api";
import "./Home.css";
import Board from "../../components/Board/Board";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [query, setQuery] = useState("");
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
    }
  };


  const createBoard = async (e) => {
    e.preventDefault();
    if (!name) return;
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
    } catch (err) {
      console.error(err);
      
    }
  };
  

  const deleteBoard = async (id) => {
    if (!window.confirm("Delete this board?")) return;
    try {
      await API.delete(`/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBoard();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (board) => {
    setEditingId(board._id);
    setEditingName(board.name);
  };

  const saveEdit = async (id) => {
    if (!editingName) return;
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
    } catch (err) {
      console.error(err);
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
                onDelete={() => deleteBoard(board._id)}
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
