using FarmPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static FarmPlanner.Services.RowService;
using static FarmPlanner.Services.SeedService;

namespace FarmPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RowController : ControllerBase
    {
        //work
        [HttpPost]
        public IActionResult Post(Row newRow)
        {
            var result = AddRow(newRow);
            FillSeedList(newRow.Id);
            if (result == "this id is already in use")
            {
                return BadRequest("this id is already in use");
            }
            return Ok(result);
        }
        //work
        [HttpGet("{id}")]
        public IActionResult GetByFieldId(int id)
        {
            var result = GetRowByFieldId(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        //work
        [HttpPut]
        public IActionResult Update(Row row)
        {
            var result = UpdateRow(row);
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
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(DeleteRow(id));
        }
    }
}