
using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using static log4net.Appender.RollingFileAppender;

namespace QLDH.DataAccess.DAO
{
    public class BienDongSoDuQuyDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public BienDongSoDuQuyDAO()
        {
            helper = new DataHelper();
        }

        private BienDongSoDuQuyModel GetObjFromDataRow(DataRow dr)
        {
            BienDongSoDuQuyModel obj = new BienDongSoDuQuyModel();
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

        public List<BienDongSoDuQuyModel> GetAll(int ID_Quy)
        {
            List<BienDongSoDuQuyModel> result = new List<BienDongSoDuQuyModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Quy", ID_Quy),
                };

                DataSet ds = helper.ExecuteDataSet("sp_BienDongSoDuQuy_GetAllByQuy", pars);
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    BienDongSoDuQuyModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_BienDongSoDuQuy_GetAllByQuy " + ex.Message);
            }

            return result;
        }

        public int Insert(BienDongSoDuQuyModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_Quy", model.ID_Quy),
                    new SqlParameter("@Type", model.Type),
                    new SqlParameter("@TrangThai", model.TrangThai),
                    new SqlParameter("@SoTien", model.SoTien),
                    new SqlParameter("@ID_PhieuThu", model.ID_PhieuThu),
                    new SqlParameter("@ID_PhieuChi", model.ID_PhieuChi),
                    new SqlParameter("@ID_PhieuCanQuy", model.ID_PhieuCanQuy),
                    new SqlParameter("@NgayTao", model.NgayTao),
                };

                object query = helper.ExecuteScalar("sp_BienDongSoDuQuy_Insert", pars);
                if (query != null)
                {
                    return int.Parse(query.ToString());
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_BienDongSoDuQuy_Insert " + ex.Message);
            }

            return 0;
        }
        public int UpdateTrangThai(int TrangThai, int ID_PhieuThu, int ID_PhieuChi, int ID_PhieuCanQuy)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@TrangThai", TrangThai),
                    new SqlParameter("@ID_PhieuThu", ID_PhieuThu),
                    new SqlParameter("@ID_PhieuChi", ID_PhieuChi),
                    new SqlParameter("@ID_PhieuCanQuy", ID_PhieuCanQuy),
                };

                object query = helper.ExecuteScalar("sp_BienDongSoDuQuy_UpdateTrangThai", pars);
                if (query != null)
                {
                    return int.Parse(query.ToString());
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_BienDongSoDuQuy_UpdateTrangThai " + ex.Message);
            }

            return 0;
        }

    }     
}