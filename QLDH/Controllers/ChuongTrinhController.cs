using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
namespace QLDH.Controllers
{
    public class ChuongTrinhController : Controller
    {
        [SessionExpire]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetTreeChuongTrinh()
        {
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            ChuongTrinhGiangDayDAO pbdao = new ChuongTrinhGiangDayDAO();
            List<ChuongTrinhGiangDayModel> lstChuongTrinh = pbdao.GetAll();
            List<TreeChuongTrinhModel> list = new List<TreeChuongTrinhModel>();

            foreach (ChuongTrinhGiangDayModel obj in lstChuongTrinh)
            {
                IEnumerable<ChuongTrinhGiangDayModel> findCha = lstChuongTrinh.Where(person => person.ID == obj.ID_Parent);

                bool flag = true;
                foreach (ChuongTrinhGiangDayModel i in findCha)
                {
                    flag = false;
                    break;
                }

                if (flag)
                {
                    TreeChuongTrinhModel resultObj = new TreeChuongTrinhModel();

                    TaoNhom(obj, lstChuongTrinh, resultObj);

                    list.Add(resultObj);
                }
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        protected class TreeChuongTrinhModel
        {
            public int ID { get; set; }
            public int ID_ChuongTrinhCha { get; set; }
            public string TenChuongTrinh { get; set; }
            public List<TreeChuongTrinhModel> lstChild { get; set; }
        }

        [SessionAdminRole]
        protected void TaoNhom(ChuongTrinhGiangDayModel obj, List<ChuongTrinhGiangDayModel> lstDanhMuc, TreeChuongTrinhModel resultObj)
        {
            resultObj.ID = obj.ID;
            resultObj.TenChuongTrinh = obj.TenChuongTrinh;
            resultObj.ID_ChuongTrinhCha = obj.ID_Parent;
            var query1 = lstDanhMuc.Where(person => person.ID_Parent == obj.ID);

            List<TreeChuongTrinhModel> li = new List<TreeChuongTrinhModel>();
            foreach (ChuongTrinhGiangDayModel obj1 in query1)
            {
                TreeChuongTrinhModel objcon = new TreeChuongTrinhModel();
                TaoNhom(obj1, lstDanhMuc, objcon);
                li.Add(objcon);
            }
            resultObj.lstChild = li;
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult CreateOrUpdate(ChuongTrinhGiangDayModel model)
        {
            ChuongTrinhGiangDayDAO hsdao = new ChuongTrinhGiangDayDAO();
            TaiKhoanModel userinfor = (TaiKhoanModel)System.Web.HttpContext.Current.Session["UserInfor"];
            int newid = hsdao.InsertOrUpdate_ChuongTrinhGiangDay(model);
            if (newid > 0)
            {
                return Json(new { status = true, msg = "Lưu dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = false, msg = "Lưu dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(int ID)
        {
            ChuongTrinhGiangDayDAO hsdao = new ChuongTrinhGiangDayDAO();
            if (hsdao.Delete_ChuongTrinhGiangDay(ID))
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = true, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult ThemBaiGiangVaoChuongTrinh(int ID_ChuongTrinh, int ID_BaiGiang, int STT)
        {
            BaiGiangDAO tk_dao = new BaiGiangDAO();
            bool result = tk_dao.ThemChuongTrinhBaiGiang(ID_ChuongTrinh, ID_BaiGiang, STT);
            if (result)
            {
                return Json(new { status = result, msg = "Thêm thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = result, msg = "Thêm thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult XoaBaiGiangKhoiChuongTrinh(int ID_ChuongTrinh, int ID_BaiGiang)
        {
            BaiGiangDAO tk_dao = new BaiGiangDAO();
            bool result = tk_dao.XoaChuongTrinhBaiGiang(ID_ChuongTrinh, ID_BaiGiang);
            if (result)
            {
                return Json(new { status = result, msg = "Xóa thành công" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { status = result, msg = "Xóa thất bại, vui lòng thử lại" }, JsonRequestBehavior.AllowGet);
            }
        }

        [SessionExpire]
        public ActionResult GetBaiGiangNgoaiChuongTrinh(int ID_ChuongTrinh)
        {
            BaiGiangDAO cndao = new BaiGiangDAO();
            List<BaiGiangModel> lstcn = cndao.GetBaiGiangNgoaiChuongTrinh(ID_ChuongTrinh);
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        public ActionResult GetBaiGiangTrongChuongTrinh(int ID_ChuongTrinh)
        {
            BaiGiangDAO cndao = new BaiGiangDAO();
            List<BaiGiangModel> lstcn = cndao.GetBaiGiangTrongChuongTrinh(ID_ChuongTrinh);
            return Json(lstcn, JsonRequestBehavior.AllowGet);
        }
    }
}