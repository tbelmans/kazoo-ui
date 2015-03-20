winkstart.module("myaccount", "nav", {
    css: [_t("nav", "css_style_css")],
    templates: {
        myaccount_navbar: "tmpl/myaccount_navbar.html",
        help: "tmpl/help.html"
    },
    subscribe: {
        "nav.add_sublink": "add_sublink",
        "nav.activate": "activate",
        "nav.masquerade": "masquerade",
        "nav.company_name": "company_name"
    }
}, function() {
    var e = this
}, {
    activate: function(e) {
        var t = this,
            n = e.first_name ? e.first_name + " " + e.last_name : e,
            r = t.templates.myaccount_navbar.tmpl({
                user_name: n,
                company_name: e.account_name
            }),
            i = t.templates.help.tmpl();
        $("#help_link", i).attr("href", winkstart.config.nav.help || "http://wiki.2600hz.com"), $(".masquerade", r).click(function() {
            winkstart.publish("nav.company_name_click")
        }), winkstart.publish("linknav.add", {
            name: "nav",
            weight: 10,
            content: r,
            modifier: function(e) {
                $("> a", e).css("padding", 0), $("> .dropdown-menu", e).css("width", "100%").css({
                    width: "+=73",
                    "margin-right": "-73px"
                })
            }
        }), winkstart.publish("myaccount.nav.post_loaded", e), winkstart.publish("nav.add_sublink", {
            link: "nav",
            sublink: "logout",
            masqueradable: !0,
            label: _t("nav", "sign_out"),
            weight: "25",
            publish: "auth.activate"
        }), winkstart.publish("linknav.add", {
            name: "help",
            weight: 15,
            content: i,
            modifier: function(e) {
                $("> a", e).css("padding", 0), e.prev("li.divider").remove()
            }
        })
    },
    add_sublink: function(e, t) {
        var n = this;
        winkstart.publish("linknav.sub_add", e)
    },
    update_size: function(e) {
        var t = $("> .dropdown-toggle", e).width();
        $("> .dropdown-menu", e).width(t)
    },
    company_name: function(e) {
        var t = this;
        winkstart.publish("linknav.get", {
            link: "nav"
        }, function(t) {
            var n = $("#myaccount_info .masquerade", t).text(n);
            typeof e == "function" && (ret = e(n), ret != undefined && $("#myaccount_info .masquerade", t).text(ret))
        })
    }
});
