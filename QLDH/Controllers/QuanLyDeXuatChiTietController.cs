using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
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
    public class QuanLyDeXuatChiTietController : Controller
    {
        [SessionExpire]
        [SessionAdminRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllDeXuatChiTiet(string ID_DeXuat)
        {
            QuanLyDeXuatChiTietDAO dxctDAO = new QuanLyDeXuatChiTietDAO();

            List<QuanLyDeXuatChiTietModels> dt = dxctDAO.GetAll(Int32.Parse(ID_DeXuat));
            return Json(dt, JsonRequestBehavior.AllowGet);
        }
    }

}