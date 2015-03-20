winkstart.module("voip", "faxbox", {
    css: ["css/faxbox.css"],
    templates: {
        faxbox: "tmpl/faxbox.html",
        edit: "tmpl/edit.html"
    },
    subscribe: {
        "faxbox.activate": "activate",
        "faxbox.edit": "edit_faxbox"
    },
    validation: [],
    resources: {
        "faxbox.list": {
            url: "{api_url}/accounts/{account_id}/faxboxes",
            contentType: "application/json",
            verb: "GET"
        },
        "faxbox.get": {
            url: "{api_url}/accounts/{account_id}/faxboxes/{faxbox_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "faxbox.create": {
            url: "{api_url}/accounts/{account_id}/faxboxes",
            contentType: "application/json",
            verb: "PUT"
        },
        "faxbox.update": {
            url: "{api_url}/accounts/{account_id}/faxboxes/{faxbox_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "faxbox.delete": {
            url: "{api_url}/accounts/{account_id}/faxboxes/{faxbox_id}",
            contentType: "application/json",
            verb: "DELETE"
        }
    }
}, function(e) {
    var t = this;
    /*winkstart.registerResources(t.__whapp, t.config.resources), winkstart.publish("whappnav.subnav.add", {
        whapp: "voip",
        module: t.__module,
        label: _t("faxbox", "faxboxes_label"),
        icon: "vmbox",
        weight: "35",
        category: _t("config", "advanced_menu_cat")
    })*/
}, {
    render_list: function(e) {
        var t = this;
        winkstart.request(!0, "faxbox.list", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function(t, n) {
            var r = function(e) {
                var t = [];
                return e.length > 0 && $.each(e, function(e, n) {
                    t.push({
                        id: n.id,
                        title: n.name || _t("faxbox", "no_name")
                    })
                }), t.sort(function(e, t) {
                    return e.title.toLowerCase() < t.title.toLowerCase() ? -1 : 1
                }), t
            };
            $("#faxbox-listpanel", e).empty().listpanel({
                label: _t("faxbox", "faxbox_label"),
                identifier: "faxbox-listview",
                new_entity_label: _t("faxbox", "add_faxbox_label"),
                data: r(t.data),
                publisher: winkstart.publish,
                notifyMethod: "faxbox.edit",
                notifyCreateMethod: "faxbox.edit",
                notifyParent: e
            })
        })
    },
    render_faxbox: function(e, t, n) {
        e._t = function(e) {
            return window.translate.faxbox[e]
        };
        var r = this,
            i = r.templates.edit.tmpl({
                data: r.normalized_data(e.data),
                _t: e._t
            });
        winkstart.timezone.populate_dropdown($("#fax_timezone", i), e.data.timezone), winkstart.tabs($(".view-buttons", i), $(".tabs", i)), $(".faxbox-save", i).click(function(t) {
            t.preventDefault();
            var i = form2object("faxbox-form");
            r.save_faxbox(i, e, n.save_success, winkstart.error_message.process_error(n.save_error))
        }), $(".faxbox-delete", i).click(function(t) {
            t.preventDefault(), winkstart.confirm(_t("vmbox", "are_you_sure_you_want_to_delete"), function() {
                r.delete_faxbox(e, n.delete_success, n.delete_error)
            })
        }), t.empty().append(i)
    },
    activate: function(e) {
        var t = this,
            n = t.templates.faxbox.tmpl();
        (e || $("#ws-content")).empty().append(n), t.render_list(n)
    },
    save_faxbox: function(e, t, n, r) {
        var i = this,
            s = i.normalized_data($.extend(!0, {}, t.data, e));
        typeof t.data == "object" && t.data.id ? winkstart.request(!0, "faxbox.update", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            faxbox_id: t.data.id,
            data: s
        }, function(e, t) {
            typeof n == "function" && n(e, t, "update")
        }, function(e, t) {
            typeof r == "function" && r(e, t, "update")
        }) : winkstart.request(!0, "faxbox.create", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            data: s
        }, function(e, t) {
            typeof n == "function" && n(e, t, "create")
        }, function(e, t) {
            typeof r == "function" && r(e, t, "create")
        })
    },
    edit_faxbox: function(e, t, n, r) {
        var i = this,
            s = t || $("#faxbox-content"),
            o = n || $("#faxbox-view", s),
            r = r || {},
            u = {
                save_success: r.save_success || function(e) {
                    i.render_list(s), i.edit_faxbox({
                        id: e.data.id
                    }, s, o, u)
                },
                save_error: r.save_error,
                delete_success: r.delete_success || function() {
                    o.empty(), i.render_list(s)
                },
                delete_error: r.delete_error,
                after_render: r.after_render
            },
            a = {
                data: {
                    name: "",
                    caller_name: "",
                    caller_id: "",
                    fax_header: "",
                    smtp_permission_list: "",
                    fax_identity: "",
                    fax_timezone: "",
                    retries: 0,
                    notifications: {
                        inbound: {
                            email: {
                                send_to: ""
                            }
                        },
                        outbound: {
                            email: {
                                send_to: ""
                            }
                        }
                    }
                }
            };
        e && e.id ? winkstart.request(!0, "faxbox.get", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            faxbox_id: e.id
        }, function(e, t) {
            i.render_faxbox(e, o, u)
        }) : i.render_faxbox(a, o, u)
    },
    delete_faxbox: function(e, t, n) {
        var r = this;
        typeof e.data == "object" && e.data.id && winkstart.request(!0, "faxbox.delete", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            faxbox_id: e.data.id
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    normalized_data: function(e) {
        return e.smtp_permission_list = typeof e.smtp_permission_list == "string" ? e.smtp_permission_list.split(" ") : e.smtp_permission_list.join(" "), e.notifications.inbound.email.send_to = typeof e.notifications.inbound.email.send_to == "string" ? e.notifications.inbound.email.send_to.split(" ") : e.notifications.inbound.email.send_to.join(" "), e.notifications.outbound.email.send_to = typeof e.notifications.outbound.email.send_to == "string" ? e.notifications.outbound.email.send_to.split(" ") : e.notifications.outbound.email.send_to.join(" "), e
    }
});
