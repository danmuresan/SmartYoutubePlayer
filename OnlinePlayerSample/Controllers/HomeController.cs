using System.Collections;
using System.Linq;
using System.Web.Mvc;
using OnlinePlayerSample.Models;
using System.Collections.Generic;

namespace OnlinePlayerSample.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        public ActionResult Index()
        {
            // mock up some lower level service we need to call to retrieve tracks
            var trackModelList = RetrieveHomePageTracks();

            return View(trackModelList);
        }

        private List<TrackViewModel> RetrieveHomePageTracks()
        {
            // Mock up 30 tracks for now
            var tracksModelList = new List<TrackViewModel>
            {
                new TrackViewModel
                {
                    Id = 1,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20LA%20%28Prod%20Chin%20Injetti%29.mp3",
                    TrackName = "SonReal - LA (Explicit)",
                    TrackDescription = "Explicit version of LA"
                },
                new TrackViewModel
                {
                    Id = 2,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20People%20Asking.mp3",
                    TrackName = "SonReal - People Asking",
                    TrackDescription = "Explicit version of people asking"
                },
                new TrackViewModel
                {
                    Id = 3,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20Already%20There%20Remix%20ft.%20Rich%20Kidd%2C%20Saukrates.mp3",
                    TrackName = "SonReal - Already There Remix ft. Rich Kidd, Saukrates",
                    TrackDescription = "Cool remix"
                },
                new TrackViewModel
                {
                    Id = 4,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/The%20Fugitives%20-%20Graffiti%20Sex.mp3",
                    TrackName = "The Fugitives - Grafitti",
                    TrackDescription = "The fugitives great"
                },
                new TrackViewModel
                {
                    Id = 5,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Seven%20Or%20Eight%20Days.mp3",
                    TrackName = "Adrian Glynn - 78 Days",
                    TrackDescription = "78 long days"
                },
                new TrackViewModel
                {
                    Id = 6,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20I%20Tried.mp3",
                    TrackName = "SonReal - I Tried",
                    TrackDescription = "Explicit version of I tried"
                },
                new TrackViewModel
                {
                    Id = 7,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/mpc/20060826%20-%20Armstrong.mp3",
                    TrackName = "Armstrong Beat",
                    TrackDescription = "Aha"
                },
                new TrackViewModel
                {
                    Id = 8,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/mpc/20090119%20-%20Untitled%20Groove.mp3",
                    TrackName = "Untitled Groove",
                    TrackDescription = "Groovy"
                },
                new TrackViewModel
                {
                    Id = 9,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/birds-in-kauai-128kbps-aac-lc.mp4",
                    TrackName = "Birds In Quay",
                    TrackDescription = "Yo yo yo"
                },
                new TrackViewModel
                {
                    Id = 10,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/20130320%20-%20Po%27ipu%20Beach%20Waves.ogg",
                    TrackName = "Beach Waves",
                    TrackDescription = "Wav format"
                }
            };

            for (var i = 0; i < 8; i++)
            {
                tracksModelList.Add(new TrackViewModel
                {
                    Id = 11 + i,
                    ImageUrl = "/Content/themes/base/images/track_img.png",
                    TrackStreamUrl = "http://no-url-available",
                    TrackName = "Mockup Track No. " + i,
                    TrackDescription = "Mockup only, no content"
                });
            }

            return tracksModelList;
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

        public List<TrackViewModel> FilterTracks(string searchString)
        {
            if (searchString == null) searchString = string.Empty;
            var mockedTracksList = RetrieveHomePageTracks();
            return mockedTracksList.Where(track => track.TrackName.Contains(searchString) || track.TrackDescription.Contains(searchString)).ToList();
        }

        public ActionResult SearchWithRefresh(string searchString)
        {
            var trackModelList = FilterTracks(searchString);
            return View(trackModelList);
        }

        //public ActionResult SearchWithRefresh(string searchString)
        //{
        //    FilterTracks(searchString);
        //    return PartialView("~/Views/Tracks/_SearchedTrackList.cshtml", filteredTracks);
        //}
    }
}
