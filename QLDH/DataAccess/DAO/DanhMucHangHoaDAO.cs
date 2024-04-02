using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess.DAO
{
    public class DanhMucHangHoaDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DanhMucHangHoaDAO()
        {
            helper = new DataHelper();
        }
        private DanhMucHangHoaModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucHangHoaModel obj = new DanhMucHangHoaModel();
            foreach (PropertyInfo propertyInfo in obj.GetType().GetProperties())
            {
                if (dr.Table.Columns.IndexOf(propertyInfo.Name) >= 0)
                {

                    if (!string.IsNullOrWhiteSpace(dr[propertyInfo.Name].ToString()))
                    {
                        var value = Convert.ChangeType(dr[propertyInfo.Name], propertyInfo.PropertyType);
                        propertyInfo.SetValue(obj, value);
                    }
                    else
                    {
                        propertyInfo.SetValue(obj, null);
                    }
                }
                else
                {
                    propertyInfo.SetValue(obj, null);
                }
            }
            return obj;
        }

        public List<DanhMucHangHoaModel> GetAll()
        {
            List<DanhMucHangHoaModel> result = new List<DanhMucHangHoaModel>();
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucHangHoa_GetAll");
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucHangHoaModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_GetAll " + ex.Message);
            }

            return result;
        }

        public int Create(DanhMucHangHoaModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@MaHang", model.MaHang),
                    new SqlParameter("@Ten", model.Ten),
                    new SqlParameter("@DonViTinh", model.DonViTinh),
                    new SqlParameter("@LoaiSanPham", model.LoaiSanPham),
                    new SqlParameter("@ID_DonViTinh", model.ID_DonViTinh),
                    new SqlParameter("@ID_LoaiSanPham", model.ID_LoaiSanPham),
                    new SqlParameter("@SoLuongTonToiThieu", model.SoLuongTonToiThieu),
                    new SqlParameter("@GiaBanLe", model.GiaBanLe),
                    new SqlParameter("@GiaNhap", model.GiaNhap),
                    new SqlParameter("@GiaBanBuon", model.GiaBanBuon),
                    new SqlParameter("@HinhAnhSanPham", model.HinhAnhSanPham),
                    new SqlParameter("@MoTaSanPham", model.MoTaSanPham),
                    new SqlParameter("@SoLuongBanBuonToiThieu", model.SoLuongBanBuonToiThieu),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucHangHoa_Insert", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_Insert " + ex.Message);
            }

            return 0;
        }

        public int Update(DanhMucHangHoaModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@ID_DonViTinh", model.ID_DonViTinh),
                    new SqlParameter("@ID_LoaiSanPham", model.ID_LoaiSanPham),
                    new SqlParameter("@MaHang", model.MaHang),
                    new SqlParameter("@Ten", model.Ten),
                    new SqlParameter("@DonViTinh", model.DonViTinh),
                    new SqlParameter("@LoaiSanPham", model.LoaiSanPham),
                    new SqlParameter("@SoLuongTonToiThieu", model.SoLuongTonToiThieu),
                    new SqlParameter("@GiaBanLe", model.GiaBanLe),
                    new SqlParameter("@GiaNhap", model.GiaNhap),
                    new SqlParameter("@GiaBanBuon", model.GiaBanBuon),
                    new SqlParameter("@HinhAnhSanPham", model.HinhAnhSanPham),
                    new SqlParameter("@MoTaSanPham", model.MoTaSanPham),
                    new SqlParameter("@SoLuongBanBuonToiThieu", model.SoLuongBanBuonToiThieu),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucHangHoa_Update", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_Update " + ex.Message);
            }

            return 0;
        }

        public int Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucHangHoa_Delete", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_Delete " + ex.Message);
            }

            return 0;
        }

        public List<DanhMucHangHoaModel> GetAllDonViTinh()
        {
            List<DanhMucHangHoaModel> result = new List<DanhMucHangHoaModel>();
            try
            {

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucHangHoa_GetAllDonViTinh");
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucHangHoaModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_GetAllDonViTinh " + ex.Message);
            }

            return result;
        }

        public List<DanhMucHangHoaModel> GetAllByLoaiSanPham(int ID)
        {
            List<DanhMucHangHoaModel> result = new List<DanhMucHangHoaModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
               {
                    new SqlParameter("@ID", ID),
               };

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucHangHoa_GetAllByLoaiSanPham", pars);
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucHangHoaModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_GetAllByLoaiSanPham " + ex.Message);
            }

            return result;
        }

        public List<DanhMucHangHoaModel> GetByID(int ID)
        {
            List<DanhMucHangHoaModel> result = new List<DanhMucHangHoaModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucHangHoa_GetByID", pars);
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucHangHoaModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucHangHoa_GetByID " + ex.Message);
            }

            return result;
        }
    }
}
