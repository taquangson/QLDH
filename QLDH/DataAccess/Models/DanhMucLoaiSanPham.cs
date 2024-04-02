using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.Models
{
    public class DanhMucLoaiSanPhamModel
    {
        public int ID { get; set; }
        public string Ten { get; set; }
        public string MoTa { get; set; }
        public string MaLoaiSanPham { get; set; }

        public int TrangThai { get; set; }

    }
}
