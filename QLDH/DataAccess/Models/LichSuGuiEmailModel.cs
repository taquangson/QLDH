using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class LichSuGuiEmailModel
    {
        public int ID { get; set; }
        public int ID_PhieuThu { get; set; }
        public string NoiDung { get; set; }
        public string TieuDe { get; set; }
        public string NguoiNhan { get; set; }
        public DateTime NgayGui { get; set; }
    }
}