using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class PhieuCanQuyModel
    {
        public int ID { get; set; }
        public DateTime NgayTao { get; set; }
        public float SoTien { get; set; }
        public int HinhThuc { get; set; }
        public string GhiChu { get; set; }
        public string MaPhieu { get; set; }
        public string TenPhieu { get; set; }

    }
}