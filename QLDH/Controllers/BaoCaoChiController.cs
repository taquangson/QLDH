using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static QLDH.DataAccess.DAO.BaoCaoChiDAO;

namespace QLDH.Controllers
{
    public class BaoCaoChiController : Controller
    {
        // GET: BaoCaoChi
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoChiTieu()
        {
            return View();
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoChiTieu( DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoChiDAO().GetBaoCaoChiTieu(TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult BaoCaoChiTheoNhomChi()
        {
            return View();
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoChiTheoNhomChi_Date(DateTime TuNgay, DateTime DenNgay)
        {
            return Json(new BaoCaoChiDAO().GetBaoCaoChiTieuTheoNhomChi_Date(TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoChiTheoNhomChi_Month(int TuThang, int DenThang, int Nam)
        {
            return Json(new BaoCaoChiDAO().GetBaoCaoChiTieuTheoNhomChi_Month(TuThang, DenThang, Nam), JsonRequestBehavior.AllowGet);
        }
        [SessionExpire]
        public ActionResult BaoCaoDoanhThu()
        {
            return View();
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoThu_Date(DateTime TuNgay, DateTime DenNgay)
        {
            BaoCaoChiDAO bccdao = new BaoCaoChiDAO();
            decimal sotien = bccdao.GetTongTienThu_Date(TuNgay, DenNgay);
            if (sotien > 0)
            {

                return Json(new { status = true, msg = "Lấy dữ liệu thành công", data = sotien }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lấy dữ liệu thất bại, vui lòng liên hệ quản trị", data = 0 }, JsonRequestBehavior.AllowGet);
            }
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoThanhToan_Date(DateTime TuNgay, DateTime DenNgay)
        {
            BaoCaoChiDAO bccdao = new BaoCaoChiDAO();
            decimal sotien = bccdao.GetTongTienThanhToan_Date(TuNgay, DenNgay);
            if (sotien > 0)
            {

                return Json(new { status = true, msg = "Lấy dữ liệu thành công", data = sotien }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lấy dữ liệu thất bại, vui lòng liên hệ quản trị", data = 0 }, JsonRequestBehavior.AllowGet);
            }
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoThu_Month(int TuThang, int DenThang, int Nam)
        {
            BaoCaoChiDAO bccdao = new BaoCaoChiDAO();
            decimal sotien = bccdao.GetTongTienThu_Month(TuThang, DenThang, Nam);
            if (sotien > 0)
            {

                return Json(new { status = true, msg = "Lấy dữ liệu thành công", data = sotien }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lấy dữ liệu thất bại, vui lòng liên hệ quản trị", data = 0 }, JsonRequestBehavior.AllowGet);
            }
        }
        [SessionExpire]
        public ActionResult GetData_BaoCaoThanhToan_Month(int TuThang, int DenThang, int Nam)
        {
            BaoCaoChiDAO bccdao = new BaoCaoChiDAO();
            decimal sotien = bccdao.GetTongTienThanhToan_Month(TuThang, DenThang, Nam);
            if (sotien > 0)
            {

                return Json(new { status = true, msg = "Lấy dữ liệu thành công", data = sotien }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lấy dữ liệu thất bại, vui lòng liên hệ quản trị", data = 0 }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetData_BaoCaoDoanhThu_Year(int Nam)
        {
            return Json(new BaoCaoChiDAO().GetBaoCaoDoanhThu_Year(Nam), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetData_BieuDoDoanhThu_Year(int Nam)
        {
            return Json(new BaoCaoChiDAO().GetBieuDoDoanhThu_Year(Nam), JsonRequestBehavior.AllowGet);
        }
    }
}