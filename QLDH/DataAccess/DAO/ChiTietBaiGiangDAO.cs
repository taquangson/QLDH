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
    public class ChiTietBaiGiangDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ChiTietBaiGiangDAO));
        private DataHelper helper;
        public ChiTietBaiGiangDAO()
        {
            helper = new DataHelper();
        }

        private ChiTietBaiGiangModel GetObjFromDataRow(DataRow dr)
        {
            ChiTietBaiGiangModel obj = new ChiTietBaiGiangModel();
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

        public List<ChiTietBaiGiangModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_ChiTietBaiGiang_GetAll");
                DataTable dt = ds.Tables[0];
                List<ChiTietBaiGiangModel> result = new List<ChiTietBaiGiangModel>();
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

        public List<ChiTietBaiGiangModel> GetByBaiGiang(int ID_BaiGiang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_BaiGiang", ID_BaiGiang)
                };
                DataSet ds = helper.ExecuteDataSet("sp_ChiTietBaiGiang_GetByBaiGiang", pars);
                DataTable dt = ds.Tables[0];
                List<ChiTietBaiGiangModel> result = new List<ChiTietBaiGiangModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_ChiTietBaiGiang_GetByBaiGiang " + ex.Message);
                return null;
            }
        }


        public int InsertOrUpdate_ChiTietBaiGiang(ChiTietBaiGiangModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ID_BaiGiang", model.ID_BaiGiang),
                new SqlParameter("@Loai", model.Loai),
                new SqlParameter("@TenChiTiet", model.TenChiTiet),
                new SqlParameter("@ThuTu", model.ThuTu),
                new SqlParameter("@TrangThai", model.TrangThai),
                new SqlParameter("@NoiDung", model.NoiDung),
                new SqlParameter("@FlexCol1", model.FlexCol1),
                new SqlParameter("@FlexCol2", model.FlexCol2),
                new SqlParameter("@FlexCol3", model.FlexCol3),
                new SqlParameter("@FlexCol4", model.FlexCol4)
                };

                object id = helper.ExecuteScalar("sp_ChiTietBaiGiang_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_ChiTietBaiGiang_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public bool Delete_ChiTietBaiGiang(int ID_ChiTietBaiGiang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_ChiTietBaiGiang )
                };
                int rowaff = helper.ExecuteNonQuery("sp_ChiTietBaiGiang_Delete", pars);
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
                log.Error("sp_ChiTietBaiGiang_Delete " + ex.Message);
                return false;
            }
        }
    }
}