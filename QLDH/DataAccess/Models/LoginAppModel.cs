using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class UserAppModel
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Remember { get; set; }
        public string Current_Imei { get; set; }
        public string Current_Device { get; set; }
        public int EmployeeType {get;set;}
    }
}