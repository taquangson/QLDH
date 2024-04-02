using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.Models
{
    public class QuanLyDeXuatChiTietModels
    {
        public int ID { get; set; }
        public int ID_DeXuat { get; set; }
        public int ID_HangHoa { get; set; }
        public string TenHangHoa { get; set; }
        public int SoLuong { get; set; }
        public string QuyCachSuDung { get; set; }
        public  float SoTien { get; set; }
    }
}
