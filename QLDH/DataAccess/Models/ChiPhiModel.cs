using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class ChiPhiModel
    {
        public int ID { get; set; }
        public int ID_PhieuChi { get; set; }
        public DateTime NgayTao { get; set; }
        public float SoTien { get; set; }
        public float TongTien { get; set; }
        public int SoLuong { get; set; }
        public string MoTa { get; set; }
        public string TenChiPhi { get; set; }
        public string MaChiPhi { get; set; }
        public int ID_Kho { get; set; }
        public int TrangThai { get; set; }
        public string TenDanhMucNhomChi { get; set; }
        public int DanhMucNhomChi { get; set; }

    }
}