using QLDH.App_Start;
using QLDH.DataAccess;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace QLDH.Controllers
{
    public class DanhMucHangHoaController : Controller
    {
        // GET: DanhMucHangHoa
        [SessionExpire]
        public ActionResult DanhMucHangHoa()
        {
            return View();
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAll()
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();

            List<DanhMucHangHoaModel> dt = dmDAO.GetAll();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Create(DanhMucHangHoaModel model)
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();

            if (model != null)
            {
                
                if (dmDAO.Create(model) == 0)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
                 return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);               
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Update(DanhMucHangHoaModel model)
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();

            if (model != null)
            {

                if (dmDAO.Update(model) == 0)
                {
                    return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { status = true, msg = "Lưu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lưu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Delete(string ID)
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();
            if (ID != null)
            {
                List<string> list = ID.Split(',').ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    if (dmDAO.Delete(Int32.Parse(list[i])) == 0)
                    {
                        return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { status = true, msg = "Xóa dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Xóa dữ liệu thất bại, vui lòng liên hệ quản trị" }, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllDonViTinh()
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();

            List<DanhMucHangHoaModel> dt = dmDAO.GetAllDonViTinh();
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult UploadAnh(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + "." + file.FileName.Split('.')[1];
                var path = Path.Combine(Server.MapPath("~/Images/AnhHangHoa"), fileName);
                file.SaveAs(path);

                return Json(new { status = true, msg = "Cập nhật ảnh hàng hóa tra thành công", fileName }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = false, msg = "Lỗi khi tải lên ảnh" }, JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        [HttpGet]
        public ActionResult GetByID(int ID)
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();

            List<DanhMucHangHoaModel> dt = dmDAO.GetByID(ID);
            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpGet]
        public ActionResult GetAllByLoaiSanPham(int ID_LoaiSanPham)
        {
            DanhMucHangHoaDAO dmDAO = new DanhMucHangHoaDAO();

            List<DanhMucHangHoaModel> dt = dmDAO.GetAllByLoaiSanPham(ID_LoaiSanPham);
            return Json(dt, JsonRequestBehavior.AllowGet);
        }
    }
}
