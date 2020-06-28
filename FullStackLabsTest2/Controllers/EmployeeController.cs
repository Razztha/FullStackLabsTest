using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FullStackLabsTest2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullStackLabsTest2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepository _empRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _empRepository = employeeRepository;
        }

        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            try
            {
                return _empRepository.GetEmployees();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            try
            {
                var emp = _empRepository.GetEmployee(id);

                if (emp != null)
                {
                    return Ok(emp);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public IActionResult CreateEmployee([FromBody] Employee employee)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _empRepository.AddEmployee(employee);
                return CreatedAtAction("GetEmployeeById", new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee([FromRoute]int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            try
            {
                _empRepository.EditEmployee(employee);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deleted = _empRepository.DeleteEmployee(id);

            if (deleted)
            {
                return Ok();
            }

            return NotFound();
        }
    }
}