using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using FirebaseAdmin.Auth;
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
    public class QuanLyDeXuatController : Controller
    {
        // GET: QuanLyDeXuat
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllDeXuat()
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();
            QuanLyDeXuatChiTietDAO dxctDAO = new QuanLyDeXuatChiTietDAO();

            TaiKhoanModel userinfor = (TaiKhoanModel)Session["UserInfor"];
            List<QuanLyDeXuatModels> dt = dxDAO.GetAll(userinfor.ID);
            
            foreach (var list in dt){
                list.NguoiDuyet = dxDAO.GetAllUserDuyetTheoID(list.ID);
                list.ChiTiet = dxctDAO.GetAll(list.ID);
            }
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetNotInPhieuChi(int ID_DeXuat)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();
            return Json(dxDAO.GetNotIn_PhieuChi(ID_DeXuat), JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetByPhieuChi(int ID_PhieuChi)
        {
            QuanLyDeXuatChiTietDAO dxctDAO = new QuanLyDeXuatChiTietDAO();
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();
            List<QuanLyDeXuatModels> dt = dxDAO.GetByPhieuChi(ID_PhieuChi);
            foreach (var list in dt)
            {
                list.NguoiDuyet = dxDAO.GetAllUserDuyetTheoID(list.ID);
                list.ChiTiet = dxctDAO.GetAll(list.ID);
            }
            return Json(dt, JsonRequestBehavior.AllowGet);


        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();
            if (ID != null)
            {
                List<string> list = ID.Split(',').ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    if (dxDAO.Delete(Int32.Parse(list[i])) == 0)
                    {
                        return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult TrangThaiDuyet(string ID, int trangthai, string NoiDungDuyet)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)Session["UserInfor"];
            if (ID != null)
            {
                if (dxDAO.UpdateTrangThai(Int32.Parse(ID), trangthai, userinfor.ID, DateTime.Now, NoiDungDuyet) == 0)
                {
                    return Json(new { status = false, msg = "Phê duyệt thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { status = true, msg = "Phê duyệt thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Phê duyệt thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(QuanLyDeXuatModelsV2 model)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();
            QuanLyDeXuatChiTietDAO ctDAO = new QuanLyDeXuatChiTietDAO();


            TaiKhoanModel userinfor = (TaiKhoanModel)Session["UserInfor"];

            QuanLyDeXuatModels dexuat = new QuanLyDeXuatModels();


            if (model != null)
            {
                dexuat.ID = model.ID;
                dexuat.TenDeXuat = model.TenDeXuat;
                dexuat.ID_NguoiTao = userinfor.ID;
                dexuat.NgayTao = DateTime.Now;
                dexuat.ID_DinhMucChi = model.ID_DinhMucChi;
                dexuat.KhuVucSuDung = model.KhuVucSuDung;
                dexuat.ThoiGianKhauHao = model.ThoiGianKhauHao;
                dexuat.ThoiGianDuKienSuDung = model.ThoiGianDuKienSuDung;
                dexuat.TrangThaiDuyet = model.TrangThaiDuyet;
                dexuat.TongTien = model.TongTien;
                dexuat.NoiDung = model.NoiDung ?? "";
                dexuat.HinhThucPhanBo = model.HinhThucPhanBo;
                dexuat.ThoiGianPhanBo = model.ThoiGianPhanBo;

                int idVuaTao = dxDAO.CreateOrUpdate(dexuat);
                if (idVuaTao == 0)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
                else if (idVuaTao != -1)
                {
                    for (int i = 0; i < model.ChiTiet.Count; i++)
                    {
                        ctDAO.CreteOrUpdate(idVuaTao, model.ChiTiet[i]);
                    }
                    for (int i = 0; i < model.NguoiDuyet.Count; i++)
                    {
                        if (model.NguoiDuyet[i] > 0)
                        {
                            dxDAO.XetDuyet(idVuaTao, model.NguoiDuyet[i]);
                        }                      
                    }
                }
                else if (idVuaTao == 1)
                {
                    for (int i = 0; i < model.ChiTiet.Count; i++)
                    {
                        ctDAO.CreteOrUpdate(model.ID, model.ChiTiet[i]);
                    }
                }

                return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetNguoiDuyet(string ID_DeXuat)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();

            if (ID_DeXuat != null)
            {
                DataTable dt = dxDAO.GetNguoiDuyet(Int32.Parse(ID_DeXuat));
                if (dt == null)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }

                string ID_NguoiDuyet = "";
                foreach (DataRow row in dt.Rows)
                {
                    ID_NguoiDuyet += row["ID_NguoiDuyet"].ToString()+",";
                }
                
                return Json(new { status = true, msg = "Lưu thành công", data = ID_NguoiDuyet }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetNoiDungDuyetTheoID(string ID_NguoiDuyet, string ID_DeXuat)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();

            if (ID_DeXuat != null && ID_NguoiDuyet!= null)
            {
                QuanLyDeXuatXetDuyetModels dt = dxDAO.GetNoiDungDuyetTheoID(Int32.Parse(ID_NguoiDuyet), Int32.Parse(ID_DeXuat));
                if (dt == null)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
              
                return Json(new { status = true, msg = "Lưu thành công", data = dt }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetUserXetDuyetByID(string ID_DeXuat)
        {
            QuanLyDeXuatDAO dxDAO = new QuanLyDeXuatDAO();

            if (ID_DeXuat != null)
            {
                List<QuanLyDeXuatXetDuyetModels> dt = dxDAO.GetAllUserDuyetTheoID(Int32.Parse(ID_DeXuat));
                if (dt == null)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { status = true, msg = "Lưu thành công", data = dt }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }
    }

    public class QuanLyDeXuatModelsV2
    {
        public int ID { get; set; }
        public string MaDeXuat { get; set; }
        public string TenDeXuat { get; set; }
        public int ID_NguoiTao { get; set; }
        public string NguoiTao { get; set; }
        public int ID_DinhMucChi { get; set; }
        public DateTime NgayTao { get; set; }
        public int KhuVucSuDung { get; set; }
        public int ThoiGianKhauHao { get; set; }
        public int ThoiGianPhanBo { get; set; }
        public DateTime ThoiGianDuKienSuDung { get; set; }
        public string MaPhieuChi { get; set; }
        public int TrangThaiDuyet { get; set; }
        public float TongTien { get; set; }
        public string NoiDung { get; set; }
        public int HinhThucPhanBo { get; set; }

        public List<int> NguoiDuyet { get; set; }
        public List<QuanLyDeXuatChiTietModels> ChiTiet { get; set; }
    }
}