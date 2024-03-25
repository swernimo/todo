import ITodoList from "./ITodoList";

export default interface ITodoGetResponse {
    todolist: ITodoList[];
    totalItems: number;
    success: boolean;
}