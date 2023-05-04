namespace FarmPlanner.Models
{
    public class Seed
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int DateYear { get; set; }
        public int DateMonth { get; set; }
        public int DateDay { get; set; }
        public bool IsPlanted { get; set; }
        public int RowId { get; set; }
    }
}
