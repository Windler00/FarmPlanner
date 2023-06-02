
namespace FarmPlanner.Models
{
    public class Row
    {
        public int Id { get; set; }
        public string? Name { get; set; } = "";
        public string? Description { get; set; } = "";
        public int Length { get; set; }
        public int FieldId { get; set; }
    }
}
