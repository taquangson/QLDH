using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class DanhMucNhomChiModel
    {
        public int ID { get; set; }
        public string TenNhomChi { get; set; }
        public string MaNhomChi { get; set; }
        public int TrangThai { get; set; }
        public string MoTa { get; set; }
        public int ID_Cha { get; set; }
    }
}