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
    public class DanhMucComboHangHoaDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public DanhMucComboHangHoaDAO()
        {
            helper = new DataHelper();
        }

        private DanhMucComboHangHoaModel GetObjFromDataRow(DataRow dr)
        {
            DanhMucComboHangHoaModel obj = new DanhMucComboHangHoaModel();
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

        public List<DanhMucComboHangHoaModel> GetAll(int ID)
        {
            List<DanhMucComboHangHoaModel> result = new List<DanhMucComboHangHoaModel>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID", ID),
                };

                DataSet ds = helper.ExecuteDataSet("sp_DanhMucCombo_HangHoa_GetAll", pars);
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    DanhMucComboHangHoaModel data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_HangHoa_GetAll " + ex.Message);
            }

            return result;
        }

        public int Insert(DanhMucComboHangHoaModel model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DanhMucCombo", model.ID_DanhMucCombo),
                    new SqlParameter("@ID_DanhMucHangHoa", model.ID_DanhMucHangHoa),
                    new SqlParameter("@SoLuong", model.SoLuong),
                    new SqlParameter("@GiaBanLe", model.GiaBanLe),
                    new SqlParameter("@GiaBanCombo", model.GiaBanCombo),
                };

                int query = helper.ExecuteNonQuery("sp_DanhMucCombo_HangHoa_InsertOrUpdate", pars);
                if (query > 0)
                {
                    return int.Parse(query.ToString());
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_DanhMucCombo_HangHoa_InsertOrUpdate " + ex.Message);
            }

            return 0;
        }
    }
}