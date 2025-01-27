using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using QLDH.Helper;
using Microsoft.Office.Interop.Excel;
using System.Collections.Generic;
using System.Web.Mvc;
using static QLDH.Controllers.PhieuThuController;

namespace QLDH.Controllers
{
    public class KhachHangController: Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllKhachHang()
        {
            KhachHangDAO khachHangDAO = new KhachHangDAO();
            List<KhachHangModel> dt = khachHangDAO.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetKhachHangById(int id)
        {
            KhachHangDAO khachHangDAO = new KhachHangDAO();
            KhachHangModel dt = khachHangDAO.GetByID(id);
            return Json(dt, JsonRequestBehavior.AllowGet);

        }

        [SessionExpire]
        [HttpPost]
        public ActionResult InsertOrUpdateKhachHang(KhachHangModel kh)
        {
            KhachHangDAO khachHangDAO = new KhachHangDAO();
            int check_row = khachHangDAO.InsertOrUpdate(kh);
            if (kh.ID == 0)
            {
                if (!string.IsNullOrWhiteSpace(kh.Email))
                {
                    TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
                    InTaiKhoanModel model = new InTaiKhoanModel();
                    model.KhachHang = kh;
                    model.TaiKhoan = userinfor;
                    var html = RazorViewToString.RenderRazorViewToString(this, "TaoTaiKhoan", model);
                    EmailHelper helper = new EmailHelper();
                    helper.SendEmail(html.ToString(), kh.Email, "Thông báo xác nhận đã tạo tài khoản!");
                }
            }
            return Json(check_row, JsonRequestBehavior.AllowGet);
        }

        public class InTaiKhoanModel
        {
            public KhachHangModel KhachHang { get; set; }
            public TaiKhoanModel TaiKhoan { get; set; }
        }

        public ActionResult TaoTaiKhoan(int ID)
        {
            KhachHangDAO khachHangDAO = new KhachHangDAO();
            KhachHangModel kh = khachHangDAO.GetByID(ID);
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            InTaiKhoanModel model = new InTaiKhoanModel();
            model.KhachHang = kh;
            model.TaiKhoan = userinfor;
            return View(model);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult DeleteKhachHang(string id)
        {
            KhachHangDAO khachHangDAO = new KhachHangDAO();
            bool check = khachHangDAO.Delete(int.Parse(id));
            return Json("trạng thái xóa khách hàng: " + check, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UpdateMatKhauKhachHang(KhachHangModel kh)
        {
            KhachHangDAO khachHangDAO = new KhachHangDAO();
            bool check = khachHangDAO.UpdateMatKhau(kh);
            KhachHangModel khInDB = khachHangDAO.GetByID(kh.ID);
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            InTaiKhoanModel model = new InTaiKhoanModel();
            model.KhachHang = khInDB;
            model.TaiKhoan = userinfor;
            if (!string.IsNullOrWhiteSpace(khInDB.Email))
            {
                var html = RazorViewToString.RenderRazorViewToString(this, "ThongBaoDaDoiMatKhau", model);
                EmailHelper helper = new EmailHelper();
                helper.SendEmail(html.ToString(), khInDB.Email, "Thông báo xác nhận đã đổi mật khẩu!");
            }
            if (check)
            {
                return Json("Đổi mật khẩu thành công", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Đổi mật khẩu thất bại, liên hệ với bên kĩ thuật để khắc phục sự cố", JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public ActionResult ThongBaoDaDoiMatKhau(int ID)
        {
            KhachHangDAO khdao = new KhachHangDAO();
            TaiKhoanDAO tkdao = new TaiKhoanDAO();
            InTaiKhoanModel model = new InTaiKhoanModel();
            model.KhachHang = khdao.GetByID(ID);
            model.TaiKhoan = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            return View(model);
        }
    }
}