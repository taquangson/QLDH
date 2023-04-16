using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLDH.DataAccess.Models
{
    public class ChiTietBaiGiangModel
    {
        public int ID { get; set; }
        public int ID_BaiGiang { get; set; }
        public int Loai { get; set; } // 1- FlashCard; 2-Cau hoi; 3-Game
        public string TenChiTiet { get; set; }
        public int ThuTu { get; set; }
        public int TrangThai { get; set; }
        public string NoiDung { get; set; }
        public string FlexCol1 { get; set; }
        public string FlexCol2 { get; set; }
        public string FlexCol3 { get; set; }
        public string FlexCol4 { get; set; }
        public DateTime NgayTao { get; set; }
        public List<CauHoiModel> lstListenAndChoose { get; set; }
        public List<CauHoiModel> lstCauHoi { get; set; }
        public List<FlashCardModel> lstFlashCard { get; set; }
        public List<TroChoiModel> lstTroChoi { get; set; }
    }
}