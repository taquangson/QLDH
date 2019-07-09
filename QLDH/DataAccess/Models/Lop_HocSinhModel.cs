using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class Lop_HocSinhModel
    {
        public int ID { get; set; }
        public int ID_HocSinh { get; set; }
        public int ID_Lop { get; set; }
        public DateTime BatDau { get; set; }
        public DateTime KetThuc { get; set; }
        public int TrangThai { get; set; }
    }
}