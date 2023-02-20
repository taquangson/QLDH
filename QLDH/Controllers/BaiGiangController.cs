using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static System.Net.WebRequestMethods;

namespace QLDH.Controllers
{
    public class BaiGiangController : Controller
    {

        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult Flashcard()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult TestGame()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult GetAll_Flashcard()
        {
            FlashCardDAO cndao = new FlashCardDAO();
            List<FlashCardModel> lstcn = cndao.GetAll();
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetAll()
        {
            BaiGiangDAO cndao = new BaiGiangDAO();
            List<BaiGiangModel> lstcn = cndao.GetAll();
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetAll_ChiTiet(int ID_BaiGiang)
        {
            ChiTietBaiGiangDAO cndao = new ChiTietBaiGiangDAO();
            List<ChiTietBaiGiangModel> lstcn = cndao.GetByBaiGiang(ID_BaiGiang);
            ChiTietBaiGiangModel item = lstcn.FirstOrDefault();
            if (item != null)
            {
                item.lstFlashCard = new FlashCardDAO().GetFlashCardByBaiGiang(item.ID_BaiGiang);
                item.lstCauHoi = new CauHoiDAO().GetCauHoiByBaiGiang(item.ID_BaiGiang);
                item.lstTroChoi = new TroChoiDAO().GetTroChoiByBaiGiang(item.ID_BaiGiang);
            }
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(BaiGiangModel model)
        {
            BaiGiangDAO hsdao = new BaiGiangDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            model.ID_NhanVien = userinfor.ID;
            int newid = hsdao.InsertOrUpdate_BaiGiang(model);
            if (newid > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate_Flashcard(FlashCardModel model)
        {
            FlashCardDAO hsdao = new FlashCardDAO();
            int rowaff = hsdao.InsertOrUpdate_FlashCard(model);
            if (rowaff > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate_ChiTiet(ChiTietBaiGiangModel model)
        {
            ChiTietBaiGiangDAO hsdao = new ChiTietBaiGiangDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int newid = hsdao.InsertOrUpdate_ChiTietBaiGiang(model);
            if (newid > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(int ID)
        {
            BaiGiangDAO hsdao = new BaiGiangDAO();
            if (hsdao.Delete_BaiGiang(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete_Flashcard(int ID)
        {
            FlashCardDAO hsdao = new FlashCardDAO();
            if (hsdao.Delete_FlashCard(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete_ChiTiet(int ID)
        {
            ChiTietBaiGiangDAO hsdao = new ChiTietBaiGiangDAO();
            if (hsdao.Delete_ChiTietBaiGiang(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}