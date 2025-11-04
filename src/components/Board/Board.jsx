import React from "react";
import { NavLink } from "react-router-dom";
import "./Board.css";

const Board = ({ board, onDelete, onEdit }) => {
  return (
    <div className="board-card">
      <NavLink to={`/board/${board._id}`} className="board-link">
        <span>click on card</span>
        <div className="board-title">{board.name}</div>
      </NavLink>

      <div className="board-actions">
        <button className="btn edit" onClick={onEdit}>
          Edit
        </button>
        <button className="btn del" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Board;
