using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;


namespace QLDH.DataAccess.DAO
{

    public class PhieuChiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhieuChiDAO));
        private DataHelper helper;
        public PhieuChiDAO()
        {
            helper = new DataHelper();
        }

        private PhieuChiModel GetObjFromDataRow(DataRow dr)
        {
            PhieuChiModel obj = new PhieuChiModel();
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

        public List<PhieuChiModel> GetAll_PhieuChi()
        {
            List<PhieuChiModel> result = new List<PhieuChiModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_PhieuChi_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuChi_GetAll " + ex.Message);
            }

            return result;
        }

        public List<PhieuChiModel> GetAllByThang_PhieuChi(DateTime FromDate, DateTime ToDate)
        {
            List<PhieuChiModel> result = new List<PhieuChiModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@FromDate", FromDate),
                new SqlParameter("@ToDate", ToDate)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuChi_GetAllByThang", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuChi_GetAllByThang " + ex.Message);
            }

            return result;
        }

        public PhieuChiModel GetById(int ID)
        {
            PhieuChiModel result = new PhieuChiModel();
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuChi_GetByID",pars);
                DataTable dt = ds.Tables[0];
                if (dt.Rows.Count > 0)
                {
                    return GetObjFromDataRow(dt.Rows[0]);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuChi_GetByID " + ex.Message);
            }

            return result;
        }



        public int InsertOrUpdate(PhieuChiModel model, TaiKhoanModel userinfor)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenNguoiNhan", model.TenNguoiNhan),
                new SqlParameter("@TenNguoiTao", userinfor.TenDayDu),
                new SqlParameter("@LoaiPhieu", model.LoaiPhieu),
                new SqlParameter("@HinhThuc", model.HinhThuc),
                new SqlParameter("@SoTien", model.SoTien),
                new SqlParameter("@ID_KhuVuc", model.ID_KhuVuc),
                new SqlParameter("@ID_DeXuat", model.ID_DeXuat),
                new SqlParameter("@LyDo", model.LyDo),
                new SqlParameter("@ID_NhanVien", model.ID_NhanVien),
                new SqlParameter("@ID_TaiKhoan", userinfor.ID),
                new SqlParameter("@NgaySuDung", model.NgaySuDung)

                };

                object id = helper.ExecuteScalar("sp_PhieuChi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuChi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }

        public bool Delete(string ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID )
                };
                int rowaff = helper.ExecuteNonQuery("sp_PhieuChi_Delete", pars);
                if (rowaff > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuChi_Delete " + ex.Message);
                return false;
            }
        }
    }
}