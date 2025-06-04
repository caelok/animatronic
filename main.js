const AnimatronicEngine = (() => {
    "use strict";
    let e = "init-animatronic",
        t = t => new Promise((a, s) => {
            if (document.getElementById(e)) {
                console.info("[AMT] init succsessfuly"), a();
                return
            }
            if ("https://raw.githubusercontent.com/caelok/animatronic/refs/heads/main/cdn/main.css" === t || !t) {
                let l = "[AMT] Critical: RCL is not configured. CSS cannot be loaded.";
                console.error(l);
                let i = document.createElement("div");
                i.setAttribute("style", "position:fixed;top:10px;left:10px;padding:1rem;background-color:#B80000;color:white;z-index:20000;border-radius:4px;font-family:Arial,sans-serif;font-size:14px;box-shadow:0 2px 10px rgba(0,0,0,0.5);"), i.textContent = l + " Please update the script.", document.body.appendChild(i), s(Error(l));
                return
            }
            fetch(t).then(e => {
                if (!e.ok) throw Error(`HTTP error ${e.status} fetching CSS from: ${t}`);
                return e.text()
            }).then(s => {
                let l = document.createElement("style");
                l.id = e, l.type = "text/css", l.textContent = s, document.head.appendChild(l), console.log(`[AMT] loaded (ID: ${e}) loaded from: ${t}`), a()
            }).catch(e => {
                console.error("[AMT] Error: Style injection failed.", e), s(e)
            })
        }),
        a = () => {
            let e = document.body;
            document.querySelectorAll(".emphasis-demo").forEach(e => {
                e.addEventListener("click", () => {
                    let t = Array.from(e.classList).find(e => e.startsWith("at-") && "at-animated" !== e);
                    t && (e.classList.remove(t, "at-animated"), e.offsetWidth, e.classList.add("at-animated", t))
                })
            }), document.querySelectorAll(".exit-demo").forEach(e => {
                e.addEventListener("click", () => {
                    let t = e.dataset.exitClass;
                    t && (e.classList.remove(t, "at-animated"), e.offsetWidth, e.classList.add("at-animated", t))
                })
            });
            let t = document.querySelectorAll(".at-scroll-reveal, .at-scroll-stagger-children, .at-scroll-parallax-bg"),
                a = new IntersectionObserver((e, t) => {
                    e.forEach(e => {
                        e.isIntersecting && (e.target.classList.add("at-is-visible"), e.target.dataset.atScrollAnim && e.target.classList.add("at-animated", e.target.dataset.atScrollAnim), e.target.classList.contains("at-scroll-stagger-children") && e.target.querySelectorAll(":scope > *").forEach((e, t) => {
                            e.style.transitionDelay = `${150*t}ms`, setTimeout(() => {
                                e.style.opacity = "1", e.style.transform = "translateY(0)", e.dataset.atStaggerItemAnim && e.classList.add("at-animated", e.dataset.atStaggerItemAnim)
                            }, 10 * t)
                        }))
                    })
                }, {
                    root: null,
                    rootMargin: "0px",
                    threshold: .1
                });
            t.forEach(e => {
                e.classList.contains("at-scroll-reveal") && !e.classList.contains("at-is-visible") && (e.style.opacity = "0", e.style.transform = "translateY(30px)"), e.classList.contains("at-scroll-stagger-children") && e.querySelectorAll(":scope > *").forEach(e => {
                    e.style.opacity = "0", e.style.transform = "translateY(20px)"
                }), a.observe(e)
            }), document.getElementById("at-demo-scroll-progress-bar") && window.addEventListener("scroll", () => {
                let e = document.documentElement.scrollHeight - document.documentElement.clientHeight,
                    t = window.scrollY,
                    a = e > 0 ? t / e : 0;
                document.documentElement.style.setProperty("--at-scroll-progress", a.toString())
            });
            let s = document.querySelector(".at-scroll-rotate-demo-el");
            s && window.addEventListener("scroll", () => {
                s.style.transform = `rotate(${window.scrollY/5%360}deg)`
            }), document.querySelectorAll(".at-hover-tilt-3d").forEach(e => {
                e.addEventListener("mousemove", t => {
                    let a = e.getBoundingClientRect(),
                        s = t.clientX - a.left,
                        l = t.clientY - a.top;
                    e.style.setProperty("--at-tilt-x", `${-((l/a.height-.5)*20)}deg`), e.style.setProperty("--at-tilt-y", `${(s/a.width-.5)*20}deg`)
                }), e.addEventListener("mouseleave", () => {
                    e.style.setProperty("--at-tilt-x", "0deg"), e.style.setProperty("--at-tilt-y", "0deg")
                })
            });
            let l = document.querySelector(".magnetic-area-demo"),
                i = document.querySelector(".at-magnetic-element-demo-el");
            l && i && (l.addEventListener("mousemove", e => {
                let t = l.getBoundingClientRect(),
                    a = (e.clientX - t.left - t.width / 2) * .2,
                    s = (e.clientY - t.top - t.height / 2) * .2;
                i.style.transform = `translate(${a}px, ${s}px)`
            }), l.addEventListener("mouseleave", () => {
                i.style.transform = "translate(0px, 0px)"
            }));
            let r = document.getElementById("cursor-glow-trail-div"),
                n = !1,
                o = document.getElementById("toggle-glow-trail"),
                c = e => {
                    n && r && (document.documentElement.style.setProperty("--at-cursor-x", `${e.clientX}px`), document.documentElement.style.setProperty("--at-cursor-y", `${e.clientY}px`))
                };
            o && r && o.addEventListener("click", () => {
                n = !n, r.classList.toggle("at-active", n), n ? (document.addEventListener("mousemove", c), document.addEventListener("mouseenter", () => {
                    n && r.classList.add("at-active")
                }), document.addEventListener("mouseleave", () => r.classList.remove("at-active"))) : document.removeEventListener("mousemove", c), o.textContent = n ? "Disable Glow Trail" : "Enable Glow Trail"
            }), document.querySelectorAll(".at-button-press-ripple").forEach(e => {
                e.addEventListener("click", function(e) {
                    this.querySelector(".at-ripple-effect")?.remove();
                    let t = this.getBoundingClientRect(),
                        a = document.createElement("span"),
                        s = Math.max(this.clientWidth, this.clientHeight);
                    a.style.width = a.style.height = `${s}px`, a.style.left = `${e.clientX-t.left-s/2}px`, a.style.top = `${e.clientY-t.top-s/2}px`, a.classList.add("at-ripple-effect"), this.appendChild(a), a.addEventListener("animationend", () => a.remove())
                })
            });
            let d = document.querySelector(".carousel-demo-container");
            if (d) {
                let m = Array.from(d.querySelectorAll(".at-carousel-slide")),
                    g = document.getElementById("prev-slide-btn"),
                    y = document.getElementById("next-slide-btn"),
                    h = document.getElementById("carousel-type-select"),
                    p = 0,
                    L = "slide-right",
                    u = (e, t) => {
                        e.className = "at-carousel-slide", e.classList.contains("slide-1") && e.classList.add("slide-1"), e.classList.contains("slide-2") && e.classList.add("slide-2"), e.classList.contains("slide-3") && e.classList.add("slide-3"), "slide-left" === t ? e.classList.add("at-carousel-slide-from-left") : "fade" === t ? e.classList.add("at-carousel-fade-in-out") : "kenburns" === t && e.classList.contains("slide-3") && e.classList.add("at-carousel-ken-burns")
                    },
                    E = e => {
                        let t = p;
                        p = (e + m.length) % m.length, m.forEach((e, a) => {
                            u(e, L), e.classList.toggle("at-active", a === p), e.classList.toggle("at-prev", a === t && a !== p)
                        })
                    };
                h && h.addEventListener("change", e => {
                    L = e.target.value, E(p)
                }), y && y.addEventListener("click", () => E(p + 1)), g && g.addEventListener("click", () => E(p - 1)), m.forEach(e => u(e, L)), E(0)
            }
            let v = document.getElementById("theme-toggle-btn");
            v && (v.addEventListener("click", () => {
                e.classList.toggle("at-dark-theme"), localStorage.setItem("animatronicTheme", e.classList.contains("at-dark-theme") ? "dark" : "light")
            }), "dark" === localStorage.getItem("animatronicTheme") && e.classList.add("at-dark-theme"));
            let f = document.getElementById("reveal-images-btn");
            f && f.addEventListener("click", () => {
                document.getElementById("blur-img-demo")?.classList.add("at-loaded"), document.getElementById("swipe-img-container-demo")?.classList.add("at-revealed")
            }), document.querySelectorAll(".accordion-header-demo").forEach(e => {
                e.addEventListener("click", () => {
                    let t = e.nextElementSibling;
                    e.classList.toggle("at-open"), t.classList.toggle("at-open"), t.classList.contains("at-open") && (t.style.paddingTop = "1rem", t.style.paddingBottom = "1rem")
                })
            });
            let $ = document.getElementById("checkmark-demo-container"),
                x = () => {
                    $ && ($.innerHTML = `
                <svg class="at-success-checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="at-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="at-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>`)
                };
            $ && (x(), $.addEventListener("click", x));
            let S = document.getElementById("error-input-demo");
            S && S.addEventListener("blur", () => {
                let e = "error" === S.value.toLowerCase();
                S.classList.toggle("at-error-shake", e), S.classList.toggle("at-animated", e), e && setTimeout(() => S.classList.remove("at-error-shake", "at-animated"), 800)
            }), console.info("[AMT] demo interactions are now active.")
        },
        s = () => {
            t("YOUR_RAW_CSS_LINK_HERE").then(() => {
                "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", a) : a()
            }).catch(e => {
                console.warn("[AMT] could not fully initialize due to style loading issues.")
            })
        };
    return s(), {
        forceInit: s,
        setupDemoInteractions: a
    }
})();
