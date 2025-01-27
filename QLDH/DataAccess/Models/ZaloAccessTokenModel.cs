using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class ZaloAccessTokenModel
    {
        public int ID { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public DateTime create_date { get; set; }
        public int expires_in { get; set; }
    }
}