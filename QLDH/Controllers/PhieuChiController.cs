using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class PhieuChiController : Controller
    {
        // GET: PhieuChi
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            PhieuChiDAO dmncdao = new PhieuChiDAO();
            return Json(dmncdao.GetAll_PhieuChi(), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllByThang(DateTime FromDate, DateTime ToDate)
        {
            PhieuChiDAO dmncdao = new PhieuChiDAO();
            ChiPhiDAO cpdao = new ChiPhiDAO();
            List<PhieuChiModel> pc = dmncdao.GetAllByThang_PhieuChi(FromDate, ToDate);
            foreach (var list in pc)
            {
                list.lstChiPhi = cpdao.GetByIdPhieuChi(list.ID);
            }
            return Json(pc, JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetChiPhiByPhieu(int ID_PhieuChi)
        {
            ChiPhiDAO cpdao = new ChiPhiDAO();
            return Json(cpdao.GetByIdPhieuChi(ID_PhieuChi), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetChiPhiByDeXuat(int ID_PhieuChi)
        {
            QuanLyDeXuatChiTietDAO dxdao = new QuanLyDeXuatChiTietDAO();
            return Json(dxdao.GetAll(ID_PhieuChi), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(PhieuChiModel model)
        {
            PhieuChiDAO dmncdao = new PhieuChiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)Session["UserInfor"];

            int newid = dmncdao.InsertOrUpdate(model, userinfor);
            if (newid > 0)
            {
                ChiPhiDAO cpdao = new ChiPhiDAO();
                BienDongSoDuQuyDAO bdDAO = new BienDongSoDuQuyDAO();               
                try
                {
                    //Insert biến động số dư
                    BienDongSoDuQuyModel bdModel = new BienDongSoDuQuyModel();
                    bdModel.ID_Quy = model.HinhThuc; ;
                    bdModel.Type = 0;
                    bdModel.TrangThai = -1;
                    bdModel.SoTien = model.SoTien;
                    bdModel.ID_PhieuChi = newid;
                    bdModel.NgayTao = DateTime.Now;

                    bdDAO.Insert(bdModel);

                    if (model.lstChiPhi != null)
                    {
                        //Xóa phí không trong danh sách
                        List<ChiPhiModel> lstChiPhiCu = cpdao.GetByIdPhieuChi(newid);
                        List<ChiPhiModel> lstChiPhiMoi = model.lstChiPhi;
                        foreach (ChiPhiModel l in lstChiPhiCu.Except(lstChiPhiMoi.ToList(), new ChiPhiComparer()))
                        {
                            cpdao.Delete(l.ID);
                        }

                        //Thêm, sửa phí trong danh sách
                        foreach (ChiPhiModel p in model.lstChiPhi)
                        {
                            p.ID_PhieuChi = newid;
                            cpdao.InsertOrUpdate(p);
                        }
                    }
                    else
                    {
                        List<ChiPhiModel> lstChiPhiCu = cpdao.GetByIdPhieuChi(newid);
                        foreach (ChiPhiModel p in lstChiPhiCu)
                        {
                            cpdao.Delete(p.ID);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Json(new { status = true, msg = "Lưu dữ liệu thành công, chưa lưu được chi phí!" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        internal class ChiPhiComparer : IEqualityComparer<ChiPhiModel>
        {
            public bool Equals(ChiPhiModel x, ChiPhiModel y)
            {
                if (x.ID == y.ID)
                {
                    return true;
                }
                return false;
            }

            public int GetHashCode(ChiPhiModel obj)
            {
                return obj.ID.GetHashCode();
            }
        }

        [SessionModeratorRole]
        public ActionResult InPhieu(int ID_PhieuChi)
        {
            PhieuChiDAO ptdao = new PhieuChiDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            PhieuChiModel model = ptdao.GetById(ID_PhieuChi);
            return View(model);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            PhieuChiDAO dmncdao = new PhieuChiDAO();
            if (dmncdao.Delete(ID))
            {
                BienDongSoDuQuyDAO bdDAO = new BienDongSoDuQuyDAO();
                bdDAO.UpdateTrangThai(0, 0, int.Parse(ID), 0);
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}