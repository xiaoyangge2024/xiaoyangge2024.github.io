const btf = {
  switchReadMode: function () {
    const e = document.body;
    if (e.classList.contains("read-mode"))
      return e.classList.remove("read-mode"),
        document.querySelector("#menu-readmode>span") && (document.querySelector("#menu-readmode>span").innerHTML = "阅读模式"),
        void btf.snackbarShow("已关闭阅读模式");
    e.classList.add("read-mode"),
      document.querySelector("#menu-readmode>span") && (document.querySelector("#menu-readmode>span").innerHTML = "退出阅读"),
      btf.snackbarShow("已开启阅读模式")
  },
  switchDarkMode: function () {
    "light" === ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light") ? (activateDarkMode(),
      saveToLocal.set("theme", "dark", 2),
      void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)) : (activateLightMode(),
        saveToLocal.set("theme", "light", 2),
        void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),
      "function" == typeof utterancesTheme && utterancesTheme(),
      "object" == typeof FB && window.loadFBComment(),
      window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout((() => window.disqusReset()), 200)
  },
  hideAsideBtn: function () {
    const e = document.documentElement.classList;
    e.contains("hide-aside") ? (saveToLocal.set("aside-status", "show", 2),
      document.querySelector("#menu-hideside>span").innerHTML = "隐藏侧栏",
      btf.snackbarShow("已显示侧边栏")) : (saveToLocal.set("aside-status", "hide", 2),
        document.querySelector("#menu-hideside>span").innerHTML = "显示侧栏",
        btf.snackbarShow("已隐藏侧边栏")),
      e.toggle("hide-aside")
  },
  adjustFontSize: function (e) {
    const t = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--global-font-size"));
    let n = "";
    if (e) {
      if (t >= 20)
        return;
      n = t + 1,
        document.documentElement.style.setProperty("--global-font-size", n + "px"),
        !document.getElementById("nav").classList.contains("hide-menu") && adjustMenu(!0)
    } else {
      if (t <= 10)
        return;
      n = t - 1,
        document.documentElement.style.setProperty("--global-font-size", n + "px"),
        document.getElementById("nav").classList.contains("hide-menu") && adjustMenu(!0)
    }
    saveToLocal.set("global-font-size", n, 2)
  },
  copyFn: function (e) {
    navigator.clipboard.writeText(e),
      btf.snackbarShow(GLOBAL_CONFIG.copy.success)
  },
  debounce: function (e, t, n) {
    let o;
    return function () {
      const a = this
        , i = arguments
        , s = function () {
          o = null,
            n || e.apply(a, i)
        }
        , r = n && !o;
      clearTimeout(o),
        o = setTimeout(s, t),
        r && e.apply(a, i)
    }
  },
  throttle: function (e, t, n) {
    let o, a, i, s = 0;
    n || (n = {});
    const r = function () {
      s = !1 === n.leading ? 0 : (new Date).getTime(),
        o = null,
        e.apply(a, i),
        o || (a = i = null)
    };
    return function () {
      const d = (new Date).getTime();
      s || !1 !== n.leading || (s = d);
      const c = t - (d - s);
      a = this,
        i = arguments,
        c <= 0 || c > t ? (o && (clearTimeout(o),
          o = null),
          s = d,
          e.apply(a, i),
          o || (a = i = null)) : o || !1 === n.trailing || (o = setTimeout(r, c))
    }
  },
  sidebarPaddingR: () => {
    const e = window.innerWidth
      , t = document.body.clientWidth
      , n = e - t;
    e !== t && (document.body.style.paddingRight = n + "px")
  }
  ,
  snackbarShow: (e, t = !1, n = 2e3) => {
    console.log(GLOBAL_CONFIG);
    document.styleSheets[0].addRule(":root", `--snackbar-time: ${n / 1e3}s;`);
    const { position: o, bgLight: a, bgDark: i } = GLOBAL_CONFIG.Snackbar
      , s = "light" === document.documentElement.getAttribute("data-theme") ? a : i;
    Snackbar.show({
      text: e,
      backgroundColor: s,
      showAction: t,
      duration: n,
      pos: o,
      customClass: "snackbar-css"
    })
  }
  ,
  diffDate: (e, t = !1) => {
    const n = new Date
      , o = new Date(e)
      , a = n.getTime() - o.getTime()
      , i = 36e5
      , s = 24 * i
      , { dateSuffix: r } = GLOBAL_CONFIG;
    if (!t)
      return parseInt(a / s);
    const d = a / 2592e6
      , c = a / s
      , l = a / i
      , u = a / 6e4;
    return d > 12 ? o.toISOString().slice(0, 10) : d >= 1 ? `${parseInt(d)} ${r.month}` : c >= 1 ? `${parseInt(c)} ${r.day}` : l >= 1 ? `${parseInt(l)} ${r.hour}` : u >= 1 ? `${parseInt(u)} ${r.min}` : r.just
  }
  ,
  loadComment: (e, t) => {
    if ("IntersectionObserver" in window) {
      const n = new IntersectionObserver((e => {
        e[0].isIntersecting && (t(),
          n.disconnect())
      }
      ), {
        threshold: [0]
      });
      n.observe(e)
    } else
      t()
  }
  ,
  scrollToDest: (e, t = 500) => {
    const n = window.pageYOffset
      , o = document.getElementById("page-header").classList.contains("fixed");
    if ((n > e || o) && (e -= 70),
      "scrollBehavior" in document.documentElement.style)
      return void window.scrollTo({
        top: e,
        behavior: "smooth"
      });
    let a = null;
    e = +e,
      window.requestAnimationFrame((function o (i) {
        a = a || i;
        const s = i - a;
        n < e ? window.scrollTo(0, (e - n) * s / t + n) : window.scrollTo(0, n - (n - e) * s / t),
          s < t ? window.requestAnimationFrame(o) : window.scrollTo(0, e)
      }
      ))
  }
  ,
  animateIn: (e, t) => {
    e.style.display = "block",
      e.style.animation = t
  }
  ,
  animateOut: (e, t) => {
    e.addEventListener("animationend", (function t () {
      e.style.display = "",
        e.style.animation = "",
        e.removeEventListener("animationend", t)
    }
    )),
      e.style.animation = t
  }
  ,
  getParents: (e, t) => {
    for (; e && e !== document; e = e.parentNode)
      if (e.matches(t))
        return e;
    return null
  }
  ,
  siblings: (e, t) => [...e.parentNode.children].filter((n => t ? n !== e && n.matches(t) : n !== e)),
  wrap: (e, t, n) => {
    const o = document.createElement(t);
    for (const [e, t] of Object.entries(n))
      o.setAttribute(e, t);
    e.parentNode.insertBefore(o, e),
      o.appendChild(e)
  }
  ,
  unwrap: e => {
    const t = e.parentNode;
    t && t !== document.body && t.replaceChild(e, t)
  }
  ,
  isHidden: e => 0 === e.offsetHeight && 0 === e.offsetWidth,
  getEleTop: e => {
    let t = e.offsetTop
      , n = e.offsetParent;
    for (; null !== n;)
      t += n.offsetTop,
        n = n.offsetParent;
    return t
  }
  ,
  loadLightbox: e => {
    const t = GLOBAL_CONFIG.lightbox;
    "mediumZoom" === t && mediumZoom(e, {
      background: "var(--zoom-bg)"
    }),
      "fancybox" === t && (e.forEach((e => {
        if ("A" !== e.parentNode.tagName) {
          const t = e.dataset.lazySrc || e.src
            , n = e.title || e.alt || "";
          btf.wrap(e, "a", {
            href: t,
            "data-fancybox": "gallery",
            "data-caption": n,
            "data-thumb": t
          })
        }
      }
      )),
        window.fancyboxRun || (Fancybox.bind("[data-fancybox]", {
          Hash: !1,
          Thumbs: {
            showOnStart: !1
          },
          Images: {
            Panzoom: {
              maxScale: 4
            }
          },
          Carousel: {
            transition: "slide"
          },
          Toolbar: {
            display: {
              left: ["infobar"],
              middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
              right: ["slideshow", "thumbs", "close"]
            }
          }
        }),
          window.fancyboxRun = !0))
  }
  ,
  initJustifiedGallery: function (e) {
    const t = e => {
      btf.isHidden(e) || fjGallery(e, {
        itemSelector: ".fj-gallery-item",
        rowHeight: e.getAttribute("data-rowHeight"),
        gutter: 4,
        onJustify: function () {
          this.$container.style.opacity = "1"
        }
      })
    }
      ;
    0 === Array.from(e).length ? t(e) : e.forEach((e => {
      t(e)
    }
    ))
  },
  updateAnchor: e => {
    if (e !== window.location.hash) {
      e || (e = location.pathname);
      const t = GLOBAL_CONFIG_SITE.title;
      window.history.replaceState({
        url: location.href,
        title: t
      }, t, e)
    }
  }
  ,
  getScrollPercent: (e, t) => {
    const n = t.clientHeight
      , o = document.documentElement.clientHeight
      , a = (e - t.offsetTop) / (n > o ? n - o : document.documentElement.scrollHeight - o)
      , i = Math.round(100 * a);
    return i > 100 ? 100 : i <= 0 ? 0 : i
  }
  ,
  addModeChange: (e, t) => {
    window.themeChange && window.themeChange[e] || (window.themeChange = {
      ...window.themeChange,
      [e]: t
    })
  }
};
