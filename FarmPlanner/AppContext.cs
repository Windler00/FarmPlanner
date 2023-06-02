using FarmPlanner.Models;
using Microsoft.EntityFrameworkCore;

namespace FarmPlanner
{
    public class AppContext : DbContext
    {
        public static string? Connection { get; set; }
        public DbSet<Field> Fields { get; set; } = null;
        public DbSet<Row> Rows { get; set; } = null;
        public DbSet<Seed> Seeds { get; set; } = null;

        public AppContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(Connection);
        }
    }
}
