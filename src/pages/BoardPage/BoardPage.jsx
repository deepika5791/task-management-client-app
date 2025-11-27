import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import "./BoardPage.css";
import TaskCard from "../../components/Task/Task";

const statuses = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const BoardPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
  });

  const [filterQ, setFilterQ] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data || []);
    } catch (err) {
      console.log(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const createTask = async (e) => {
    e.preventDefault();
    if (!form.title) {
      setError("Task title cannot be empty");
      return;
    }
    try {
      await API.post(`/tasks/${id}`, { ...form });
      setForm({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
      setError("Failed to create task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/task/${taskId}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (t) => {
    setEditingId(t._id);
    setEditingForm({
      title: t.title,
      description: t.description || "",
      status: t.status || "todo",
      priority: t.priority || "medium",
      dueDate: t.dueDate ? t.dueDate.split("T")[0] : "",
    });
  };

  const saveEdit = async (taskId) => {
    try {
      await API.put(`/tasks/task/${taskId}`, editingForm);
      setEditingId(null);
      setEditingForm({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const onDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text");

    if (!taskId) return;
    try {
      await API.put(`/tasks/task/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const allowDrop = (e) => e.preventDefault();

  const filtered = tasks.filter((t) => {
    const matchesQ =
      t.title.toLowerCase().includes(filterQ.toLowerCase()) ||
      (t.description || "").toLowerCase().includes(filterQ.toLowerCase());

    const matchesP = priorityFilter
      ? (t.priority || "medium") === priorityFilter
      : true;

    return matchesQ && matchesP;
  });

  const grouped = statuses.reduce((acc, s) => {
    acc[s.key] = filtered.filter((t) => (t.status || "todo") === s.key);
    return acc;
  }, {});

  const progress = tasks.length
    ? Math.round(
        (tasks.filter((t) => t.status === "done").length / tasks.length) * 100
      )
    : 0;

  return (
    <div className="board-page">
      <div className="board-top">
        <h2 className="board-name">Board</h2>

        <div className="board-controls">
          <input
            placeholder="Search tasks..."
            value={filterQ}
            onChange={(e) => setFilterQ(e.target.value)}
            className="small-search"
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="small-select"
          >
            <option value="">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="progress-pill">{progress}% done</div>
        </div>
      </div>

      <form className="task-creator" onSubmit={createTask}>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Short description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <button type="submit" className="primary">
          Add Task
        </button>
      </form>

      <div className="kanban">
        {loading
          ? statuses.map((s) => (
              <div key={s.key} className="column skeleton-col">
                <div className="skeleton-col-header"></div>
                <div className="skeleton-task"></div>
                <div className="skeleton-task"></div>
              </div>
            ))
          : statuses.map((s) => (
              <div
                key={s.key}
                className="column"
                onDrop={(e) => onDrop(e, s.key)}
                onDragOver={allowDrop}
              >
                <div className="column-header">
                  {s.label}
                  <span className="count">{grouped[s.key]?.length || 0}</span>
                </div>

                <div className="column-body">
                  {grouped[s.key]?.map((t) => (
                    <div
                      key={t._id}
                      draggable
                      onDragStart={(e) => onDragStart(e, t._id)}
                    >
                      {editingId === t._id ? (
                        <div className="edit-card">
                          <input
                            value={editingForm.title}
                            onChange={(e) =>
                              setEditingForm({
                                ...editingForm,
                                title: e.target.value,
                              })
                            }
                          />

                          <input
                            value={editingForm.description}
                            onChange={(e) =>
                              setEditingForm({
                                ...editingForm,
                                description: e.target.value,
                              })
                            }
                          />

                          <select
                            value={editingForm.status}
                            onChange={(e) =>
                              setEditingForm({
                                ...editingForm,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="todo">todo</option>
                            <option value="in-progress">in-progress</option>
                            <option value="done">done</option>
                          </select>

                          <select
                            value={editingForm.priority}
                            onChange={(e) =>
                              setEditingForm({
                                ...editingForm,
                                priority: e.target.value,
                              })
                            }
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>

                          <input
                            type="date"
                            value={editingForm.dueDate}
                            onChange={(e) =>
                              setEditingForm({
                                ...editingForm,
                                dueDate: e.target.value,
                              })
                            }
                          />

                          <div className="edit-actions">
                            <button
                              onClick={() => saveEdit(t._id)}
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
                        <TaskCard
                          task={t}
                          onDelete={deleteTask}
                          onEdit={() => startEdit(t)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BoardPage;
