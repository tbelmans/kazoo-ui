winkstart.module("myaccount", "myaccount", {
    css: ["css/style.css", "css/popups.css"],
    templates: {
        myaccount: "tmpl/myaccount.html",
        tab_module: "tmpl/tab_module.html"
    },
    subscribe: {
        "myaccount.initialized": "initialized",
        "myaccount.module_activate": "module_activate",
        "myaccount.display": "render_myaccount",
        "auth.account.loaded": "activate"
    }
}, function() {
    var e = this;
    "modules" in winkstart.apps[e.__module] && ("whitelist" in winkstart.apps[e.__module].modules && (e.modules = {}, $.each(winkstart.apps[e.__module].modules.whitelist, function(t, n) {
        e.modules[n] = !1
    })), "blacklist" in winkstart.apps[e.__module].modules && $.each(winkstart.apps[e.__module].modules.blacklist, function(t, n) {
        n in e.modules && delete e.modules[n]
    })), e.uninitialized_count = e._count(e.modules), e.whapp_config()
}, {
    whapp_vars: {
        billing_provider: "braintree"
    },
    modules: {
        app_store: !1,
        /*billing: !1,*/
        /*report: !1,*/
        personal_info: !1,
        nav: !1,
        statistics: !1,
        credits: !1
    },
    is_initialized: !1,
    uninitialized_count: 1337,
    initialized: function(e) {
        var t = this;
        t.is_initialized = !0, t.list_submodules.list.sort(), t.setup_page(e)
    },
    activate: function(e) {
        var t = this;
        t.whapp_auth(function() {
            t.initialization_check(e), winkstart.config.advancedView = e.advanced
        })
    },
    initialization_check: function(e) {
        var t = this;
        t.is_initialized ? t.setup_page(e) : $.each(t.modules, function(n, r) {
            r || (t.modules[n] = !0, winkstart.module(t.__module, n).init(function() {
                winkstart.log(t.__module + ": Initialized " + n), --t.uninitialized_count || winkstart.publish(t.__module + ".initialized", e)
            }))
        })
    },
    module_activate: function(e) {
        var t = this;
        t.whapp_auth(function() {
            winkstart.publish(e.name + ".activate")
        })
    },
    whapp_auth: function(e) {
        var t = this;
        "auth_token" in winkstart.apps[t.__module] && winkstart.apps[t.__module].auth_token ? e() : winkstart.publish("auth.shared_auth", {
            app_name: t.__module,
            callback: typeof e == "function" ? e : undefined
        })
    },
    _count: function(e) {
        var t = 0;
        return $.each(e, function() {
            t++
        }), t
    },
    setup_page: function(e) {
        var t = this;
        winkstart.publish("nav.activate", e), winkstart.publish("credits.activate")
    },
    orig_whapp_config: $.extend(!0, {}, winkstart.apps.myaccount),
    whapp_config: function() {
        var e = this;
        winkstart.apps.myaccount = $.extend(!0, {
            api_url: winkstart.apps.auth.api_url,
            account_id: winkstart.apps.auth.account_id,
            user_id: winkstart.apps.auth.user_id
        }, e.orig_whapp_config), $.extend(winkstart.apps[e.__module], e.whapp_vars)
    },
    list_submodules: {
        list: []
    },
    render_myaccount: function() {
        var e = this,
            t, n = {
                data: {
                    list_module: e.list_submodules
                }
            };
        popup_html = e.templates.myaccount.tmpl({
            data: {
                list_module: e.list_submodules
            }
        }), $.each(e.list_submodules.list, function(t, n) {
            var r = {
                data: {
                    key: n,
                    display_name: e.list_submodules[n].display_name
                }
            };
            $(".settings_tabs", popup_html).append(e.templates.tab_module.tmpl(r))
        }), $("#tabs > ul a", popup_html).click(function(e) {
            e.preventDefault(), $("#tabs > ul a").removeClass("current"), $(this).addClass("current"), winkstart.publish($(this).dataset("submodule") + ".activate", {
                target: $("#content", popup_html)
            })
        }), $("#tabs > ul a", popup_html).first().trigger("click"), t = winkstart.dialog(popup_html, {
            height: "auto",
            modal: !0,
            title: "My account",
            open: function() {
                $(this).css("overflow-x", "hidden"), $(this).css("max-height", $(document).height() - 180)
            }
        })
    }
});
