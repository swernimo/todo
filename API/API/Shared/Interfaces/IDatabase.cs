using API.Shared.Entities;

namespace API.Shared.Interfaces
{
    public interface IDatabase
    {
        List<TodoList> GetTodoList();
        bool SaveList(TodoList list);
        bool DeleteList(string idToDelete);
    }
}
