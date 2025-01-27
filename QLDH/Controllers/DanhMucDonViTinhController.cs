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
    public class DanhMucDonViTinhController : Controller
    {
        // GET: DanhMucDonViTinh
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            DanhMucDonViTinhDAO dmncdao = new DanhMucDonViTinhDAO();
            return Json(dmncdao.GetAll(), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(DanhMucDonViTinhModel model)
        {
            DanhMucDonViTinhDAO dmncdao = new DanhMucDonViTinhDAO();
           
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
            DanhMucDonViTinhDAO dmncdao = new DanhMucDonViTinhDAO();
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