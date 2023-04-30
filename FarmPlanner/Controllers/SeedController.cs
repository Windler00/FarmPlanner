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
        [HttpPost]
        public IActionResult Post(Seed newSeed)
        {
            var result = AddSeed(newSeed);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        //work
        [HttpGet]
        public IEnumerable Get()
        {
            return GetAllSeeds();
        }
        //work
        [HttpGet("{id}")]
        public IActionResult GetByRowId(int id)
        {
            var result = GetSeedByRowId(id);
            if (result == null)
            {
                BadRequest();
            }

            return Ok(result);
        }
        //work
        [HttpPut]
        public IActionResult Update(Seed seed)
        {
            var result = UpdateSeed(seed);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        //work
        [HttpDelete]
        public IActionResult Delete(Seed seed)
        {
            var result = DeleteSeed(seed);
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
