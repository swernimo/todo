import ITodoItem from "./ITodoItem";

export default interface ITodoListAddChildRequest {
    parentId: string;
    childToAdd: ITodoItem;
}