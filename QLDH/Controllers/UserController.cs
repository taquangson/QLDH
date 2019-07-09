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
    public class UserController : Controller
    {
        [SessionExpire]
        [SessionAdminRole]
        public ActionResult Index()
        {
            return View();
        }
        // GET: User
        public ActionResult Login()
        {
            if (TempData["Error"] != null)
            {
                ViewBag.Error = TempData["Error"].ToString();
            }
            else
            {
                ViewBag.Error = "";
            }
            return View();
        }

        public ActionResult LogOff()
        {
            Session["UserInfor"] = null;
            return RedirectToAction("Login", "User");
        }

        public ActionResult UserLogin(LoginModel model)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (tk_dao.CheckLogin(model.UserName, model.Password))
            {
                Session["UserInfor"] = tk_dao.GetByTenTaiKhoanOrEmail(model.UserName);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                TempData["Error"] = "Tài khoản hoặc mật khẩu không đúng";
                return RedirectToAction("Login", "User");
            }

        }

        [SessionExpire]
        public ActionResult GetAllUser()
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            List<TaiKhoanModel> result = tk_dao.GetAll();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetUserById(int ID)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            TaiKhoanModel result = tk_dao.GetById(ID);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(TaiKhoanModel model)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (model.ID > 0)
            {
                TaiKhoanModel item = tk_dao.GetById(model.ID);
                item.TenDayDu = model.TenDayDu;
                item.Email = model.Email;
                item.DiaChi = model.DiaChi;
                item.DienThoai = model.DienThoai;
                if (tk_dao.GetByTenTaiKhoanOrEmail(item.Email).ID != item.ID)
                {
                    return Json(new { status = false, msg = "Email đã được sử dụng cho tài khoản khác" }, JsonRequestBehavior.AllowGet);
                }
                if (tk_dao.InsertOrUpdate(item) > 0)
                {
                    return Json(new { status = true, msg = "Câp nhật thông tin thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, msg = "Câp nhật thông tin thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                if (tk_dao.GetByTenTaiKhoanOrEmail(model.TaiKhoan) != null)
                {
                    return Json(new { status = false, msg = "Tên tài khoản đã được sử dụng" }, JsonRequestBehavior.AllowGet);
                }
                if (tk_dao.GetByTenTaiKhoanOrEmail(model.Email) != null)
                {
                    return Json(new { status = false, msg = "Email đã được sử dụng" }, JsonRequestBehavior.AllowGet);
                }
                if (tk_dao.InsertOrUpdate(model) > 0)
                {
                    return Json(new { status = true, msg = "Thêm thông tin thành công" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = false, msg = "Thêm thông tin thất bại" }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult ThemQuyen(int ID_TaiKhoan, int ID_Quyen)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            bool result = tk_dao.ThemQuyen(ID_Quyen, ID_TaiKhoan);
            if (result)
            {
                return Json(new { status = result, msg = "Phân quyền thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = result, msg = "Phân quyền thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetQuyen(int ID_TaiKhoan)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            int result = tk_dao.GetQuyen(ID_TaiKhoan);
            return Json(new { ID_Quyen = result }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult XoaQuyen(int ID_TaiKhoan, int ID_Quyen)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            bool result = tk_dao.XoaQuyen(ID_Quyen, ID_TaiKhoan);
            if (result)
            {
                return Json(new { status = result, msg = "Xóa quyền thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = result, msg = "Xóa quyền thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionAdminRole]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            TaiKhoanDAO tk_dao = new TaiKhoanDAO();
            if (tk_dao.Delete(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}