using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class LopHocModel
    {
        public int ID { get; set; }
        public string TenLop { get; set; }
        public int TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public int SiSo { get; set; }
        public int NamHoc { get; set; }
        public int GiaoVien { get; set; }
        public string SoDoLop { get; set; }
        public string TenGiaoVien { get; set; }
        public string LichHoc { get; set; }
        public int ID_NhanVien { get; set; }
        public List<LichHocModel> lstLichHoc { get; set; }
        public List<QuanSinhLopHocModel> lstQuanSinh { get; set; }
        public List<int> lstIDQuanSinh { get; set; }
        public int ID_ChiNhanh { get; set; }
        public int ID_Khoi { get; set; }
        public string TenKhoi { get; set; }
        public GiaoAnModel GiaoAn { get; set; }
        public string PhongHoc { get; set; }
        public int IsLive { get; set; }
        public string Token_Room { get; set; }
        public float GiaBan { get; set; }
        public int ID_CongThucHocPhi { get; set; }
        public string TenCongThucHocPhi { get; set; }
        public CongThucTinhHocPhiModel CongThucTinhHocPhi { get; set; }
        public int ID_ChuongTrinhGiangDay { get; set; }
        public int GoiHocPhi { get; set; }
    }
}