using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using QLDH.DataAccess.DAO;
using System.Web.Razor;
using System.Web.Razor.Generator;
using System.Web.Mvc;
using System.IO;

namespace QLDH.Helper
{
    public class EmailHelper
    {
        log4net.ILog log = log4net.LogManager.GetLogger(typeof(EmailHelper));


        public void SendEmail(string htmlString, string Email, string subject)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("ac.judopreschool@gmail.com");
                message.To.Add(new MailAddress(Email));
                message.Subject = subject;
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = htmlString;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;                
                smtp.Credentials = new NetworkCredential("ac.judopreschool@gmail.com", "slzsbyjfzogprexa");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }
    }
}