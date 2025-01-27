using System;

namespace QLDH.DataAccess.Models
{
    public class QuyModel
    {
        public int ID { get; set; }
        public string TenQuy { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public string BankCode { get; set; }
        public string TenNganHang { get; set;}
        public string SoTaiKhoan { get; set; }
        public double TongTien { get; set; }
    }
}