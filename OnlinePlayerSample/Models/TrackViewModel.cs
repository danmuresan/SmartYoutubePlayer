using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlinePlayerSample.Models
{
    public class TrackViewModel
    {
        // This is provisory, and depending on which API we will use for streaming, we will choose a 
        // reliable way in which to extract track metadata here
        // stuff like Artist, Album, Ratings, Track Infos should be considered at data (model) level

        public int Id { get; set; }
        public string TrackName { get; set; }
        public string TrackDescription { get; set; }
        public string TrackStreamUrl { get; set; }
        public string ImageUrl { get; set; }

    }
}