// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./Board.css";

// const Board = ({ board, onDelete, onEdit }) => {
//   return (
//     <div className="board-card">
//       <NavLink to={`/board/${board._id}`} className="board-link">
//         <span>click on card</span>
//         <div className="board-title">{board.name}</div>
//       </NavLink>

//       <div className="board-actions">
//         <button className="btn edit" onClick={onEdit}>
//           Edit
//         </button>
//         <button className="btn del" onClick={onDelete}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Board;
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Board.css";

const Board = ({ board, onDelete, onEdit }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (board) {
      setLoading(false);
    }
  }, [board]);

  if (loading) {
    return (
      <div className="board-card skeleton-card">
        <div className="skeleton-title"></div>
        <div className="skeleton-btn-area">
          <div className="skeleton-btn"></div>
          <div className="skeleton-btn"></div>
        </div>
      </div>
    );
  }

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
