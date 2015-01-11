using System.Web.Mvc;

namespace OnlinePlayerSample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult YoutubeDemo()
        {
            return View();
        }

        public ActionResult Login()
        {
            return PartialView("_Login");
        }
    }
}
