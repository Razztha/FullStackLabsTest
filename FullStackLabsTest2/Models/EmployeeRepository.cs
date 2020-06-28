using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackLabsTest2.Models
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public Employee AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return employee;
        }

        public Employee EditEmployee(Employee employee)
        {
            var emp =_context.Employees.Include(a => a.Addresses).Include(q => q.Qualifications).AsNoTracking().FirstOrDefault(e => e.Id == employee.Id);

            emp.Id = employee.Id;
            emp.FirstName = employee.FirstName;
            emp.LastName = employee.LastName;
            emp.Email = employee.Email;
            emp.Telephone = employee.Telephone;

            foreach (var add in employee.Addresses)
            {
               _context.Entry(add).State = EntityState.Modified;
            }

            _context.Qualifications.RemoveRange(emp.Qualifications);
            foreach (var qualification in employee.Qualifications)
            {
                _context.Qualifications.Add(qualification);
                _context.SaveChanges();
            }

            _context.Entry(emp).State = EntityState.Modified;
            _context.SaveChanges();
            return employee;
        }

        public bool DeleteEmployee(int id)
        {
            // todo: should check weather related entities are deleting
            var emp = _context.Employees
                .Include(e => e.Addresses)
                .Include(q => q.Qualifications)
                .FirstOrDefault(e => e.Id == id);

            if (emp != null)
            {
                _context.Employees.Remove(emp);

                if (emp.Qualifications.Count > 0)
                _context.Qualifications.RemoveRange(emp.Qualifications);

                if (emp.Addresses.Count > 0)
                _context.Addresses.RemoveRange(emp.Addresses);

                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public Employee GetEmployee(int id)
        {
            return _context.Employees
                .Include(e => e.Addresses)
                .Include(q => q.Qualifications)
                .FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employees
                .Include(c => c.Addresses)
                .Include(q => q.Qualifications);
        }
    }
}
