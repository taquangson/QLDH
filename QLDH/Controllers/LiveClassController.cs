using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using QLDH.Hubs;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using QLDH.DataAccess.Helper;

namespace QLDH.Controllers
{
    public class LiveClassController : Controller
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(LiveClassController));
        // GET: LiveClass

        //[SessionExpire]
        //public ActionResult Room(string RoomID, int ID_Lop, int ID_HocSinh)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    ViewBag.Title = "Lớp trực tuyến";
        //    ViewBag.RoomID = RoomID;
        //    LopHocDAO lhdao = new LopHocDAO();
        //    LopHocModel l = lhdao.GetById_LopHoc(ID_Lop);
        //    HocSinhDAO hsdap = new HocSinhDAO();
        //    List<HocSinhModel> lhs = hsdap.GetByLop_HocSinh(l.ID);
        //    ViewBag.ListHocSinh = lhs;
        //    ViewBag.TenLop = l.TenLop;
        //    ViewBag.TenGiaoVien = l.TenGiaoVien;
        //    ViewBag.ID_GiaoVien = l.GiaoVien;
        //    ViewBag.ID_User = ID_HocSinh > 0 ? ID_HocSinh : userinfor.ID;
        //    return View();
        //}


        //[SessionExpire]
        //public ActionResult RoomGV(string RoomID, int ID_Lop, int ID_HocSinh)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    ViewBag.Title = "Lớp trực tuyến";
        //    ViewBag.RoomID = RoomID;
        //    LopHocDAO lhdao = new LopHocDAO();
        //    LopHocModel l = lhdao.GetById_LopHoc(ID_Lop);
        //    HocSinhDAO hsdap = new HocSinhDAO();
        //    List<HocSinhModel> lhs = hsdap.GetByLop_HocSinh(l.ID);
        //    ViewBag.ListHocSinh = lhs;
        //    ViewBag.TenLop = l.TenLop;
        //    ViewBag.TenGiaoVien = l.TenGiaoVien;
        //    ViewBag.ID_GiaoVien = l.GiaoVien;
        //    ViewBag.ID_User = ID_HocSinh > 0 ? ID_HocSinh : userinfor.ID;
        //    return View();
        //}

        //[SessionExpire]
        //public ActionResult DanhSachLopHocOnline(int ID_HocSinh)
        //{

        //    ViewBag.Title = "Lớp học trực tuyến";
        //    return View();
        //}

        //[HttpPost]
        //public ActionResult InitCallSession(CallSessionModel model)
        //{
        //    switch (model.hubname)
        //    {
        //        case "candidate_server":
        //            BoardcastHub.candidate_server(model.senderId, model.message);
        //            break;
        //        case "candidate_client":
        //            BoardcastHub.candidate_client(model.senderId, model.message);
        //            break;
        //        case "offer":
        //            BoardcastHub.offer(model.senderId, model.message);
        //            break;
        //        case "answer":
        //            BoardcastHub.answer(model.senderId, model.message);
        //            break;
        //        case "watcher":
        //            BoardcastHub.watcher(model.senderId);
        //            break;
        //        case "chat":
        //            BoardcastHub.chat(model.senderId, model.message);
        //            break;
        //    }
        //    CallSessionDAO dao = new CallSessionDAO();
        //    dao.InsertOrUpdate(model);
        //    return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        //}

        //[HttpGet]
        //public ActionResult GetCallSession()
        //{

        //    CallSessionDAO dao = new CallSessionDAO();

        //    return Json(dao.GetAllSession(), JsonRequestBehavior.AllowGet);
        //}

        //[SessionExpire]
        //public ActionResult OnlineClassTeacher()
        //{
        //    return View();
        //}

        //[SessionExpire]
        //public ActionResult OnlineClassStudent()
        //{
        //    return View();
        //}

        //[SessionExpire]
        //[HttpGet]
        //public ActionResult GetTwilio_AccessToken(string RoomName)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];            
        //    TaiKhoanDAO tk_dao = new TaiKhoanDAO();
        //    UserAppModel tk = tk_dao.GetAppUserInfoByName(string.IsNullOrWhiteSpace(userinfor.TaiKhoan) ? userinfor.TenDayDu : userinfor.TaiKhoan);
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var apiKey = ConfigurationManager.AppSettings["TwilioApiKey"];
        //    var apiSecret = ConfigurationManager.AppSettings["TwilioApiSecret"];

        //    // Create a random identity for the client
        //    //var identity = Request.QueryString["identity"] ?? "identity";
        //    string identity = tk.UserName;

        //    // Create a video grant for the token
        //    var grant = new VideoGrant();
        //    grant.Room = RoomName;
        //    var grants = new HashSet<IGrant> { grant };

        //    // Create an Access Token generator
        //    var token = new Token(accountSid, apiKey, apiSecret, identity: identity, grants: grants);

        //    return Json(new
        //    {
        //        token = token.ToJwt()
        //    }, JsonRequestBehavior.AllowGet);
        //}

        //[SessionExpire]
        //[HttpPost]
        //public ActionResult CreateRoom(int ID_Lop)
        //{
        //    LopHocDAO lhdao = new LopHocDAO();
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
        //    TwilioClient.Init(accountSid, authToken);
        //    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //    //ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072; //TLS 1.2
        //    try
        //    {
        //        RoomResource room = RoomResource.Create(enableTurn: true, type: RoomResource.RoomTypeEnum.Group, recordParticipantsOnConnect: true);
        //        int ID = lhdao.UpdateLive(ID_Lop, 1, room.Sid);
        //        if (ID > 0)
        //        {
        //            lhdao.Insert_LichSuLive(ID_Lop, room.Sid);
        //        }
        //        return Json(new { status = true, room = room }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message);
        //        return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //[SessionExpire]
        //[HttpPost]
        //public ActionResult CompleteRoom(int ID_Lop, string SID)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    LopHocDAO lhdao = new LopHocDAO();
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
        //    TwilioClient.Init(accountSid, authToken);
        //    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //    try
        //    {
        //        RoomResource room = RoomResource.Update(
        //            status: RoomResource.RoomStatusEnum.Completed,
        //            pathSid: SID
        //        );
        //        int ID = lhdao.UpdateLive(ID_Lop, 0, room.Sid);
        //        return Json(new { status = true, unique_name = room.Sid }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.Error(ex.Message);
        //        return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        //    }

        //}

        //[SessionExpire]
        //[HttpGet]
        //public ActionResult GetRoomInfo(string SID)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    LopHocDAO lhdao = new LopHocDAO();
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
        //    TwilioClient.Init(accountSid, authToken);
        //    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //    if (!string.IsNullOrWhiteSpace(SID))
        //    {
        //        try
        //        {
        //            RoomResource room = RoomResource.Fetch(
        //                pathSid: SID

        //            );
        //            return Json(new { status = true, room = room }, JsonRequestBehavior.AllowGet);
        //        }
        //        catch (Exception ex)
        //        {
        //            return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        //        }
        //    }
        //    else
        //    {
        //        return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        //    }
        //}


        //[SessionExpire]
        //[HttpGet]
        //public ActionResult GetRoom_Participants(string SID)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    LopHocDAO lhdao = new LopHocDAO();
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
        //    TwilioClient.Init(accountSid, authToken);
        //    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //    if (!string.IsNullOrWhiteSpace(SID))
        //    {
        //        try
        //        {
        //            ResourceSet<ParticipantResource> dis_participants = ParticipantResource.Read(
        //              SID, ParticipantResource.StatusEnum.Disconnected
        //              );
        //            ResourceSet<ParticipantResource> con_participants = ParticipantResource.Read(
        //             SID, ParticipantResource.StatusEnum.Connected
        //             );

        //            return Json(new { status = true, disconnect_participants = dis_participants, connect_participants = con_participants }, JsonRequestBehavior.AllowGet);
        //        }
        //        catch (Exception ex)
        //        {
        //            return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        //        }
        //    }
        //    else
        //    {
        //        return Json(new { status = false }, JsonRequestBehavior.AllowGet);
        //    }
        //}



        //[SessionExpire]
        //[HttpPost]
        //public ActionResult Teacher_JoinRoom(string Token)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    LopHocDAO lhdao = new LopHocDAO();
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
        //    TwilioClient.Init(accountSid, authToken);

        //    return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        //}

        //[SessionExpire]
        //[HttpPost]
        //public ActionResult Student_JoinRoom(int ID_HocSinh, string Token)
        //{
        //    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
        //    LopHocDAO lhdao = new LopHocDAO();
        //    var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
        //    var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
        //    TwilioClient.Init(accountSid, authToken);

        //    return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        //}

    }
}