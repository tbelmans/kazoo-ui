winkstart.module("voip", "user", {
    css: ["css/user.css"],
    templates: {
        user: "tmpl/user.html",
        edit: "tmpl/edit.html",
        user_callflow: "tmpl/user_callflow.html",
        device_row: "tmpl/device_row.html"
    },
    subscribe: {
        "user.activate": "activate",
        "user.edit": "edit_user",
        "callflow.define_callflow_nodes": "define_callflow_nodes",
        "user.popup_edit": "popup_edit_user"
    },
    validation: [{
        name: "#first_name",
        regex: _t("user", "first_last_name_regex")
    }, {
        name: "#last_name",
        regex: _t("user", "first_last_name_regex")
    }, {
        name: "#username",
        regex: _t("user", "username_regex")
    }, {
        name: "#email",
        regex: _t("user", "email_regex")
    }, {
        name: "#caller_id_number_internal",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#caller_id_name_internal",
        regex: _t("user", "caller_id_name_regex")
    }, {
        name: "#caller_id_number_external",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#caller_id_name_external",
        regex: _t("user", "caller_id_name_regex")
    }, {
        name: "#advanced_caller_id_number_emergency",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#advanced_caller_id_name_emergency",
        regex: _t("user", "caller_id_name_regex")
    }, {
        name: "#hotdesk_id",
        regex: /^[0-9\+\#\*]*$/
    }, {
        name: "#hotdesk_pin",
        regex: /^[0-9]*$/
    }, {
        name: "#call_forward_number",
        regex: /^[\+]?[0-9]*$/
    }],
    resources: {
        "user.list_classifiers": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/classifiers",
            contentType: "application/json",
            verb: "GET"
        },
        "user.list": {
            url: "{api_url}/accounts/{account_id}/users",
            contentType: "application/json",
            verb: "GET"
        },
        "user.list_no_loading": {
            url: "{api_url}/accounts/{account_id}/users",
            contentType: "application/json",
            verb: "GET",
            trigger_events: !1
        },
        "user.get": {
            url: "{api_url}/accounts/{account_id}/users/{user_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "user.create": {
            url: "{api_url}/accounts/{account_id}/users",
            contentType: "application/json",
            verb: "PUT"
        },
        "user.update": {
            url: "{api_url}/accounts/{account_id}/users/{user_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "user.delete": {
            url: "{api_url}/accounts/{account_id}/users/{user_id}",
            contentType: "application/json",
            verb: "DELETE"
        },
        "user.hotdesks": {
            url: "{api_url}/accounts/{account_id}/users/{user_id}/hotdesks",
            contentType: "application/json",
            verb: "GET"
        },
        "user.device_list": {
            url: "{api_url}/accounts/{account_id}/devices?filter_owner_id={owner_id}",
            contentType: "application/json",
            verb: "GET",
            trigger_events: !1
        },
        "user.device_new_user": {
            url: "{api_url}/accounts/{account_id}/devices?filter_new_user={owner_id}",
            contentType: "application/json",
            verb: "GET",
            trigger_events: !1
        },
        "user.account_get": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "GET"
        }
    }
}, function(e) {
    var t = this;
    winkstart.registerResources(t.__whapp, t.config.resources), winkstart.publish("whappnav.subnav.add", {
        whapp: "voip",
        module: t.__module,
        label: _t("user", "users_label"),
        icon: "user",
        weight: "10",
        category: _t("config", "advanced_menu_cat")
    })
}, {
    random_id: !1,
    save_user: function(e, t, n, r) {
        var i = this,
            s = i.normalize_data($.extend(!0, {}, t.data, e));
        typeof t.data == "object" && t.data.id ? winkstart.request(!0, "user.update", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            user_id: t.data.id,
            data: s
        }, function(e, t) {
            typeof n == "function" && n(e, t, "update")
        }, function(e, t) {
            typeof r == "function" && r(e, t, "update")
        }) : winkstart.request(!0, "user.create", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            data: s
        }, function(e, t) {
            typeof n == "function" && n(e, t, "create")
        }, function(e, t) {
            typeof r == "function" && r(e, t, "create")
        })
    },
    acquire_device: function(e, t, n) {
        var r = this,
            i = e.data.id;
        r.random_id ? winkstart.request(!0, "user.device_new_user", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            owner_id: r.random_id
        }, function(e, n) {
            var r, s = e.data.length;
            s != 0 ? $.each(e.data, function(e, n) {
                r = this.id, winkstart.request(!1, "device.get", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url,
                    device_id: r
                }, function(n, r) {
                    n.data.owner_id = i, delete n.data.new_user, winkstart.request(!1, "device.update", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url,
                        device_id: n.data.id,
                        data: n.data
                    }, function(n, r) {
                        e == s - 1 && t({}, r, "create")
                    })
                })
            }) : t({}, n, "create")
        }) : t({}, status, "create")
    },
    edit_user: function(e, t, n, r, i) {
        var s = this,
            o = t || $("#user-content"),
            u = n || $("#user-view", o),
            r = r || {},
            a = {
                save_success: r.save_success || function(e) {
                    s.render_list(o), s.edit_user({
                        id: e.data.id
                    }, o, u, a)
                },
                save_error: r.save_error,
                delete_success: r.delete_success || function() {
                    u.empty(), s.render_list(o)
                },
                delete_error: r.delete_error,
                after_render: r.after_render
            },
            f = {
                data: $.extend(!0, {
                    apps: {},
                    call_forward: {
                        substitute: !0
                    },
                    call_restriction: {
                        closed_groups: {
                            action: "inherit"
                        }
                    },
                    caller_id: {
                        internal: {},
                        external: {},
                        emergency: {}
                    },
                    hotdesk: {},
                    contact_list: {
                        exclude: !1
                    },
                    music_on_hold: {}
                }, i || {}),
                field_data: {
                    device_types: {
                        sip_device: _t("user", "sip_device_type"),
                        cellphone: _t("user", "cell_phone_type"),
                        fax: _t("user", "fax_type"),
                        smartphone: _t("user", "smartphone_type"),
                        landline: _t("user", "landline_type"),
                        softphone: _t("user", "softphone_type"),
                        sip_uri: _t("user", "sip_uri_type")
                    },
                    call_restriction: {}
                }
            };
        s.random_id = !1, winkstart.parallel({
            list_classifiers: function(e) {
                winkstart.request("user.list_classifiers", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url
                }, function(t, n) {
                    "data" in t && $.each(t.data, function(e, t) {
                        f.field_data.call_restriction[e] = {
                            friendly_name: t.friendly_name
                        }, f.data.call_restriction[e] = {
                            action: "inherit"
                        }
                    }), e(null, t)
                })
            },
            media_list: function(e) {
                winkstart.request(!0, "media.list", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url
                }, function(t, n) {
                    t.data && t.data.unshift({
                        id: "",
                        name: _t("user", "default_music")
                    }, {
                        id: "silence_stream://300000",
                        name: _t("user", "silence")
                    }), f.field_data.media = t.data, e(null, t)
                })
            },
            user_get: function(t) {
                typeof e == "object" && e.id ? winkstart.request(!0, "user.get", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url,
                    user_id: e.id
                }, function(e, n) {
                    s.migrate_data(e), t(null, e)
                }) : (s.random_id = $.md5(winkstart.random_string(10) + (new Date).toString()), f.field_data.new_user = s.random_id, t(null, f))
            },
            user_hotdesks: function(t) {
                typeof e == "object" && e.id ? winkstart.request(!0, "user.hotdesks", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url,
                    user_id: e.id
                }, function(e) {
                    f.field_data.hotdesk_enabled = !0, f.field_data.device_list = {}, $.each(e.data, function(e, t) {
                        f.field_data.device_list[t.device_id] = {
                            name: t.device_name
                        }
                    }), $.isEmptyObject(f.field_data.device_list) && delete f.field_data.device_list, t(null, e)
                }, function(e, n) {
                    t(null, f)
                }) : t(null, f)
            }
        }, function(t, n) {
            var r = f;
            typeof e == "object" && e.id && (r = $.extend(!0, f, n.user_get)), s.render_user(r, u, a), typeof a.after_render == "function" && a.after_render()
        })
    },
    delete_user: function(e, t, n) {
        var r = this;
        typeof e.data == "object" && e.data.id && winkstart.request(!0, "user.delete", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            user_id: e.data.id
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    update_single_device: function(e, t) {
        e.attr("disabled", "disabled");
        var n = e.dataset("device_id"),
            r = e.is(":checked");
        winkstart.request(!1, "device.get", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            device_id: n
        }, function(n, i) {
            $.inArray(n.data.device_type, ["cellphone", "smartphone", "landline"]) > -1 && (n.data.call_forward.enabled = r), n.data.enabled = r, winkstart.request(!1, "device.update", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                device_id: n.data.id,
                data: n.data
            }, function(n, r) {
                e.removeAttr("disabled"), n.data.enabled === !0 ? $("#" + n.data.id + " .column.third", t).removeClass("disabled") : $("#" + n.data.id + " .column.third", t).addClass("disabled")
            }, function(t, n) {
                e.removeAttr("disabled"), r ? e.removeAttr("checked") : e.attr("checked", "checked")
            })
        }, function(t, n) {
            e.removeAttr("disabled"), r ? e.removeAttr("checked") : e.attr("checked", "checked")
        })
    },
    render_user: function(e, t, n) {
        e._t = function(e) {
            return window.translate.user[e]
        };
        var r = this,
            i = r.templates.edit.tmpl(e),
            s, o = $(".hotdesk_pin", i),
            u = $("#hotdesk_require_pin", i);
        r.render_device_list(e, i), winkstart.validate.set(r.config.validation, i), winkstart.timezone.populate_dropdown($("#timezone", i), e.data.timezone), e.data.id === winkstart.apps.voip.user_id && $(".user-delete", i).hide(), $('*[rel=popover]:not([type="text"])', i).popover({
            trigger: "hover"
        }), $('*[rel=popover][type="text"]', i).popover({
            trigger: "focus"
        }), winkstart.tabs($(".view-buttons", i), $(".tabs", i)), winkstart.link_form(i), u.is(":checked") ? o.show() : o.hide(), u.change(function() {
            $(this).is(":checked") ? o.show("blind") : o.hide("blind")
        }), $(".user-save", i).click(function(t) {
            t.preventDefault();
            if ($("#pwd_mngt_pwd1", i).val() != $("#pwd_mngt_pwd2", i).val()) return winkstart.alert(_t("user", "the_passwords_on_the")), !0;
            winkstart.validate.is_valid(r.config.validation, i, function() {
                var t = form2object("user-form");
                t.enable_pin === !1 && (delete e.data.queue_pin, delete e.data.record_call), r.clean_form_data(t), "field_data" in e && delete e.field_data, (t.password === undefined || winkstart.is_password_valid(t.password)) && winkstart.request("user.account_get", {
                    api_url: winkstart.apps.voip.api_url,
                    account_id: winkstart.apps.voip.account_id
                }, function(i, s) {
                    t.priv_level == "admin" ? (t.apps = t.apps || {}, !("voip" in t.apps) && $.inArray("voip", i.data.available_apps || []) > -1 && (t.apps.voip = {
                        label: _t("user", "voip_services_label"),
                        icon: "device",
                        api_url: winkstart.apps.voip.api_url
                    })) : t.priv_level == "user" && $.inArray("userportal", i.data.available_apps || []) > -1 && (t.apps = t.apps || {}, "userportal" in t.apps || (t.apps.userportal = {
                        label: _t("user", "user_portal_label"),
                        icon: "userportal",
                        api_url: winkstart.apps.voip.api_url
                    })), r.save_user(t, e, function(e, t, i) {
                        i == "create" ? r.acquire_device(e, function() {
                            typeof n.save_success == "function" && n.save_success(e, t, i)
                        }, function() {
                            typeof n.save_error == "function" && n.save_error(e, t, i)
                        }) : typeof n.save_success == "function" && n.save_success(e, t, i)
                    }, winkstart.error_message.process_error(n.save_error))
                })
            }, function() {
                winkstart.alert(_t("user", "there_were_errors_on_the_form"))
            })
        }), $(".user-delete", i).click(function(t) {
            t.preventDefault(), winkstart.confirm(_t("user", "are_you_sure_you_want_to_delete"), function() {
                r.delete_user(e, n.delete_success, n.delete_error)
            })
        }), $("#music_on_hold_media_id", i).val() || $("#edit_link_media", i).hide(), $("#music_on_hold_media_id", i).change(function() {
            $("#music_on_hold_media_id option:selected", i).val() ? $("#edit_link_media", i).show() : $("#edit_link_media", i).hide()
        }), $(".inline_action_media", i).click(function(e) {
            var t = $(this).dataset("action") == "edit" ? {
                    id: $("#music_on_hold_media_id", i).val()
                } : {},
                n = t.id;
            e.preventDefault(), winkstart.publish("media.popup_edit", t, function(e) {
                n ? "id" in e.data ? $("#music_on_hold_media_id #" + e.data.id, i).text(e.data.name) : ($("#music_on_hold_media_id #" + n, i).remove(), $("#edit_link_media", i).hide()) : ($("#music_on_hold_media_id", i).append('<option id="' + e.data.id + '" value="' + e.data.id + '">' + e.data.name + "</option>"), $("#music_on_hold_media_id", i).val(e.data.id), $("#edit_link_media", i).show())
            })
        }), $(i).delegate(".enabled_checkbox", "click", function() {
            r.update_single_device($(this), i)
        }), $(i).delegate(".action_device.edit", "click", function() {
            var t = {
                    id: $(this).dataset("id"),
                    hide_owner: e.data.id ? !1 : !0
                },
                n = {};
            e.data.id ? n.owner_id = e.data.id : n.new_user = r.random_id, winkstart.publish("device.popup_edit", t, function(t) {
                s = {
                    data: {},
                    field_data: {
                        device_types: e.field_data.device_types
                    }
                }, s.data = t.data.new_user ? {
                    new_user: !0,
                    id: r.random_id
                } : {
                    id: e.data.id
                }, r.render_device_list(s, i)
            }, n)
        }), $(i).delegate(".action_device.delete", "click", function() {
            var t = $(this).dataset("id");
            winkstart.confirm(_t("user", "do_you_really_want_to_delete"), function() {
                winkstart.request(!0, "device.delete", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url,
                    device_id: t
                }, function(t, n) {
                    s = {
                        data: {},
                        field_data: {
                            device_types: e.field_data.device_types
                        }
                    }, s.data = r.random_id ? {
                        new_user: !0,
                        id: r.random_id
                    } : {
                        id: e.data.id
                    }, r.render_device_list(s, i)
                })
            })
        }), $(".add_device", i).click(function(t) {
            var n = {
                    hide_owner: !0
                },
                s = {};
            t.preventDefault(), e.data.id ? s.owner_id = e.data.id : s.new_user = r.random_id, winkstart.publish("device.popup_edit", n, function(t) {
                var n = {
                    data: {},
                    field_data: {
                        device_types: e.field_data.device_types
                    }
                };
                n.data = r.random_id ? {
                    new_user: !0,
                    id: r.random_id
                } : {
                    id: e.data.id
                }, r.render_device_list(n, i)
            }, s)
        }), t.empty().append(i)
    },
    render_device_list: function(e, t) {
        var n = this,
            t = $("#tab_devices", t);
        if (e.data.id) {
            var r = e.data.new_user ? "user.device_new_user" : "user.device_list";
            winkstart.request(!0, r, {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                owner_id: e.data.id
            }, function(r, i) {
                $(".rows", t).empty(), r.data.length > 0 ? ($.each(r.data, function(r, i) {
                    i.display_type = e.field_data.device_types[i.device_type], i.not_enabled = this.enabled === !1 ? !0 : !1, $(".rows", t).append(n.templates.device_row.tmpl(i))
                }), winkstart.request(!0, "device.status_no_loading", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url
                }, function(e, n) {
                    $.each(e.data, function(e, n) {
                        $("#" + n.device_id + " .column.third", t).addClass("registered")
                    })
                })) : $(".rows", t).append(n.templates.device_row.tmpl({
                    _t: function(e) {
                        return window.translate.user[e]
                    }
                }))
            })
        } else $(".rows", t).empty().append(n.templates.device_row.tmpl({
            _t: function(e) {
                return window.translate.user[e]
            }
        }))
    },
    migrate_data: function(e) {
        return "priv_level" in e.data || ("apps" in e.data && "voip" in e.data.apps ? e.data.priv_level = "admin" : e.data.priv_level = "user"), e
    },
    clean_form_data: function(e) {
        return e.caller_id.internal.number = e.caller_id.internal.number.replace(/\s|\(|\)|\-|\./g, ""), e.caller_id.external.number = e.caller_id.external.number.replace(/\s|\(|\)|\-|\./g, ""), e.caller_id.emergency.number = e.caller_id.emergency.number.replace(/\s|\(|\)|\-|\./g, ""), e.hotdesk.require_pin || delete e.hotdesk.pin, e.pwd_mngt_pwd1 != "fakePassword" && (e.password = e.pwd_mngt_pwd1), delete e.pwd_mngt_pwd1, delete e.pwd_mngt_pwd2, delete e.extra, e
    },
    normalize_data: function(e) {
        $.isArray(e.directories) && (e.directories = {}), $.each(e.caller_id, function(t, n) {
            $.each(n, function(e, t) {
                t == "" && delete n[e]
            }), $.isEmptyObject(n) && delete e.caller_id[t]
        }), $.isEmptyObject(e.caller_id) && delete e.caller_id, e.music_on_hold.media_id || delete e.music_on_hold.media_id, e.hotdesk.hasOwnProperty("enable") && delete e.hotdesk.enable;
        if (e.hotdesk.hasOwnProperty("log_out")) {
            var t = [];
            $.each(e.hotdesk.endpoint_ids, function(n, r) {
                e.hotdesk.log_out.indexOf(r) < 0 && t.push(r)
            }), e.hotdesk.endpoint_ids = t, delete e.hotdesk.log_out
        }
        return e.hotdesk.hasOwnProperty("endpoint_ids") && e.hotdesk.endpoint_ids.length === 0 && delete e.hotdesk.endpoint_ids, e.hasOwnProperty("call_forward") && e.call_forward.enabled === !1 && e.call_forward.number === "" && delete e.call_forward.number, e
    },
    render_list: function(e, t) {
        var n = this;
        winkstart.request(!0, "user.list", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function(n, r) {
            var i = function(e) {
                var t = [];
                return e.length > 0 && $.each(e, function(e, n) {
                    t.push({
                        id: n.id,
                        title: n.first_name && n.last_name ? n.last_name + ", " + n.first_name : "(no name)"
                    })
                }), t.sort(function(e, t) {
                    return e.title.toLowerCase() < t.title.toLowerCase() ? -1 : 1
                }), t
            };
            $("#user-listpanel", e).empty().listpanel({
                label: _t("user", "users_label"),
                identifier: "user-listview",
                new_entity_label: _t("user", "add_user_label"),
                data: i(n.data),
                publisher: winkstart.publish,
                notifyMethod: "user.edit",
                notifyCreateMethod: "user.edit",
                notifyParent: e
            }), t && t()
        })
    },
    activate: function(e) {
        var t = this,
            e = e || {},
            n = t.templates.user.tmpl(),
            r = e.parent || $("#ws-content");
        r.empty().append(n), t.render_list(n, function() {
            e.callback && e.callback()
        })
    },
    popup_edit_user: function(e, t, n) {
        var r, i;
        i = $('<div class="inline_popup"><div class="inline_content main_content"/></div>'), i.css({
            height: 500,
            "overflow-y": "scroll"
        }), winkstart.publish("user.edit", e, i, $(".inline_content", i), {
            save_success: function(e) {
                r.dialog("close"), typeof t == "function" && t(e)
            },
            delete_success: function() {
                r.dialog("close"), typeof t == "function" && t({
                    data: {}
                })
            },
            after_render: function() {
                r = winkstart.dialog(i, {
                    title: e.id ? _t("user", "edit_user") : _t("user", "create_user")
                })
            }
        }, n)
    },
    define_stats: function() {
        var e = this,
            t = {
                users: {
                    icon: "user",
                    get_stat: function(e) {
                        winkstart.request("user.list_no_loading", {
                            account_id: winkstart.apps.voip.account_id,
                            api_url: winkstart.apps.voip.api_url
                        }, function(t, n) {
                            var r = {
                                name: "users",
                                number: t.data.length,
                                active: t.data.length > 0 ? !0 : !1,
                                color: t.data.length < 1 ? "red" : t.data.length > 1 ? "green" : "orange"
                            };
                            typeof e == "function" && e(r)
                        }, function(t, n) {
                            e({
                                error: !0
                            })
                        })
                    },
                    click_handler: function() {
                        winkstart.publish("user.activate")
                    }
                }
            };
        return t
    },
    define_callflow_nodes: function(e) {
        var t = this;
        $.extend(e, {
            "user[id=*]": {
                name: _t("user", "user"),
                icon: "user",
                category: _t("config", "basic_cat"),
                module: "user",
                tip: _t("user", "user_tip"),
                data: {
                    id: "null"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function(e, t) {
                    var n = e.getMetadata("id"),
                        r = "";
                    return n in t && (r = t[n].name), r
                },
                edit: function(e, n) {
                    winkstart.request(!0, "user.list", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function(r, i) {
                        var s, o;
                        $.each(r.data, function() {
                            this.name = this.first_name + " " + this.last_name
                        }), o = t.templates.user_callflow.tmpl({
                            _t: function(e) {
                                return window.translate.user[e]
                            },
                            can_call_self: e.getMetadata("can_call_self") || !1,
                            parameter: {
                                name: "timeout (s)",
                                value: e.getMetadata("timeout") || "20"
                            },
                            objects: {
                                items: winkstart.sort(r.data),
                                selected: e.getMetadata("id") || ""
                            }
                        }), $("#user_selector option:selected", o).val() == undefined && $("#edit_link", o).hide(), $(".inline_action", o).click(function(t) {
                            var n = $(this).dataset("action") == "edit" ? {
                                id: $("#user_selector", o).val()
                            } : {};
                            t.preventDefault(), winkstart.publish("user.popup_edit", n, function(t) {
                                e.setMetadata("id", t.data.id || "null"), e.setMetadata("timeout", $("#parameter_input", o).val()), e.setMetadata("can_call_self", $("#user_can_call_self", o).is(":checked")), e.caption = (t.data.first_name || "") + " " + (t.data.last_name || ""), s.dialog("close")
                            })
                        }), $("#add", o).click(function() {
                            e.setMetadata("id", $("#user_selector", o).val()), e.setMetadata("timeout", $("#parameter_input", o).val()), e.setMetadata("can_call_self", $("#user_can_call_self", o).is(":checked")), e.caption = $("#user_selector option:selected", o).text(), s.dialog("close")
                        }), s = winkstart.dialog(o, {
                            title: _t("user", "select_user"),
                            minHeight: "0",
                            beforeClose: function() {
                                typeof n == "function" && n()
                            }
                        })
                    })
                }
            },
            "hotdesk[action=login]": {
                name: _t("user", "hot_desk_login"),
                icon: "hotdesk_login",
                category: _t("config", "hotdesking_cat"),
                module: "hotdesk",
                tip: _t("user", "hot_desk_login_tip"),
                data: {
                    action: "login"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function(e, t) {
                    return ""
                },
                edit: function(e, t) {
                    typeof t == "function" && t()
                }
            },
            "hotdesk[action=logout]": {
                name: _t("user", "hot_desk_logout"),
                icon: "hotdesk_logout",
                category: _t("config", "hotdesking_cat"),
                module: "hotdesk",
                tip: _t("user", "hot_desk_logout_tip"),
                data: {
                    action: "logout"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function(e, t) {
                    return ""
                },
                edit: function(e, t) {
                    typeof t == "function" && t()
                }
            },
            "hotdesk[action=toggle]": {
                name: _t("user", "hot_desk_toggle"),
                icon: "hotdesk_toggle",
                category: _t("config", "hotdesking_cat"),
                module: "hotdesk",
                tip: _t("user", "hot_desk_toggle_tip"),
                data: {
                    action: "toggle"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function(e, t) {
                    return ""
                },
                edit: function(e, t) {
                    typeof t == "function" && t()
                }
            }
        })
    }
});
