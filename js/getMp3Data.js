function getFile(e) {ID3v2.handleFiles(e, getMP3Data)}function getURL(e) {ID3v2.parseURL(e, getMP3Data)}function htmlId(e) {  return document.getElementById(e)}function getMP3Data(e) {var a, t;return (mp3 = ID3v2.MP3Data(e),mp3.Lyrics ? (htmlId("lyrics").style.display = "", a = mp3.Lyrics) : (htmlId("lyrics").style.display = "none", a = ""),mp3.Pictures ? (htmlId("pic").style.display = "", t = mp3.Pictures) : (htmlId("pic").style.display = "none", t = ""),htmlId("pic").src = t,htmlId("pic").title = t,htmlId("title").value = mp3.Title,htmlId("title").title = mp3.Title,htmlId("album").value = mp3.Album,htmlId("album").title = mp3.Album,htmlId("trackno").value = mp3.TrackNo,htmlId("trackno").title = mp3.TrackNo,htmlId("lead").value = mp3.Artist,htmlId("lead").title = mp3.Artist,htmlId("genre").value = mp3.Genre,htmlId("genre").title = mp3.Genre,htmlId("duration").value = mp3.Duration,htmlId("duration").title = mp3.Duration,htmlId("lyrics").innerText = a,htmlId("lyrics").title = a)}