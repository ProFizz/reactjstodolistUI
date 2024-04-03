const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const response = await axios.post("your-api-url/todos", { title });
      onAddTodo(response.data);
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};
