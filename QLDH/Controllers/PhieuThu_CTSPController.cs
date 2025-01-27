using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class PhieuThu_CTSPController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllPhieuThu_CTSP()
        {
            PhieuThu_CTSPDAO pt_CTSPDAO = new PhieuThu_CTSPDAO();
            List<PhieuThu_CTSPModel> dt = pt_CTSPDAO.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetSanPhamByIdPhieuThu(int ID_PhieuChi)
        {
            PhieuThu_CTSPDAO pt_CTSPDAO = new PhieuThu_CTSPDAO();
            List<PhieuThu_CTSPModel> dt = pt_CTSPDAO.GetByIDPhieuThu(ID_PhieuChi);
            return Json(dt, JsonRequestBehavior.AllowGet);

        }
    }
}