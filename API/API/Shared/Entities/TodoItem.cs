namespace API.Shared.Entities
{
    public record TodoItem
    {
        public Guid Id { get; private set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public DateTime DueDate { get; set; } = DateTime.Today.AddDays(1);
        public bool IsCompleted { get; set; } = false;
        public string Details { get; set; } = string.Empty;
        public List<TodoItem> Children { get; set; } = [];
        public bool IsOverdue { get; set; } = false;
    }
}
