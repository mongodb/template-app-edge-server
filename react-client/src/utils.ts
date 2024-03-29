import { Todo } from "./types";
import { EJSON, ObjectId } from "bson";

export const toggleBoolean = (prev) => !prev;

const isValidArrayIndex = (arr, idx) => {
  return !(idx < 0 || idx >= arr.length);
};

export function addValueAtIndex(arr, idx, value) {
  if (!isValidArrayIndex(arr, idx) && idx !== arr.length) {
    throw new Error(`Cannot add value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), value, ...arr.slice(idx)];
}

export function replaceValueAtIndex(arr, idx, newValue) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot replace value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), newValue, ...arr.slice(idx + 1)];
}

export function updateValueAtIndex(arr, idx, updater) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot update value. Array index out of bounds.`);
  }

  return [...arr.slice(0, idx), updater(arr[idx]), ...arr.slice(idx + 1)];
}

export function removeValueAtIndex(arr, idx) {
  if (!isValidArrayIndex(arr, idx)) {
    throw new Error(`Cannot remove value. Array index out of bounds.`);
  }
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

export const createObjectId = () => {
  return EJSON.serialize(new ObjectId().toString());
};

export const getTodoId = (todo: Todo) => {
  return todo._id.toString();
};

export const isSameTodo = (todo1: Todo, todo2: Todo) =>
  getTodoId(todo1) === getTodoId(todo2);

export const getTodoIndex = (todos: Todo[], todo: Todo) => {
  const idx = todos.findIndex((t) => isSameTodo(t, todo));
  return idx >= 0 ? idx : null;
};
