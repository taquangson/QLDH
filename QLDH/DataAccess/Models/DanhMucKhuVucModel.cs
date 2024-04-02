using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class DanhMucKhuVucModel
    {
        public long ID { get; set; }
        public string TenKhuVuc{ get; set; }
        public string MaKhuVuc { get; set; }
        public int ID_Cha { get; set; }
        public int TrangThai { get; set; }
        public string TenTrangThai { get; set; }

        public DateTime NgayTao { get; set; }
        public string MoTa { get; set; }


    }
}