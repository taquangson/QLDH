using Microsoft.Office.Interop.Excel;
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
    public class TroChoiDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TroChoiDAO));
        private DataHelper helper;
        public TroChoiDAO()
        {
            helper = new DataHelper();
        }

        private TroChoiModel GetObjFromDataRow(DataRow dr)
        {
            TroChoiModel obj = new TroChoiModel();
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

        public List<TroChoiModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_TroChoi_GetAll");
                System.Data.DataTable dt = ds.Tables[0];
                List<TroChoiModel> result = new List<TroChoiModel>();
                DapAnTroChoiDAO dapAnTroChoiDAO = new DapAnTroChoiDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    TroChoiModel item = GetObjFromDataRow(dr);
                    item.lstDapAn = dapAnTroChoiDAO.GetDapAn_ByTroChoi(item.ID);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<TroChoiModel> GetByIDs(string id)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@IDs", id)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TroChoi_GetByIDs", pars);
                System.Data.DataTable dt = ds.Tables[0];
                List<TroChoiModel> result = new List<TroChoiModel>();
                DapAnTroChoiDAO dapAnTroChoiDAO = new DapAnTroChoiDAO();
                foreach (DataRow dr in dt.Rows)
                {
                    TroChoiModel item = GetObjFromDataRow(dr);
                    item.lstDapAn = dapAnTroChoiDAO.GetDapAn_ByTroChoi(item.ID);
                    result.Add(item);
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<TroChoiModel> GetTroChoiByBaiGiang(int ID_BaiGiang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_BaiGiang", ID_BaiGiang),
                };
                DataSet ds = helper.ExecuteDataSet("sp_TroChoi_GetAllByBaiGiang", pars);
                System.Data.DataTable dt = ds.Tables[0];
                List<TroChoiModel> result = new List<TroChoiModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_TroChoi_GetAllByBaiGiang " + ex.Message);
                return null;
            }
        }

        public TroChoiModel GetByID(int ID)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", ID)
                };
                DataSet ds = helper.ExecuteDataSet("sp_TroChoi_GetByID", pars);
                System.Data.DataTable dt = ds.Tables[0];
                DapAnTroChoiDAO dapAnTroChoiDAO = new DapAnTroChoiDAO();
                TroChoiModel item = GetObjFromDataRow(dt.Rows[0]);
                item.lstDapAn = dapAnTroChoiDAO.GetDapAn_ByTroChoi(item.ID);
                return item;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public int InsertOrUpdate_TroChoi(TroChoiModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@TenTroChoi", model.TenTroChoi),
                new SqlParameter("@NoiDung", model.NoiDung),
                new SqlParameter("@Loai", model.Loai),
                new SqlParameter("@Diem", model.Diem),
                new SqlParameter("@HinhAnh", model.HinhAnh),
                new SqlParameter("@AmThanh", model.AmThanh)
                };

                object id = helper.ExecuteScalar("sp_TroChoi_InsertOrUpdate", pars);
                if (id != null)
                {
                    return int.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_TroChoi_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public bool Delete_TroChoi(int ID_TroChoi)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_TroChoi )
                };
                int rowaff = helper.ExecuteNonQuery("sp_TroChoi_Delete", pars);
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
                log.Error("sp_TroChoi_Delete " + ex.Message);
                return false;
            }
        }
    }
}