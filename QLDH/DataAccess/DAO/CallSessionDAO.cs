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
    public class CallSessionDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public CallSessionDAO()
        {
            helper = new DataHelper();
        }

        private CallSessionModel GetObjFromDataRow(DataRow dr)
        {
            CallSessionModel obj = new CallSessionModel();
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
        public List<CallSessionModel> GetAllSession()
        {
            List<CallSessionModel> result = new List<CallSessionModel>();
            try
            {
                //SqlParameter[] pars = new SqlParameter[] {
                //new SqlParameter("@ID_BaiKiemTra", ID_BaiKiemTra),
                //};
                DataSet ds = helper.ExecuteDataSet("sp_CallSession_GetAll");
                DataTable dt = ds.Tables[0];
               
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                
            }
            catch (Exception ex)
            {
                log.Error("sp_CallSession_GetAll " + ex.Message);
            }
            return result;
        }

        public bool InsertOrUpdate(CallSessionModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@senderId", model.senderId),
                new SqlParameter("@message", model.message),
                };

                int id = helper.ExecuteNonQuery ("sp_CallSession_Insert", pars);
                if (id > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_CallSession_Insert " + ex.Message);
            }

            return false;
        }
    }
}