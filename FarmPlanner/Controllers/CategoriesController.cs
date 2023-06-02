using FarmPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using static FarmPlanner.Services.CategoriesService;

namespace FarmPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        public async Task<List<Category>> GetAll()
        {
            return await GetAllCategories();
        }
        [HttpGet("{level}")]
        public async Task<List<Category>> GetByLevel(int level)
        {
            return await GetCategoriesByLevel(level);
        }

        [HttpPost]
        public async Task<Category> PostCategory(Category newCategory)
        {
            var result = await PostCategoryToDb(newCategory);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<Category> DeleteCategories(int id)
        {
            return await DeleteCategoriesHandler(id);
        }
    }
}
