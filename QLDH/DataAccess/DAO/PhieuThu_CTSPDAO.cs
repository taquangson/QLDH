using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;
using System;
using System.Linq;

namespace QLDH.DataAccess.DAO
{
    public class PhieuThu_CTSPDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(PhieuThu_CTSPDAO));

        private DataHelper helper;

        public PhieuThu_CTSPDAO()
        {
            helper = new DataHelper();
        }
        private PhieuThu_CTSPModel GetObjFromDataRow(DataRow dr)
        {
            PhieuThu_CTSPModel obj = new PhieuThu_CTSPModel();
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

        public List<PhieuThu_CTSPModel> GetAll()
        {
            List<PhieuThu_CTSPModel> result = new List<PhieuThu_CTSPModel>();
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThu_CTSP_GetAll");
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_CTSP_GetAll " + ex.Message);
            }
            return result;
        }

        public List<PhieuThu_CTSPModel> GetByIDPhieuThu(int ID_PhieuThu)
        {
            List<PhieuThu_CTSPModel> result = new List<PhieuThu_CTSPModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_PhieuThu",ID_PhieuThu),
                };
                DataSet ds = helper.ExecuteDataSet("sp_PhieuThu_CTSP_GetByIDPhieuThu", pars);
                DataTable dt = ds.Tables[0];
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_CTSP_GetByIDPhieuThu " + ex.Message);
            }
            return null;
        }

        public int InsertOrUpdate(PhieuThu_CTSPModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",model.ID),
                    new SqlParameter("@ID_PhieuThu",model.ID_PhieuThu),
                    new SqlParameter("@ID_SanPham",model.ID_SanPham),
                    new SqlParameter("@SoLuong",model.SoLuong),
                    new SqlParameter("@GiaBan",model.GiaBan),
                };
                int rowaff = helper.ExecuteNonQuery("sp_PhieuThu_CTSP_InsertOrUpdate", pars);
                if (rowaff != 0)
                {
                    return rowaff;
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_PhieuThu_CTSP_InsertOrUpdate " + ex.Message);
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
                int rowaff = helper.ExecuteNonQuery("sp_PhieuThu_CTSP_Delete", pars);
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
                log.Error("sp_PhieuThu_CTSP_Delete " + ex.Message);
                return false;
            }
        }
    }
}