using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentManager.Models
{
    public class StudentDTO : Student
    {
        public string GenreName { get; set; }
        public string MajorName { get; set; }
        public string SchoolYearName { get; set; }
        public string StatusName { get; set; }
        public string GenderName { get; set; }
        public string StuentName { get; set; }
    }
}