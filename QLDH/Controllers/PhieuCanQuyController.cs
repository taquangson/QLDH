using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class PhieuCanQuyController : Controller
    {
        // GET: PhieuCanQuy
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            PhieuCanQuyDAO pcqdao = new PhieuCanQuyDAO();
            return Json(pcqdao.GetAll_PhieuCanQuy(), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetTongChi(int HinhThuc)
        {
            QuanLyQuyDAO qlqdao = new QuanLyQuyDAO();
            decimal sotien = qlqdao.GetTongTienChi(HinhThuc);
            if (sotien > 0)
            {

                return Json(new { status = true, msg = "Lấy dữ liệu thành công", data = sotien }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lấy dữ liệu thất bại, vui lòng liên hệ quản trị", data = 0 }, JsonRequestBehavior.AllowGet);
            }

        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetTongThu(int HinhThuc)
        {
            QuanLyQuyDAO qlqdao = new QuanLyQuyDAO();
            decimal sotien = qlqdao.GetTongTienThu(HinhThuc);
            if (sotien > 0)
            {

                return Json(new { status = true, msg = "Lấy dữ liệu thành công", data = sotien }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lấy dữ liệu thất bại, vui lòng liên hệ quản trị", data = 0 }, JsonRequestBehavior.AllowGet);
            }

        }


        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(PhieuCanQuyModel model)
        {
            PhieuCanQuyDAO pcqdao = new PhieuCanQuyDAO();

            int newid = pcqdao.InsertOrUpdate(model);
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
        public ActionResult Delete(string ID)
        {
            PhieuCanQuyDAO pcqdao = new PhieuCanQuyDAO();
            if (pcqdao.Delete(ID))
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