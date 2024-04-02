using System;

namespace QLDH.DataAccess.Models
{
    public class BienDongSoDuTaiKhoanModel
    {
        public int ID { get; set; }
        public int ID_TaiKhoan { get; set; }
        public int LoaiBienDong { get; set; }
        public int KieuBienDong { get; set; }
        public int ID_PhieuThu { get; set; }
        public int ID_PhieuHoc { get; set; }
        public int ID_PhuThuGiamTru { get; set; }
        public int ID_LenhRutTien { get; set; }
        public double SoTien { get; set; }
        public int TrangThai { get; set; }
        public string GhiChu { get; set; }
        public DateTime NgayTao { get; set; }
    }
}