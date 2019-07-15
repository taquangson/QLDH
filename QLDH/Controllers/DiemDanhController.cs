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
    public class DiemDanhController : Controller
    {
        [SessionExpire]
        // GET: DiemDanh
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [SessionAdminRole]
        // GET: DiemDanh
        public ActionResult QuanLyDuLieuDiemDanh()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetDSHocSinh_DiemDanh(int ID_Lop, int Ca)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<HocSinhModel> lhs = new List<HocSinhModel>();
            lhs.AddRange(hsdao.GetByLop_HocSinh(ID_Lop));
            DiemDanhDAO ddao = new DiemDanhDAO();
            DateTime batdau = DateTime.Now;
            DateTime ketthuc = DateTime.Now;
            DateTime quagiodiemdanh = DateTime.Now;
            int quagio = 1;
            switch (Ca)
            {
                case 1:
                    batdau = DateTime.Now.Date + new TimeSpan(7, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(9, 0, 0);
                    quagiodiemdanh = DateTime.Now.Date + new TimeSpan(7, 30, 0);
                    break;
                case 2:
                    batdau = DateTime.Now.Date + new TimeSpan(9, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(11, 0, 0);
                    quagiodiemdanh = DateTime.Now.Date + new TimeSpan(9, 30, 0);
                    break;
                case 3:
                    batdau = DateTime.Now.Date + new TimeSpan(14, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(16, 0, 0);
                    quagiodiemdanh = DateTime.Now.Date + new TimeSpan(14, 30, 0);
                    break;
                case 4:
                    batdau = DateTime.Now.Date + new TimeSpan(16, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(19, 0, 0);
                    quagiodiemdanh = DateTime.Now.Date + new TimeSpan(17, 30, 0);
                    break;
                case 5:
                    batdau = DateTime.Now.Date + new TimeSpan(19, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(21, 0, 0);
                    quagiodiemdanh = DateTime.Now.Date + new TimeSpan(19, 30, 0);
                    break;
            }
            if (DateTime.Compare(DateTime.Now, quagiodiemdanh) < 0 || userinfor.Role == 1)
            {
                quagio = 0;
            }
            foreach (HocSinhModel hs in lhs)
            {
                try
                {
                    DiemDanhModel dd = ddao.GetByHocSinh_NgayGio(ID_Lop, hs.ID, batdau, ketthuc);
                    hs.ID_DiemDanh = dd.ID;
                    hs.CoPhep = dd.CoPhep;
                    hs.QuaGioDiemDanh = quagio;
                }
                catch (Exception ex)
                {

                }

            }
            return Json(lhs, JsonRequestBehavior.AllowGet);
        }

        [SessionAdminRole]
        [HttpGet]
        public ActionResult GetDSHocSinh_DiemDanh_ByAdmin(int ID_Lop, int Ca, DateTime Ngay)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            List<HocSinhModel> lhs = new List<HocSinhModel>();
            lhs.AddRange(hsdao.GetByLop_HocSinh(ID_Lop));
            DiemDanhDAO ddao = new DiemDanhDAO();
            DateTime batdau = Ngay;
            DateTime ketthuc = Ngay;
            switch (Ca)
            {
                case 1:
                    batdau = Ngay.Date + new TimeSpan(7, 0, 0);
                    ketthuc = Ngay.Date + new TimeSpan(9, 0, 0);
                    break;
                case 2:
                    batdau = Ngay.Date + new TimeSpan(9, 0, 0);
                    ketthuc = Ngay.Date + new TimeSpan(11, 0, 0);
                    break;
                case 3:
                    batdau = Ngay.Date + new TimeSpan(14, 0, 0);
                    ketthuc = Ngay.Date + new TimeSpan(16, 0, 0);
                    break;
                case 4:
                    batdau = Ngay.Date + new TimeSpan(16, 0, 0);
                    ketthuc = Ngay.Date + new TimeSpan(19, 0, 0);
                    break;
                case 5:
                    batdau = Ngay.Date + new TimeSpan(19, 0, 0);
                    ketthuc = Ngay.Date + new TimeSpan(21, 0, 0);
                    break;
            }
            foreach (HocSinhModel hs in lhs)
            {
                try
                {
                    DiemDanhModel dd = ddao.GetByHocSinh_NgayGio(ID_Lop, hs.ID, batdau, ketthuc);
                    hs.ID_DiemDanh = dd.ID;
                    hs.CoPhep = dd.CoPhep;
                    hs.QuaGioDiemDanh = 0;
                }
                catch (Exception ex)
                {

                }

            }
            return Json(lhs, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult DiemDanhHocSinh(DiemDanhModel d)
        {
            DiemDanhDAO ddao = new DiemDanhDAO();
            DateTime batdau = DateTime.Now;
            DateTime ketthuc = DateTime.Now;
            switch (d.Ca)
            {
                case 1:
                    batdau = DateTime.Now.Date + new TimeSpan(7, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(9, 0, 0);
                    d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(8, 0, 0);
                    break;
                case 2:
                    batdau = DateTime.Now.Date + new TimeSpan(9, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(11, 0, 0);
                    d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(10, 0, 0);
                    break;
                case 3:
                    batdau = DateTime.Now.Date + new TimeSpan(14, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(16, 0, 0);
                    d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(15, 0, 0);
                    break;
                case 4:
                    batdau = DateTime.Now.Date + new TimeSpan(16, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(19, 0, 0);
                    d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(18, 0, 0);
                    break;
                case 5:
                    batdau = DateTime.Now.Date + new TimeSpan(19, 0, 0);
                    ketthuc = DateTime.Now.Date + new TimeSpan(21, 0, 0);
                    d.ThoiGianVaoLop = DateTime.Now.Date + new TimeSpan(20, 0, 0);
                    break;
            }
            if (DateTime.Compare(d.ThoiGianVaoLop, DateTime.Now) > 0)
            {
                d.ThoiGianVaoLop = DateTime.Now;
            }
            PhieuHocDAO phd = new PhieuHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            d.ID_NhanVien = userinfor.ID;
            DiemDanhModel diemdanhcu = ddao.GetByHocSinh_NgayGio(d.ID_Lop, d.ID_HocSinh, batdau, ketthuc);
            d.ID = diemdanhcu.ID;
            PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, DateTime.Now.Month, DateTime.Now.Year, d.HocDuoi);
            if (diemdanhcu.ID == 0)
            {
                if (ddao.InsertOrUpdate(d))
                {
                    if (d.CoPhep != 1)
                    {
                        if (phmodel.ID > 0)
                        {
                            phmodel.SoBuoiDaHoc++;
                            phd.InsertOrUpdate(phmodel);
                        }
                    }
                }                
            }
            else
            {
                if (diemdanhcu.CoPhep == d.CoPhep)
                {
                    if (ddao.Delete(diemdanhcu.ID))
                    {
                        if (diemdanhcu.CoPhep != 1)
                        {
                            if (phmodel.ID > 0)
                            {
                                phmodel.SoBuoiDaHoc--;
                                phd.InsertOrUpdate(phmodel);
                            }
                        }
                    }
                }
                else
                {
                    if (ddao.InsertOrUpdate(d))
                    {
                        if (d.CoPhep == 1)
                        {
                            if (diemdanhcu.CoPhep != 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc--;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                        else if (d.CoPhep != 1)
                        {
                            if (diemdanhcu.CoPhep == 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc++;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                    }
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);

        }

        [SessionAdminRole]
        [HttpPost]
        public ActionResult DiemDanhHocSinhByAdmin(DiemDanhModel d)
        {
            DiemDanhDAO ddao = new DiemDanhDAO();
            DateTime batdau = d.ThoiGianVaoLop;
            DateTime ketthuc = d.ThoiGianVaoLop;
            switch (d.Ca)
            {
                case 1:
                    batdau = d.ThoiGianVaoLop.Date + new TimeSpan(7, 0, 0);
                    ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(9, 0, 0);
                    d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(8, 0, 0);
                    break;
                case 2:
                    batdau = d.ThoiGianVaoLop.Date + new TimeSpan(9, 0, 0);
                    ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(11, 0, 0);
                    d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(10, 0, 0);
                    break;
                case 3:
                    batdau = d.ThoiGianVaoLop.Date + new TimeSpan(14, 0, 0);
                    ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(16, 0, 0);
                    d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(15, 0, 0);
                    break;
                case 4:
                    batdau = d.ThoiGianVaoLop.Date + new TimeSpan(16, 0, 0);
                    ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(19, 0, 0);
                    d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(18, 0, 0);
                    break;
                case 5:
                    batdau = d.ThoiGianVaoLop.Date + new TimeSpan(19, 0, 0);
                    ketthuc = d.ThoiGianVaoLop.Date + new TimeSpan(21, 0, 0);
                    d.ThoiGianVaoLop = d.ThoiGianVaoLop.Date + new TimeSpan(20, 0, 0);
                    break;
            }
            PhieuHocDAO phd = new PhieuHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            d.ID_NhanVien = userinfor.ID;
            DiemDanhModel diemdanhcu = ddao.GetByHocSinh_NgayGio(d.ID_Lop, d.ID_HocSinh, batdau, ketthuc);
            d.ID = diemdanhcu.ID;
            PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, d.ThoiGianVaoLop.Month, d.ThoiGianVaoLop.Year, d.HocDuoi);
            if (diemdanhcu.ID == 0)
            {
                if (ddao.InsertOrUpdate(d))
                {
                    if (d.CoPhep != 1)
                    {
                        if (phmodel.ID > 0)
                        {
                            phmodel.SoBuoiDaHoc++;
                            phd.InsertOrUpdate(phmodel);
                        }
                    }
                }
            }
            else
            {
                if (diemdanhcu.CoPhep == d.CoPhep)
                {
                    if (ddao.Delete(diemdanhcu.ID))
                    {
                        if (diemdanhcu.CoPhep != 1)
                        {
                            if (phmodel.ID > 0)
                            {
                                phmodel.SoBuoiDaHoc--;
                                phd.InsertOrUpdate(phmodel);
                            }
                        }
                    }
                }
                else
                {
                    if (ddao.InsertOrUpdate(d))
                    {
                        if (d.CoPhep == 1)
                        {
                            if (diemdanhcu.CoPhep != 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc--;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                        else if (d.CoPhep != 1)
                        {
                            if (diemdanhcu.CoPhep == 1)
                            {
                                if (phmodel.ID > 0)
                                {
                                    phmodel.SoBuoiDaHoc++;
                                    phd.InsertOrUpdate(phmodel);
                                }
                            }
                        }
                    }
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);

        }
    }
}