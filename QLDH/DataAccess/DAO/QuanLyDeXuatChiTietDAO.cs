using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Helper;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace QLDH.DataAccess
{
    public class QuanLyDeXuatChiTietDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(HocSinhDAO));
        private DataHelper helper;
        public QuanLyDeXuatChiTietDAO()
        {
            helper = new DataHelper();
        }

        private QuanLyDeXuatChiTietModels GetObjFromDataRow(DataRow dr)
        {
            QuanLyDeXuatChiTietModels obj = new QuanLyDeXuatChiTietModels();
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

        public List<QuanLyDeXuatChiTietModels> GetAll(int ID_DeXuat)
        {
            List<QuanLyDeXuatChiTietModels> result = new List<QuanLyDeXuatChiTietModels>();
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
                };

                DataSet ds = helper.ExecuteDataSet("sp_QuanLyDeXuatChiTiet_GetAll", pars);
                DataTable dt = ds.Tables[0];

                foreach (DataRow dr in dt.Rows)
                {
                    QuanLyDeXuatChiTietModels data = GetObjFromDataRow(dr);
                    result.Add(data);
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuatChiTiet_GetAll " + ex.Message);
            }

            return result;
        }

        public int CreteOrUpdate(int ID_DeXuat, QuanLyDeXuatChiTietModels model)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[]
                {
                    new SqlParameter("@ID_DeXuat", ID_DeXuat),
                    new SqlParameter("@ID_HangHoa", model.ID_HangHoa),
                    new SqlParameter("@TenHangHoa", model.TenHangHoa),
                    new SqlParameter("@SoLuong", model.SoLuong),
                    new SqlParameter("@QuyCachSuDung", model.QuyCachSuDung),
                    new SqlParameter("@SoTien", model.SoTien),
                };

                object query = helper.ExecuteScalar("sp_QuanLyDeXuatChiTiet_CreteOrUpdate", pars);
                if (query != null)
                {
                    return int.Parse(query.ToString());
                }

            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyDeXuatChiTiet_CreteOrUpdate " + ex.Message);
            }

            return 0;
        }
    }
}
