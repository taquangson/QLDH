using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class NhomChucNangModel
    {
        public int ID { get; set; }
        public string TenNhomChucNang { get; set; }
        public string Icon { get; set; }
        public List<ChucNangModel> lstChucNang { get; set; }
    }
}