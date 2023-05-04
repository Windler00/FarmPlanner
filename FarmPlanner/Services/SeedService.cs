using FarmPlanner.Models;

namespace FarmPlanner.Services
{
    public class SeedService
    {
        public static async Task FillSeedList(int rowId)
        {
            using (AppContext db = new AppContext())
            {
                Row currRow = db.Rows.Find(rowId);
                for(int i=0;i < currRow.Length; i++)
                {
                    Seed newSeed = new Seed();
                    newSeed.Name = "";
                    newSeed.IsPlanted = false;
                    newSeed.DateYear = DateTime.UtcNow.Year;
                    newSeed.DateMonth = DateTime.UtcNow.Month;
                    newSeed.DateDay = DateTime.UtcNow.Day;
                    newSeed.RowId = rowId;
                    db.Seeds.Add(newSeed);
                }
                db.SaveChanges();
            }
        }

        public static async Task<object> GetSeedByRowId(int rowId)
        {
            using (AppContext db = new AppContext())
            {
                var result = db.Seeds.Where(e => e.RowId == rowId).ToList();
                return result;

            }
        }

        public static async Task<object> UpdateSeed(Seed seed)
        {
            using (AppContext db = new AppContext())
            {
                var toChange = db.Seeds.Find(seed.Id);
                if (toChange != null)
                {
                    toChange.Name = seed.Name;
                    db.SaveChanges();
                    return seed;
                }
                else
                {
                    return null;
                }
            }
        }

        public static async Task<object> DeleteSeed(Seed seed)
        {
            using (AppContext db = new AppContext())
            {
                var toChange = db.Seeds.Find(seed.Id);
                if (toChange != null)
                {

                    db.Remove(toChange);
                    db.SaveChanges();
                    return toChange;
                }
                else
                {
                    return null;
                }
            }
        }

        public static async Task DeleteByRowId(int rowId)
        {
            using (AppContext db = new AppContext())
            {
                var entities = db.Seeds.Where(e => e.RowId == rowId).ToList();
                foreach (Seed seed in entities)
                {
                    db.Remove(seed);
                }
                db.SaveChanges();
            }
        }
    }
}
