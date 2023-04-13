chrome.contextMenus.create({
  title: "Tiktok Downloader",
  type: "normal",
  id: "tiktok",
});

chrome.contextMenus.onClicked.addListener(function (t) {
  let videoUrl = t.pageUrl;

  function download(url) {
    // 发送API请求
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let downloadUrl = data.aweme_list[0].video.play_addr.url_list[0];
        //打开新标签页下载
        chrome.tabs.create({ url: downloadUrl });
      })
      .catch((error) => {
        alert(error);
      });
  }

  if (t.pageUrl.includes("tiktok")) {
    let downloadUrl = `https://api.douyin.wtf/tiktok_video_data/?tiktok_video_url=${videoUrl}`;
    download(downloadUrl);
  } else if (t.pageUrl.includes("douyin")) {
    let downloadUrl = `https://api.douyin.wtf/douyin_video_data/?douyin_video_url=${videoUrl}`;
    console.log(downloadUrl);
    download(downloadUrl);
  }
});
