using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentManager.Models
{
    public class ResponseBase<T>
    {
        public T data { get; set; }
        public string message { get; set; }
        public int status { get; set; }
    }
}