using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static QLDH.DataAccess.DAO.BaoCaoDAO;

namespace QLDH.Areas.FiveStar.Controllers
{
    public class FSLearnController : Controller
    {
        public ActionResult Index(int ID_BaiGiang)
        {
            TaiKhoanModel tk = (TaiKhoanModel)Session["UserInfor"];
            if (tk != null)
            {
                BaiGiangModel BaiGiang = new BaiGiangDAO().GetById(ID_BaiGiang);
                ChiTietBaiGiangModel chitietbg = new ChiTietBaiGiangModel();
                chitietbg.lstFlashCard = new FlashCardDAO().GetFlashCardByBaiGiang(BaiGiang.ID);
                chitietbg.lstCauHoi = new CauHoiDAO().GetCauHoiByBaiGiang(BaiGiang.ID);
                chitietbg.lstTroChoi = new TroChoiDAO().GetTroChoiByBaiGiang(BaiGiang.ID);
                chitietbg.lstListenAndChoose = new CauHoiDAO().GetCauHoiListenAndChoose(BaiGiang.ID);
                BaiGiang.ChiTietBaiGiang = new List<ChiTietBaiGiangModel>();
                BaiGiang.ChiTietBaiGiang.Add(chitietbg);
                return View(BaiGiang);
            }
            else
            {
                return RedirectToAction("Login", "FSUser");
            }
        }
    }
}