using System.Web.Mvc;

namespace OnlinePlayerSample.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        [AllowAnonymous]
        public ActionResult YoutubeDemo()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Login()
        {
            return PartialView("_Login");
        }
    }
}
