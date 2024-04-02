using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class DanhMucLoaiSanPhamController : Controller
    {
        // GET: DanhMucLoaiSanPham
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            DanhMucLoaiSanPhamDAO dmncdao = new DanhMucLoaiSanPhamDAO();
            return Json(dmncdao.GetAll(), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(DanhMucLoaiSanPhamModel model)
        {
            DanhMucLoaiSanPhamDAO dmncdao = new DanhMucLoaiSanPhamDAO();
           
            int newid = dmncdao.InsertOrUpdate(model);
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
            DanhMucLoaiSanPhamDAO dmncdao = new DanhMucLoaiSanPhamDAO();
            if (dmncdao.Delete(ID))
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