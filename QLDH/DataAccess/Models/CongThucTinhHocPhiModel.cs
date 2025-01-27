using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class CongThucTinhHocPhiModel
    {
        public int ID { get; set; }
        public string TenCongThuc { get; set; }
        public int DonVi { get; set; }
        public int Block { get; set; }
        public int TrangThai { get; set; }
        public int LichThanhToan { get; set; }
        public DateTime NgayTao { get; set; }
        public decimal HocPhi { get; set; }
        public string MoTa { get; set; }
        public int ApDungCK { get; set; }
    }
}