using FarmPlanner.Models;
using static FarmPlanner.Services.RowService;

namespace FarmPlanner.Services
{
    public class FieldService
    {
        public static async Task<object> AddField(Field newField)
        {
            using (AppContext db = new AppContext())
            {
                foreach (Field field in db.Fields)
                {
                    if (field.Id == newField.Id)
                    {
                        return "this id is already in use";
                    }
                }
                if (String.IsNullOrWhiteSpace(newField.Name) && String.IsNullOrEmpty(newField.Name))
                {
                    return "string is null or empty";
                }
                db.Fields.Add(newField);
                db.SaveChanges();
                return newField;
            }
        }

        public static async Task<List<Field>> GetAllFields()
        {
            using (AppContext db = new AppContext())
            {
                return db.Fields.ToList();
            }
        }

        public static async Task<object> GetFieldById(int id)
        {
            using (AppContext db = new AppContext())
            {
                foreach (var field in db.Fields)
                {
                    if (field.Id == id)
                    {
                        return field;
                    }
                }
                return "Not found";
            }
        }

        public static async Task<object> UpdateField(Field field)
        {
            using (AppContext db = new AppContext())
            {
                var toChange = db.Fields.Find(field.Id);
                if (field.Id != null)
                {
                    toChange.Name = field.Name;
                    toChange.Description = field.Description;
                    db.SaveChanges();
                }
                return toChange;
            }
        }

        public static async Task<object> DeleteField(int id)
        {
            using (AppContext db = new AppContext())
            {
                var toChange = db.Fields.Find(id);
                if (toChange != null)
                {
                    db.Remove(toChange);
                    DeleteByFieldId(id);
                    db.SaveChanges();
                    return toChange;
                }
                else
                {
                    return "Not found";
                }
            }
        }
    }
}
