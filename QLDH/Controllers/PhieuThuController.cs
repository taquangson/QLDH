using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using QLDH.Helper;
using System;
using System.Collections.Generic;
using System.IO;
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
        public ActionResult Index2()
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
            PhieuThu_CTSPDAO pt_CTSPDAO = new PhieuThu_CTSPDAO();
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
            if (model.lstSanPham == null)
            {
                model.lstSanPham = new List<PhieuThu_CTSPModel>();
            }
            if (model.ID == 0)
            {
                model.ID_NhanVien = userinfor.ID;
                model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                model.MaPhieu = "PTDH-" + DateTime.Now.ToString("yyyyMMddhhmmss");
                int idnew = ptdao.InsertOrUpdatePhieuThu(model);
                if (idnew > 0)
                {
                    ID_PhieuThu = idnew;
                    foreach (PhieuHocModel ph in model.lstPhieuHoc)
                    {
                        int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, ph.NamHoc);
                        if (count > 0)
                        {
                            PhieuHocModel p = new PhieuHocModel();
                            p.SoBuoi = ph.SoBuoi;
                            p.SoTien = ph.SoTien;
                            p.GhiChu = ph.GhiChu;
                            p.ID_HocSinh = ph.ID_HocSinh;
                            p.ID_Lop = ph.ID_Lop;
                            p.Thang = ph.Thang;
                            p.NamHoc = ph.NamHoc;
                            p.HocDuoi = ph.HocDuoi;
                            p.SoBuoiDaHoc = count;
                            if (p.ID_PhieuThu == 0)
                            {
                                p.ID_PhieuThu = ID_PhieuThu;
                            }
                            phdao.InsertOrUpdate_PhieuThu_CTPH(p);
                        }
                        else
                        {
                            ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                            ph.ID_NhanVien = userinfor.ID;
                            ph.ID_PhieuThu = idnew;
                            ph.SoBuoiDaHoc = count;
                            phdao.InsertOrUpdate_PhieuThu_CTPH(ph);
                        }


                    }
                    foreach (PhieuThu_CTSPModel ptct in model.lstSanPham)
                    {
                        ptct.ID_PhieuThu = ID_PhieuThu;
                        pt_CTSPDAO.InsertOrUpdate(ptct);
                    }
                    foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)
                    {
                        int ID_PhieuHoc = 0;
                        if (phuthu.ID_Lop > 0)
                        {

                            PhieuHocModel p = new PhieuHocModel();
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 0);
                            if (p.ID != 0)
                            {

                            }
                            else
                            {
                                p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 1);
                            }
                            if (p.ID != 0)
                            {
                                p.SoBuoi += phuthu.SoBuoi;
                                phdao.InsertOrUpdate(p);
                            }
                            else
                            {
                                p.ID_HocSinh = model.ID_HocSinh;
                                p.HocDuoi = 0;
                                p.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                                p.ID_Lop = phuthu.ID_Lop;
                                p.ID_PhieuThu = idnew;
                                p.SoBuoi = phuthu.SoBuoi;
                                p.SoTien = phuthu.DonGia;
                                p.Thang = phuthu.Thang;
                                p.NamHoc = phuthu.Nam;
                                p.SoBuoiDaHoc = p.SoBuoi;
                                p.ID_NhanVien = userinfor.ID;
                                ID_PhieuHoc = phdao.InsertOrUpdate(p);
                            }
                        }

                        phuthu.Type = 0;
                        phuthu.ID_PhieuThu = idnew;
                        ptdao.InsertOrUpdatePhuThuGiamTru(phuthu);


                    }
                    foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)
                    {
                        PhieuHocModel p = new PhieuHocModel();
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 0);
                        if (p.ID != 0)
                        {

                        }
                        else
                        {
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 1);
                        }
                        giamtru.ID_PhieuHoc = p.ID;
                        giamtru.Type = 1;
                        giamtru.ID_PhieuThu = idnew;
                        ptdao.InsertOrUpdatePhuThuGiamTru(giamtru);
                    }
                }
                else
                {
                    return Json(new { status = false, msg = "Lưu dữ liệu không thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                model.Last_Update_User = userinfor.ID;
                int idnew = ptdao.InsertOrUpdatePhieuThu(model);
                if (idnew > 0)
                {
                    List<PhieuHocModel> lstPhieuHocCu = phdao.GetCTPHByPhieuThu(idnew);// ds phiêu học cũ
                    List<PhuThuGiamTruModel> lstPhuThuGiamTruCu = ptdao.GetAllPhuThuGiamTru_ByPhieuThu(idnew);// ds phụ thu giảm trừ cũ
                    foreach (PhieuHocModel ph in lstPhieuHocCu) // Xóa phiếu học cũ ko có trong model mới
                    {
                        if (model.lstPhieuHoc.Find(x => x.ID == ph.ID) == null)
                        {
                            phdao.DeletePhieuThu_CTPH(ph.ID);
                        }
                    }
                    List<PhieuThu_CTSPModel> pt_CTSPInDB = pt_CTSPDAO.GetByIDPhieuThu(model.ID);
                    foreach (PhieuThu_CTSPModel ptct in pt_CTSPInDB)
                    {
                        pt_CTSPDAO.Delete(ptct.ID);
                    }
                    foreach (PhieuThu_CTSPModel ptct in model.lstSanPham)
                    {
                        ptct.ID_PhieuThu = idnew;
                        pt_CTSPDAO.InsertOrUpdate(ptct);
                    }
                    foreach (PhieuHocModel ph in model.lstPhieuHoc)// Thêm lại ds phiếu học
                    {
                        ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                        ph.ID_NhanVien = userinfor.ID;
                        ph.ID_PhieuThu = idnew;
                        int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, ph.NamHoc);
                        ph.SoBuoiDaHoc = count;
                        phdao.InsertOrUpdate_PhieuThu_CTPH(ph);
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
                        if (phuthu.ID_PhieuHoc == 0 && phuthu.ID_Lop > 0)
                        {

                            PhieuHocModel p = new PhieuHocModel();
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 0);
                            if (p.ID != 0)
                            {

                            }
                            else
                            {
                                p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, phuthu.ID_Lop, phuthu.Thang, phuthu.Nam, 1);
                            }
                            if (p.ID != 0)
                            {
                                p.ID_PhieuThu = idnew;
                                phuthu.ID_PhieuHoc = phdao.InsertOrUpdate_PhieuThu_CTPH(p);
                            }
                        }
                        phuthu.Type = 0;
                        phuthu.ID_PhieuThu = idnew;
                        ptdao.InsertOrUpdatePhuThuGiamTru(phuthu);

                    }

                    foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)// Thêm lại ds giảm trừ
                    {
                        if (giamtru.ID_PhieuHoc == 0)
                        {
                            PhieuHocModel p = new PhieuHocModel();
                            p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 0);
                            if (p.ID != 0)
                            {

                            }
                            else
                            {
                                p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 1);
                            }
                            giamtru.ID_PhieuHoc = p.ID;
                        }
                        giamtru.Type = 1;
                        giamtru.ID_PhieuThu = idnew;
                        ptdao.InsertOrUpdatePhuThuGiamTru(giamtru);
                    }
                }
                else
                {
                    return Json(new { status = false, msg = "Lưu dữ liệu không thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
        }


        [SessionModeratorRole]
        [HttpPost]
        public ActionResult CreateOrUpdate_Temp(PhieuThuModel model)
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



            model.ID_NhanVien = userinfor.ID;
            model.ID_ChiNhanh = userinfor.ID_ChiNhanh;
            model.MaPhieu = "PTDHTT-" + DateTime.Now.ToString("yyyyMMddhhmmss");
            int idnew = ptdao.InsertOrUpdatePhieuThuTemp(model);
            ID_PhieuThu = idnew;
            foreach (PhieuHocModel ph in model.lstPhieuHoc)
            {
                ph.ID_ChiNhanh = userinfor.ID_ChiNhanh;
                ph.ID_NhanVien = userinfor.ID;
                ph.ID_PhieuThu = idnew;
                ph.NamHoc = ph.NamHoc;
                int count = phdao.CountBuoiHocTrongThang(ph.ID_HocSinh, ph.ID_Lop, ph.Thang, ph.NamHoc);
                ph.SoBuoiDaHoc = count;
                phdao.InsertOrUpdateTemp(ph);
            }
            foreach (PhuThuGiamTruModel phuthu in model.lstPhuThu)
            {
                phuthu.Type = 0;
                phuthu.ID_PhieuThu = idnew;
                ptdao.InsertOrUpdatePhuThuGiamTruTemp(phuthu);
            }
            foreach (PhuThuGiamTruModel giamtru in model.lstGiamTru)
            {
                if (giamtru.ID_PhieuHoc == 0)
                {
                    PhieuHocModel p = new PhieuHocModel();
                    p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 0);
                    if (p.ID != 0)
                    {

                    }
                    else
                    {
                        p = phdao.GetByHocSinh_Thang_Nam(model.ID_HocSinh, giamtru.ID_Lop, giamtru.Thang, giamtru.Nam, 1);
                    }
                    giamtru.ID_PhieuHoc = p.ID;
                }
                giamtru.Type = 1;
                giamtru.ID_PhieuThu = idnew;
                ptdao.InsertOrUpdatePhuThuGiamTruTemp(giamtru);
            }



            return Json(new { status = true, msg = "Lưu dữ liệu tạm tính thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
        }


        [SessionModeratorRole]
        public ActionResult GetbyHocSinh(int ID_HocSinh)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetAllByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }


        [SessionModeratorRole]
        public ActionResult GetByPhieuHoc(int ID_PhieuHoc)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetByPhieuHoc(ID_PhieuHoc), JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        public ActionResult GetTempbyHocSinh(int ID_HocSinh)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetAllTempByHocSinh(ID_HocSinh), JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        public ActionResult GetTempbyID(int ID)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetTempById(ID), JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        public ActionResult GetByID(int ID)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            return Json(ptdao.GetById(ID), JsonRequestBehavior.AllowGet);
        }

        public class InPhieuModel
        {
            public PhieuThuModel PhieuThu { get; set; }
            public TaiKhoanModel TaiKhoan { get; set; }
            public HocSinhModel HocSinh { get; set; }
            public List<LichSuThanhToanModel> ThanhToan { get; set; }
        }

        [SessionModeratorRole]
        public ActionResult InPhieu(int ID_PhieuThu, int GuiEmail)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];          
            //ptdao.UpdatePrintPhieuThu(ID_PhieuThu, DateTime.Now, userinfor.ID);
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = userinfor;
            return View(model);
        }


        [SessionModeratorRole]
        public ActionResult ViewPhieu(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            TaiKhoanDAO tkdao = new TaiKhoanDAO();
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = tkdao.GetById(pt.ID_NhanVien);
            HocSinhDAO hsdao = new HocSinhDAO();
            HocSinhModel tk = hsdao.GetById(pt.ID_HocSinh);
            model.HocSinh = tk;
            return View("InPhieu", model);
        }

        [SessionModeratorRole]
        public ActionResult InPhieuTamTinh(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            //PhieuThuModel pt = ptdao.GetTempById(ID_PhieuTamTinh);
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);

            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = userinfor;
            HocSinhDAO tkdao = new HocSinhDAO();
            HocSinhModel tk = tkdao.GetById(pt.ID_HocSinh);
            model.HocSinh = tk;
            if (!string.IsNullOrWhiteSpace(tk.Email))
            {
                var html = RazorViewToString.RenderRazorViewToString(this, "InPhieuTamTinh", model);
                EmailHelper helper = new EmailHelper();
                helper.SendEmail(html.ToString(), tk.Email, "Mầm non JUDO PRESCHOOL thông báo học phí!");
                LichSuGuiEmailDAO emaildao = new LichSuGuiEmailDAO();
                LichSuGuiEmailModel e = new LichSuGuiEmailModel();
                e.ID_PhieuThu = ID_PhieuThu;
                e.NoiDung = html.ToString();
                e.TieuDe = "Mầm non JUDO PRESCHOOL thông báo học phí!";
                e.NguoiNhan = tk.Email;
                emaildao.Insert(e);
            }
            return View(model);
        }

        [SessionModeratorRole]
        public ActionResult ThanhToan(LichSuThanhToanModel model)
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            LichSuThanhToanDAO tkdao = new LichSuThanhToanDAO();
            BienDongSoDuQuyDAO bdDAO = new BienDongSoDuQuyDAO();
            PhieuThuDAO ptDAO = new PhieuThuDAO();
            model.ID_NhanVien = userinfor.ID;
            int ID_PhieuThu = tkdao.Insert(model);
            if (ID_PhieuThu > 0)
            {
                //Insert biến động số dư
                BienDongSoDuQuyModel bdModel = new BienDongSoDuQuyModel();
                if (model.TongTien > 0)
                {
                    bdModel.ID_Quy = model.HinhThucThanhToan;
                    bdModel.Type = 1;
                    bdModel.TrangThai = 1;
                    bdModel.SoTien = model.TongTien;
                    bdModel.ID_PhieuThu = ID_PhieuThu;
                    bdModel.NgayTao = DateTime.Now;
                }
                else if (model.TongTien < 0)
                {
                    bdModel.ID_Quy = model.HinhThucThanhToan;
                    bdModel.Type = -1;
                    bdModel.TrangThai = 1;
                    bdModel.SoTien = model.TongTien;
                    bdModel.ID_PhieuThu = ID_PhieuThu;
                    bdModel.NgayTao = DateTime.Now;
                }
                bdDAO.Insert(bdModel);

                //insert BienDongSoDuTaiKhoan
                BienDongSoDuTaiKhoanDAO bdtkDAO = new BienDongSoDuTaiKhoanDAO();
                BienDongSoDuTaiKhoanModel bdtk = new BienDongSoDuTaiKhoanModel();
                PhieuThuModel pt = ptDAO.GetById(ID_PhieuThu);
                HocSinhDAO hsDAO = new HocSinhDAO();
                HocSinhModel hs = hsDAO.GetById(pt.ID_HocSinh);

                if (model.TongTien < 0 && model.HinhThucThanhToan != 0)
                {
                    bdtk.ID = 0;
                    bdtk.ID_TaiKhoan = hs.ID_KhachHang;
                    bdtk.LoaiBienDong = 1;
                    bdtk.KieuBienDong = 1;
                    bdtk.ID_PhieuThu = ID_PhieuThu;
                    bdtk.ID_PhieuHoc = 0;
                    bdtk.ID_PhuThuGiamTru = 0;
                    bdtk.ID_LenhRutTien = 0;
                    bdtk.SoTien = model.TongTien;
                    bdtk.TrangThai = 1;
                    bdtk.GhiChu = "";
                    bdtk.NgayTao = DateTime.Now;
                }
                else if (model.TongTien > 0 && model.HinhThucThanhToan != 0)
                {
                    bdtk.ID = 0;
                    bdtk.ID_TaiKhoan = hs.ID_KhachHang;
                    bdtk.LoaiBienDong = -1;
                    bdtk.KieuBienDong = 1;
                    bdtk.ID_PhieuThu = ID_PhieuThu;
                    bdtk.ID_PhieuHoc = 0;
                    bdtk.ID_PhuThuGiamTru = 0;
                    bdtk.ID_LenhRutTien = 0;
                    bdtk.SoTien = model.TongTien;
                    bdtk.TrangThai = 1;
                    bdtk.GhiChu = "";
                    bdtk.NgayTao = DateTime.Now;
                }

                bdtkDAO.Insert(bdtk);

                return Json(new { status = true, msg = "Lưu thông tin thanh toán thành công", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu thông tin thanh toán thất bại, vui lòng thử lại", ID_Phieu = ID_PhieuThu }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionModeratorRole]
        public ActionResult UpdatePhanBoThanhToan(PhieuThuModel model)
        {
            PhieuHocDAO phdao = new PhieuHocDAO();
            PhieuThu_CTSPDAO pt_ctspdao = new PhieuThu_CTSPDAO();
            foreach (PhieuHocModel ph in model.lstPhieuHoc)
            {
                phdao.InsertOrUpdate_PhieuThu_CTPH(ph);
            }
            foreach (PhieuThu_CTSPModel sp in model.lstSanPham)
            {
                pt_ctspdao.InsertOrUpdate(sp);
            }
            return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        [SessionModeratorRole]
        public ActionResult GetThanhToanByPhieuThu(int ID_PhieuThu)
        {
            LichSuThanhToanDAO tkdao = new LichSuThanhToanDAO();
            return Json(tkdao.GetByPhieuThu(ID_PhieuThu), JsonRequestBehavior.AllowGet);

        }



        [AllowAnonymous]
        public ActionResult ThongBaoHocPhi(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = new TaiKhoanDAO().GetById(pt.ID_NhanVien);
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ThongBaoHocPhiTD(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = new TaiKhoanDAO().GetById(pt.ID_NhanVien);
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ThongBaoDaNopHocPhi(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = new TaiKhoanDAO().GetById(pt.ID_NhanVien);
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ThongBaoDaNopHocPhiASE(int ID_PhieuThu)
        {
            PhieuThuDAO ptdao = new PhieuThuDAO();
            PhieuThuModel pt = ptdao.GetById(ID_PhieuThu);
            InPhieuModel model = new InPhieuModel();
            model.PhieuThu = pt;
            model.TaiKhoan = new TaiKhoanDAO().GetById(pt.ID_NhanVien);
            model.ThanhToan = new LichSuThanhToanDAO().GetByPhieuThu(pt.ID);
            return View(model);
        }


    }
}