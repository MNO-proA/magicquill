import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { AutomatedPostingButton } from "../../app_components/AutomatingPostingButton";


export const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    todo: "",
    username: "",
    password: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      todo_content: "",
      username: "",
      password: "",
      email: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.todo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: formData.todo,
        username: formData.username,
        email: formData.email,
        completed: false 
      }]);
      closeModal();
    }
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id, todoData) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...todoData } : todo
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-amber-500 ">TO DO</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Todo
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md relative">
              <button 
                onClick={closeModal}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-300 cursor-pointer"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-semibold text-amber-500  mb-6">Add New Todo</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-200 text-sm font-medium mb-2">
                    Todo
                  </label>
                  <input
                    type="text"
                    name="todo"
                    value={formData.todo}
                    onChange={handleInputChange}
                    placeholder="Enter your todo..."
                    className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-200 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 mt-6"
                >
                  Add Todo
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 ? (
          <div className="bg-slate-900 p-8 rounded-2xl text-center">
            <p className="text-slate-400 text-lg">No todos yet. Click Add Todo to create one!</p>
          </div>
        ) : (
          /* Todo List */
          <div className="space-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="bg-slate-900 p-4 rounded-2xl flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                className="h-5 w-5 rounded appearance-none border-2 border-slate-700 checked:bg-green-800 checked:border-green-800"
                />
                <div className="flex-1">
                  <span className={`block text-slate-200 ${todo.completed ? 'line-through text-slate-400' : ''}`}>
                    {todo.text}
                  </span>
                  <span className="text-sm text-slate-400">{todo.email}</span>
                </div>
                <button 
                  onClick={() => handleDelete(todo.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => {
                    setIsModalOpen(true);
                    setFormData({
                      todo: todo.text,
                      username: todo.username,
                      email: todo.email,
                      password: ""
                    });
                    handleEdit(todo.id, formData)
                  }}
                  className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                {/* <button 
                  className="p-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <Wand2 className="h-5 w-5" />
                </button> */}
                <AutomatedPostingButton 
                  todo={todo} 
                  onComplete={handleToggle} 
                />
          
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

