import React from "react";
import { connect } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

function TodosContainer({ todos, addTodo, toggleTodo }) {
  const onCreate = (text) => (addTodo(text), [addTodo]);
  const onToggle = (id) => (toggleTodo(id), [toggleTodo]);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default connect((state) => ({ todos: state.todos }), {
  addTodo,
  toggleTodo,
})(TodosContainer);
