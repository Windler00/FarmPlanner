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
        //work
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByRowId(int id)
        {
            var result = await GetSeedByRowId(id);
            if (result == null)
            {
                BadRequest();
            }
            return Ok(result);
        }
        //work
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
