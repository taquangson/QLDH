using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class DinhMucNhomChiModel
    {
        public long ID { get; set; }
        public string TenKeHoach { get; set; }
        public int LoaiKeHoach { get; set; }
        public float SoTien { get; set; }
        public float PhanTramDoanhThu { get; set; }
        public float TongTienDinhMuc { get; set; }
        public int SoLuot { get; set; }
        public int TrangThai { get; set; }
        public int ID_NhomChi { get; set; }
        public DateTime NgayTao { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public string MoTa { get; set; }
        public string TenNhomChi { get; set; }
        public string TenLoaiKeHoach { get; set; }


    }
}