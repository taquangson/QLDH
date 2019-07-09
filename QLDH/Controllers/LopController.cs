using Newtonsoft.Json.Linq;
using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace QLDH.Controllers
{
    public class LopController : Controller
    {
        // GET: Lop
        [SessionExpire]
        [SessionAdminRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult DanhSachLopTheoGiaoVien()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            LopHocDAO hsdao = new LopHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            if (userinfor.Role != 1)
            {
                return Json(hsdao.GetByGiaoVien(userinfor.ID), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(hsdao.GetAll_LopHoc(), JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetById(int ID)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetById_LopHoc(ID), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByGiaoVien()
        {
            LopHocDAO hsdao = new LopHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(hsdao.GetByGiaoVien(userinfor.ID), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllByHocSinh(int ID_HocSinh)
        {
            LopHocDAO hsdao = new LopHocDAO();
            return Json(hsdao.GetAll_ByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(string model)
        {
            LopHocDAO hsdao = new LopHocDAO();
            string fileName = "";
            //if (file != null && file.ContentLength > 0)
            //{
            //    fileName = Path.GetFileName(file.FileName);
            //    var path = Path.Combine(Server.MapPath("~/Images/SoDoLop"), fileName);
            //    file.SaveAs(path);
            //}
            JObject json = JObject.Parse(model);
            LopHocModel lhmodel = new LopHocModel();
            
            lhmodel.ID = int.Parse(json["ID"].ToString());
            if(lhmodel.ID > 0)
            {
                lhmodel = hsdao.GetById_LopHoc(lhmodel.ID);
            }
            lhmodel.GiaoVien = int.Parse(json["GiaoVien"].ToString());
            lhmodel.TenLop = json["TenLop"].ToString();
            lhmodel.LichHoc = json["LichHoc"].ToString();
            if (!string.IsNullOrWhiteSpace(fileName))
            {
                lhmodel.SoDoLop = fileName;
            }
            int newid = hsdao.InsertOrUpdate(lhmodel);
            if (newid > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        public class ThemHocSinhVaoLopModel
        {
            public int ID_Lop { get; set; }
            public List<HocSinhModel> lstHocSinh { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult ThemHocSinhVaoLop(ThemHocSinhVaoLopModel model)
        {
            Lop_HocSinhDAO lhsdao = new Lop_HocSinhDAO();
            lhsdao.ResetLop(model.ID_Lop);
            if (model.lstHocSinh != null)
            {
                foreach (HocSinhModel hs in model.lstHocSinh)
                {
                    Lop_HocSinhModel item = new Lop_HocSinhModel();
                    item.ID_Lop = model.ID_Lop;
                    item.ID_HocSinh = hs.ID;
                    lhsdao.InsertOrUpdate(item);
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            LopHocDAO hsdao = new LopHocDAO();
            if (hsdao.Delete(ID))
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