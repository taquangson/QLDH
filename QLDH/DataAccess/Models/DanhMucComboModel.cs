using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.Models
{
    public class DanhMucComboModel
    {
        public int ID { get; set; }
        public string MaCombo { get; set; }
        public string TenCombo { get; set; }
        public double GiaVon { get; set; }
        public double GiaBanLe { get; set; }
        public string DonViTinh { get; set; }
        public string NoiDung { get; set; }
        public string HinhAnhSanPham { get; set; }
        public List<DanhMucComboHangHoaModel> DanhMucComboHangHoa { get; set; }
    }
}
