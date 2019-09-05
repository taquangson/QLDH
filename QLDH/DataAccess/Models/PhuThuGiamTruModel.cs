using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class PhuThuGiamTruModel
    {
        public int ID { get; set; }
        public int ID_PhieuThu { get; set; }
        public string LyDo { get; set; }
        public int Type { get; set; } // 0 = Phụ thu; 1 = Giảm trừ
        public float DonGia { get; set; }
    }
}