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
        [SessionAdminRole]
        public ActionResult DanhMucLoi()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult DanhMucNhomChi()
        {
            return View();
        }

        [SessionAdminRole]
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

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllNhomChi()
        {
            DanhMucNhomChiDAO ncdao = new DanhMucNhomChiDAO();
            
            return Json(ncdao.GetAll_NhomChi(), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult QuanLyDeXuat_GetAllNhomChi()
        {
            DanhMucNhomChiDAO ncdao = new DanhMucNhomChiDAO();

            return Json(ncdao.QuanLyDeXuat_GetAllNhomChi(), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(DanhMucNhomChiModel model)
        {
            DanhMucNhomChiDAO ncdao = new DanhMucNhomChiDAO();
            if (ncdao.InsertOrUpdate_NhomChi(model) > 0)
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
            DanhMucNhomChiDAO ncdao = new DanhMucNhomChiDAO();
            if (ID != null)
            {
                List<string> list = ID.Split(',').ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    if (ncdao.Delete_NhomChi(Int32.Parse(list[i])) == 0)
                    {
                        return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult CongThucTinhHocPhi()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllCongThucTinhHocPhi()
        {
            CongThucTinhHocPhiDAO ncdao = new CongThucTinhHocPhiDAO();

            return Json(ncdao.GetAll(), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate_CongThucHocPhi(CongThucTinhHocPhiModel model)
        {
            CongThucTinhHocPhiDAO ncdao = new CongThucTinhHocPhiDAO();
            if (ncdao.InsertOrUpdate(model) > 0)
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
        public ActionResult Delete_CongThucHocPhi(string ID)
        {
            CongThucTinhHocPhiDAO ncdao = new CongThucTinhHocPhiDAO();
            if (ID != null)
            {
                List<string> list = ID.Split(',').ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    if (!ncdao.Delete(Int32.Parse(list[i])))
                    {
                        return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }
    }
}