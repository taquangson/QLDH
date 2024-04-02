using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace QLDH.DataAccess.DAO
{
    public class QuyDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(QuyDAO));
        private DataHelper helper;

        public QuyDAO()
        {
            helper = new DataHelper();
        }

        private QuyModel GetObjFromDataRow(DataRow dr)
        {
            QuyModel obj = new QuyModel();
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

        public List<QuyModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_Quy_GetAll");
                DataTable dt = ds.Tables[0];
                List<QuyModel> result = new List<QuyModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    QuyModel model = GetObjFromDataRow(dr);
                    result.Add(model);
                }
                return result;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public QuyModel GetById(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@ID",ID),
                };
                DataSet ds = helper.ExecuteDataSet("sp_Quy_GetById", pars);
                DataTable dt = ds.Tables[0];
                List<QuyModel> result = new List<QuyModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result.FirstOrDefault();
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public int InsertOrUpdate(QuyModel quy)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",quy.ID),
                    new SqlParameter("@TenQuy",quy.TenQuy),
                    new SqlParameter("@TrangThai",quy.TrangThai),
                    new SqlParameter("@BankCode",quy.BankCode),
                    new SqlParameter("@TenNganHang",quy.TenNganHang),
                    new SqlParameter("@SoTaiKhoan",quy.SoTaiKhoan),
                };
                int rowaff = helper.ExecuteNonQuery("sp_Quy_InsertOrUpdate", pars);
                if (rowaff != 0)
                {
                    return rowaff;
                }
            }
            catch(Exception ex)
            {
                log.Error("sp_Quy_InsertOrUpdate" + ex.Message);
            }
            return 0;
        }

        public bool Delete(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID),
                };
                int rowaff = helper.ExecuteNonQuery("sp_Quy_Delete", pars);
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
                log.Error("sp_Quy_Delete" + ex.Message);
                return false;
            }
        }
    }
}