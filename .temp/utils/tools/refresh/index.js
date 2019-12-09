/*!
 * version 1.4.1 MIT
 * 2019-2-1 wenju
 * http://www.mescroll.com
 */
(function (a, b) {
  if (typeof define === "function") {
    define(b);
  } else {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = b();
    } else {
      this[a] = b();
    }
  }
})("MeScroll", function () {
  var a = function (b, e) {
    var h = this;h.version = "1.4.0";h.isScrollBody = !b || b === "body";h.scrollDom = h.isScrollBody ? document.body : h.getDomById(b);if (!h.scrollDom) {
      return;
    }h.options = e || {};var d = navigator.userAgent;var c = !!d.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);var i = typeof window.orientation === "undefined";var g = d.indexOf("Android") > -1 || d.indexOf("Adr") > -1;h.os = { ios: c, pc: i, android: g };h.isDownScrolling = false;h.isUpScrolling = false;var f = h.options.down && h.options.down.callback;h.initDownScroll();h.initUpScroll();setTimeout(function () {
      if (h.optDown.use && h.optDown.auto && f) {
        if (h.optDown.autoShowLoading) {
          h.triggerDownScroll();
        } else {
          h.optDown.callback && h.optDown.callback(h);
        }
      }h.optUp.use && h.optUp.auto && !h.isUpAutoLoad && h.triggerUpScroll();
    }, 30);
  };a.prototype.extendDownScroll = function (b) {
    a.extend(b, { use: true, auto: true, autoShowLoading: false, isLock: false, isBoth: false, offset: 80, inOffsetRate: 1, outOffsetRate: 0.2, bottomOffset: 20, minAngle: 45, hardwareClass: "mescroll-hardware", mustToTop: false, warpId: null, warpClass: "mescroll-downwarp", resetClass: "mescroll-downwarp-reset", textInOffset: "下拉刷新", textOutOffset: "释放更新", textLoading: "加载中 ...", htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip"></p>', inited: function (d, c) {
        d.downTipDom = c.getElementsByClassName("downwarp-tip")[0];d.downProgressDom = c.getElementsByClassName("downwarp-progress")[0];
      }, inOffset: function (c) {
        if (c.downTipDom) {
          c.downTipDom.innerHTML = c.optDown.textInOffset;
        }if (c.downProgressDom) {
          c.downProgressDom.classList.remove("mescroll-rotate");
        }
      }, outOffset: function (c) {
        if (c.downTipDom) {
          c.downTipDom.innerHTML = c.optDown.textOutOffset;
        }
      }, onMoving: function (d, f, c) {
        if (d.downProgressDom) {
          var e = 360 * f;d.downProgressDom.style.webkitTransform = "rotate(" + e + "deg)";d.downProgressDom.style.transform = "rotate(" + e + "deg)";
        }
      }, beforeLoading: function (d, c) {
        return false;
      }, showLoading: function (c) {
        if (c.downTipDom) {
          c.downTipDom.innerHTML = c.optDown.textLoading;
        }if (c.downProgressDom) {
          c.downProgressDom.classList.add("mescroll-rotate");
        }
      }, afterLoading: function (c) {
        return 0;
      }, callback: function (c) {
        c.resetUpScroll();
      } });
  };a.prototype.extendUpScroll = function (b) {
    var c = this.os.pc;a.extend(b, { use: true, auto: true, isLock: false, isBoth: false, isBounce: true, callback: null, page: { num: 0, size: 10, time: null }, noMoreSize: 5, offset: 100, toTop: { warpId: null, src: null, html: null, offset: 1000, warpClass: "mescroll-totop", showClass: "mescroll-fade-in", hideClass: "mescroll-fade-out", fadeDuration: 0.5, duration: 300, supportTap: false, btnClick: null }, loadFull: { use: false, delay: 500 }, empty: { warpId: null, icon: null, tip: "暂无相关数据~", btntext: "", btnClick: null, supportTap: false }, clearId: null, clearEmptyId: null, hardwareClass: "mescroll-hardware", warpId: null, warpClass: "mescroll-upwarp", htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', htmlNodata: '<p class="upwarp-nodata">-- END --</p>', inited: function (d, e) {}, showLoading: function (d, e) {
        e.innerHTML = d.optUp.htmlLoading;
      }, showNoMore: function (d, e) {
        e.innerHTML = d.optUp.htmlNodata;
      }, onScroll: null, scrollbar: { use: c, barClass: "mescroll-bar" }, lazyLoad: { use: false, attr: "imgurl", showClass: "mescroll-lazy-in", delay: 500, offset: 200 } });
  };a.extend = function (d, b) {
    if (!d) {
      return b;
    }for (var c in b) {
      if (d[c] == null) {
        d[c] = b[c];
      } else {
        if (typeof d[c] === "object") {
          a.extend(d[c], b[c]);
        }
      }
    }return d;
  };a.prototype.initDownScroll = function () {
    var c = this;c.optDown = c.options.down || {};c.extendDownScroll(c.optDown);c.touchstartEvent = function (f) {
      if (c.isScrollTo) {
        c.preventDefault(f);
      }c.startPoint = c.getPoint(f);c.lastPoint = c.startPoint;c.maxTouchmoveY = c.getBodyHeight() - c.optDown.bottomOffset;c.inTouchend = false;var d = c.getScrollTop();c.isKeepTop = d === 0;if (c.os.pc && d <= 0) {
        c.scrollDom.addEventListener("mousemove", c.touchmoveEvent, { passive: false });document.ondragstart = function () {
          return false;
        };
      }
    };c.scrollDom.addEventListener("mousedown", c.touchstartEvent);c.scrollDom.addEventListener("touchstart", c.touchstartEvent);c.touchmoveEvent = function (l) {
      if (!c.startPoint) {
        return;
      }var d = c.getScrollTop();if (d > 0) {
        c.isKeepTop = false;
      }var h = c.getPoint(l);var f = h.y - c.startPoint.y;if (f > 0) {
        if (d <= 0) {
          c.preventDefault(l);if (c.optDown.use && !c.inTouchend && !c.isDownScrolling && !c.optDown.isLock && (!c.isUpScrolling || c.isUpScrolling && c.optUp.isBoth)) {
            if (c.optDown.mustToTop && !c.isKeepTop) {
              return;
            }var o = Math.abs(c.lastPoint.x - h.x);var n = Math.abs(c.lastPoint.y - h.y);var m = Math.sqrt(o * o + n * n);if (m !== 0) {
              var g = Math.asin(n / m) / Math.PI * 180;if (g < c.optDown.minAngle) {
                return;
              }
            }if (c.maxTouchmoveY > 0 && h.y >= c.maxTouchmoveY) {
              c.inTouchend = true;c.touchendEvent();return;
            }var p = h.y - c.lastPoint.y;if (!c.downHight) {
              c.downHight = 0;
            }if (c.downHight < c.optDown.offset) {
              if (c.movetype !== 1) {
                c.movetype = 1;c.optDown.inOffset(c);c.downwarp.classList.remove(c.optDown.resetClass);c.isMoveDown = true;if (c.os.ios && !c.isKeepTop) {
                  c.scrollDom.classList.add(c.optDown.hardwareClass);c.scrollDom.style.webkitOverflowScrolling = "auto";c.isSetScrollAuto = true;
                }
              }c.downHight += p * c.optDown.inOffsetRate;
            } else {
              if (c.movetype !== 2) {
                c.movetype = 2;c.optDown.outOffset(c);c.downwarp.classList.remove(c.optDown.resetClass);c.isMoveDown = true;if (c.os.ios && !c.isKeepTop) {
                  c.scrollDom.classList.add(c.optDown.hardwareClass);c.scrollDom.style.webkitOverflowScrolling = "auto";c.isSetScrollAuto = true;
                }
              }if (p > 0) {
                c.downHight += p * c.optDown.outOffsetRate;
              } else {
                c.downHight += p;
              }
            }c.downwarp.style.height = c.downHight + "px";var k = c.downHight / c.optDown.offset;c.optDown.onMoving(c, k, c.downHight);
          }
        }
      } else {
        if (f < 0) {
          var q = c.getScrollHeight();var j = c.getClientHeight();var i = q - j - d;if (!c.optUp.isBounce && i <= 0) {
            c.preventDefault(l);
          }if (c.optUp.use && !c.optUp.isLock && c.optUp.hasNext && !c.isUpScrolling && (!c.isDownScrolling || c.isDownScrolling && c.optDown.isBoth) && (j + c.optUp.offset >= q || i <= 0)) {
            c.triggerUpScroll();
          }
        }
      }c.lastPoint = h;
    };c.scrollDom.addEventListener("touchmove", c.touchmoveEvent, { passive: false });c.touchendEvent = function () {
      if (c.optDown.use && c.isMoveDown) {
        if (c.downHight >= c.optDown.offset) {
          c.triggerDownScroll();
        } else {
          c.downwarp.classList.add(c.optDown.resetClass);c.downHight = 0;c.downwarp.style.height = 0;
        }if (c.isSetScrollAuto) {
          c.scrollDom.style.webkitOverflowScrolling = "touch";c.scrollDom.classList.remove(c.optDown.hardwareClass);c.isSetScrollAuto = false;
        }c.movetype = 0;c.isMoveDown = false;
      }if (c.os.pc) {
        c.scrollDom.removeEventListener("mousemove", c.touchmoveEvent);document.ondragstart = function () {
          return true;
        };
      }
    };c.scrollDom.addEventListener("mouseup", c.touchendEvent);c.scrollDom.addEventListener("mouseleave", c.touchendEvent);c.scrollDom.addEventListener("touchend", c.touchendEvent);c.scrollDom.addEventListener("touchcancel", c.touchendEvent);if (c.optDown.use) {
      c.downwarp = document.createElement("div");c.downwarp.className = c.optDown.warpClass;c.downwarp.innerHTML = '<div class="downwarp-content">' + c.optDown.htmlContent + "</div>";var b = c.optDown.warpId ? c.getDomById(c.optDown.warpId) : c.scrollDom;if (c.optDown.warpId && b) {
        b.appendChild(c.downwarp);
      } else {
        if (!b) {
          b = c.scrollDom;
        }b.insertBefore(c.downwarp, c.scrollDom.firstChild);
      }setTimeout(function () {
        c.optDown.inited(c, c.downwarp);
      }, 0);
    }
  };a.prototype.preventDefault = function (b) {
    if (b && b.cancelable && !b.defaultPrevented) {
      b.preventDefault();
    }
  };a.prototype.getPoint = function (b) {
    return { x: b.touches ? b.touches[0].pageX : b.clientX, y: b.touches ? b.touches[0].pageY : b.clientY };
  };a.prototype.triggerDownScroll = function () {
    if (!this.optDown.beforeLoading(this, this.downwarp)) {
      this.showDownScroll();this.optDown.callback && this.optDown.callback(this);
    }
  };a.prototype.showDownScroll = function () {
    this.isDownScrolling = true;this.optDown.showLoading(this);this.downHight = this.optDown.offset;this.downwarp.classList.add(this.optDown.resetClass);this.downwarp.style.height = this.optDown.offset + "px";
  };a.prototype.endDownScroll = function () {
    var d = this;var c = function () {
      d.downHight = 0;d.downwarp.style.height = 0;d.isDownScrolling = false;if (d.downProgressDom) {
        d.downProgressDom.classList.remove("mescroll-rotate");
      }
    };var b = d.optDown.afterLoading(d);if (typeof b === "number" && b > 0) {
      setTimeout(c, b);
    } else {
      c();
    }
  };a.prototype.lockDownScroll = function (b) {
    if (b == null) {
      b = true;
    }this.optDown.isLock = b;
  };a.prototype.initUpScroll = function () {
    var c = this;c.optUp = c.options.up || { use: false };c.extendUpScroll(c.optUp);if (c.optUp.scrollbar.use) {
      c.scrollDom.classList.add(c.optUp.scrollbar.barClass);
    }if (!c.optUp.isBounce) {
      c.setBounce(false);
    }if (c.optUp.use === false) {
      return;
    }c.optUp.hasNext = true;c.upwarp = document.createElement("div");c.upwarp.className = c.optUp.warpClass;var b;if (c.optUp.warpId) {
      b = c.getDomById(c.optUp.warpId);
    }if (!b) {
      b = c.scrollDom;
    }b.appendChild(c.upwarp);c.preScrollY = 0;c.lazyStartTime = new Date().getTime();c.lazyTag = "mescroll-lazying";c.scrollEvent = function () {
      var g = c.getScrollTop();var f = g - c.preScrollY > 0;c.preScrollY = g;if (!c.isUpScrolling && (!c.isDownScrolling || c.isDownScrolling && c.optDown.isBoth)) {
        if (!c.optUp.isLock && c.optUp.hasNext) {
          var d = c.getScrollHeight() - c.getClientHeight() - g;if (d <= c.optUp.offset && f) {
            c.triggerUpScroll();
          }
        }
      }var h = c.optUp.toTop;if (h.src || h.html) {
        if (g >= h.offset) {
          c.showTopBtn();
        } else {
          c.hideTopBtn();
        }
      }if (c.optUp.lazyLoad.use) {
        var e = new Date().getTime();c.lazyTimer && clearTimeout(c.lazyTimer);if (e - c.lazyStartTime >= c.optUp.lazyLoad.delay) {
          c.lazyStartTime = e;c.lazyLoad(0);
        } else {
          c.lazyTimer = c.lazyLoad();
        }
      }c.optUp.onScroll && c.optUp.onScroll(c, g, f);
    };if (c.isScrollBody) {
      window.addEventListener("scroll", c.scrollEvent);
    } else {
      c.scrollDom.addEventListener("scroll", c.scrollEvent);
    }setTimeout(function () {
      c.optUp.inited(c, c.upwarp);
    }, 0);
  };a.prototype.setBounce = function (b) {
    if (this.isScrollBody || !this.os.ios) {
      return;
    }if (b === false) {
      this.optUp.isBounce = false;window.addEventListener("touchmove", this.bounceTouchmove, { passive: false });
    } else {
      this.optUp.isBounce = true;window.removeEventListener("touchmove", this.bounceTouchmove);
    }
  };a.prototype.bounceTouchmove = function (h) {
    var j = this;var d = h.target;var f = true;while (d !== document.body && d !== document) {
      var m = d.classList;if (m) {
        if (m.contains("mescroll") || m.contains("mescroll-touch")) {
          f = false;break;
        } else {
          if (m.contains("mescroll-touch-x") || m.contains("mescroll-touch-y")) {
            var c = h.touches ? h.touches[0].pageX : h.clientX;var b = h.touches ? h.touches[0].pageY : h.clientY;if (!j.preWinX) {
              j.preWinX = c;
            }if (!j.preWinY) {
              j.preWinY = b;
            }var l = Math.abs(j.preWinX - c);var k = Math.abs(j.preWinY - b);var i = Math.sqrt(l * l + k * k);j.preWinX = c;j.preWinY = b;if (i !== 0) {
              var g = Math.asin(k / i) / Math.PI * 180;if (g <= 45 && m.contains("mescroll-touch-x") || g > 45 && m.contains("mescroll-touch-y")) {
                f = false;break;
              }
            }
          }
        }
      }d = d.parentNode;
    }if (f && h.cancelable && !h.defaultPrevented && typeof h.preventDefault === "function") {
      h.preventDefault();
    }
  };a.prototype.triggerUpScroll = function () {
    if (this.optUp.callback && !this.isUpScrolling) {
      this.showUpScroll();this.optUp.page.num++;this.isUpAutoLoad = true;this.optUp.callback(this.optUp.page, this);
    }
  };a.prototype.showUpScroll = function () {
    this.isUpScrolling = true;this.upwarp.classList.add(this.optUp.hardwareClass);this.upwarp.style.visibility = "visible";this.upwarp.style.display = "block";this.optUp.showLoading(this, this.upwarp);
  };a.prototype.showNoMore = function () {
    this.upwarp.style.visibility = "visible";this.upwarp.style.display = "block";this.optUp.hasNext = false;this.optUp.showNoMore(this, this.upwarp);
  };a.prototype.hideUpScroll = function (b) {
    if (b) {
      this.upwarp.style.display = "none";
    } else {
      this.upwarp.style.visibility = "hidden";
    }this.upwarp.classList.remove(this.optUp.hardwareClass);var c = this.upwarp.getElementsByClassName("upwarp-progress")[0];if (c) {
      c.classList.remove("mescroll-rotate");
    }
  };a.prototype.endUpScroll = function (c, b) {
    if (c != null) {
      if (c) {
        this.showNoMore();
      } else {
        this.hideUpScroll(b);
      }
    }this.isUpScrolling = false;
  };a.prototype.resetUpScroll = function (c) {
    if (this.optUp && this.optUp.use) {
      var b = this.optUp.page;this.prePageNum = b.num;this.prePageTime = b.time;b.num = 1;b.time = null;if (!this.isDownScrolling && c !== false) {
        if (c == null) {
          this.removeEmpty();this.clearDataList();this.showUpScroll();
        } else {
          this.showDownScroll();
        }
      }this.isUpAutoLoad = true;this.optUp.callback && this.optUp.callback(b, this);
    }
  };a.prototype.setPageNum = function (b) {
    this.optUp.page.num = b - 1;
  };a.prototype.setPageSize = function (b) {
    this.optUp.page.size = b;
  };a.prototype.clearDataList = function () {
    var c = this.optUp.clearId || this.optUp.clearEmptyId;if (c) {
      var b = this.getDomById(c);if (b) {
        b.innerHTML = "";
      }
    }
  };a.prototype.endByPage = function (c, e, d) {
    var b;if (this.optUp.use && e != null) {
      b = this.optUp.page.num < e;
    }this.endSuccess(c, b, d);
  };a.prototype.endBySize = function (d, c, e) {
    var b;if (this.optUp.use && c != null) {
      var f = (this.optUp.page.num - 1) * this.optUp.page.size + d;b = f < c;
    }this.endSuccess(d, b, e);
  };a.prototype.endSuccess = function (c, b, i) {
    var f = this;if (f.isDownScrolling) {
      f.endDownScroll();
    }if (f.optUp.use) {
      var j;if (c != null) {
        var e = f.optUp.page.num;var g = f.optUp.page.size;if (e === 1) {
          f.clearDataList();if (i) {
            f.optUp.page.time = i;
          }
        }if (c < g || b === false) {
          f.optUp.hasNext = false;if (c === 0 && e === 1) {
            j = false;f.showEmpty();
          } else {
            var d = (e - 1) * g + c;if (d < f.optUp.noMoreSize) {
              j = false;
            } else {
              j = true;
            }f.removeEmpty();
          }
        } else {
          j = false;f.optUp.hasNext = true;f.removeEmpty();
        }
      }var h = !f.optUp.hasNext;f.endUpScroll(j, h);f.loadFull();f.optUp.lazyLoad.use && f.lazyLoad(16);
    }
  };a.prototype.endErr = function () {
    if (this.isDownScrolling) {
      var b = this.optUp.page;if (b && this.prePageNum) {
        b.num = this.prePageNum;b.time = this.prePageTime;
      }this.endDownScroll();
    }if (this.isUpScrolling) {
      this.optUp.page.num--;this.endUpScroll(false);
    }
  };a.prototype.loadFull = function () {
    var b = this;if (b.optUp.loadFull.use && !b.optUp.isLock && b.optUp.hasNext && b.optUp.callback && b.getScrollHeight() <= b.getClientHeight()) {
      setTimeout(function () {
        if (b.getScrollHeight() <= b.getClientHeight()) {
          b.triggerUpScroll();
        }
      }, b.optUp.loadFull.delay);
    }
  };a.prototype.lockUpScroll = function (b) {
    if (b == null) {
      b = true;
    }this.optUp.isLock = b;
  };a.prototype.showEmpty = function () {
    var c = this;var d = c.optUp.empty;var b = d.warpId || c.optUp.clearEmptyId;if (b == null) {
      return;
    }var g = c.getDomById(b);if (g) {
      c.removeEmpty();var f = "";if (d.icon) {
        f += '<img class="empty-icon" src="' + d.icon + '"/>';
      }if (d.tip) {
        f += '<p class="empty-tip">' + d.tip + "</p>";
      }if (d.btntext) {
        f += '<p class="empty-btn">' + d.btntext + "</p>";
      }c.emptyDom = document.createElement("div");c.emptyDom.className = "mescroll-empty";c.emptyDom.innerHTML = f;g.appendChild(c.emptyDom);if (d.btnClick) {
        var e = c.emptyDom.getElementsByClassName("empty-btn")[0];if (d.supportTap) {
          e.addEventListener("tap", function (h) {
            h.stopPropagation();c.preventDefault(h);d.btnClick();
          });
        } else {
          e.onclick = function () {
            d.btnClick();
          };
        }
      }
    }
  };a.prototype.removeEmpty = function () {
    this.removeChild(this.emptyDom);
  };a.prototype.showTopBtn = function (c) {
    if (!this.topBtnShow) {
      this.topBtnShow = true;var d = this;var e = d.optUp.toTop;if (d.toTopBtn == null) {
        if (e.html) {
          d.toTopBtn = document.createElement("div");d.toTopBtn.innerHTML = e.html;
        } else {
          d.toTopBtn = document.createElement("img");d.toTopBtn.src = e.src;
        }d.toTopBtn.className = e.warpClass;if (e.supportTap) {
          d.toTopBtn.addEventListener("tap", function (g) {
            g.stopPropagation();d.preventDefault(g);var f = e.btnClick && e.btnClick();if (f !== true) {
              d.scrollTo(0, d.optUp.toTop.duration);
            }
          });
        } else {
          d.toTopBtn.onclick = function () {
            var f = e.btnClick && e.btnClick();if (f !== true) {
              d.scrollTo(0, d.optUp.toTop.duration);
            }
          };
        }var b;if (e.warpId) {
          b = d.getDomById(e.warpId);
        }if (!b) {
          b = document.body;
        }b.appendChild(d.toTopBtn);
      }d.toTopBtn.classList.remove(e.hideClass);d.toTopBtn.classList.add(e.showClass);d.setTopBtnFadeDuration(c);
    }
  };a.prototype.hideTopBtn = function (b) {
    if (this.topBtnShow && this.toTopBtn) {
      this.topBtnShow = false;this.toTopBtn.classList.remove(this.optUp.toTop.showClass);this.toTopBtn.classList.add(this.optUp.toTop.hideClass);this.setTopBtnFadeDuration(b);
    }
  };a.prototype.setTopBtnFadeDuration = function (b) {
    if (this.toTopBtn) {
      var c = (b != null ? b : this.optUp.toTop.fadeDuration) + "s";this.toTopBtn.style.animationDuration = c;this.toTopBtn.style.webkitAnimationDuration = c;
    }
  };a.prototype.scrollTo = function (g, c) {
    var d = this;var f = d.getScrollTop();var b = g;if (b > 0) {
      var e = d.getScrollHeight() - d.getClientHeight();if (b > e) {
        b = e;
      }
    } else {
      b = 0;
    }d.isScrollTo = true;d.scrollDom.style.webkitOverflowScrolling = "auto";d.getStep(f, b, function (h) {
      d.setScrollTop(h);if (h === b) {
        d.scrollDom.style.webkitOverflowScrolling = "touch";d.isScrollTo = false;
      }
    }, c);
  };a.prototype.getStep = function (f, d, k, l, h) {
    var j = d - f;if (l === 0 || j === 0) {
      k && k(d);return;
    }l = l || 300;h = h || 30;var g = l / h;var c = j / g;var e = 0;var b = window.setInterval(function () {
      if (e < g - 1) {
        f += c;k && k(f, b);e++;
      } else {
        k && k(d, b);window.clearInterval(b);
      }
    }, h);
  };a.prototype.lazyLoad = function (b) {
    var d = this;var c = b != null ? b : d.optUp.lazyLoad.delay;var e = setTimeout(function () {
      var k = d.scrollDom.querySelectorAll("[" + d.optUp.lazyLoad.attr + "]");var f = k.length;for (var j = 0; j < f; j++) {
        var l = k[j];if (l.getAttribute(d.lazyTag) !== "true" && d.isInSee(l, d.optUp.lazyLoad.offset)) {
          var h = l.getAttribute(d.optUp.lazyLoad.attr);var g = new Image();g.onload = function () {
            var i = this.src;var n = this.dom;var m = d.optUp.lazyLoad.showClass;m && n.classList.add(m);if (n.tagName === "IMG") {
              n.src = i;
            } else {
              n.style.backgroundImage = "url(" + i + ")";
            }n.removeAttribute(d.optUp.lazyLoad.attr);n.removeAttribute(d.lazyTag);
          };g.onerror = function () {
            this.dom.removeAttribute(d.lazyTag);
          };g.onabort = function () {
            this.dom.removeAttribute(d.lazyTag);
          };g.src = h;l.setAttribute(d.lazyTag, "true");g.dom = l;
        }
      }
    }, c);return e;
  };a.prototype.isInSee = function (f, e) {
    e = e || 0;var b = this.getOffsetTop(f);var d = this.getScrollTop() - e;var g = b + f.offsetHeight;var c = d + e + this.getClientHeight() + e;return b < c && b >= d || g <= c && g > d;
  };a.prototype.getOffsetTop = function (d) {
    var c = d.offsetTop;var b = d.offsetParent;while (b != null && b !== this.scrollDom) {
      c += b.offsetTop + b.clientTop;b = b.offsetParent;
    }return c;
  };a.prototype.getScrollHeight = function () {
    return this.scrollDom.scrollHeight;
  };a.prototype.getClientHeight = function () {
    if (this.isScrollBody && document.compatMode === "CSS1Compat") {
      return document.documentElement.clientHeight;
    } else {
      return this.scrollDom.clientHeight;
    }
  };a.prototype.getBodyHeight = function () {
    return document.body.clientHeight || document.documentElement.clientHeight;
  };a.prototype.getScrollTop = function () {
    if (this.isScrollBody) {
      return document.documentElement.scrollTop || document.body.scrollTop;
    } else {
      return this.scrollDom.scrollTop;
    }
  };a.prototype.getToBottom = function () {
    return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
  };a.prototype.setScrollTop = function (b) {
    if (typeof b === "number") {
      if (this.isScrollBody) {
        document.documentElement.scrollTop = b;document.body.scrollTop = b;
      } else {
        this.scrollDom.scrollTop = b;
      }
    }
  };a.prototype.getDomById = function (c) {
    var b;if (c) {
      if (typeof c === "string") {
        b = document.getElementById(c);
      } else {
        if (c.nodeType) {
          b = c;
        }
      }
    }if (!b) {
      console.error('the element with id as "' + c + '" can not be found: document.getElementById("' + c + '")==null');
    }return b;
  };a.prototype.removeChild = function (c) {
    if (c) {
      var b = c.parentNode;b && b.removeChild(c);c = null;
    }
  };a.prototype.destroy = function () {
    var b = this;b.scrollDom.removeEventListener("touchstart", b.touchstartEvent);b.scrollDom.removeEventListener("touchmove", b.touchmoveEvent);b.scrollDom.removeEventListener("touchend", b.touchendEvent);b.scrollDom.removeEventListener("touchcancel", b.touchendEvent);b.scrollDom.removeEventListener("mousedown", b.touchstartEvent);b.scrollDom.removeEventListener("mousemove", b.touchmoveEvent);b.scrollDom.removeEventListener("mouseup", b.touchendEvent);b.scrollDom.removeEventListener("mouseleave", b.touchendEvent);b.removeChild(b.downwarp);if (b.isScrollBody) {
      window.removeEventListener("scroll", b.scrollEvent);
    } else {
      b.scrollDom.removeEventListener("scroll", b.scrollEvent);
    }b.removeChild(b.upwarp);b.removeChild(b.toTopBtn);b.setBounce(true);
  };return a;
});