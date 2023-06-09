﻿using FarmPlanner.Models;
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
        [HttpPost]
        public async Task<IActionResult> Post(Row newRow)
        {
            var result = await AddRow(newRow);
            await FillSeedList(newRow.Id);
            if (result == "this id is already in use")
            {
                return BadRequest("this id is already in use");
            }
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetRows()
        {
            using (AppContext db = new AppContext())
            {
                var rows = db.Rows.ToList();
                return Ok(rows);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByFieldId(int id)
        {
            var result = await GetRowByFieldId(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update(Row row)
        {
            var result = await UpdateRow(row);
            if (result == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await DeleteRow(id));
        }
    }
}