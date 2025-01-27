using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class BaiGiangModel
    {
        public BaiGiangModel()
        {
            this.ChiTietBaiGiang = new List<ChiTietBaiGiangModel>();
        }
        public int ID { get; set; }        
        public string TenBai { get; set; }
        public string TenBuoi { get; set; }
        public string BaiHoc { get; set; }
        public int ID_NhanVien { get; set; }
        public int TrangThai { get; set; }
        public int CapDo { get; set; }
        public DateTime NgayTao { get; set; }
        public int ThuTu { get; set; }
        public List<ChiTietBaiGiangModel> ChiTietBaiGiang { get; set; }
    }
}