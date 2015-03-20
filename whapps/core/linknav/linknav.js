winkstart.module("core", "linknav", {
    css: ["css/linknav.css"],
    templates: {
        link: "tmpl/link.html",
        sublink: "tmpl/sublink.html",
        sublink_divider: "tmpl/sublink_divider.html",
        category: "tmpl/category.html",
        link_divider: "tmpl/link_divider.html"
    },
    subscribe: {
        "linknav.add": "add",
        "linknav.sub_add": "sub_add",
        "linknav.get": "get",
        "accounts.start_masquerade": "masquerade_start",
        "accounts.end_masquerade": "masquerade_end"
    },
    targets: {
        link_nav: "#ws-topbar .links"
    }
}, function() {}, {
    masquerade_start: function() {
        var e = this;
        $(".sublink", e.config.targets.link_nav).each(function(e, t) {
            $(t).data("masqueradable") !== !0 && $(t).addClass("disabled")
        })
    },
    masquerade_end: function() {
        var e = this;
        $(".sublink", $(e.config.targets.link_nav)).removeClass("disabled")
    },
    add: function(e) {
        var t = this,
            n = {
                name: e.name || "",
                weight: e.weight || null,
                content: e.content || "???",
                new_page: e.new_page || !1,
                href: e.href || "#",
                publish: e.publish || "dev.null",
                modifier: e.modifier || null
            },
            r = $(t.config.targets.link_nav),
            i = $(".link", r),
            s = t.templates.link.tmpl(n),
            o = t.templates.link_divider.tmpl();
        inserted = !1, $("> a", s).append(n.content), s.hoverIntent({
            sensitivity: 1,
            interval: 40,
            timeout: 200,
            over: function() {
                s.dataset("dropdown") && s.addClass("open")
            },
            out: function() {
                s.dataset("dropdown") && s.removeClass("open")
            }
        }), i.each(function(e) {
            var t = $(this).dataset("weight");
            if (n.weight < t) return $(this).before(s).before(o), inserted = !0, !1;
            if (e >= i.length - 1) return $(this).after(s).after(o), inserted = !0, !1
        }), inserted || r.append(o).append(s);
        var u = $("body > .topbar"),
            a = u.data("nb") || 0,
            f = Math.round(parseInt(s.css("width")) / 140);
        f == 0 ? f = 1 : f = f, u.data("nb", a + f);
        if (u.data("nb") > 6) {
            var l = 140 * f;
            u.css({
                "min-width": "+= " + l
            })
        }
        n.modifier && typeof n.modifier == "function" && n.modifier.call(s, s)
    },
    sub_add: function(e) {
        var t = this,
            n = {
                masqueradable: !1
            },
            r = $(t.config.targets.link_nav),
            i = $('.link[data-link="' + e.link + '"]', r),
            s = $("> .dropdown-menu", i),
            o = $('.sublink[data-category="' + (e.category || "") + '"]', s),
            u = t.templates.sublink.tmpl($.extend(!0, {}, n, e)),
            a = !1,
            f, l;
        t.ensure_dropdown(i), $("> a", u).click(function(t) {
            t.preventDefault(), $(this).parents("li").first().hasClass("disabled") || winkstart.publish(e.publish || e.link + "." + e.sublink + ".activate")
        }), o.each(function(t) {
            var n = $(this).dataset("weight");
            if (e.weight < n) return $(this).before(u), a = !0, !1;
            if (t >= o.length - 1) return $(this).after(u), a = !0, !1
        }), a || (e.category ? (sublink_divider_html = t.templates.sublink_divider.tmpl(), l = t.templates.sublink.tmpl({
            name: e.category,
            label: e.category[0].toUpperCase() + e.category.slice(1)
        }), l.hoverIntent({
            sensitivity: 1,
            interval: 40,
            timeout: 200,
            over: function() {
                l.dataset("dropdown") && l.addClass("open")
            },
            out: function() {
                l.dataset("dropdown") && l.removeClass("open")
            }
        }), $(".dropdown-menu", l).prepend(link_module_html), s.append(sublink_divider_html).append(l)) : s.prepend(u)), $(".category > .dropdown-menu", s).css("left", -s.width()), e.modifier && typeof e.modifier == "function" && e.modifier.call(u, u)
    },
    get: function(e, t) {
        var n = this,
            r = $(n.config.targets.link_nav),
            i = $('.link[data-link="' + e.link + '"]', r);
        typeof t == "function" && t.call(i, i)
    },
    ensure_dropdown: function(e) {
        $("> a", e).addClass("dropdown-toggle"), e.addClass("dropdown").dataset("dropdown", "dropdown")
    }
});
