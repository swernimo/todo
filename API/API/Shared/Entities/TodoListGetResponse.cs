namespace API.Shared.Entities
{
  public class TodoListGetResponse
  {
    public List<TodoList> Todolist { get; set; } = [];
    public int TotalItems { get; set; } = 0;
    public bool Success { get; set; } = true;
  }
}
