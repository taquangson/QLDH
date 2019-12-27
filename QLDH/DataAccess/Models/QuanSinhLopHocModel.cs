using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class QuanSinhLopHocModel
    {
        public int ID { get; set; }
        public int ID_QuanSinh { get; set; }
        public int ID_Lop { get; set; }
        public DateTime NgayTao { get; set; }
    }
}