namespace API.Shared.Entities
{
    public record TodoList
    {
        public string Id { get; set; } = string.Empty;
        public List<TodoItem> Items { get; set; } = [];
        public bool IsClosed { get; set; } = false;
        public string Name { get; set; } = string.Empty;
    }
}
