using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class DanhMucComboHangHoaModel
    {
        public int ID_DanhMucCombo { get; set; }
        public int ID_DanhMucHangHoa { get; set; }
        public string Name_DanhMucHangHoa { get; set; }
        public int SoLuong { get; set; }
        public double GiaBanLe { get; set; }
        public double GiaBanCombo { get; set; }
    }
}