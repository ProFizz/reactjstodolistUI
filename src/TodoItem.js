const TodoItem = ({ todo, onToggleCompleted, onDelete }) => {
  return (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleCompleted(todo.id)}
      />
      {todo.completed ? <del>{todo.title}</del> : todo.title}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
