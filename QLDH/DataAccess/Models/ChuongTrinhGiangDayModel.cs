using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class ChuongTrinhGiangDayModel
    {
        public int ID { get; set; }
        public string TenChuongTrinh { get; set; }
        public int ID_Parent { get; set; }
        public int TrangThai { get; set; }
        public int ThuTu { get; set; }
        public DateTime NgayTao { get; set; }
    }
}