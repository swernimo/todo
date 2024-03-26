export default interface ITodoItem {
    id: string;
    name: string;
    dueDate: Date;
    isCompleted: boolean;
    details?: string;
    children?: ITodoItem[];
    isOverdue?: boolean;
}