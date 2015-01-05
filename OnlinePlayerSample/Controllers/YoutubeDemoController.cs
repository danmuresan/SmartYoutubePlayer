using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using YoutubeExtractor;

namespace OnlinePlayerSample.Controllers
{
    public class YoutubeDemoController : Controller
    {
        /// <summary>
        /// See https://github.com/flagbug/YoutubeExtractor/blob/master/YoutubeExtractor/ExampleApplication/Program.cs for more details
        /// </summary>
        private const string sampleLink = "http://www.youtube.com/watch?v=O3UBOOZw-FE";

        public ActionResult YoutubeExtract()
        {
            var videoInfos = DownloadUrlResolver.GetDownloadUrls(sampleLink, false);

            DownloadAudioSampleFromYoutube(videoInfos);

            return RedirectToAction("Index", "Home");
        }

        private static void DownloadAudioSampleFromYoutube(IEnumerable<VideoInfo> videoInfos)
        {
            var videoInfo = videoInfos.Where(vInfo => vInfo.CanExtractAudio)
                                            .OrderByDescending(vInfo => vInfo.AudioBitrate)
                                            .First();

            if (videoInfo.RequiresDecryption)
            {
                DownloadUrlResolver.DecryptDownloadUrl(videoInfo);
            }

            var audioSavePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), RemoveIllegalPathCharacters(videoInfo.Title) + videoInfo.VideoExtension);
            var videoDownloader = new AudioDownloader(videoInfo, audioSavePath);

            videoDownloader.DownloadProgressChanged += (sender, args) => Console.WriteLine(args.ProgressPercentage);

            videoDownloader.Execute();
        }

        private static string RemoveIllegalPathCharacters(string path)
        {
            string regexSearch = new string(Path.GetInvalidFileNameChars()) + new string(Path.GetInvalidPathChars());
            var r = new Regex(string.Format("[{0}]", Regex.Escape(regexSearch)));
            return r.Replace(path, "");
        }

    }
}
