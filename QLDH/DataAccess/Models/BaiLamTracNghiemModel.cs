using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class BaiLamTracNghiemModel
    {
        public long ID { get; set; }
        public int ID_HocSinh { get; set; }
        public int ID_DeThi { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime ThoiGianKetThuc { get; set; }
        public int TrangThai { get; set; }
        public float Diem { get; set; }
        public List<LichSu_BaiLamTracNghiemModel> lstLichsu { get; set; }
        public List<BaiLamTracNghiem_ChiTietModel> lstChitiet { get; set; }
    }
}