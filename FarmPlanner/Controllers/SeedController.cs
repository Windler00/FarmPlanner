using FarmPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static FarmPlanner.Services.SeedService;

namespace FarmPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            using (AppContext db = new AppContext())
            {
                var result = db.Seeds.ToList();
                return Ok(result);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByRowId(int id)
        {
            var result = await GetSeedsByRowId(id);
            if (result == null)
            {
                BadRequest();
            }
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update(Seed seed)
        {
            var result = await UpdateSeed(seed);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
    }
}
