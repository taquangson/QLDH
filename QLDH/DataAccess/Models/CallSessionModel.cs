using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class CallSessionModel
    {
        public int ID { get; set; }
        public string senderId { get; set; }
        public string message { get; set; }
        public string hubname { get; set; }
    }
}