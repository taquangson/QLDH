using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static QLDH.DataAccess.DAO.BaoCaoDAO;

namespace QLDH.Areas.FiveStar.Controllers
{
    public class FSHomeController : Controller
    {
        public class FSHomeModel
        {
            public TaiKhoanModel TaiKhoan { get; set; }
            public HocSinhModel HocSinh { get; set; }
            public List<LichHocModel> LichHoc { get; set; }
            public LichHocModel BuoiHocTruoc { get; set; }
        }
        public ActionResult Index()
        {
            TaiKhoanModel tk = (TaiKhoanModel)Session["UserInfor"];
            if (tk != null)
            {
                HocSinhModel hs = tk.lstHocSinh[0];
                LopHocDAO lhdao = new LopHocDAO();
                BaoCaoDAO ddao = new BaoCaoDAO();
                LichHocModel pre = new LichHocModel();
                List<LopHocModel> lstLop = lhdao.GetAll_ByHocSinh(hs.ID).Where(x => x.GoiHocPhi > 0).ToList();
                List<LichHocModel> lstLichHoc = new List<LichHocModel>();
                List<LichHocModel> lichhoc = new List<LichHocModel>();

                foreach (LopHocModel lop in lstLop)
                {
                    List<ThongKeBuoiHocTheoHocSinhModel> lstDiemDanh = ddao.ThongKeBuoiHocTheoHocSinh(lop.ID, hs.ID, new DateTime(2023, 1, 1), DateTime.Now);
                    List<BaiGiangModel> lstBaiGiang = new BaiGiangDAO().GetBaiGiangTrongChuongTrinh(lop.ID_ChuongTrinhGiangDay);
                    int i = 0;
                    foreach (LichHocModel l in lop.lstLichHoc)
                    {
                        for (DateTime d = DateTime.Now.Date; d < DateTime.Now.AddDays(6); d = d.AddDays(1))
                        {
                            if ((int)d.DayOfWeek == (l.Thu + 1))
                            {
                                int stt = lstDiemDanh.Count + i;
                                l.BaiGiang = lstBaiGiang[stt];
                                //l.BaiGiang.ChiTietBaiGiang = new List<ChiTietBaiGiangModel>();
                                //ChiTietBaiGiangModel chitietbg = new ChiTietBaiGiangModel();

                                //chitietbg.lstFlashCard = new FlashCardDAO().GetFlashCardByBaiGiang(l.BaiGiang.ID);
                                //chitietbg.lstCauHoi = new CauHoiDAO().GetCauHoiByBaiGiang(l.BaiGiang.ID);
                                //chitietbg.lstTroChoi = new TroChoiDAO().GetTroChoiByBaiGiang(l.BaiGiang.ID);

                                //l.BaiGiang.ChiTietBaiGiang.Add(chitietbg);
                                l.NgayHocDuKien = d;
                                lichhoc.Add(l);
                                i++;

                            }
                        }
                    }
                    lstLichHoc.AddRange(lop.lstLichHoc);
                    pre.BaiGiang = lstBaiGiang[lstDiemDanh.Count];
                }
                FSHomeModel model = new FSHomeModel();
                model.TaiKhoan = tk;
                model.HocSinh = hs;
                model.LichHoc = lichhoc;
                model.BuoiHocTruoc = pre;
                return View(model);
            }
            else
            {
                return RedirectToAction("Login","FSUser");
            }
        }
    }
}