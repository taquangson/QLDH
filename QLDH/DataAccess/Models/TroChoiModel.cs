using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class TroChoiModel
    {
        public int ID { get; set; }
        public string TenTroChoi { get; set; }
        public int Loai { get; set; }
        public string TenLoai { get; set; }
        public int Diem { get; set; }
        public string HinhAnh { get; set; }
        public string AmThanh { get; set; }
        public string NoiDung { get; set; }
        public List<DapAnTroChoiModel> lstDapAn { get; set; }
    }
}