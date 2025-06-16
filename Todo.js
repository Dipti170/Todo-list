import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState('none'); // none, asc, desc
  const [filter, setFilter] = useState('all'); // all, completed, pending

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(), // Unique ID
      text: task,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setTask('');
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.text.localeCompare(a.text));
    }

    return filtered;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 My Bucket-List</h2>

      <input
        type="text"
        placeholder="What's on your mind!"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <div style={{ marginTop: '10px' }}>
        <label>Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <label style={{ marginLeft: '10px' }}>Sort: </label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="none">None</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      <ul style={{ marginTop: '15px' }}>
        {getFilteredTasks().map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                margin: '0 10px'
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;


