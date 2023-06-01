using FarmPlanner.Models;
using static FarmPlanner.Services.SeedService;

namespace FarmPlanner.Services
{
    public class RowService
    {
        public static async Task<object> AddRow(Row newRow)
        {
            using (AppContext db = new AppContext())
            {
                db.Rows.Add(newRow);
                db.SaveChanges();
                return newRow;
            }
        }

        public static async Task<List<Row>> GetRowByFieldId(int id)
        {
            using (AppContext db = new AppContext())
            {
                List<Row> rows = new List<Row>();
                var result = db.Rows.Where(e => e.FieldId == id);
                foreach ( var row in result )
                {
                    rows.Add(row);
                }
                return rows;
            }
        }

        public static async Task<object> UpdateRow(Row row)
        {
            using (AppContext db = new AppContext())
            {
                var toChange = db.Rows.Find(row.Id);
                toChange.Name = row.Name;
                toChange.Description = row.Description;
                UpdateSeedList(row);
                toChange.Quantity = row.Quantity;
                toChange.Length = row.Length;
                toChange.Width = row.Width;
                db.SaveChanges();
                return row;
            }
        }

        public static async Task<object> DeleteRow(int id)
        {
            using (AppContext db = new AppContext())
            {
                var toChange = db.Rows.Find(id);
                db.Remove(toChange);
                DeleteByRowId(id);
                db.SaveChanges();
                return toChange;
            }
        }

        public static async Task DeleteByFieldId(int fieldId)
        {
            using (AppContext db = new AppContext())
            {
                var entities = db.Rows.Where(e => e.FieldId == fieldId).ToList();
                foreach (Row row in entities)
                {
                    db.Remove(row);
                    DeleteByRowId(row.Id);
                }
                db.SaveChanges();
            }
        }
    }
}
