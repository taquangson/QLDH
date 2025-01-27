using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class PhieuChiModel
    {
        public int ID { get; set; }
        public int ID_KhuVuc { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgaySuDung { get; set; }
        public decimal SoTien { get; set; }
        public string LyDo { get; set; }
        public string TenNguoiNhan { get; set; }
        public string TenNguoiTao { get; set; }

        public string MaPhieu { get; set; }
        public int LoaiPhieu { get; set; }
        public int HinhThuc { get; set; }
        public string TenHinhThuc { get; set; }

        public int TrangThai { get; set; }
        public int ID_NhanVien { get; set; }
        public int ID_TaiKhoan { get; set; }

        public int ID_DeXuat { get; set; }
        public string TenLoaiPhieu { get; set; }
        public string TenTrangThai { get; set; }
        public string TenDeXuat { get; set; }
        public List<ChiPhiModel> lstChiPhi { get; set; }
    }
}