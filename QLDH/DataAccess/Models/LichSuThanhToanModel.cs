using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class LichSuThanhToanModel
    {
        public int ID { get; set; }
        public int ID_PhieuThu { get; set; }
        public int ID_NhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public float TongTien { get; set; }
        public float ConLai { get; set; }
        public DateTime NgayTao { get; set; }
        public string GhiChu { get; set; }
        public int HinhThucThanhToan { get; set; }
        public string TenHinhThucThanhToan { get; set; }
    }
}