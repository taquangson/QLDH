using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class CheckInSuKienModel
    {
        public int ID { get; set; }
        public int ID_HocSinh { get; set; }
        public DateTime ThoiGianCheckIn { get; set; }
        public DateTime NgayToChucSuKien { get; set; }
    }
}