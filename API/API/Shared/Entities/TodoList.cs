namespace API.Shared.Entities
{
    public record TodoList
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public List<TodoItem> Items { get; set; } = [];
        public bool IsClosed { get; set; } = false;
        public string Name { get; set; } = string.Empty;
    }
}
