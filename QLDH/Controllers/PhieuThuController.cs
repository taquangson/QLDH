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
    public class PhieuThuController : Controller
    {
        // GET: PhieuThu
        [SessionModeratorRole]
        public ActionResult Index()
        {
            return View();
        }

        [SessionModeratorRole]
        [HttpPost]
        public ActionResult CreateOrUpdate(PhieuThuModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuHocDAO phdao = new PhieuHocDAO();
            int ID_PhieuThu = model.ID;
            if (model.lstPhuThu == null)
            {
                model.lstPhuThu = new List<PhuThuGiamTruModel>();
            }
            if (model.lstGiamTru == null)
            {
                model.lstGiamTru = new List<PhuThuGiamTruModel>();
            }
            if (model.lstPhieuHoc == null)
            {
                model.lstPhieuHoc = new List<PhieuHocModel>();
            }
            if (model.ID == 0)
            {
                model.ID_NhanVien = userinfor.ID;
                model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                model.MaPhieu = "PTDH-" + DateTime.Now.ToString("yyyyMMddhhmmss");
                int idnew = ptdao.InsertOrUpdatePhieuThu(model);
                ID_PhieuThu = idnew;
                foreach (PhieuHocModel ph in model.lstPhieuHoc)
                {
                    ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                    ph.ID_NhanVien = userinfor.ID;
                    ph.ID_PhieuThu = idnew;
                    ph.NamHoc = DateTime.Now.Year;
                    int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, DateTime.Now.Year);
                    ph.SoBuoiDaHoc = count;
                    phdao.InsertOrUpdate(ph);
                }
                foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)
                {
                    phuthu.Type = 0;
                    phuthu.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(phuthu);
                }
                foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)
                {
                    giamtru.Type = 1;
                    giamtru.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(giamtru);
                }
            }
            else
            {
                model.Last_Update_User = userinfor.ID;
                int idnew = ptdao.InsertOrUpdatePhieuThu(model);
                List<PhieuHocModel> lstPhieuHocCu = phdao.GetByPhieuThu(idnew);// ds phiêu học cũ
                List<PhuThuGiamTruModel> lstPhuThuGiamTruCu = ptdao.GetAllPhuThuGiamTru_ByPhieuThu(idnew);// ds phụ thu giảm trừ cũ
                foreach (PhieuHocModel ph in lstPhieuHocCu) // Xóa phiếu học cũ ko có trong model mới
                {
                    if (model.lstPhieuHoc.Find(x => x.ID == ph.ID) == null)
                    {
                        phdao.DeletePhieuHoc(ph.ID);
                    }
                }
                foreach (PhieuHocModel ph in model.lstPhieuHoc)// Thêm lại ds phiếu học
                {
                    ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                    ph.ID_NhanVien = userinfor.ID;
                    ph.ID_PhieuThu = idnew;
                    ph.NamHoc = DateTime.Now.Year;
                    int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, DateTime.Now.Year);
                    ph.SoBuoiDaHoc = count;
                    phdao.InsertOrUpdate(ph);
                }
                foreach (PhuThuGiamTruModel ptgt in lstPhuThuGiamTruCu.Where(x => x.Type == 0).ToList()) // Xóa phụ thu giảm trừ ko có trong danh sách model mới
                {
                    if (model.lstPhuThu.Find(x => x.ID == ptgt.ID) == null)
                    {
                        ptdao.DeletePhuThuGiamTru(ptgt.ID);
                    }
                }

                foreach (PhuThuGiamTruModel ptgt in lstPhuThuGiamTruCu.Where(x => x.Type == 1).ToList()) // Xóa phụ thu giảm trừ ko có trong danh sách model mới
                {
                    if (model.lstGiamTru.Find(x => x.ID == ptgt.ID) == null)
                    {
                        ptdao.DeletePhuThuGiamTru(ptgt.ID);
                    }
                }
                foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)// Thêm lại ds phụ thu
                {
                    phuthu.Type = 0;
                    phuthu.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(phuthu);
                }
                foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)// Thêm lại ds giảm trừ
                {
                    giamtru.Type = 1;
                    giamtru.ID_PhieuThu = idnew;
                    ptdao.InsertOrUpdatePhuThuGiamTru(giamtru);
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
        }


        [SessionModeratorRole]
        public ActionResult GetbyHocSinh(int ID_HocSinh)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetAllByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        public class InPhieuModel
        {
            public PhieuThuModel PhieuThu { get; set; }
            public TaiKhoanModel TaiKhoan { get; set; }
        }

        [SessionModeratorRole]
        public ActionResult InPhieu(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ptdao.UpdatePrintPhieuThu(ID_PhieuThu, DateTime.Now, userinfor.ID);
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = userinfor;
            return View(model);
        }


    }
}