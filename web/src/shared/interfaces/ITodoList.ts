import ITodoItem from "./ITodoItem";

export default interface ITodoList {
    id: string;
    items: ITodoItem[];
    isClosed: boolean;
    name: string;
}