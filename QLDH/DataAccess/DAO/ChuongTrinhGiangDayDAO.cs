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
    public class ChuongTrinhGiangDayDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChuongTrinhGiangDayDAO));
        private DataHelper helper;
        public ChuongTrinhGiangDayDAO()
        {
            helper = new DataHelper();
        }

        private ChuongTrinhGiangDayModel GetObjFromDataRow(DataRow dr)
        {
            ChuongTrinhGiangDayModel obj = new ChuongTrinhGiangDayModel();
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

        public List<ChuongTrinhGiangDayModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChuongTrinhGiangDay_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChuongTrinhGiangDayModel> result = new List<ChuongTrinhGiangDayModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public int InsertOrUpdate_ChuongTrinhGiangDay(ChuongTrinhGiangDayModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenChuongTrinh", model.TenChuongTrinh),
                new SqlParameter("@ID_Parent", model.ID_Parent),
                new SqlParameter("@TrangThai", model.TrangThai)
                };

                object id = helper.ExecuteScalar("sp_ChuongTrinhGiangDay_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChuongTrinhGiangDay_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public bool Delete_ChuongTrinhGiangDay(int ID_ChuongTrinhGiangDay)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_ChuongTrinhGiangDay )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChuongTrinhGiangDay_Delete", pars);
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
                log.Error("sp_ChuongTrinhGiangDay_Delete " + ex.Message);
                return false;
            }
        }


    }
}