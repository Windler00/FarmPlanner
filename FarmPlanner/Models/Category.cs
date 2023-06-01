namespace FarmPlanner.Models
{
    public class Category
    {
        public int Id { get; set; }
        public int Level { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }

    }
}
