namespace API.Shared.Entities
{
  public record AddChildRequest
  {
    public string ParentId { get; set; }
    public TodoItem ChildToAdd { get; set; }
  }
}
