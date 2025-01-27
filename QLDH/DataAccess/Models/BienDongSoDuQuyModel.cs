using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class BienDongSoDuQuyModel
    {
        public int ID { get; set; }
        public int ID_Quy { get; set; }
        public string Name_Quy { get; set; }
        public int Type { get; set; }
        public int TrangThai { get; set; }
        public decimal SoTien { get; set; }
        public int ID_PhieuChi { get; set; }
        public int ID_PhieuThu { get; set; }
        public int ID_PhieuCanQuy { get; set; }
        public DateTime NgayTao { get; set; }
    }
}