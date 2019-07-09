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
        [HttpGet]
        public ActionResult GetDSHocSinh_DiemDanh(int ID_Lop)
        {
            HocSinhDAO hsdao = new HocSinhDAO();
            List<HocSinhModel> lhs = new List<HocSinhModel>();
            lhs.AddRange(hsdao.GetByLop_HocSinh(ID_Lop));
            //lhs.AddRange(hsdao.GetByLop_HocSinh_HocDuoi(ID_Lop));
            DiemDanhDAO ddao = new DiemDanhDAO();
            foreach (HocSinhModel hs in lhs)
            {
                try
                {
                    DiemDanhModel dd = ddao.GetByHocSinh_Ngay(ID_Lop, hs.ID, DateTime.Now);
                    hs.ID_DiemDanh = dd.ID;
                    hs.CoPhep = dd.CoPhep;
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
            //SoDuBuoiHocDAO sddao = new SoDuBuoiHocDAO();
            PhieuHocDAO phd = new PhieuHocDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            d.ID_NhanVien = userinfor.ID;
            DiemDanhModel diemdanhcu = ddao.GetByHocSinh_Ngay(d.ID_Lop, d.ID_HocSinh, DateTime.Now);
            d.ID = diemdanhcu.ID;
            ddao.InsertOrUpdate(d);
            PhieuHocModel phmodel = phd.GetByHocSinh_Thang_Nam(d.ID_HocSinh, d.ID_Lop, DateTime.Now.Month, DateTime.Now.Year, d.HocDuoi);
            if (diemdanhcu.ID == 0)
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
            else
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
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);

        }
    }
}