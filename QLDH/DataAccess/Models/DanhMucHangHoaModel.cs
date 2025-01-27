using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.Models
{
    public class DanhMucHangHoaModel
    {
        public int ID { get; set; }
        public string MaHang { get; set; }
        public string Ten { get; set; }
        public string DonViTinh { get; set; }
        public string LoaiSanPham { get; set; }
        public int SoLuongTonToiThieu { get; set; }
        public double GiaBanLe { get; set; }
        public double GiaNhap { get; set; }
        public double GiaBanBuon { get; set; }
        public double TongNhap { get; set; }
        public double TongBanLe { get; set; }
        public string HinhAnhSanPham { get; set; }
        public string MoTaSanPham { get; set; }
        public int SoLuongBanBuonToiThieu { get; set; }
        public int ID_DonViTinh { get; set; }
        public int ID_LoaiSanPham { get; set; }


    }
}
