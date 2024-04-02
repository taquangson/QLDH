using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System.Data;
using System.Reflection;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace QLDH.DataAccess.DAO 
{
	public class KhachHangDAO
	{
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(KhachHangDAO));

        private DataHelper helper;

        public KhachHangDAO()
        {
            helper = new DataHelper();
        }
        private KhachHangModel GetObjFromDataRow(DataRow dr)
        {
            KhachHangModel obj = new KhachHangModel();
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

        public List<KhachHangModel> GetAll()
        {
            List<KhachHangModel> result = new List<KhachHangModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_KhachHang_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_KhachHang_GetAll " + ex.Message);
            }
            return result;
        }

        public KhachHangModel GetByID(int ID)
        {
            List<KhachHangModel> result = new List<KhachHangModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_KhachHang_GetByID", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch(Exception ex) {
                log.Error("sp_KhachHang_GetByID " + ex.Message);
            }
            return result.FirstOrDefault();
        }

        public int InsertOrUpdate(KhachHangModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",model.ID),
                    new SqlParameter("@Ten",model.Ten),
                    new SqlParameter("@DiaChi",model.DiaChi),
                    new SqlParameter("@SoDienThoai",model.SoDienThoai),
                    new SqlParameter("@TrangThai",model.TrangThai),
                    new SqlParameter("@Email",model.Email),
                    new SqlParameter("@GhiChu",model.GhiChu),
                    new SqlParameter("@MatKhau",model.MatKhau)
                };
                int rowaff = helper.ExecuteNonQuery("sp_KhachHang_InsertOrUpdate", pars);
                if (rowaff != 0)
                {
                    return rowaff;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_KhachHang_InsertOrUpdate " + ex.Message);
            }
            return 0;
        }

        public bool UpdateMatKhau (KhachHangModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",model.ID),
                    new SqlParameter("@MatKhau",model.MatKhau)
                };
                int rowaff = helper.ExecuteNonQuery("sp_KhachHang_UpdateMatKhau", pars);
                if (rowaff != 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_KhachHang_InsertOrUpdate " + ex.Message);
            }
            return false;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID),
                };
                int rowaff = helper.ExecuteNonQuery("sp_KhachHang_Delete", pars);
                if (rowaff != 0)
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
                log.Error("sp_KhachHang_Delete " + ex.Message);
                return false;
            }
        }
    }
}