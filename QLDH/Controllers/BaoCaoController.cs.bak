using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static QLDH.DataAccess.DAO.BaoCaoDAO;

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
        public ActionResult ThongKeBuoiHocTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoPhieuHocTheoHocSinh()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoSoBuoiHocTheoGiaoVien()
        {
            return View();
        }


        [SessionExpire]
        public ActionResult BaoCaoDoanhThuBanPhieu()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BaoCaoHocSinhNoPhieu()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BieuDoDiem()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult BieuDoDiemTrungBinh_TheoLop()
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

        [SessionExpire]
        public ActionResult GetData_BaoCaoDoanhThu(int ID_NhanVien, DateTime TuNgay, DateTime DenNgay)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBaoCaoDoanhThu(userinfor.ID_ChiNhanh, ID_NhanVien, TuNgay, DenNgay), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BaoCaoNoPhieu(int Thang, int Nam)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBaoCaoNoPhieu(userinfor.ID_ChiNhanh, Thang, Nam), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BieuDoDiem(DateTime from, DateTime to, int ID_HocSinh, int ID_Lop)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBieuDoDiem(ID_Lop, ID_HocSinh, from, to), JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetData_BieuDoDiemTrungBinh_TheoLop(DateTime from, DateTime to, int ID_Lop)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return Json(new BaoCaoDAO().GetBieuDoDiemTrungBinh_TheoLop(ID_Lop, from, to), JsonRequestBehavior.AllowGet);
        }

        public class BaoCaoSoBuoiHocTheoGiaoVienData
        {
            public int ID_Lop { get; set; }
            public int ID_GiaoVien { get; set; }
            public DateTime TuNgay { get; set; }
            public DateTime DenNgay { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetData_BaoCaoSoBuoiHocTheoGiaoVien(BaoCaoSoBuoiHocTheoGiaoVienData model)
        {
            return Json(new BaoCaoDAO().GetData_ThongKeBuoiHocTheoGiaoVien(model.ID_Lop, model.ID_GiaoVien, model.TuNgay, model.DenNgay), JsonRequestBehavior.AllowGet);
        }
        public class DataSoBuoiHocTheoGiaoVien
        {
            public int ID_Lop { get; set; }
            public string TenLop { get; set; }
            public int TongSoBuoi { get; set; }
            public int TongSiSo { get; set; }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult GetDataGrid_BaoCaoSoBuoiHocTheoGiaoVien(BaoCaoSoBuoiHocTheoGiaoVienData model)
        {
            List<ThongKeBuoiHocTheoGiaoVienModel> data = new BaoCaoDAO().GetData_ThongKeBuoiHocTheoGiaoVien(model.ID_Lop, model.ID_GiaoVien, model.TuNgay, model.DenNgay);
            List<DataSoBuoiHocTheoGiaoVien> result = new List<DataSoBuoiHocTheoGiaoVien>();
            foreach(ThongKeBuoiHocTheoGiaoVienModel item in data)
            {
                if(result.Where(x => x.ID_Lop == item.ID_Lop).FirstOrDefault() == null)
                {
                    DataSoBuoiHocTheoGiaoVien d = new DataSoBuoiHocTheoGiaoVien();
                    d.TenLop = item.TenLop;
                    d.ID_Lop = item.ID_Lop;
                    d.TongSiSo = item.SiSo;
                    d.TongSoBuoi = 1;
                    result.Add(d);
                }
                else
                {
                    DataSoBuoiHocTheoGiaoVien d = result.Where(x => x.ID_Lop == item.ID_Lop).FirstOrDefault();
                    d.TongSoBuoi++;
                    d.TongSiSo += item.SiSo;
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SaveFile_BieuDoDiem(string contentType, string base64, string fileName)
        {
            byte[] fileContents = Convert.FromBase64String(base64);
            string filePath = AppDomain.CurrentDomain.BaseDirectory + @"Images\BaiKiemTra" + @"\" + fileName;
            System.IO.File.WriteAllBytes(filePath, fileContents);
            return RedirectToAction("BieuDoDiem");
            //return Json(filePath, JsonRequestBehavior.AllowGet);
        }

    }
}