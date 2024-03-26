namespace API.Shared.Entities
{
  public record TodoListCreateRequest
  {
    public string Name { get; set; } = string.Empty;
  }
}
