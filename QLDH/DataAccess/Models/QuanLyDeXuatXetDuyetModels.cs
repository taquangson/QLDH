using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.Models
{
    public class QuanLyDeXuatXetDuyetModels
    {
        public int ID_DeXuat { get; set; }
        public int ID_NguoiDuyet { get; set; }
        public string NguoiDuyet { get; set; }
        public int TrangThaiDuyet { get; set; }
        public string NoiDungDuyet { get; set; }
        public DateTime NgayDuyet { get; set; }
    }
}
