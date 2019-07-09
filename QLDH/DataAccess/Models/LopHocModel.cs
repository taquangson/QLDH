using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class LopHocModel
    {
        public int ID { get; set; }
        public string TenLop { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public int SiSo { get; set; }
        public int NamHoc { get; set; }
        public int GiaoVien { get; set; }
        public string SoDoLop { get; set; }
        public string TenGiaoVien { get; set; }
        public string LichHoc { get; set; }
    }
}