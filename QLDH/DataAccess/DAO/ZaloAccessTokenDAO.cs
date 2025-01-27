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
    public class ZaloAccessTokenDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ZaloAccessTokenDAO));
        private DataHelper helper;
        public ZaloAccessTokenDAO()
        {
            helper = new DataHelper();
        }

        private ZaloAccessTokenModel GetObjFromDataRow(DataRow dr)
        {
            ZaloAccessTokenModel obj = new ZaloAccessTokenModel();
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
        public ZaloAccessTokenModel GetLastToken()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ZaloAccessToken_GetLastToken");
                DataTable dt = ds.Tables[0];
                ZaloAccessTokenModel result = GetObjFromDataRow(dt.Rows[0]);
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ZaloAccessToken_GetLastToken " + ex.Message);
                return null;
            }
        }

        public bool Insert(ZaloAccessTokenModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@access_token", model.@access_token),
                new SqlParameter("@refresh_token", model.refresh_token),
                new SqlParameter("@expires_in", model.expires_in),
                new SqlParameter("@create_date", model.create_date)
                };
                int id = helper.ExecuteNonQuery("sp_ZaloAccessToken_Insert", pars);
                if (id > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ZaloAccessToken_Insert " + ex.Message);
            }

            return false;
        }
    }
}