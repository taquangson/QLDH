using System.Collections.Generic;

namespace QLDH.DataAccess.Models
{
    public class PhieuThu_CTSPModel
    {
        public int ID { get; set; }
        public int ID_PhieuThu { get; set; }
        public int ID_SanPham { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public float GiaBan { get; set; }
    }
}