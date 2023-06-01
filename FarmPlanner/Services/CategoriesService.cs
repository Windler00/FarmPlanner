using FarmPlanner.Models;
using static Npgsql.PostgresTypes.PostgresCompositeType;

namespace FarmPlanner.Services
{
    public class CategoriesService
    {
        public static async Task<List<Category>> GetAllCategories()
        {
            using (AppContext db = new AppContext())
            {
                return db.Categories.ToList();
            }
        }

        public static async Task<List<Category>> GetCategoriesByLevel(int level)
        {
            using (AppContext db = new AppContext())
            {
                List<Category> result = new List<Category>();
                foreach (Category category in db.Categories)
                {
                    if (category.Level == level)
                    {
                        result.Add(category);
                    }
                }
                return result;
            }
        }

        public static async Task<Category> PostCategoryToDb(Category newCategory)
        {
            using (AppContext db = new AppContext())
            {
                db.Categories.Add(newCategory);
                db.SaveChanges();
                return newCategory;
            }
        }

        public static async Task<Category> DeleteCategoriesHandler(int id)
        {
            using (AppContext db = new AppContext())
            {
                Category categoryToDelete = db.Categories.Find(id);
                List<Category> Level2Categories = db.Categories.Where(e => e.ParentId == categoryToDelete.Id).ToList();
                foreach (var level2Category in Level2Categories)
                {
                    if (level2Category.Level == 2)
                    {
                        List<Category> Level3Categories = db.Categories.Where(e => e.ParentId == level2Category.Id).ToList();
                        foreach (var level3Category in Level3Categories)
                        {
                            if (level3Category.Level == 3)
                            {
                                db.Remove(level3Category);
                            }
                        }
                        db.Remove(level2Category);
                    }
                }
                db.Remove(categoryToDelete);
                db.SaveChanges();
                return categoryToDelete;
            }
        }
    }
}
