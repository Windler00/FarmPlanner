using FarmPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static FarmPlanner.Services.FieldService;

namespace FarmPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post(Field newField)
        {
            var result = await AddField(newField);
            if (result == "this id is already in use")
            {
                return BadRequest("this id is already in use");
            }
            else if (result == "string is null or empty")
            {
                return BadRequest("string is null or empty");
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpGet]
        public async Task<IEnumerable> GetAll()
        {
            return await GetAllFields();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var result = await GetFieldById(id);
            if(result == "Not found")
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update(Field field)
        {
            return Ok(await UpdateField(field));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using (AppContext db = new AppContext())
            {
                var result = await DeleteField(id);
                if(result == "Not found")
                {
                    return NotFound();
                }
                else
                {
                    return Ok(result);
                }
            }
        }
    }
}
