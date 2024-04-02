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
using System.Web.Http.Results;
using static QLDH.DataAccess.DAO.DanhMucDAO;

namespace QLDH.DataAccess.DAO
{
    public class QuanLyDeXuatDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public QuanLyDeXuatDAO()
        {
            helper = new DataHelper();
        }

        private QuanLyDeXuatModels GetObjFromDataRow(DataRow dr)
        {
            QuanLyDeXuatModels obj = new QuanLyDeXuatModels();
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

        private QuanLyDeXuatXetDuyetModels GetObjFromDataRowV2(DataRow dr)
        {
            QuanLyDeXuatXetDuyetModels obj = new QuanLyDeXuatXetDuyetModels();
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

        public List<QuanLyDeXuatModels> GetAll(int ID)
        {
            List<QuanLyDeXuatModels> result = new List<QuanLyDeXuatModels>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_TaiKhoan", ID),
                };

                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuat_GetAll", pars);
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    QuanLyDeXuatModels data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_GetAll " + ex.Message);
            }

            return result;
        }

        public List<QuanLyDeXuatModels> GetNotIn_PhieuChi(int ID_DeXuat)
        {
            List<QuanLyDeXuatModels> result = new List<QuanLyDeXuatModels>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
               {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
               };
                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuat_GetNotInPhieuChi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_GetNotInPhieuChi " + ex.Message);
            }

            return result;
        }

        public List<QuanLyDeXuatModels> GetByPhieuChi(int ID_PhieuChi)
        {
            List<QuanLyDeXuatModels> result = new List<QuanLyDeXuatModels>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
               {
                    new SqlParameter("@ID_PhieuChi", ID_PhieuChi),
               };
                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuat_GetByPhieuChi", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_GetByPhieuChi " + ex.Message);
            }

            return result;
        }

        public QuanLyDeXuatXetDuyetModels GetNoiDungDuyetTheoID(int ID_NguoiDuyet,int  ID_DeXuat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
                    new SqlParameter("@ID_NguoiDuyet", ID_NguoiDuyet),
                };

                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuatXetDuyet_GetByID", pars);
                DataTable dt = ds.Tables[0];
                QuanLyDeXuatXetDuyetModels data = GetObjFromDataRowV2(dt.Rows[0]);

                return data;
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuatXetDuyet_GetByID " + ex.Message);
            }

            return null;
        }

        public List<QuanLyDeXuatXetDuyetModels> GetAllUserDuyetTheoID(int ID_DeXuat)
        {
            List<QuanLyDeXuatXetDuyetModels> result = new List<QuanLyDeXuatXetDuyetModels>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
                };

                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuatXetDuyet_GetUserByID", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    QuanLyDeXuatXetDuyetModels data = GetObjFromDataRowV2(dr);
                    result.Add(data);
                }

                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuatXetDuyet_GetUserByID " + ex.Message);
            }

            return null;
        }

        public int Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };

                int query = helper.ExecuteNonQuery("sp_QuanLyDeXuat_Delete", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_Delete " + ex.Message);
            }

            return 0;
        }

        public int UpdateTrangThai(int ID, int trangthai, int ID_NguoiDuyet, DateTime NgayDuyet, string NoiDungDuyet)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                    new SqlParameter("@TrangThai", trangthai),
                    new SqlParameter("@ID_NguoiDuyet", ID_NguoiDuyet),
                    new SqlParameter("@NgayDuyet", NgayDuyet),
                    new SqlParameter("@NoiDungDuyet", NoiDungDuyet),
                };

                int query = helper.ExecuteNonQuery("sp_QuanLyDeXuat_UpdateTrangThai", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_UpdateTrangThai " + ex.Message);
            }

            return 0;
        }

        public int CreateOrUpdate(QuanLyDeXuatModels model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", model.ID),
                    new SqlParameter("@TenDeXuat", model.TenDeXuat),
                    new SqlParameter("@ID_NguoiTao", model.ID_NguoiTao),
                    new SqlParameter("@ID_DinhMucChi", model.ID_DinhMucChi),
                    new SqlParameter("@NgayTao", model.NgayTao),
                    new SqlParameter("@KhuVucSuDung", model.KhuVucSuDung),
                    new SqlParameter("@ThoiGianKhauHao", model.ThoiGianKhauHao),
                    new SqlParameter("@ThoiGianPhanBo", model.ThoiGianPhanBo),
                    new SqlParameter("@ThoiGianDuKienSuDung", model.ThoiGianDuKienSuDung),
                    new SqlParameter("@TrangThaiDuyet", model.TrangThaiDuyet),
                    new SqlParameter("@TongTien", model.TongTien),
                    new SqlParameter("@NoiDung", model.NoiDung),
                    new SqlParameter("@HinhThucPhanBo", model.HinhThucPhanBo),
                };

                int query = Int32.Parse(helper.ExecuteScalar("sp_QuanLyDeXuat_CreteOrUpdate", pars).ToString());
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_CreteOrUpdate " + ex.Message);
            }

            return 0;
        }

        public int XetDuyet(int ID_DeXuat, int ID_NguoiDuyet)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
                    new SqlParameter("@ID_NguoiDuyet", ID_NguoiDuyet),
                };

                int query = helper.ExecuteNonQuery("sp_QuanLyDeXuat_GuiDonDeXuat", pars);
                if (query > 0)
                {
                    return query;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_GuiDonDeXuat " + ex.Message);
            }

            return 0;
        }

        public DataTable GetNguoiDuyet(int ID_DeXuat)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
                };

                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuat_NguoiDuyet", pars);
                DataTable dt = ds.Tables[0];
                return dt;
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuat_NguoiDuyet " + ex.Message);
            }

            return null;
        }
    }
}
