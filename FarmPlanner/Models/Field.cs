namespace FarmPlanner.Models
{
    public class Field
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; } = "";
        public int Length { get; set; }
        public int Width { get; set; }
        public int SchemaId { get; set; }
        public int SchemaRow { get; set; }
    }
}
