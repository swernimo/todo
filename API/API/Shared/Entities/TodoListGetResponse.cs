namespace API.Shared.Entities
{
  public class TodoListGetResponse
  {
    public List<TodoList> Todolist { get; set; } = [];
    public int TotalItems = 0;
    public bool Success = true;
  }
}
