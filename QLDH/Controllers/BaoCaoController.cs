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
    public class BaoCaoController : Controller
    {
        // GET: BaoCao
        public ActionResult Index()
        {
            return View();
        }
        [SessionExpire]
        [SessionAdminRole]
        public ActionResult ThongKeBuoiHocTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        public ActionResult BaoCaoPhieuHocTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult GetData_ThongKeBuoiHocTheoHocSinh(int ID_Lop, int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {            
            return Json(new BaoCaoDAO().ThongKeBuoiHocTheoHocSinh(ID_Lop, ID_HocSinh, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_ThongKePhieuHocTheoHocSinh(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoDAO().GetBaoCaoPhieuHocTheoHocSinh(ID_HocSinh, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_ThongKePhieuHocTheoHocSinhTheoThang(int ID_HocSinh, int Thang)
        {
            return Json(new BaoCaoDAO().GetBaoCaoPhieuHocTheoHocSinh_TheoThang(ID_HocSinh, Thang), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_ThongKeSoBuoiTheoHocSinhTheoThang(int ID_HocSinh, DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoDAO().GetBaoCaoSoBuoiHoc_HocSinh_Thang(ID_HocSinh, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }
    }
}