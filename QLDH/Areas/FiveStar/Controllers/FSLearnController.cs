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
        public ActionResult Moon(int ID_BaiGiang)
        {
            TaiKhoanModel tk = (TaiKhoanModel)Session["UserInfor"];
            if (tk != null)
            {
                BaiGiangModel BaiGiang = new BaiGiangDAO().GetById(ID_BaiGiang);
                BaiGiang.ChiTietBaiGiang = new List<ChiTietBaiGiangModel>();
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
        public ActionResult Venus(int ID_BaiGiang)
        {
            TaiKhoanModel tk = (TaiKhoanModel)Session["UserInfor"];
            if (tk != null)
            {
                BaiGiangModel BaiGiang = new BaiGiangDAO().GetById(ID_BaiGiang);
                BaiGiang.ChiTietBaiGiang = new List<ChiTietBaiGiangModel>();
                ChiTietBaiGiangModel chitietbg = new ChiTietBaiGiangModel();
                CauHoiDAO chdao = new CauHoiDAO();
                chitietbg.lstLookListenAndChoose = chdao.GetLookListenAndChoose(BaiGiang.ID);
                chitietbg.lstLookListenAndClick = chdao.GetLookListenAndClick(BaiGiang.ID);
                chitietbg.lstLookListenAndType = chdao.GetLookListenAndType(BaiGiang.ID);
                chitietbg.lstLookTypeAndRepeat = chdao.GetLookTypeAndRepeat(BaiGiang.ID);
                chitietbg.lstGrammarQuiz = chdao.GetCauHoiByBaiGiang(BaiGiang.ID);
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