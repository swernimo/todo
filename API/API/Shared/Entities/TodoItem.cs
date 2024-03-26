namespace API.Shared.Entities
{
    public record TodoItem
    {
    public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime DueDate { get; set; } = DateTime.Today.AddDays(1);
        public bool IsCompleted { get; set; } = false;
        public string Details { get; set; } = string.Empty;
        public List<TodoItem> Children { get; set; } = [];
        public bool IsOverdue { get; set; } = false;
    }
}
