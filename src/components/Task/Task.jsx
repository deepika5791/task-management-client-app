
import React from "react";
import "./Task.css";

const priorityColor = {
  low: "#00802dff",
  medium: "#d8a21aff",
  high: "#c03918ff",
};

const Task = ({ task, onDelete, onEdit }) => {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
  const priority = task.priority || "medium";

  return (
    <div className="task-card">
      <div className="task-top">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <span className="status">{task.status}</span>
          <span
            className="chip"
            style={{ background: priorityColor[priority] }}
          >
            {priority}
          </span>
        </div>
      </div>

      <div className="task-desc">{task.description}</div>

      <div className="task-bottom">
        {due && <div className="due">Due: {due}</div>}
        <div className="task-actions">
          <button className="btn edit" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn del" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
