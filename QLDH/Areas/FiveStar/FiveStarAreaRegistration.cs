using System.Web.Mvc;

namespace QLDH.Areas.FiveStar
{
    public class FiveStarAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "FiveStar";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "FiveStar_default",
                "FiveStar/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}