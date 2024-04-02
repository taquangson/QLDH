using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class BienDongSoDuQuyController : Controller
    {
        // GET: BienDongSoDuQuy
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll(int ID_Quy)
        {
            BienDongSoDuQuyDAO db = new BienDongSoDuQuyDAO();
            List<BienDongSoDuQuyModel> bd = db.GetAll(ID_Quy);
            return Json(bd, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Insert(BienDongSoDuQuyModel model)
        {
            BienDongSoDuQuyDAO db = new BienDongSoDuQuyDAO();
            if (model != null)
            {
                if (db.Insert(model) != 0)
                {
                    return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);
                }                
            }
            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UpdateTrangThai(int TrangThai, int ID_PhieuThu, int ID_PhieuChi, int ID_PhieuCanQuy)
        {
            BienDongSoDuQuyDAO db = new BienDongSoDuQuyDAO();
            if (db.UpdateTrangThai(TrangThai, ID_PhieuThu, ID_PhieuChi, ID_PhieuCanQuy) != 0)
            {
                return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }
    }
}