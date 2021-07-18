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
    public class LiveClassController : Controller
    {
        // GET: LiveClass

        [SessionExpire]
        public ActionResult Room(string RoomID, int ID_Lop,int ID_HocSinh)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ViewBag.Title = "Lớp trực tuyến";
            ViewBag.RoomID = RoomID;
            LopHocDAO lhdao = new LopHocDAO();
            LopHocModel l = lhdao.GetById_LopHoc(ID_Lop);
            HocSinhDAO hsdap = new HocSinhDAO();
            List<HocSinhModel> lhs = hsdap.GetByLop_HocSinh(l.ID);
            ViewBag.ListHocSinh = lhs;
            ViewBag.TenLop = l.TenLop;
            ViewBag.TenGiaoVien = l.TenGiaoVien;
            ViewBag.ID_GiaoVien = l.GiaoVien;
            ViewBag.ID_User = ID_HocSinh > 0 ? ID_HocSinh : userinfor.ID;
            return View();
        }


        [SessionExpire]
        public ActionResult RoomGV(string RoomID, int ID_Lop, int ID_HocSinh)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ViewBag.Title = "Lớp trực tuyến";
            ViewBag.RoomID = RoomID;
            LopHocDAO lhdao = new LopHocDAO();
            LopHocModel l = lhdao.GetById_LopHoc(ID_Lop);
            HocSinhDAO hsdap = new HocSinhDAO();
            List<HocSinhModel> lhs = hsdap.GetByLop_HocSinh(l.ID);
            ViewBag.ListHocSinh = lhs;
            ViewBag.TenLop = l.TenLop;
            ViewBag.TenGiaoVien = l.TenGiaoVien;
            ViewBag.ID_GiaoVien = l.GiaoVien;
            ViewBag.ID_User = ID_HocSinh > 0 ? ID_HocSinh : userinfor.ID;
            return View();
        }

        [SessionExpire]
        public ActionResult DanhSachLopHocOnline(int ID_HocSinh)
        {

            ViewBag.Title = "Lớp học trực tuyến";
            return View();
        }
    }
}