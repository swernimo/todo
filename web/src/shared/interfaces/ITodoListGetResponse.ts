import ITodoList from "./ITodoList";

export default interface ITodoGetResponse {
    todoList: ITodoList[];
    totalItems: number;
    success: boolean;
}