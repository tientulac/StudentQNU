using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentManager.Models
{
    public class ClassDTO : Class
    {
        public string SubjectName { get; set; }
        public List<int> ListStudentId { get; set; }
    }
}