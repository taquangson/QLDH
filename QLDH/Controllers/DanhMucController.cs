using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static QLDH.DataAccess.DAO.DanhMucDAO;

namespace QLDH.Controllers
{
    public class DanhMucController : Controller
    {
        // GET: DanhMuc
        [SessionExpire]
        public ActionResult GetAll_DanhMucQuyen()
        {
            DanhMucDAO dm_dao = new DanhMucDAO();
            List<DanhMuc> dt = dm_dao.GetAll_DMQuyen();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [SessionAdminRoleAttribute]
        public ActionResult DanhMucLoi()
        {
            return View();
        }

        [SessionAdminRoleAttribute]
        public ActionResult DanhMucTruongHoc()
        {
            return PartialView("DanhMucTruongHoc");
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetAll_DanhMuc(string TenBang)
        {
            DanhMucDAO dm_dao = new DanhMucDAO();
            List<DanhMuc> dt = dm_dao.GetAll_DM(TenBang);
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll_CaHoc()
        {
            CaHocDAO dm_dao = new CaHocDAO();
            List<CaHocModel> dt = dm_dao.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdate_DanhMuc(DanhMuc item, string TenBang)
        {
            DanhMucDAO dm_dao = new DanhMucDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (dm_dao.InsertOrUpdate_DM(item, TenBang, userinfor.ID_ChiNhanh))
            {
                return Json(new { success = true, msg = "Lưu danh mục thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success = false, msg = "Lưu danh mục thất bại, vui lòng liên hệ quản trị viên"}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}