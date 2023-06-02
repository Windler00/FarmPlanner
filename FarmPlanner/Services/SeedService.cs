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
                for(int i=0;i < currRow.Quantity; i++)
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

        public static async Task UpdateSeedList(Row row)
        {
            using (AppContext db = new AppContext())
            {
                Row currRow = db.Rows.Find(row.Id);
                if (currRow.Quantity < row.Quantity)
                {
                    int count = row.Quantity - currRow.Quantity;
                    for (int i = 0; i < count; i++)
                    {
                        Seed newSeed = new Seed();
                        newSeed.Name = "";
                        newSeed.IsPlanted = false;
                        newSeed.DateYear = DateTime.UtcNow.Year;
                        newSeed.DateMonth = DateTime.UtcNow.Month;
                        newSeed.DateDay = DateTime.UtcNow.Day;
                        newSeed.RowId = row.Id;
                        db.Seeds.Add(newSeed);
                    }
                }
                else if (currRow.Quantity > row.Quantity)
                {
                    int count = currRow.Quantity - row.Quantity;
                    for (int i = 0; i < count ; i++)
                    {
                        List<Seed> seedList = db.Seeds.Where(s => s.RowId == row.Id).ToList();
                        Seed seed = seedList.Last();
                        db.Remove(seed);
                        db.SaveChanges();
                    }
                }
                else
                {
                    return;
                }
                db.SaveChanges();
            }
        }

        public static async Task<object> GetSeedsByRowId(int rowId)
        {
            using (AppContext db = new AppContext())
            {
                {
                    var result = db.Seeds.Where(e => e.RowId == rowId).ToList();
                    return result;
                }

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
                    toChange.DateDay = seed.DateDay;
                    toChange.DateMonth = seed.DateMonth;
                    toChange.DateYear = seed.DateYear;
                    toChange.IsPlanted = seed.IsPlanted;
                    toChange.Length = seed.Length;
                    toChange.Width = seed.Width;
                    toChange.Height = seed.Height;
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
