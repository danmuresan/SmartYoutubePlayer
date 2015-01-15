using System.Collections.Generic;
using System.Web.Mvc;
using OnlinePlayerSample.Models;

namespace OnlinePlayerSample.Controllers
{
    public class PlayerController : Controller
    {
        public ActionResult HorizontalPlaylist()
        {
            var playlistTracks = RetrieveMockedPlaylistTracks();

            return PartialView("_HorizontalPlaylist", playlistTracks);
        }

        public ActionResult FullWidthPlayer()
        {
            var playlistTracks = RetrieveMockedPlaylistTracks();

            return PartialView("_FullWidthPlayer", playlistTracks);
        }

        public JsonResult GetTrackById(int trackId)
        {
            var mockupTracks = RetrieveMockedPlaylistTracks();

            var trackToRetrieve = mockupTracks.Find(track => track.Id == trackId);

            return Json(trackToRetrieve, JsonRequestBehavior.AllowGet);
        }

        private List<TrackViewModel> RetrieveMockedPlaylistTracks()
        {
            // Mock up 10 tracks for now
            var tracksModelList = new List<TrackViewModel>
            {
                new TrackViewModel
                {
                    Id = 1,
                    ImageUrl = "/Content/themes/base/images/Chrysanthemum.jpg",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20LA%20%28Prod%20Chin%20Injetti%29.mp3",
                    TrackName = "SonReal - LA (Explicit)",
                    TrackDescription = "Explicit version of LA"
                },
                new TrackViewModel
                {
                    Id = 2,
                    ImageUrl = "/Content/themes/base/images/Desert.jpg",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20People%20Asking.mp3",
                    TrackName = "SonReal - People Asking",
                    TrackDescription = "Explicit version of people asking"
                },
                new TrackViewModel
                {
                    Id = 3,
                    ImageUrl = "/Content/themes/base/images/Chrysanthemum.jpg",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20Already%20There%20Remix%20ft.%20Rich%20Kidd%2C%20Saukrates.mp3",
                    TrackName = "SonReal - Already There Remix ft. Rich Kidd, Saukrates",
                    TrackDescription = "Cool remix"
                },
                new TrackViewModel
                {
                    Id = 4,
                    ImageUrl = "/Content/themes/base/images/Desert.jpg",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/The%20Fugitives%20-%20Graffiti%20Sex.mp3",
                    TrackName = "The Fugitives - Grafitti",
                    TrackDescription = "The fugitives great"
                },
                new TrackViewModel
                {
                    Id = 5,
                    ImageUrl = "/Content/themes/base/images/Chrysanthemum.jpg",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Seven%20Or%20Eight%20Days.mp3",
                    TrackName = "Adrian Glynn - 78 Days",
                    TrackDescription = "78 long days"
                },
                new TrackViewModel
                {
                    Id = 6,
                    ImageUrl = "/Content/themes/base/images/Desert.jpg",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/SonReal%20-%20I%20Tried.mp3",
                    TrackName = "SonReal - I Tried",
                    TrackDescription = "Explicit version of I tried"
                },
                new TrackViewModel
                {
                    Id = 7,
                    ImageUrl = "/Content/themes/base/images/Chrysanthemum.jpg",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/mpc/20060826%20-%20Armstrong.mp3",
                    TrackName = "Armstrong Beat",
                    TrackDescription = "Aha"
                },
                new TrackViewModel
                {
                    Id = 8,
                    ImageUrl = "/Content/themes/base/images/Desert.jpg",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/mpc/20090119%20-%20Untitled%20Groove.mp3",
                    TrackName = "Untitled Groove",
                    TrackDescription = "Groovy"
                },
                new TrackViewModel
                {
                    Id = 9,
                    ImageUrl = "/Content/themes/base/images/Chrysanthemum.jpg",
                    TrackStreamUrl = "http://freshly-ground.com/data/audio/sm2/birds-in-kauai-128kbps-aac-lc.mp4",
                    TrackName = "Birds In Quay",
                    TrackDescription = "Yo yo yo"
                },
                new TrackViewModel
                {
                    Id = 10,
                    ImageUrl = "/Content/themes/base/images/Desert.jpg",
                    TrackStreamUrl =
                        "http://freshly-ground.com/data/audio/sm2/20130320%20-%20Po%27ipu%20Beach%20Waves.ogg",
                    TrackName = "Beach Waves",
                    TrackDescription = "Wav format"
                }
            };

            return tracksModelList;
        }

    }
}
