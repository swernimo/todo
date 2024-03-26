using API.Shared.Entities;

namespace API.Shared.Interfaces
{
    public interface IDatabase
    {
        List<TodoList> GetTodoList();
        bool SaveList(TodoList list);
        bool DeleteList(string idToDelete);
        bool ClearAllLists();
        TodoList GetTodo(string id);
        bool SaveChildToList(AddChildRequest request);
        bool DeleteChildTask(string childId);
        bool UpdateChildTask(TodoItem item);
  }
}
