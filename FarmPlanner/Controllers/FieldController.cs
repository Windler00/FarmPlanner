﻿using FarmPlanner.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using static FarmPlanner.Services.FieldService;

namespace FarmPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        //work
        [HttpPost]
        public async Task<IActionResult> Post(Field newField)
        {
            var result = AddField(newField);
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
        //work
        [HttpGet]
        public async Task<IEnumerable> GetAll()
        {
            return GetAllFields();
        }
        //work
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var result = GetFieldById(id);
            if(result == "Not found")
            {
                return NotFound();
            }
            return Ok(result);
        }
        //work
        [HttpPut]
        public async Task<IActionResult> Update(Field field)
        {
            return Ok(UpdateField(field));
        }
        //work
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using (AppContext db = new AppContext())
            {
                var result = DeleteField(id);
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
