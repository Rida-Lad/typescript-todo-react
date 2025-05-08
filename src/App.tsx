import { useState } from 'react';

// 1. Define the Task type
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // 2. Manage tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');

  // 3. Add new task
  const handleAdd = () => {
    if (input.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };
  


  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 To-Do App</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '0.5rem' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginRight: '1rem',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '0.5rem' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
