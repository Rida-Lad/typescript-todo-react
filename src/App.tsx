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
          <li key={task.id}>
            {task.text} {task.completed ? '✅' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
