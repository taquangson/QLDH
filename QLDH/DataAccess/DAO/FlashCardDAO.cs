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
    public class FlashCardDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(FlashCardDAO));
        private DataHelper helper;
        public FlashCardDAO()
        {
            helper = new DataHelper();
        }

        private FlashCardModel GetObjFromDataRow(DataRow dr)
        {
            FlashCardModel obj = new FlashCardModel();
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

        public List<FlashCardModel> GetAll()
        {
            try
            {
                DataSet ds = helper.ExecuteDataSet("sp_FlashCard_GetAll");
                DataTable dt = ds.Tables[0];
                List<FlashCardModel> result = new List<FlashCardModel>();
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


        public int InsertOrUpdate_FlashCard(FlashCardModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID", model.ID),
                new SqlParameter("@ChuDe", model.ChuDe),
                new SqlParameter("@The", model.The),
                new SqlParameter("@Ten", model.Ten),
                new SqlParameter("@AnhThe", model.AnhThe),
                new SqlParameter("@AmThanh", model.AmThanh)
                };

                int id = helper.ExecuteNonQuery("sp_FlashCard_InsertOrUpdate", pars);
                return id;
            }
            catch (Exception ex)
            {
                log.Error("sp_FlashCard_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }


        public bool Delete_FlashCard(int ID_FlashCard)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID",ID_FlashCard )
                };
                int rowaff = helper.ExecuteNonQuery("sp_FlashCard_Delete", pars);
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
                log.Error("sp_FlashCard_Delete " + ex.Message);
                return false;
            }
        }

        public List<FlashCardModel> GetFlashCardByBaiGiang(int ID_BaiGiang)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                new SqlParameter("@ID_BaiGiang", ID_BaiGiang),
                };
                DataSet ds = helper.ExecuteDataSet("sp_FlashCard_GetAllByBaiGiang", pars);
                DataTable dt = ds.Tables[0];
                List<FlashCardModel> result = new List<FlashCardModel>();
                foreach (DataRow dr in dt.Rows)
                {
                    result.Add(GetObjFromDataRow(dr));
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error("sp_FlashCard_GetAllByBaiGiang " + ex.Message);
                return null;
            }
        }
    }
}