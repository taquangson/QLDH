using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using QLDH.Hubs;
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

        [HttpPost]
        public ActionResult InitCallSession(CallSessionModel model)
        {
            switch (model.hubname) {
                case "candidate_server":
                    BoardcastHub.candidate_server(model.senderId, model.message);
                    break;
                case "candidate_client":
                    BoardcastHub.candidate_client(model.senderId, model.message);
                    break;
                case "offer":
                    BoardcastHub.offer(model.senderId, model.message);
                    break;
                case "answer":
                    BoardcastHub.answer(model.senderId, model.message);
                    break;
                case "watcher":
                    BoardcastHub.watcher(model.senderId);
                    break;
                case "chat":
                    BoardcastHub.chat(model.senderId, model.message);
                    break;
            }
            //CallSessionDAO dao = new CallSessionDAO();
            //dao.InsertOrUpdate(model);
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetCallSession()
        {

            CallSessionDAO dao = new CallSessionDAO();
            
            return Json(dao.GetAllSession(), JsonRequestBehavior.AllowGet);
        }


    }
}