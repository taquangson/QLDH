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
    public class QuanLyQuyDAO
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(TaiKhoanDAO));
        private DataHelper helper;
        public QuanLyQuyDAO()
        {
            helper = new DataHelper();
        }
        public decimal GetTongTienChi(int hinhthuc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@HinhThuc", hinhthuc)
                };

                object id = helper.ExecuteScalar("sp_QuanLyQuy_Chi_GetByHinhThuc", pars);
                if (id != null)
                {
                    return decimal.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyQuy_Chi_GetByHinhThuc " + ex.Message);
            }

            return 0;
        }

        public decimal GetTongTienThu(int hinhthuc)
        {
            try
            {
                SqlParameter[] pars = new SqlParameter[] {
                    new SqlParameter("@HinhThuc", hinhthuc)
                };

                object id = helper.ExecuteScalar("sp_QuanLyQuy_Thu_GetByHinhThuc", pars);
                if (id != null)
                {
                    return decimal.Parse(id.ToString());
                }
            }
            catch (Exception ex)
            {
                log.Error("sp_QuanLyQuy_Thu_GetByHinhThuc " + ex.Message);
            }

            return 0;
        }

    }
}