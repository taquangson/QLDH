using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
namespace QLDH.Controllers
{
    public class LichHocController : Controller
    {
        // GET: LichHoc
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetLichHocByLop(int ID_Lop)
        {
            LichHocDAO lhdao = new LichHocDAO();
            return Json(lhdao.GetByLop(ID_Lop), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetLichTuan(string GioBatDau, string GioKetThuc)
        {
            LichHocDAO lhdao = new LichHocDAO();
            List<LichHocModel> lst = lhdao.GetAllTuanByCa(GioBatDau, GioKetThuc);
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<LopHocModel> lstLop = new LopHocDAO().GetByGiaoVien(userinfor.ID);
            if (userinfor.Role == 2)
            {
                lst = lst.Where(x => lstLop.Find(l => l.ID == x.ID_Lop) != null).ToList();
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
    }
}