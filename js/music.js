var anzhiyu = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    if (window.location.pathname != "/music/") {
      return;
    }
    const anMusicBg = document.getElementById("an_music_bg");

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(() => {
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        // 确保player加载完成
        // console.info(anMusicBg);
        if (musiccover) {
          clearInterval(timer);
          // console.log(musiccover);
          anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          // 绑定事件
          anzhiyu.addEventListenerChangeMusicBg();

          // 暂停nav的音乐
          // if (
          //   document.querySelector("#nav-music meting-js").aplayer &&
          //   !document.querySelector("#nav-music meting-js").aplayer.audio.paused
          // ) {
          //   anzhiyu.musicToggle();
          // }
        }
      }, 100);
    }
  },
  addEventListenerChangeMusicBg: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const bgMask = document.createElement('div')
    bgMask.id = 'bgMask'
    anMusicPage.querySelector('.aplayer').insertBefore(bgMask, anMusicPage.querySelector(".aplayer-list"))
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
    // console.log(anMusicPage.querySelector("meting-js").aplayer.audio);
    /**
     * 监听暂停
     */
    anMusicPage.querySelector("meting-js").aplayer.audio.addEventListener("pause", function () {
      // 处理音频暂停的逻辑
      console.log('pause');
      console.log(document.querySelector('.aplayer-lrc'));


    });

    /**
     * 自动滚动到歌词播放位置
     */
    function animate () {
      document.querySelector('.aplayer-lrc').scrollTo({
        top: document.querySelector('.aplayer-lrc-current').offsetTop - document.querySelector('.aplayer-lrc-contents').style.transform.split('translateY(').join('').replace('-', '').replace('px)', '') - 80, // 滚动到顶部位置
        left: 0, // 滚动到左侧位置
        behavior: "smooth" // 平滑滚动效果
      });
    }


    /**
     * 滚动后自动滚动到播放位置
     */
    let timer = null;
    let isTouch = false;
    document.querySelector('.aplayer-lrc').addEventListener('scroll', function () {
      if (timer) {
        clearTimeout(timer)
        isTouch = true
      }
      timer = setTimeout(() => {
        animate()
      }, 1000)
    })

    document.querySelector('.aplayer-lrc').addEventListener('touchstart', function (event) {
      // 手指触摸屏幕时触发的逻辑
      isTouch = true
    });


    /**
     * 歌词进度发生变化滚动到播放位置
     */
    anMusicPage.querySelector("meting-js").aplayer.audio.addEventListener("timeupdate", function () {
      // var progress = (audio.currentTime / audio.duration) * 100;
      // if (timer) clearTimeout(timer)
      if (!isTouch) {
        // timer = setTimeout(() => {
        animate()
        // }, 600)
      }
    });

    anMusicPage.querySelector("meting-js").aplayer.audio.addEventListener("play", function () {
      // 处理音频播放的逻辑
      console.log('play');
      document.querySelector('.aplayer-lrc').scrollTo({
        top: document.querySelector('.aplayer-lrc-current').offsetTop - document.querySelector('.aplayer-lrc-contents').style.transform.split('translateY(').join('').replace('-', '').replace('px)', '') - 90, // 滚动到顶部位置
        left: 0, // 滚动到左侧位置
        behavior: "smooth", // 平滑滚动效果
      });
    });
    anMusicPage.querySelector("meting-js").aplayer.on("loadeddata", function () {
      anzhiyu.changeMusicBg();
      console.info("player loadeddata");
    });

    aplayerIconMenu.addEventListener("click", function () {
      // document.getElementById("menu-mask").style.display = "block";
      // document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";

      bgMask.style.display = "block";
      bgMask.style.animation = "0.5s ease 0s 1 normal none running to_show";
    });

    bgMask.addEventListener("click", function (e) {
      if (window.location.pathname != "/music/") return;
      anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
      bgMask.style.display = "none";
    });
  },
};

// 调用
anzhiyu.changeMusicBg(false);