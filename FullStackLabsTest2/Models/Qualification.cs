using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackLabsTest2.Models
{
    public enum Type
    {
        Degree = 0,
        Diploma = 1
    }
    public class Qualification
    {
        public int Id { get; set; }
        public Type Type { get; set; }
        public string Description { get; set; }
        public int EmployeeId { get; set; }
    }
}
