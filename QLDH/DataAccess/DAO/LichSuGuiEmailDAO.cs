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
    public class LichSuGuiEmailDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public LichSuGuiEmailDAO()
        {
            helper = new DataHelper();
        }

        private LichSuGuiEmailModel GetObjFromDataRow(DataRow dr)
        {
            LichSuGuiEmailModel obj = new LichSuGuiEmailModel();
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

        public int Insert(LichSuGuiEmailModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                new SqlParameter("@NoiDung", model.NoiDung),            
                new SqlParameter("@TieuDe", model.TieuDe),          
                new SqlParameter("@NguoiNhan", model.NguoiNhan)          
                };

                object id = helper.ExecuteScalar("sp_LichSuGuiEmail_Insert", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_LichSuGuiEmail_Insert " + ex.Message);
            }

            return 0;
        }
    }
}