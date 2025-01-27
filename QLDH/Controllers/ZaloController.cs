using Microsoft.AspNet.SignalR.Json;
using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json;
using QLDH.App_Start;
using QLDH.DataAccess.DAO;
using QLDH.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static System.Net.WebRequestMethods;

namespace QLDH.Controllers
{
    public class ZaloController : Controller
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(ZaloController));
        public class ProcessToken
        {
            public string secret_key { get; set; }
            public string app_id { get; set; }
            public string refresh_token { get; set; }
            public string code { get; set; }
            public string grant_type { get; set; }
        }

        public class ZNSRequestModel
        {
            public string phone { get; set; }
            public string temp_id { get; set; }
            public string temp_data { get; set; }
        }

        public class ZNSResponseModel
        {
            public string error { get; set; }
            public string message { get; set; }
            public string data { get; set; }
        }

        public ZaloAccessTokenModel RefreshToken(ProcessToken model)
        {
            try
            {
                string endPoint = "https://oauth.zaloapp.com/v4/oa/access_token";
                var client = new HttpClient();

                client.DefaultRequestHeaders.Add("secret_key", model.secret_key);

                var data = new[]
                {
                new KeyValuePair<string, string>("refresh_token",model.refresh_token ),
                new KeyValuePair<string, string>("app_id", model.app_id ),
                new KeyValuePair<string, string>("grant_type", model.grant_type),
            };
                HttpResponseMessage httpResponseMessage =
                    client.PostAsync(endPoint, new FormUrlEncodedContent(data)).GetAwaiter().GetResult();

                string response = httpResponseMessage.Content.ReadAsStringAsync().Result;
                ZaloAccessTokenModel accessTokenModel = JsonConvert.DeserializeObject<ZaloAccessTokenModel>(response);
                return accessTokenModel;
            }
            catch (Exception ex)
            {
                log.Error(ex);
                return null;
            }
        }

        public ActionResult ProcessAuth(string code)
        {
            ProcessToken model = new ProcessToken();
            model.code = code;
            ZaloAccessTokenDAO accessTokenDAO = new ZaloAccessTokenDAO();
            ZaloAccessTokenModel accessTokenModel = accessTokenDAO.GetLastToken();
            DateTime expireDate = accessTokenModel.create_date.AddSeconds(accessTokenModel.expires_in);
            model.refresh_token = accessTokenModel.refresh_token;
            if (expireDate < DateTime.Now)
            {
                model.grant_type = "refresh_token";
                model.app_id = System.Configuration.ConfigurationManager.AppSettings["ZaloAppId"];
                model.secret_key = System.Configuration.ConfigurationManager.AppSettings["ZaloAppSecretKey"];
                ZaloAccessTokenModel newToken = RefreshToken(model);
                newToken.create_date = DateTime.Now;
                accessTokenDAO.Insert(newToken);
            }
            else
            {

            }
            return Json(new { status = true, msg = "Xử lý dữ liệu thành công" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PushZNS(ZNSRequestModel model)
        {
            ZaloAccessTokenDAO accessTokenDAO = new ZaloAccessTokenDAO();
            ZaloAccessTokenModel accessTokenModel = accessTokenDAO.GetLastToken();
            string endPoint = "https://business.openapi.zalo.me/message/template";
            var client = new HttpClient();

            client.DefaultRequestHeaders.Add("access_token", accessTokenModel.access_token);

            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var data = new { phone = model.phone, template_id = model.temp_id, template_data = JsonConvert.DeserializeObject(model.temp_data)};
            var stringjson = JsonConvert.SerializeObject(data);
            log.Info("-- ZNS data: " + stringjson);
            HttpResponseMessage httpResponseMessage =
                client.PostAsync(endPoint, new StringContent(stringjson)).GetAwaiter().GetResult();

            string response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            return Json(new { status = true, msg = "Gửi thông báo thành công", data = response }, JsonRequestBehavior.AllowGet);
        }
    }
}