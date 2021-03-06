winkstart.module("numbers", "numbers_manager", {
    css: ["css/numbers_manager.css", _t("numbers_manager", "numbers_popup_css")],
    templates: {
        numbers_manager: "tmpl/numbers_manager.html",
        cnam_dialog: "tmpl/cnam_dialog.html",
        e911_dialog: "tmpl/e911_dialog.html",
        add_number_dialog: "tmpl/add_number_dialog.html",
        freeform_number_dialog: "tmpl/freeform_number_dialog.html",
        add_number_search_results: "tmpl/add_number_search_results.html",
        port_dialog: "tmpl/port_dialog.html",
        fields: "tmpl/fields.html"
    },
    subscribe: {
        "numbers_manager.activate": "activate",
        "numbers_manager.render_fields": "render_fields"
    },
    resources: {
        "numbers_manager.list": {
            url: "{api_url}/accounts/{account_id}/phone_numbers",
            contentType: "application/json",
            verb: "GET"
        },
        "numbers_manager.get_account": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "numbers_manager.create": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}",
            contentType: "application/json",
            verb: "PUT"
        },
        "numbers_manager.get": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}",
            contentType: "application/json",
            verb: "GET"
        },
        "numbers_manager.update": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}",
            contentType: "application/json",
            verb: "POST"
        },
        "numbers_manager.activate": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}/activate",
            contentType: "application/json",
            verb: "PUT"
        },
        "numbers_manager.search": {
            url: "{api_url}/phone_numbers?prefix={prefix}&quantity={quantity}",
            contentType: "application/json",
            verb: "GET"
        },
        "numbers_manager.delete": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}",
            contentType: "application/json",
            verb: "DELETE"
        },
        "numbers_manager.port": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}/port",
            contentType: "application/json",
            verb: "PUT"
        },
        "numbers_manager.getServicePlan": {
            url: "{api_url}/accounts/{account_id}/service_plans/{name}",
            contentType: "application/json",
            verb: "GET"
        },
        "numbers_manager.getCurrentServicePlan": {
            url: "{api_url}/accounts/{account_id}/service_plans/current",
            contentType: "application/json",
            verb: "GET"
        },
        "numbers_manager.create_doc": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/{phone_number}/docs/{file_name}",
            contentType: "application/x-base64",
            verb: "PUT"
        }
    }
}, function(e) {
    var t = this;
    winkstart.registerResources(t.__whapp, t.config.resources)
}, {
    get_number: function(e, t, n) {
        winkstart.request("numbers_manager.get", {
            api_url: winkstart.apps.numbers.api_url,
            account_id: winkstart.apps.numbers.account_id,
            phone_number: encodeURIComponent(e)
        }, function(e, n) {
            typeof t == "function" && t(e)
        }, function(e, t) {
            typeof n == "function" && n(e)
        })
    },
    update_number: function(e, t, n, r) {
        winkstart.request("numbers_manager.update", {
            api_url: winkstart.apps.numbers.api_url,
            account_id: winkstart.apps.numbers.account_id,
            phone_number: encodeURIComponent(e),
            data: t
        }, function(e, t) {
            typeof n == "function" && n(e)
        }, function(e, t) {
            typeof r == "function" && r(e)
        })
    },
    port_number: function(e, t, n) {
        var r = this;
        winkstart.request("numbers_manager.port", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url,
            phone_number: encodeURIComponent(e.phone_number),
            data: e.options || {}
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    create_number: function(e, t, n) {
        var r = this;
        winkstart.request(!1, "numbers_manager.create", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url,
            phone_number: encodeURIComponent(e),
            data: {}
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    activate_number: function(e, t, n) {
        var r = this;
        winkstart.request(!1, "numbers_manager.activate", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url,
            phone_number: encodeURIComponent(e),
            data: {}
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    delete_number: function(e, t, n) {
        var r = this;
        winkstart.request("numbers_manager.delete", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url,
            phone_number: encodeURIComponent(e)
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    search_numbers: function(e, t, n) {
        var r = this;
        winkstart.request(!0, "numbers_manager.search", {
            api_url: winkstart.apps.numbers.api_url,
            prefix: e.prefix,
            quantity: e.quantity || 15
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    create_number_doc: function(e, t, n) {
        var r = this;
        winkstart.request("numbers_manager.create_doc", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url,
            phone_number: encodeURIComponent(e.phone_number),
            file_name: e.file_name,
            data: e.file_data
        }, function(e, n) {
            typeof t == "function" && t(e, n)
        }, function(e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    submit_port: function(e, t, n) {
        var r = this,
            i = 0,
            s = function() {
                t.options.port = e.port, r.update_number(t.phone_number, t.options, function(e) {
                    typeof n == "function" && n(e)
                })
            },
            o = function(n) {
                r.create_number_doc({
                    phone_number: t.phone_number,
                    file_name: e.loa[0].file_name,
                    file_data: e.loa[0].file_data
                }, function(i, o) {
                    r.create_number_doc({
                        phone_number: t.phone_number,
                        file_name: e.files[n].file_name,
                        file_data: e.files[n].file_data
                    }, function(e, t) {
                        s()
                    })
                })
            };
        e.port.main_number === t.phone_number ? o(0) : s()
    },
    add_freeform_numbers: function(e, t) {
        var n = this,
            r;
        if (e.length > 0) {
            var i = e[0].phone_number.match(/^\+(.*)$/),
                s = function() {
                    winkstart.confirm(_t("numbers_manager", "there_was_an_error") + e[0].phone_number + _t("numbers_manager", "would_you_like_to_retry"), function() {
                        n.add_freeform_numbers(e, t)
                    }, function() {
                        n.add_freeform_numbers(e.slice(1), t)
                    })
                };
            i && i[1] ? n.create_number(i[1], function() {
                n.activate_number(i[1], function(r, i) {
                    n.add_freeform_numbers(e.slice(1), t)
                }, function(e, t) {
                    s()
                })
            }, function() {
                s()
            }) : s()
        } else typeof t == "function" && t()
    },
    add_numbers: function(e, t) {
        var n = this,
            r;
        if (e.length > 0) {
            var i = e[0].phone_number.match(/^\+(.*)$/),
                s = function() {
                    winkstart.confirm(_t("numbers_manager", "there_was_an_error") + e[0].phone_number + _t("numbers_manager", "would_you_like_to_retry"), function() {
                        n.add_numbers(e, t)
                    }, function() {
                        n.add_numbers(e.slice(1), t)
                    })
                };
            i[1] ? n.activate_number(i[1], function(r, i) {
                n.add_numbers(e.slice(1), t)
            }, function(e, t) {
                e.data && e.data.credit ? winkstart.error_message.process_error()(e, t) : s()
            }) : s()
        } else typeof t == "function" && t()
    },
    render_fields: function(e, t, n) {
        var r = this,
            i = r.templates.fields.tmpl({
                _t: function(e) {
                    return window.translate.numbers_manager[e]
                }
            });
        return $(i, e).click(function() {
            r.render_add_number_dialog(function() {
                typeof n == "function" && n()
            })
        }), e.empty().append(i), typeof t == "function" && t(), !1
    },
    clean_phone_number_data: function(e) {
        "cnam" in e && "display_name" in e.cnam && e.cnam.display_name === "" && delete e.cnam.display_name, e.cnam && $.isEmptyObject(e.cnam) && delete e.cnam
    },
    render_numbers_manager: function(e) {
        var t = this,
            n = t.templates.numbers_manager.tmpl();
        t.setup_table(n), $("#select_all_numbers", n).click(function() {
            $(".select_number", n).prop("checked", $(this).is(":checked"))
        }), $(n).delegate("#buy_number", "click", function() {
            t.render_add_number_dialog(function() {
                t.list_numbers()
            })
        }), $(n).delegate("#add_number", "click", function() {
            t.render_freeform_number_dialog(function() {
                t.list_numbers()
            })
        }), $(n).delegate(".cid", "click", function() {
            var e = $(this),
                n = e.parents("tr").first().attr("id"),
                r = n.match(/^\+(.*)$/);
            r[1] && t.get_number(r[1], function(n) {
                t.render_cnam_dialog(n.data.cnam || {}, function(i) {
                    n.data.cnam = $.extend({}, n.data.cnam, i), t.clean_phone_number_data(n.data);
                    var s = function() {
                        t.update_number(r[1], n.data, function(t) {
                            $.isEmptyObject(n.data.cnam) ? e.removeClass("active").addClass("inactive") : e.removeClass("inactive").addClass("active")
                        }, winkstart.error_message.process_error())
                    };
                    winkstart.apps.numbers.api_url.slice(-2) === "v2" ? s() : winkstart.confirm(_t("numbers_manager", "your_onfile_credit_card_will_immediately_be_charged"), function() {
                        s()
                    })
                })
            })
        }), $(n).delegate(".cid_inbound", "click", function() {
            var e = $(this),
                n = e.parents("tr").first().attr("id"),
                r = n.match(/^\+(.*)$/);
            r[1] && t.get_number(r[1], function(n) {
                typeof n.data.cnam != "undefined" && n.data.cnam.inbound_lookup ? (n.data.cnam.inbound_lookup = !1, t.update_number(r[1], n.data, function(t) {
                    e.removeClass("active").addClass("inactive")
                }, function(e) {
                    winkstart.alert(_t("numbers_manager", "failed_to_update_the_caller_id") + e.message)
                })) : winkstart.confirm(_t("numbers_manager", "if_you_turn_on_this_feature"), function() {
                    n.data.cnam = $.extend(!0, n.data.cnam || {}, {
                        inbound_lookup: !0
                    }), t.update_number(r[1], n.data, function(t) {
                        e.removeClass("inactive").addClass("active")
                    }, function(e) {
                        winkstart.alert(_t("numbers_manager", "failed_to_update_the_caller_id") + e.message)
                    })
                })
            })
        }), $(n).delegate(".e911", "click", function() {
            var e = $(this),
                n = e.parents("tr").first().attr("id"),
                r = n.match(/^\+(.*)$/);
            r[1] && t.get_number(r[1], function(n) {
                t.render_e911_dialog(n.data.dash_e911 || {}, function(i) {
                    n.data.dash_e911 = $.extend({}, n.data.dash_e911, i), t.clean_phone_number_data(n.data);
                    var s = function() {
                        t.update_number(r[1], n.data, function(t) {
                            $.isEmptyObject(n.data.dash_e911) ? e.removeClass("active").addClass("inactive") : e.removeClass("inactive").addClass("active")
                        }, function(e) {
                            winkstart.alert(_t("numbers_manager", "failed_to_update_the_e911") + e.message)
                        })
                    };
                    winkstart.apps.numbers.api_url.slice(-2) === "v2" ? s() : winkstart.confirm(_t("numbers_manager", "your_onfile_credit_card_will_immediately_be_charged"), function() {
                        s()
                    })
                })
            })
        }), $(n).delegate("#delete_number", "click", function() {
            var e, r, i = $(".select_number:checked", n),
                s = i.size(),
                o = function() {
                    s--, s === 0 && t.list_numbers()
                };
            s > 0 ? winkstart.confirm(_t("numbers_manager", "are_you_sure_you_want") + s + _t("numbers_manager", "numbers_selected"), function() {
                i.each(function() {
                    e = $(this).parents("tr").attr("id"), r = e.match(/^(.*)$/), r[1] && t.delete_number(r[1], function() {
                        o()
                    }, function() {
                        o()
                    })
                })
            }, function() {}) : winkstart.alert(_t("numbers_manager", "you_didnt_select_any_number"))
        }), $(n).delegate("#port_numbers", "click", function(e) {
            e.preventDefault(), t.render_port_dialog(function(e, n) {
                var r = 0,
                    i = function() {
                        $.each(e.phone_numbers, function(i, s) {
                            var o = {
                                phone_number: s
                            };
                            t.port_number(o, function(i) {
                                o.options = i.data, "id" in o.options && delete o.options.id, t.submit_port(e, o, function(i) {
                                    ++r > e.phone_numbers.length - 1 && (t.list_numbers(), n.dialog("close"))
                                })
                            })
                        })
                    };
                winkstart.apps.numbers.api_url.slice(-2) === "v2" ? i() : winkstart.confirm(_t("numbers_manager", "your_onfile_credit_card_will_immediately_be_charged"), function() {
                    i()
                })
            })
        }), t.list_numbers(function() {
            (e || $("#ws-content")).empty().append(n)
        })
    },
    render_cnam_dialog: function(e, t) {
        e._t = function(e) {
            return window.translate.numbers_manager[e]
        };
        var n = this,
            r = n.templates.cnam_dialog.tmpl(e || {
                _t: function(e) {
                    return window.translate.numbers_manager[e]
                }
            }),
            i;
        $(".submit_btn", r).click(function(e) {
            e.preventDefault();
            var n = form2object("cnam");
            typeof t == "function" && t(n), i.dialog("close")
        }), i = winkstart.dialog(r, {
            title: _t("numbers_manager", "edit_cid")
        })
    },
    render_e911_dialog: function(e, t) {
        e._t = function(e) {
            return window.translate.numbers_manager[e]
        };
        var n = this,
            r = n.templates.e911_dialog.tmpl(e || {}),
            i;
        $("#postal_code", r).blur(function() {
            $.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?", {
                postalcode: $(this).val()
            }, function(e) {
                e && e.postalcodes.length && e.postalcodes[0].placeName && ($("#locality", r).val(e.postalcodes[0].placeName), $("#region", r).val(e.postalcodes[0].adminName1))
            })
        }), $(".inline_field > input", r).keydown(function() {
            $(".gmap_link_div", r).hide()
        });
        if (e.latitude && e.longitude) {
            var s = "http://maps.google.com/maps?q=" + e.latitude + ",+" + e.longitude + "+(Your+E911+Location)&iwloc=A&hl=en";
            $("#gmap_link", r).attr("href", s), $(".gmap_link_div", r).show()
        }
        $(".submit_btn", r).click(function(e) {
            e.preventDefault();
            var n = form2object("e911");
            typeof t == "function" && t(n), i.dialog("close")
        }), i = winkstart.dialog(r, {
            title: e.phone_number ? _t("numbers_manager", "edit_location_for") + e.phone_number : _t("numbers_manager", "edit_911_location"),
            width: "465px"
        })
    },
    render_freeform_number_dialog: function(e) {
        var t = this,
            n = t.templates.freeform_number_dialog.tmpl({
                _t: function(e) {
                    return window.translate.numbers_manager[e]
                }
            }),
            r;
        $(".add", n).click(function(i) {
            i.preventDefault();
            var s = $("#freeform_numbers", n).val().replace(/\n/g, ",");
            s = s.replace(/[\s-\(\)\.]/g, "").split(",");
            var o = [];
            if (s.length > 0) {
                var u;
                $.each(s, function(e, t) {
                    u = t.match(/^\+(.*)$/), u && u[1] && o.push({
                        phone_number: t
                    })
                }), t.add_freeform_numbers(o, function() {
                    typeof e == "function" && e(), r.dialog("close")
                })
            } else winkstart.alert(_t("numbers_manager", "you_didnt_enter_any_valid_phone_number"))
        }), r = winkstart.dialog(n, {
            title: _t("numbers_manager", "add_your_phone_numbers_to_the_platform"),
            position: ["center", 20]
        }), $(".add", r).focus()
    },
    formatBuyNumberData: function(e) {
        var t = [];
        return $.each(e.data, function(e, n) {
            n.number ? t.push(n.number) : t.push(n)
        }), t
    },
    render_add_number_dialog: function(e) {
        var t = {
                _t: function(e) {
                    return window.translate.numbers_manager[e]
                },
                version: winkstart.config.default_api_url.match(/(v2)$/) ? !0 : !1
            },
            n = this,
            r = [],
            i = n.templates.add_number_dialog.tmpl(t),
            s;
        $(".toggle_div", i).hide(), $("#search_numbers_button", i).click(function(e) {
            $(".toggle_div", i).hide();
            var t = {},
                r = $("#sdid_npa", i).val(),
                s = $("#sdid_nxx", i).val();
            e.preventDefault(), t.prefix = r + s, n.search_numbers(t, function(e) {
                var t = n.formatBuyNumberData(e),
                    r = n.templates.add_number_search_results.tmpl({
                        data: t,
                        _t: function(e) {
                            return window.translate.numbers_manager[e]
                        }
                    });
                $("#foundDIDList", i).empty().append(r), $(".toggle_div", i).show()
            })
        }), $("#add_numbers_button", i).click(function(t) {
            t.preventDefault();
            var o = function() {
                $("#foundDIDList .checkbox_number:checked", i).each(function() {
                    r.push($(this).dataset())
                }), n.add_numbers(r, function() {
                    typeof e == "function" && e(), s.dialog("close")
                })
            };
            winkstart.apps.numbers.api_url.slice(-2) === "v2" ? o() : winkstart.confirm(_t("numbers_manager", "your_onfile_credit_card_will_immediately_be_charged"), function() {
                o()
            })
        }), $(i).delegate(".checkbox_number", "click", function() {
            var e = $(".checkbox_number:checked", i).size(),
                t = 0;
            $.each($(".checkbox_number:checked", i), function() {
                t += parseFloat($(this).dataset("price"))
            }), t = "$" + t + ".00", $(".selected_numbers", i).html(e), $(".cost_numbers", i).html(t)
        }), s = winkstart.dialog(i, {
            title: _t("numbers_manager", "add_number_title"),
            width: "600px",
            position: ["center", 20]
        })
    },
    get_port_price: function(e) {
        var t = this,
            n = function() {
                e && e("$5")
            };
        winkstart.request("numbers_manager.getCurrentServicePlan", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url
        }, function(t, r) {
            var i = "";
            if ("plans" in t.data)
                for (var s in t.data.plans) {
                    i = s;
                    break
                }
            winkstart.request("numbers_manager.getServicePlan", {
                account_id: winkstart.apps.numbers.account_id,
                api_url: winkstart.apps.numbers.api_url,
                name: i
            }, function(t, n) {
                var r = "0";
                "plan" in t.data && "number_services" in t.data.plan && "port" in t.data.plan.number_services && "activation_charge" in t.data.plan.number_services.port && (r = t.data.plan.number_services.port.activation_charge), r = "$" + r, e && e(r)
            }, n)
        }, n)
    },
    render_port_dialog: function(e) {
        var t = this;
        t.get_port_price(function(n) {
            var r = {},
                i = t.templates.port_dialog.tmpl({
                    _t: function(e) {
                        return window.translate.numbers_manager[e]
                    },
                    porting_price: n,
                    company_name: winkstart.config.company_name || "2600hz",
                    support_email: (winkstart.config.port || {}).support_email || "support@2600hz.com",
                    support_file_upload: File && FileReader
                }),
                s, o, u, a, f = 1,
                l = 4,
                c = $(".prev_step", i),
                h = $(".next_step", i),
                p = $(".submit_btn", i);
            $("#loa_link", i).attr("href", (winkstart.config.port || {}).loa || "http://2600hz.com/porting/2600hz_loa.pdf"), $("#resporg_link", i).attr("href", (winkstart.config.port || {}).resporg || "http://2600hz.com/porting/2600hz_resporg.pdf"), $("#features_link", i).attr("href", (winkstart.config.port || {}).features || "http://www.2600hz.com/features"), $("#terms_link", i).attr("href", (winkstart.config.port || {}).terms || "http://www.2600hz.com/terms"), $(".step_div:not(.first)", i).hide(), c.hide(), p.hide(), $(".other_carrier", i).hide(), $(".carrier_dropdown", i).change(function() {
                $(this).val() === "Other" ? $(".other_carrier", i).show() : $(".other_carrier", i).empty().hide()
            }), $("#postal_code", i).blur(function() {
                $.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country=US&callback=?", {
                    postalcode: $(this).val()
                }, function(e) {
                    e && e.postalcodes.length && e.postalcodes[0].placeName && ($("#locality", i).val(e.postalcodes[0].placeName), $("#region", i).val(e.postalcodes[0].adminName1))
                })
            }), $(".prev_step", i).click(function() {
                h.show(), p.hide(), $(".step_div", i).hide(), $(".step_div:nth-child(" + --f + ")", i).show(), $(".wizard_nav .steps_text li, .wizard_nav .steps_image .round_circle").removeClass("current"), $("#step_title_" + f + ", .wizard_nav .steps_image .round_circle:nth-child(" + f + ")", i).addClass("current"), f === 1 ? $(".prev_step", i).hide() : !0
            }), $(".next_step", i).click(function() {
                c.show(), $(".step_div", i).hide(), $(".step_div:nth-child(" + ++f + ")", i).show(), $(".wizard_nav .steps_text li, .wizard_nav .steps_image .round_circle").removeClass("current"), $("#step_title_" + f + ", .wizard_nav .steps_image .round_circle:nth-child(" + f + ")", i).addClass("current"), f === l && (h.hide(), p.show())
            }), $(".loa", i).change(function(e) {
                var t = [].slice,
                    n = t.call(e.target.files, 0),
                    r = new FileReader,
                    i, s = function(e) {
                        i = e.fileName || e.name || "noname", r.readAsDataURL(e)
                    };
                u = [], r.onload = function(e) {
                    u.push({
                        file_name: i,
                        file_data: e.target.result
                    }), n.length > 1 && (n = n.slice(1), s(n[0]))
                }, s(n[0])
            }), $(".files", i).change(function(e) {
                var t = [].slice,
                    n = t.call(e.target.files, 0),
                    r = new FileReader,
                    s, u = function(e) {
                        s = e.fileName || e.name || "noname", r.readAsDataURL(e)
                    };
                o = [], r.onload = function(e) {
                    o.push({
                        file_name: s,
                        file_data: e.target.result
                    }), n.length > 1 ? (n = n.slice(1), u(n[0])) : $(".number_of_docs", i).html(o.length)
                }, u(n[0])
            }), $(".submit_btn", i).click(function(n) {
                n.preventDefault(), r = form2object("port");
                var f = "";
                $(".carrier_dropdown", i).val() === "Other" && (r.port.service_provider = $(".other_carrier", i).val()), r.extra.agreed || (f += _t("numbers_manager", "you_must_agree_to_the_terms")), $.each(r.extra.cb, function(e, t) {
                    if (t === !1) return f += _t("numbers_manager", "you_must_confirm_the_first_conditions"), !1
                }), r.phone_numbers = $(".numbers_text", i).val().replace(/\n/g, ","), r.phone_numbers = r.phone_numbers.replace(/[\s-\(\)\.]/g, "").split(","), r.port.main_number = r.port.main_number.replace(/[\s-\(\)\.]/g, "");
                var l = r.port.main_number.match(/^\+?1?([2-9]\d{9})$/);
                l ? r.port.main_number = "+1" + l[1] : f += _t("numbers_manager", "you_need_to_enter_main_number");
                var c = t.check_toll_free(r.port.main_number);
                r.phone_numbers.push(r.port.main_number), a = [];
                var h = [];
                $.each(r.phone_numbers, function(e, n) {
                    var r = n.match(/^\+?1?([2-9]\d{9})$/);
                    r ? t.check_toll_free(r[1]) === c ? a.push("+1" + r[1]) : h.push(r[1]) : n !== "" && (f += n + _t("numbers_manager", "this_phone_number_is_not_valid"))
                }), h.length > 0 && ($.each(h, function(e, t) {
                    f += t + ", "
                }), c ? f += _t("numbers_manager", "these_numbers_are_not_toll_free_numbers") : f += _t("numbers_manager", "these_numbers_are_toll_free_numbers")), r.phone_numbers = a, o ? r.files = o : f += _t("numbers_manager", "you_need_to_upload_a_bill"), u ? r.loa = u : f += _t("numbers_manager", "you_need_to_upload_a_letter_of_authorization"), r.port.email.match(/^([0-9A-Za-z_\-\+\.]+@[0-9A-Za-z_\-\.]+\.[0-9A-Za-z]+)?$/) || (f += _t("numbers_manager", "the_email_address_you_entered")), f === "" ? (delete r.extra, typeof e == "function" && e(r, s)) : winkstart.alert(f)
            }), s = winkstart.dialog(i, {
                title: _t("numbers_manager", "port_a_number_title")
            })
        })
    },
    check_toll_free: function(e) {
        var t = !1,
            n = e.match(/^(\+?1)?(8(00|55|66|77|88)[2-9]\d{6})$/);
        return n && n[0] && (t = !0), t
    },
    activate: function() {
        var e = this;
        e.render_numbers_manager()
    },
    list_numbers: function(e) {
        winkstart.request("numbers_manager.list", {
            account_id: winkstart.apps.numbers.account_id,
            api_url: winkstart.apps.numbers.api_url
        }, function(t, n) {
            winkstart.table.numbers_manager.fnClearTable();
            var r = [];
            "numbers" in t.data && $.each(t.data.numbers, function(e, t) {
                var n = $.inArray("inbound_cnam", t.features) >= 0 ? !0 : !1,
                    i = $.inArray("outbound_cnam", t.features) >= 0 ? !0 : !1;
                t.e911 = $.inArray("dash_e911", t.features) >= 0 ? !0 : !1, t.caller_id = {
                    inbound: n,
                    outbound: i
                }, winkstart.config.hasOwnProperty("hide_e911") && winkstart.config.hide_e911 === !0 ? r.push(["", e, t.caller_id, t.state]) : r.push(["", e, t.caller_id, t.e911, t.state])
            }), winkstart.table.numbers_manager.fnAddData(r), typeof e == "function" && e()
        })
    },
    setup_table: function(e) {
        var t = this,
            n = e,
            r = [];
        r.push({
            sTitle: '<input type="checkbox" id="select_all_numbers"/>',
            fnRender: function(e) {
                return '<input type="checkbox" class="select_number"/>'
            },
            bSortable: !1
        }), r.push({
            sTitle: _t("numbers_manager", "phone_number")
        }), r.push({
            sTitle: _t("numbers_manager", "caller_id"),
            fnRender: function(e) {
                var t = '<a class="cid inactive">' + _t("numbers_manager", "outbound") + "</a>" + " / " + '<a class="cid_inbound inactive">' + _t("numbers_manager", "inbound") + "</a>";
                if (typeof e.aData[e.iDataColumn] == "object") {
                    var n = "cid " + (e.aData[e.iDataColumn].outbound ? "active" : "inactive"),
                        r = "cid_inbound " + (e.aData[e.iDataColumn].inbound ? "active" : "inactive");
                    t = '<a class="' + n + '">' + _t("numbers_manager", "outbound") + "</a>" + " / " + '<a class="' + r + '">' + _t("numbers_manager", "inbound") + "</a>"
                }
                return t
            },
            bSortable: !1
        }), (!winkstart.config.hasOwnProperty("hide_e911") || winkstart.config.hide_e911 === !1) && r.push({
            sTitle: _t("numbers_manager", "E911"),
            fnRender: function(e) {
                var t = "e911 " + (e.aData[e.iDataColumn] ? "active" : "inactive");
                return '<a class="' + t + '">E911</a>'
            },
            bSortable: !1
        }), r.push({
            sTitle: _t("numbers_manager", "state"),
            fnRender: function(e) {
                var t = e.aData[e.iDataColumn].replace("_", " ");
                return t.charAt(0).toUpperCase() + t.substr(1)
            }
        }), winkstart.table.create("numbers_manager", $("#numbers_manager-grid", n), r, {}, {
            sDom: '<"action_number">frtlip',
            aaSorting: [
                [1, "desc"]
            ],
            fnRowCallback: function(e, t, n) {
                return $(e).attr("id", t[1]), e
            }
        });
        var i = !winkstart.config.hasOwnProperty("hide_port") || winkstart.config.hide_port === !1,
            //s = '<button class="btn success" id="buy_number">' + _t("numbers_manager", "buy_number") + "</button>" + (i ? '<button class="btn primary" id="port_numbers">' + _t("numbers_manager", "port_a_number") + "</button>" : "") + '<button class="btn danger" id="delete_number">' + _t("numbers_manager", "delete_selected_numbers") + "</button>";
            s = '<button class="btn danger" id="delete_number">' + _t("numbers_manager", "delete_selected_numbers") + "</button>";
        $("div.action_number", n).html(s);
        var o = winkstart.apps.numbers.account_id;
        "accounts" in winkstart.apps && winkstart.apps.accounts.masquerade && (o = winkstart.apps.accounts.masquerade[0]), winkstart.request("numbers_manager.get_account", {
            account_id: o,
            api_url: winkstart.apps.numbers.api_url
        }, function(e, t) {
            e.data && e.data.wnm_allow_additions && $("div.action_number", n).prepend('<button class="btn" id="add_number">' + _t("numbers_manager", "add_number") + "</button>")
        }), $("#numbers_manager-grid_filter input[type=text]", n).first().focus(), $(".cancel-search", n).click(function() {
            $("#numbers_manager-grid_filter input[type=text]", n).val(""), winkstart.table.numbers_manager.fnFilter("")
        })
    }
});
