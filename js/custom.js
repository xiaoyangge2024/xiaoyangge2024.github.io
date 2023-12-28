(function () {
  const utils = {
    pasteFn: function (e) {
      navigator.clipboard ? navigator.clipboard.readText().then((function (t) {
        t ? (e.target.value += t,
          btf.snackbarShow("粘贴成功")) : btf.snackbarShow("粘贴失败，剪切板上没有内容")
      }
      )).catch((function () {
        btf.snackbarShow("粘贴失败，请授权浏览器剪贴板权限或使用 <kbd>Ctrl</kbd> + <kbd>V</kbd>")
      }
      )) : btf.snackbarShow("粘贴失败，浏览器不支持")
    },
    commentSelect: function (e, t = "引用内容成功，欢迎留言评论...") {
      document.querySelector("#twikoo>.tk-comments>.tk-submit textarea.el-textarea__inner").value = e,
        btf.snackbarShow(t, !1, 5e3),
        custom.switchCommentMode()
    },
    applyFlink: function () {
      utils.commentSelect("name: \nlink: \navatar: \ndescr: ", "请填写友链信息...")
    },
    imageToBlob: function (e) {
      const t = new Image
        , n = document.createElement("canvas")
        , o = n.getContext("2d");
      return t.crossOrigin = "",
        t.src = e,
        new Promise((e => {
          t.onload = function () {
            n.width = this.naturalWidth,
              n.height = this.naturalHeight,
              o.drawImage(this, 0, 0),
              n.toBlob((t => {
                e(t)
              }
              ), "image/png", .75)
          }
        }
        ))
    },
    copyImage: async function (e) {
      const t = await imageToBlob(e)
        , n = new ClipboardItem({
          "image/png": t
        });
      navigator.clipboard.write([n]),
        btf.snackbarShow("复制图片成功")
    },
    downloadImage: function (e, t) {
      let n = document.createElement("a");
      n.href = e,
        n.download = t || "image.png",
        n.dispatchEvent(new MouseEvent("click")),
        btf.snackbarShow("正在下载图片...", !1, 5e3)
    }
  }
    , custom = {
      switchVisitChart: function () {
        let e = "light" === document.documentElement.getAttribute("data-theme") ? "#4C4948" : "rgba(255,255,255,0.7)";
        if (document.getElementById("date-chart") && dateOption)
          try {
            let t = dateOption;
            t.title.textStyle.color = e,
              t.visualMap.textStyle.color = e,
              dateChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
        if (document.getElementById("map-chart") && mapOption)
          try {
            let t = mapOption;
            t.title.textStyle.color = e,
              t.visualMap.textStyle.color = e,
              mapChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
        if (document.getElementById("trends-chart") && trendsOption)
          try {
            let t = trendsOption;
            t.title.textStyle.color = e,
              t.xAxis.nameTextStyle.color = e,
              t.yAxis.nameTextStyle.color = e,
              t.xAxis.axisLabel.color = e,
              t.yAxis.axisLabel.color = e,
              t.xAxis.axisLine.lineStyle.color = e,
              t.yAxis.axisLine.lineStyle.color = e,
              t.series[0].markLine.data[0].label.color = e,
              trendsChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
        if (document.getElementById("sources-chart") && sourcesOption)
          try {
            let t = sourcesOption;
            t.title.textStyle.color = e,
              t.legend.textStyle.color = e,
              t.series[0].label.color = e,
              sourcesChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
      },
      switchPostChart: function () {
        let e = "light" === document.documentElement.getAttribute("data-theme") ? "#4C4948" : "rgba(255,255,255,0.7)";
        if (document.getElementById("posts-chart") && postsOption)
          try {
            let t = postsOption;
            t.title.textStyle.color = e,
              t.xAxis.nameTextStyle.color = e,
              t.yAxis.nameTextStyle.color = e,
              t.xAxis.axisLabel.color = e,
              t.yAxis.axisLabel.color = e,
              t.xAxis.axisLine.lineStyle.color = e,
              t.yAxis.axisLine.lineStyle.color = e,
              t.series[0].markLine.data[0].label.color = e,
              postsChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
        if (document.getElementById("tags-chart") && tagsOption)
          try {
            let t = tagsOption;
            t.title.textStyle.color = e,
              t.xAxis.nameTextStyle.color = e,
              t.yAxis.nameTextStyle.color = e,
              t.xAxis.axisLabel.color = e,
              t.yAxis.axisLabel.color = e,
              t.xAxis.axisLine.lineStyle.color = e,
              t.yAxis.axisLine.lineStyle.color = e,
              t.series[0].markLine.data[0].label.color = e,
              tagsChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
        if (document.getElementById("categories-chart") && categoriesOption)
          try {
            let t = categoriesOption;
            t.title.textStyle.color = e,
              t.legend.textStyle.color = e,
              categoryParentFlag || (t.series[0].label.color = e),
              categoriesChart.setOption(t)
          } catch (e) {
            console.log(e)
          }
      },
      resizePostChart: function () {
        document.getElementById("posts-chart") && postsChart.resize(),
          document.getElementById("tags-chart") && tagsChart.resize(),
          document.getElementById("categories-chart") && categoriesChart.resize()
      },
      resizeVisitChart: function () {
        document.getElementById("date-chart") && dateChart.resize(),
          document.getElementById("map-chart") && mapChart.resize(),
          document.getElementById("trends-chart") && trendsChart.resize(),
          document.getElementById("sources-chart") && sourcesChart.resize()
      },
      showRightMenu: function (e) {
        document.getElementById("rightmenu-text") && (document.getElementById("rightmenu-text").style.display = "TEXTAREA" === rightMenuContext.tag || "INPUT" === rightMenuContext.tag || rightMenuContext.text ? "block" : "none"),
          document.getElementById("menu-copy") && (document.getElementById("menu-copy").style.display = rightMenuContext.text ? "flex" : "none"),
          document.getElementById("menu-comment") && (document.getElementById("menu-comment").style.display = document.getElementById("post-comment") && rightMenuContext.text ? "flex" : "none"),
          document.getElementById("menu-search") && (document.getElementById("menu-search").style.display = rightMenuContext.text || rightMenuContext.href ? "flex" : "none"),
          document.getElementById("menu-baidu") && (document.getElementById("menu-baidu").style.display = rightMenuContext.text || rightMenuContext.href ? "flex" : "none"),
          document.getElementById("menu-paste") && (document.getElementById("menu-paste").style.display = "TEXTAREA" === rightMenuContext.tag || "INPUT" === rightMenuContext.tag ? "flex" : "none"),
          document.getElementById("rightmenu-href") && (document.getElementById("rightmenu-href").style.display = rightMenuContext.href || rightMenuContext.src ? "block" : "none"),
          document.getElementById("menu-link") && (document.getElementById("menu-link").style.display = rightMenuContext.href || rightMenuContext.src ? "flex" : "none"),
          document.getElementById("menu-window") && (document.getElementById("menu-window").style.display = rightMenuContext.href || rightMenuContext.src ? "flex" : "none"),
          document.getElementById("menu-copy-image") && (document.getElementById("menu-copy-image").style.display = rightMenuContext.src ? "flex" : "none"),
          document.getElementById("menu-download-image") && (document.getElementById("menu-download-image").style.display = rightMenuContext.src ? "flex" : "none"),
          document.getElementById("rightmenu-mode") && (document.getElementById("rightmenu-mode").style.display = "TEXTAREA" === rightMenuContext.tag || "INPUT" === rightMenuContext.tag || rightMenuContext.text || rightMenuContext.href || rightMenuContext.src ? "none" : "block"),
          document.getElementById("rightmenu-post") && (document.getElementById("rightmenu-post").style.display = "TEXTAREA" === rightMenuContext.tag || "INPUT" === rightMenuContext.tag || rightMenuContext.text || rightMenuContext.href || rightMenuContext.src ? "none" : "block"),
          document.getElementById("rightmenu-site") && (document.getElementById("rightmenu-site").style.display = "block"),
          document.getElementById("rightmenu-mask") && (document.getElementById("rightmenu-mask").style.display = e ? "block" : "none"),
          document.getElementById("rightmenu") && (document.getElementById("rightmenu").style.display = e ? "block" : "none")
      },
      switchCommentMode: function () {
        if (document.body.clientWidth > 900) {
          let e = document.body.classList;
          e.contains("comment-mode") ? (e.remove("comment-mode"),
            document.querySelector("#twikoo>.tk-comments>.tk-submit textarea.el-textarea__inner")?.blur()) : (e.add("comment-mode"),
              document.querySelector("#twikoo>.tk-comments>.tk-submit textarea.el-textarea__inner")?.focus())
        } else
          document.querySelector("#twikoo>.tk-comments>.tk-submit textarea.el-textarea__inner")?.focus()
      }
    }
    , rightMenuContext = {
      event: void 0,
      tag: void 0,
      text: void 0,
      href: void 0,
      src: void 0
    };
  window.oncontextmenu = function (e) {
    // browser.versions.mobile ||
    if (e.ctrlKey || document.body.clientWidth < 900)
      return;
    saveToLocal.get("notice-rightmenu") || (btf.snackbarShow("唤醒原系统菜单请使用：<kbd>Ctrl</kbd> + <kbd>右键</kbd>", !1, 5e3),
      saveToLocal.set("notice-rightmenu", !0, 2)),
      rightMenuContext.event = e,
      rightMenuContext.tag = e.target.tagName,
      rightMenuContext.text = document.selection ? document.selection.createRange().text : window.getSelection().toString(),
      rightMenuContext.href = e.target.href,
      rightMenuContext.src = e.target.currentSrc,
      custom.showRightMenu(!0),
      $rightMenu = document.getElementById("rightmenu");
    let t = $rightMenu.clientWidth
      , n = $rightMenu.clientHeight
      , o = e.clientX + 10
      , i = e.clientY;
    return o + t > window.innerWidth && (o -= t + 10),
      i + n > window.innerHeight && (i -= i + n - window.innerHeight),
      $rightMenu.style.left = o + "px",
      $rightMenu.style.top = i + "px",
      !1
  }
    ,
    document.addEventListener("copy", (function () {
      btf.snackbarShow(GLOBAL_CONFIG.copy.success)
    }
    )),
    window.addEventListener("click", (function () {
      custom.showRightMenu(!1)
    }
    )),
    document.getElementById("rightmenu-mask") && document.getElementById("rightmenu-mask").addEventListener("mousewheel", (function () {
      custom.showRightMenu(!1)
    }
    )),
    document.getElementById("rightmenu") && document.getElementById("rightmenu").addEventListener("mousewheel", (function () {
      custom.showRightMenu(!1)
    }
    )),
    document.getElementById("menu-copy") && (document.getElementById("menu-copy").onclick = function () {
      btf.copyFn(rightMenuContext.text)
    }
    ),
    document.getElementById("menu-paste") && (document.getElementById("menu-paste").onclick = function () {
      utils.pasteFn(rightMenuContext.event)
    }
    ),
    document.getElementById("menu-comment") && (document.getElementById("menu-comment").onclick = function () {
      utils.commentSelect("> " + rightMenuContext.text + "\n\n")
    }
    ),
    document.getElementById("menu-baidu") && (document.getElementById("menu-baidu").onclick = function () {
      window.open("https://www.baidu.com/s?wd=" + rightMenuContext.text)
    }
    ),
    document.getElementById("menu-share") && (document.getElementById("menu-share").onclick = function () {
      btf.copyFn(window.location.href.split("#")[0])
    }
    ),
    document.getElementById("menu-link") && (document.getElementById("menu-link").onclick = function () {
      btf.copyFn(rightMenuContext.href || rightMenuContext.src)
    }
    ),
    document.getElementById("menu-window") && (document.getElementById("menu-window").onclick = function () {
      window.open(rightMenuContext.href || rightMenuContext.src)
    }
    ),
    document.getElementById("menu-copy-image") && (document.getElementById("menu-copy-image").onclick = function () {
      utils.copyImage(rightMenuContext.src)
    }
    ),
    document.getElementById("menu-download-image") && (document.getElementById("menu-download-image").onclick = function () {
      utils.downloadImage(rightMenuContext.src, rightMenuContext.src.split("/").pop())
    }
    );

  // 天气
  function loadWeatherWidget (a, h, g, f, e, d, c, b) {
    b = function () {
      d = h.createElement(g);
      c = h.getElementsByTagName(g)[0];
      d.src = e;
      d.charset = "utf-8";
      d.async = 1;
      c.parentNode.insertBefore(d, c);
      console.log('已挂载天气script');
      setTimeout(() => {
        let clone = document.querySelector('#tp-weather-widget').cloneNode(true)
        // console.log(clone.innerHTML);
        localStorage.setItem('CloneWeather', clone.innerHTML)
        // console.log(clone);
      }, 1500)
    };

    a["SeniverseWeatherWidgetObject"] = f;
    a[f] || (a[f] = function () {
      (a[f].q = a[f].q || []).push(arguments);
    });

    a[f].l = +new Date();

    if (a.attachEvent) {
      a.attachEvent("onload", b);
    } else {
      a.addEventListener("load", b, false);
    }
  }

  loadWeatherWidget(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10));

  window.SeniverseWeatherWidget('show', {
    flavor: "slim",
    location: "WX4FBXXFKE4F",
    geolocation: true,
    language: "zh-Hans",
    unit: "c",
    theme: "auto",
    token: "d0dddc2b-420a-468d-8795-77adc04747e7",
    hover: "enabled",
    container: "tp-weather-widget"
  });





  let layoutMet = document.querySelector('#layoutMet')

  function initLayoutMet () {
    let = timer = setInterval(() => {
      try {
        if (window.location.pathname.includes('/music/')) {
          document.querySelector('#layoutMet').style.display = 'none'
        } else {
          document.querySelector('#layoutMet').style.display = 'block'
        }
        const ap = document.querySelector('#layoutMet').querySelector("meting-js").aplayer
        ap.lrc.hide()
        if (ap.lrc) clearInterval(timer)
      } catch (e) {
        console.log(e);
      }
    }, 500)
  }

  window.addEventListener('load', function () {
    initLayoutMet()
  })

  initLayoutMet()

  const obj = {
    addlisUrlHandel: function () {
      let timer = setInterval(() => {
        if (window.location.pathname.includes('/music/')) {
          document.querySelector('#layoutMet').style.display = 'none'
        } else {
          // loadWeatherWidget(window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" + parseInt((new Date().getTime() / 100000000).toString(), 10));
          document.querySelector('#layoutMet').style.display = 'block'

        }
        if (document.querySelector('#layoutMet').style.display === 'block') {
          document.querySelector('#layoutMet').style.display = 'block'
          // reRenderWeatherWidget()
          clearInterval(timer)
        }
        // console.log('ok');
      }, 1000)
    },
    addlisUrlHandel2: function () {
      let timer = setInterval(() => {
        // console.log(localStorage.getItem('CloneWeather'));
        document.querySelector('#tp-weather-widget').remove()
        const dom = document.createElement('span')
        dom.id = 'tp-weather-widget'
        dom.innerHTML = localStorage.getItem('CloneWeather')
        document.querySelector('#blog-info').appendChild(dom)
        if (localStorage.getItem('CloneWeather') === document.querySelector('#tp-weather-widget').innerHTML) {
          clearInterval(timer)
          console.log('结束');
        }
        // if (localStorage.getItem('CloneWeather')) clearInterval(timer)
      }, 5000)
    }
  }
  // obj.addlisUrlHandel()
  // obj.addlisUrlHandel2()


  //- 渲染网络词语
  const msgAll = document.querySelectorAll('.notice-item-msg')
  msgAll.forEach(msg => {
    if (msg.innerText.includes('http')) {
      fetch(msg.innerText)
        .then(response => response.json())
        .then(data => {
          // 处理返回的数据
          msg.innerText = data.hitokoto;
          if (msg.previousElementSibling) {
            msg.previousElementSibling.innerText = `【${data.from}】`
          }
        })
        .catch(error => {
          // 处理错误
          console.error('Error:', error);
        });
    }
  })

  // 消除控制台打印
  var HoldLog = console.log;
  console.log = function () { };
  let now1 = new Date();
  queueMicrotask(() => {
    const Log = function () {
      HoldLog.apply(console, arguments);
    }; //在恢复前输出日志
    now1.setTime(now1.getTime() + 250);
    const ascll = [
      `
  ██╗  ██╗██╗ █████╗  ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗ ██████╗
  ╚██╗██╔╝██║██╔══██╗██╔═══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║██╔════╝
   ╚███╔╝ ██║███████║██║   ██║ ╚████╔╝ ███████║██╔██╗ ██║██║  ███╗
   ██╔██╗ ██║██╔══██║██║   ██║  ╚██╔╝  ██╔══██║██║╚██╗██║██║   ██║
  ██╔╝ ██╗██║██║  ██║╚██████╔╝   ██║   ██║  ██║██║ ╚████║╚██████╔╝
  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝
      `
    ];
    setTimeout(
      Log.bind(
        console,
        `%c${ascll[0]}`,
        "color:#1677b3",
      )
    );
  });

})()