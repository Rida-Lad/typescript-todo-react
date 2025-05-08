import { useState, useEffect } from 'react';

// 1. Define the Task type
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // 2. Manage tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('my-tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [input, setInput] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');



  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);


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

  const handleEdit = (id: number, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id: number) => {
    if (!editText.trim()) return;
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditingId(null);
    setEditText('');
  };


  const clearCompleted = () => {
    const activeTasks = tasks.filter(task => !task.completed);
    setTasks(activeTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  




  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 To-Do App</h2>
      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors duration-200"
        >
          Add
        </button>
        {tasks.some(task => task.completed) && (
          <button
            onClick={clearCompleted}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Completed Tasks
          </button>
        )}

      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          editingId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border px-2 py-1 rounded mr-2"
              />
              <button
                onClick={() => saveEdit(task.id)}
                className="text-blue-500"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.text}
              </span>
              <div className="space-x-2">
                <button onClick={() => toggleComplete(task.id)} className="text-green-500">
                  {task.completed ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => handleEdit(task.id, task.text)} className="text-yellow-500">
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="text-red-500">
                  ❌
                </button>
              </div>
            </>
          )
        ))}
      </ul>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default App;
