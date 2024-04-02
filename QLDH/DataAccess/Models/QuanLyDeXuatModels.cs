using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.Models
{
    public class QuanLyDeXuatModels
    {   
        public int ID { get; set; }
        public string TenDeXuat { get; set; }
        public string MaDeXuat { get; set; }
        public int ID_NguoiTao { get; set; }
        public string NguoiTao { get; set; }
        public int ID_DinhMucChi { get; set; }
        public string NameDinhMucChi { get; set; }
        public int ID_NhomChi { get; set; }
        public string TenNhomChi { get; set; }
        public int ID_DanhMucNhomChi { get; set; }
        public string NameDanhMucNhomChi { get; set; }
        public string MaPhieuChi { get; set; }
        public DateTime NgayTao { get; set; }
        public int KhuVucSuDung { get; set; }
        public int ThoiGianKhauHao { get; set; }
        public int ThoiGianPhanBo { get; set; }

        public DateTime ThoiGianDuKienSuDung { get; set; }
        public int TrangThaiDuyet { get; set; }
        public float TongTien { get; set; }
        public string NoiDung { get; set; }
        public int HinhThucPhanBo { get; set; }

        public List<QuanLyDeXuatXetDuyetModels> NguoiDuyet { get; set; }
        public List<QuanLyDeXuatChiTietModels> ChiTiet { get; set; }
    }
}
