using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class DapAnTroChoiModel
    {
        public long ID { get; set; }
        public int ID_TroChoi { get; set; }
        public string NoiDung { get; set; }
        public string HinhAnh { get; set; }
        public string AmThanh { get; set; }
        public int IsDapAnDung { get; set; }
        public int ThuTu { get; set; }
        public string DapAn { get; set; }
    }
}