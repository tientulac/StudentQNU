using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentManager.Models
{
    public class AccountDTO
    {
        public Account Account { get; set; }
        public string Token { get; set; }
    }
}