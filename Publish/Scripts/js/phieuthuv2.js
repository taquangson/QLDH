$(document).ready(function () {


    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }


    var dataThang = [];
    dataThang.push({ text: "10/" + (new Date().getFullYear() - 1), value: "10/" + (new Date().getFullYear() - 1) });
    dataThang.push({ text: "11/" + (new Date().getFullYear() - 1), value: "11/" + (new Date().getFullYear() - 1) });
    dataThang.push({ text: "12/" + (new Date().getFullYear() - 1), value: "12/" + (new Date().getFullYear() - 1) });
    dataThang.push({ text: "1/" + new Date().getFullYear(), value: "1/" + new Date().getFullYear() });
    dataThang.push({ text: "2/" + new Date().getFullYear(), value: "2/" + new Date().getFullYear() });
    dataThang.push({ text: "3/" + new Date().getFullYear(), value: "3/" + new Date().getFullYear() });
    dataThang.push({ text: "4/" + new Date().getFullYear(), value: "4/" + new Date().getFullYear() });
    dataThang.push({ text: "5/" + new Date().getFullYear(), value: "5/" + new Date().getFullYear() });
    dataThang.push({ text: "6/" + new Date().getFullYear(), value: "6/" + new Date().getFullYear() });
    dataThang.push({ text: "7/" + new Date().getFullYear(), value: "7/" + new Date().getFullYear() });
    dataThang.push({ text: "8/" + new Date().getFullYear(), value: "8/" + new Date().getFullYear() });
    dataThang.push({ text: "9/" + new Date().getFullYear(), value: "9/" + new Date().getFullYear() });
    dataThang.push({ text: "10/" + new Date().getFullYear(), value: "10/" + new Date().getFullYear() });
    dataThang.push({ text: "11/" + new Date().getFullYear(), value: "11/" + new Date().getFullYear() });
    dataThang.push({ text: "12/" + new Date().getFullYear(), value: "12/" + new Date().getFullYear() });
    dataThang.push({ text: "1/" + (new Date().getFullYear() + 1), value: "1/" + (new Date().getFullYear() + 1) });
    dataThang.push({ text: "2/" + (new Date().getFullYear() + 1), value: "2/" + (new Date().getFullYear() + 1) });
    dataThang.push({ text: "3/" + (new Date().getFullYear() + 1), value: "3/" + (new Date().getFullYear() + 1) });
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#NgayLapPhieu").kendoDatePicker({
        value: new Date(),
        format: "{0:dd-MM-yyyy}"
    })
    $("#NgayThanhToan").kendoDatePicker({
        value: new Date(),
        format: "{0:dd-MM-yyyy}"
    })
    $("#gridTimKiemHocSinh").kendoGrid({
        height: function () {
            var height = $(window).height() - 160;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        columns: [
            {
                title: "STT",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenHocSinh",
                title: "Tên học sinh",
                width: "200px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            //{
            //    field: "NgaySinh",
            //    title: "Ngày sinh",
            //    template: function (e) {
            //        var dateString = e.NgaySinh.substr(6);
            //        var currentTime = new Date(parseInt(dateString));
            //        if (currentTime.getFullYear() != 1) {
            //            return kendo.toString(currentTime, "dd/MM/yyyy");
            //        } else {
            //            return "";
            //        }
            //    },
            //    //format: "{0:dd/MM/yyyy}",
            //    width: "100px",
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperators: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            }
            //        }
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //    }
            //},
            {
                field: "DiaChi",
                title: "Địa chỉ",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "PhuHuynh",
                title: "Tên phụ huynh",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "DienThoaiMacDinh",
                title: "Điện thoại liên hệ",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Lập phiếu",
                width: "200px",
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openLapPhieuThu(" + e.ID + ",\"" + e.TenHocSinh + "\")'><i class='fa fa-plus'> Lập phiếu </i></button>"
                        + "<button class='k-button k-success text-center' onclick='openLichSuPhieuThu(" + e.ID + ")'> <i class='fa fa-search'> Lịch sử thanh toán </i></button>";
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            }
        ]

    });

    $("#windowLapPhieuThu").kendoWindow({
        title: "Lập hóa đơn",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function (e) {
            LoadGridDataTimKiemHocSinh();
        }
    })

    $("#windowLichSuPhieuThu").kendoWindow({
        title: "Lịch sử lập hóa đơn",
        visible: false,
        height: '800',
        width: '1200',
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function () {
            var dataSource = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "ID"
                    }
                }
            });
            $("#gridLichSuPhieuThu").data("kendoGrid").setDataSource(dataSource);
        }
    })

    $("#gridLichSuPhieuThu").kendoGrid({
        height: 800,
        dataBinding: function () {
            record = 0;
        },
        scrollable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        detailTemplate: kendo.template($("#template2").html()),
        detailInit: detailInit2,
        columns: [
            {
                title: "STT",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Mã hóa đơn",
                field: "MaPhieu",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Trạng thái",
                field: "TrangThai",
                template: function (e) {
                    if (e.TrangThai == 0) {
                        return "<span style='color:red'>Chưa thanh toán</span>"
                    } else if (e.TrangThai == 1) {
                        return "<span style='color:blue'>Thanh toán 1 phần</span>"
                    } else if (e.TrangThai == 2) {
                        return "<span style='color:green'>Đã thanh toán</span>"
                    } else {
                        return "";
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                attributes: {
                    style: "text-align: center;font-weight:bold"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Ngày lập hóa đơn",
                field: "NgayTao",
                template: function (e) {
                    var date = new Date(parseInt(e.NgayTao.replace("/Date(", "").replace(")/", ""), 10))
                    return e.NguoiLap + " - " + kendo.toString(date, "dd/MM/yyyy HH:mm");
                },
                width: "200px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Ngày gửi thông báo",
                field: "NgayGuiThongBao",
                template: function (e) {
                    if (e.NgayGuiThongBao) {
                        var date = new Date(parseInt(e.NgayGuiThongBao.replace("/Date(", "").replace(")/", ""), 10))
                        return date.getFullYear() == 1 ? "" : kendo.toString(date, "dd/MM/yyyy HH:mm");
                    } else {
                        return "";
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Ngày lập phiếu",
                field: "NgayLapPhieu",
                template: function (e) {
                    if (e.NgayThanhToan) {
                        var date = new Date(parseInt(e.NgayThanhToan.replace("/Date(", "").replace(")/", ""), 10))
                        return date.getFullYear() == 1 ? "" : kendo.toString(date, "dd/MM/yyyy HH:mm");
                    } else {
                        return "";
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Chỉnh sửa lần cuối",
                field: "NguoiSuaCuoi",
                template: function (e) {
                    if (e.NguoiSuaCuoi == null) {
                        return "";
                    } else {
                        var date = new Date(parseInt(e.Last_Update_Time.replace("/Date(", "").replace(")/", ""), 10))
                        return e.NguoiSuaCuoi + " - " + kendo.toString(date, "dd/MM/yyyy HH:mm");
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "In lần cuối",
                field: "NguoiInCuoi",
                template: function (e) {
                    if (e.NguoiInCuoi == null) {
                        return "";
                    } else {
                        var date = new Date(parseInt(e.Last_Print_Time.replace("/Date(", "").replace(")/", ""), 10))
                        return e.NguoiInCuoi + " - " + kendo.toString(date, "dd/MM/yyyy HH:mm");
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                filterable: false,
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openSuaPhieuThu(" + e.ID + ")'><i class='fa fa-pencil'> Xem hóa đơn </i></button>"
                    //+ "<button class='k-button k-success text-center' onclick='openSuaPhieuThu(" + e.ID + ")'> <i class='fa fa-pencil'> Sửa hóa đơn </i></button>";
                },
                width: "110px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            }

        ]
    })

    $("#gridPhieuMua").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        NamHoc: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, defaultValue: 1, validation: { min: 1 } },
                        HocDuoi: { type: 'number', editable: true },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLop: { type: 'text', editablle: false },
                        GhiChu: { type: 'text', editablle: true },
                        GiaBan: { type: 'number', editablle: true },
                        CongThucTinhHocPhi: { defaultValue: {} },
                        CongChuan: { type: 'number', editablle: true },
                        LoaiHinh: { type: 'number', editablle: true },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        }),
        height: function () {
            var height = ($(window).height() - 300) / 2;
            return height;
        },
        scrollable: true,
        editable: true,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        save: function (e) {
            console.log(e);
            if (e.values.ID_LopHoc || e.values.TextThang) {
                try {
                    var vlthang = "0/0"
                    if (e.values.TextThang) {
                        vlthang = e.values.TextThang.text;
                        e.model.Thang = vlthang.split("/")[0];
                        e.model.NamHoc = vlthang.split("/")[1];
                    }
                    $.ajax({
                        url: '/LichHoc/GetLichHocByLop?ID_Lop=' + e.model.ID_LopHoc,
                        type: 'GET'
                    }).done(function (response) {
                        var lichhoc = [];
                        var chinhanh = 0;
                        $.each(response, function (index, item) {
                            lichhoc.push(item.Thu);
                            chinhanh = item.ID_ChiNhanh;
                        })
                        e.model.SoBuoi = TinhSoBuoiHoc(e.model.Thang, e.model.NamHoc, lichhoc);
                        e.model.CongChuan = e.model.SoBuoi;
                        e.model.DonGia = TinhHocPhi(e.model.CongThucTinhHocPhi, e.model.CongChuan, 0, 0, e.model.SoBuoi);
                        //if (e.model.SoBuoi >= 6) {
                        //    e.model.DonGia = e.model.GiaBan;
                        //} else {
                        //    e.model.DonGia = e.model.GiaBan * 0.5;
                        //}
                        setTimeout(function () {
                            e.sender.refresh();
                            e.sender.dataSource.fetch(function () {
                                var results = e.sender.dataSource.aggregates().DonGia;
                                CalcTongTien();
                            });
                        })
                    })
                } catch (ex) {
                    e.sender.refresh();
                }
            }

            else if (e.values.SoBuoi) {
                e.model.DonGia = TinhHocPhi(e.model.CongThucTinhHocPhi, e.model.CongChuan, 0, 0, e.values.SoBuoi);
                //if (e.model.SoBuoi >= 6) {
                //    e.model.DonGia = e.model.GiaBan;
                //} else {
                //    e.model.DonGia = e.model.GiaBan * 0.5;
                //}
                e.sender.dataSource.fetch(function () {
                    setTimeout(function () {
                        e.sender.refresh();
                        CalcTongTien();
                    })
                });
            }
            //else if (e.values.HocDuoi) {
            //    if (e.values.HocDuoi > 0) {
            //        e.model.DonGia = e.model.SoBuoi * 150000;
            //    } else {
            //        e.model.DonGia = e.model.SoBuoi * 50000;
            //    }
            //    e.sender.dataSource.fetch(function () {
            //        setTimeout(function () {
            //            e.sender.refresh();
            //            CalcTongTien();
            //        })
            //    });
            //}
            else {
                e.sender.dataSource.fetch(function () {
                    setTimeout(function () {
                        CalcTongTien();
                    })
                });
            }


        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowPhieuMua(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
                },
                width: 50,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.parent().html("<a class='k-button' title='Thêm' style='width:100%; height:25px;' onclick='AddRowPhieuMua()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ID_LopHoc",
                title: "Dịch vụ/ sản phẩm",
                width: "250px",
                template: function (e) {
                    if (e.ID_LopHoc > 0) {
                        return e.TenLop
                    } else {
                        return "";
                    }
                },
                editor: function (container, options) {
                    var datas = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: '/Lop/GetAllThanhToanByHocSinh?ID_HocSinh=' + $("#ID_HocSinh").val(),
                            }
                        },
                        schema: {
                            model: { id: "ID" }
                        }
                    });
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'TenLop',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: datas,
                        change: function (e) {
                            var dataItem = datas.get(e.sender.value());
                            console.log(dataItem);
                            options.model.CongThucTinhHocPhi = dataItem.CongThucTinhHocPhi;
                            options.model.GiaBan = dataItem.GiaBan;
                            options.model.LoaiHinh = dataItem.ID_Khoi;
                            options.model.TenLop = dataItem.TenLop;
                        },
                    })
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TextThang",
                title: "Tháng",
                width: "100px",
                template: function (e) {
                    if (e.Thang > 0 && e.NamHoc > 0) {
                        return "Tháng " + e.Thang + "/" + e.NamHoc
                    } else {
                        return ""
                    }
                },
                attributes: {
                    class: "text-center"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: "text",
                        dataValueField: "value",
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            data: dataThang
                        }),
                    })
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Số lượng",
                field: "SoBuoi",
                width: "70px",
                attributes: {
                    class: "text-center"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0",
                        min: 1
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            //{
            //    title: "Loại phiếu",
            //    field: "HocDuoi",
            //    template: function (e) {
            //        if (e.HocDuoi == 1) {
            //            return "Bồi dưỡng";
            //            //}
            //            //else if (e.HocDuoi == 2) {
            //            //    return "Kèm riêng"
            //        } else {
            //            return "Học chính";
            //        }
            //    },
            //    editor: function (container, options) {
            //        $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
            //            dataTextField: "text",
            //            dataValueField: "value",
            //            autoBind: false,
            //            dataSource: new kendo.data.DataSource({
            //                data: [{ text: "Học chính", value: 0 },
            //                { text: "Bồi dưỡng", value: 1 },
            //                    //{ text: "Kèm riêng", value: 2 }
            //                ]
            //            }),
            //        })
            //    },
            //    width: "80px",
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperators: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            }
            //        }
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    }
            //},
            {
                title: "Thành tiền",
                field: "DonGia",
                format: "{0:n0}",
                footerTemplate: "<div>#=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                attributes: {
                    class: "text-right"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                footerAttributes: {
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Ghi chú",
                width: "200px",
                field: "GhiChu",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
        ]
    })

    $("#gridBuoiHocThangTruoc").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        NamHoc: { type: 'number', editable: true },
                        SoBuoiTheoLich: { type: 'number', editable: true, defaultValue: 1, validation: { min: 1 } },
                        HocDuoi: { type: 'number', editable: true },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLop: { type: 'text', editablle: false },
                        GhiChu: { type: 'text', editablle: true },
                        GiaBan: { type: 'number', editablle: true },
                        CongThucTinhHocPhi: { defaultValue: {} },
                        CongChuan: { type: 'number', editablle: true },
                        LoaiHinh: { type: 'number', editablle: true },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                        PhuThu: { type: 'number', editablle: true, validation: { min: 0 } },
                        GiamTru: { type: 'number', editablle: true, validation: { min: 0 } }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }, { field: "PhuThu", aggregate: "sum" }, { field: "GiamTru", aggregate: "sum" }],
            pageSize: 100
        }),
        height: function () {
            var height = $(window).height() - 275;
            return height;
        },
        dataBinding: function (e) {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        dataBound: function (e) {
            var grid = e.sender;
            var items = grid.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
                var isSelect = grid.dataItem(row).get("IsSelect");
                console.log(isSelect);
                if (isSelect) {
                    itemsToSelect.push(row);
                }
            });
            e.sender.select(itemsToSelect);
        },
        scrollable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#rowTemplate").html()),
        persistSelection: true,
        sortable: true,
        autoFitColumn: true,
        resizable: true,
        change: function (e) {
            var grid = $("#gridBuoiHocThangTruoc").data("kendoGrid");
            var tienphuthu = 0;
            var tiengiamtru = 0;
            $.each(e.sender.select(), function (index, item) {
                var row = grid.dataItem(item);
                tienphuthu += row.PhuThu;
                tiengiamtru += row.GiamTru;
            })
            $("#TienPhuThu").data("kendoNumericTextBox").value(tienphuthu);
            $("#TienGiamTru").data("kendoNumericTextBox").value(tiengiamtru);
            CalcTongTien();
        },
        columns: [
            {
                width: "30px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: "Dịch vụ",
                field: "TenLop",
                attributes: {
                    class: "text-right"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Tháng",
                field: "Thang",
                template: function (e) {
                    if (e.Thang != null) {
                        return e.Thang + "/" + e.Nam;
                    } else {
                        return "";
                    }
                },
                width: "70px",
                attributes: {
                    class: "text-right"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Đã học/ đã mua",
                attributes: {
                    class: "text-center"
                },
                width: "110px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Lịch học (buổi)",
                field: "SoBuoiTheoLich",
                attributes: {
                    class: "text-center"
                },
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Phụ thu",
                field: "PhuThu",
                format: "{0:n0}",
                footerTemplate: "<div>#=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                attributes: {
                    class: "text-right"
                },
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Giảm trừ",
                field: "GiamTru",
                format: "{0:n0}",
                footerTemplate: "<div>#=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                attributes: {
                    class: "text-right"
                },
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            }
        ]
    })

    $("#gridBuoiHocThangTruoc").on("dblclick", "tr[role='row']", function () {
        $("#gridBuoiHocThangTruoc").data("kendoGrid").select($(this));
    })

    $("#gridSanPham").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_SanPham: { type: 'number', editable: true },
                        TenSanPham: { type: 'string', editable: true },
                        GiaBan: { type: 'number', editable: true },
                        SoLuong: { type: 'number', editable: true, validation: { min: 0 } },
                        TongTien: { type: 'number', editable: false },
                    }
                }
            },
            aggregate: [{ field: "TongTien", aggregate: "sum" }],
            pageSize: 100
        }),
        height: function () {
            var height = ($(window).height() - 300) / 2;
            return height;
        },
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        scrollable: true,
        sortable: true,
        editable: true,
        save: function (e) {
            if (e.values.SoLuong) {
                e.model.TongTien = e.values.SoLuong * e.model.GiaBan;
                setTimeout(function () {
                    e.sender.refresh();
                    CalcTongTien();
                })
            }
            if (e.values.GiaBan > 0) {
                e.model.TongTien = e.model.SoLuong * e.values.GiaBan;
                setTimeout(function () {
                    e.sender.refresh();
                    CalcTongTien();
                })
            }
        },
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowSanPham(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
                },
                width: 50,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.parent().html("<a class='k-button' title='Thêm' style='width:100%; height:25px;' onclick='AddRowSanPham()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "TenSanPham",
                title: "Dịch vụ/ sản phẩm",
                width: "200px",
                template: function (e) {
                    if (e.TenSanPham) {
                        return e.TenSanPham;
                    } else {
                        return "";
                    }
                },
                editor: function (container, options) {
                    var datas = new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: '/DanhMucHangHoa/GetAll',
                            }
                        },
                        schema: {
                            model: { id: "ID" }
                        }
                    });
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'Ten',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: datas,
                        select: function (e) {
                            //var dataItem = datas.get(e.sender.value());
                            var dataItem = e.dataItem;
                            options.model.TenSanPham = dataItem.Ten;
                            options.model.GiaBan = dataItem.GiaBanLe;
                            options.model.TongTien = options.model.GiaBan * options.model.SoLuong;
                            options.model.ID_SanPham = dataItem.ID;
                            setTimeout(function () {
                                $("#gridSanPham").data("kendoGrid").refresh();
                                CalcTongTien();
                            })
                        },
                    })
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "ID_SanPham",
                hidden: true,
                width: 100,
                attributes: {
                    class: "text-center"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
            {
                field: "GiaBan",
                title: "Số tiền",
                format: "{0:n0}",
                width: 100,
                attributes: {
                    class: "text-center"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
            {
                field: "SoLuong",
                title: "Số lượng",
                width: 70,
                attributes: {
                    class: "text-center"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0",
                        min: 1
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
            {
                field: "TongTien",
                title: "Tổng tiền",
                format: "{0:n0}",
                footerTemplate: "<div>#=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                width: 100,
                attributes: {
                    class: "text-center"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                footerAttributes: {
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                },
            },
        ]
    })

    $("#SoTienThanhToan").kendoNumericTextBox({
        format: "n0",
        change: CalcTongTien
    });
    $("#TienPhuThu").kendoNumericTextBox({
        format: "n0",
        change: CalcTongTien
    });
    $("#TienGiamTru").kendoNumericTextBox({
        format: "n0",
        change: CalcTongTien
    });

    LoadDanhMucHinhThucThanhToan();
    LoadGridDataTimKiemHocSinh();
})

function LoadDanhMucHinhThucThanhToan() {
    $.ajax({
        url: '/Quy/GetAllQuy',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#HinhThuc").data("kendoComboBox") == undefined) {
            $("#HinhThuc").kendoComboBox({
                dataTextField: "TenQuy",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource,
            })
        } else {
            $("#HinhThuc").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}

function detailInit(e) {
    var detailRow = e.detailRow;
    var idhocsinh = e.data.ID;
    $.ajax({
        url: '/PhieuHoc/GetAllByHocSinh_Thang?ID_HocSinh=' + idhocsinh + "&Thang=" + (new Date().getMonth() + 1),
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgayTao: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 100,
        });
        detailRow.find(".orders").kendoGrid({
            dataSource: dataSource,
            persistSelection: true,
            resizable: true,
            //pageable: pageableShort,
            sortable: false,
            filterable: false,
            scrollable: true,
            columns: [
                {
                    field: "TenLop",
                    title: "Dịch vụ/ sản phẩm",
                    width: "250px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "SoBuoi",
                    title: "Số buổi",
                    width: "80px",
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                //{
                //    field: "HocDuoi",
                //    title: "Loại phiếu",
                //    template: function (e) {
                //        if (e.HocDuoi == 1) {
                //            return "Bồi dưỡng";
                //            //}
                //            //else if (e.HocDuoi == 2) {
                //            //    return "Kèm riêng"
                //        } else {
                //            return "Học chính";
                //        }
                //    },
                //    attributes: {
                //        class: "text-center"
                //    },
                //    width: "120px",
                //    headerAttributes: {
                //        style: "text-align: center; font-size: 10px; font-weight:bold",
                //        class: "table-header-cell"
                //    }
                //},
                {
                    field: "NgayTao",
                    title: "Ngày mua",
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    template: function (e) {
                        var dateString = e.NgayTao.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        if (currentTime.getFullYear() != 1) {
                            return kendo.toString(currentTime, "dd/MM/yyyy");
                        } else {
                            return "";
                        }
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "TenNhanVien",
                    title: "Người bán",
                    attributes: {
                        class: "text-center"
                    },
                    width: "180px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "GhiChu",
                    title: "Ghi chú",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "ID",
                    title: "Trạng thái",
                    template: function (e) {
                        if (e.ID > 0) {
                            return "<b style='height:50px;width:100%;text-align:center;color:green'>Đã mua phiếu<b>";
                        } else {
                            return "<b style='height:50px;width:100%;text-align:center;color:red'>Chưa mua phiếu<b>";
                        }
                    },
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                }
            ]
        })
    })
}

function detailInit2(e) {
    var detailRow = e.detailRow;
    var id = e.data.ID;
    $.ajax({
        url: '/PhieuThu/GetThanhToanByPhieuThu?ID_PhieuThu=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: {
                            type: 'date'
                        },
                        TongTien: {
                            type: 'number'
                        }
                    }
                }
            },
            pageSize: 100,
        });
        detailRow.find(".orders2").kendoGrid({
            dataSource: dataSource,
            persistSelection: true,
            resizable: true,
            sortable: false,
            filterable: false,
            scrollable: true,
            columns: [
                {
                    field: "NgayTao",
                    title: "Ngày nộp",
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    format: "{0:dd-MM-yyyy}",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "TongTien",
                    title: "Số tiền",
                    width: "180px",
                    format: "{0:n0}",
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "TenNhanVien",
                    title: "Người thu",
                    attributes: {
                        class: "text-center"
                    },
                    width: "180px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "TenHinhThucThanhToan",
                    title: "Hình thức thanh toán",

                    attributes: {
                        class: "text-center"
                    },
                    width: "180px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "GhiChu",
                    title: "Ghi chú",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                }
            ]
        })
    })
}

function LoadGridDataTimKiemHocSinh() {
    $.ajax({
        url: '/HocSinh/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridTimKiemHocSinh"), true);
        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),
            //data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridTimKiemHocSinh").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridTimKiemHocSinh"), false);
    });
}

function openLapPhieuThu(id, ten) {
    $("#windowLapPhieuThu").data("kendoWindow").maximize().open();
    $("#TenHocSinh").text(ten);
    $("#ID_HocSinh").val(id);
    $("#ID_PhieuThu").val(0);
    $("#TongTien").text(0);
    $("#DaThanhToan").text(0);
    $("#ConLai").text(0);
    $("#HinhThuc").data("kendoComboBox").value(0);
    kendo.ui.progress($("#windowLapPhieuThu"), true);
    ClearInputGrid();
    LoadGridThongKeSoBuoiHocThangTruoc(id, null, null);
}

function ClearInputGrid() {
    $("#btnThanhToan").show();
    $("#btnTaoPhieu").show();
    $("#btnGuiThongBao").show();
    $("#btnLuuTamTinh").show();
    $("#gridPhieuMua").data("kendoGrid").setDataSource(new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    Thang: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    NamHoc: { type: 'number', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 1 }, defaultValue: 1 },
                    HocDuoi: { type: 'number', editable: true },
                    ID_LopHoc: { type: 'number', editablle: true },
                    TenLop: { type: 'text', editablle: false },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    }));
    $("#gridSanPham").data("kendoGrid").setDataSource(new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "ID",
                fields: {
                    ID: { type: 'number', editable: false },
                    ID_SanPham: { type: 'number', editable: true },
                    TenSanPham: { type: 'string', editable: true },
                    GiaBan: { type: 'number', editable: true },
                    SoLuong: { type: 'number', editable: true, validation: { min: 0 }, defaultValue: 1 },
                    TongTien: { type: 'number', editable: false },
                }
            }
        },
        aggregate: [{ field: "TongTien", aggregate: "sum" }],
        pageSize: 100
    }));
}

function AddRowPhieuMua(e) {
    var grid = $("#gridPhieuMua").data("kendoGrid");
    grid.addRow();
}

function DeleteRowPhieuMua(uid) {
    var dataRow = $('#gridPhieuMua').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridPhieuMua').data("kendoGrid").dataSource.remove(dataRow);
    CalcTongTien();
}

function AddRowSanPham(e) {
    var grid = $("#gridSanPham").data("kendoGrid");
    grid.addRow();
}

function DeleteRowSanPham(uid) {
    var dataRow = $('#gridSanPham').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridSanPham').data("kendoGrid").dataSource.remove(dataRow);
    CalcTongTien();
}

function TinhSoBuoiHoc(month, year, lichhoc) {

    var count = 0;
    if (lichhoc.length > 0) {
        $.each(lichhoc, function (index, item) {
            var day = parseInt(item) - 1;
            count += countDayInMonth(day, (parseInt(month) - 1), year);
        })
    } else {
        count = 0;
    }
    return count;
}

function TinhHocPhi(congthuc, sobuoi, sotuan, sothang, thucte) {
    //Thanh toán theo Tháng, đơn vị Buổi
    if (congthuc.DonVi == 1) {
        if (congthuc.Block > 1) {
            let qty = parseInt(sobuoi / congthuc.Block);
            if (sobuoi % congthuc.Block > 0) {
                qty++;
            }
            let qtytt = parseInt(thucte / congthuc.Block);
            if (thucte % congthuc.Block > 0) {
                qtytt++;
            }
            return qtytt / qty * congthuc.HocPhi;
        } else if (congthuc.Block == 1) {
            return thucte * congthuc.HocPhi;
        } else {
            return congthuc.HocPhi;
        }
    } else if (congthuc.DonVi == 3) {
        return congthuc.HocPhi;
    }
    else if (congthuc.DonVi == 4) {
        return congthuc.HocPhi;
    }
}

function countDayInMonth(dayofweek, month, year) {
    var day, counter, date;
    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === parseInt(month)) {
        if (date.getDay() === dayofweek) { // Sun=0, Mon=1, Tue=2, etc.
            counter += 1;
        }
        day += 1;
        date = new Date(year, month, day);
    }
    return counter;
}

function countWeekInMonth(month, year) {
    var day, counter, datestart, dateend;
    day = 1;
    counter = 0;
    datestart = new Date(year, month, day);
    dateend = new Date(year, month + 1, day);

    counter = getWeekOfDate(dateend.addDays(-1)) - getWeekOfDate(datestart);
    return counter;
}

function getWeekOfDate(currentDate) {
    startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);
    return weekNumber
}

function LoadGridThongKeSoBuoiHocThangTruoc(id, lstphuthu, lstgiamtru) {
    kendo.ui.progress($("#windowLapPhieuThu"), true);
    $("#gridBuoiHocThangTruoc").data("kendoGrid").clearSelection();
    $.ajax({
        url: '/BaoCao/GetData_ThongKePhieuHoc_TheoHocSinh?ID_HocSinh=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        $.each(response, function (index, i) {
            if (lstphuthu != null) {
                $.each(lstphuthu, function (ind1, itm1) {
                    if (itm1.ID_Lop == i.ID_LopHoc && itm1.Thang == i.Thang && itm1.Nam == i.Nam) {
                        i.SoBuoiDaMua = i.SoBuoiDaMua - i.SoBuoiDaMuaPhuThu + i.SoBuoiDaMuaGiamTru;
                        i.IsSelect = true;
                    }
                })
            }

            if (lstgiamtru != null) {
                $.each(lstgiamtru, function (ind2, itm2) {
                    if (itm2.ID_Lop == i.ID_LopHoc && itm2.Thang == i.Thang && itm2.Nam == i.Nam) {
                        i.SoBuoiDaMua = i.SoBuoiDaMua - i.SoBuoiDaMuaPhuThu + i.SoBuoiDaMuaGiamTru;
                        i.IsSelect = true;
                    }
                })
            }

            i.SoBuoiTheoLich = TinhSoBuoiHoc(i.Thang, i.Nam, i.LichHoc);
            if (i.CongThucTinhHocPhi) {
                if (i.SoBuoiHoc - i.SoBuoiDaMua > 0) {
                    i.PhuThu = TinhHocPhi(i.CongThucTinhHocPhi, i.SoBuoiTheoLich, 0, 0, i.SoBuoiHoc - i.SoBuoiDaMua);
                } else {
                    i.PhuThu = 0;
                }

                if (i.SoBuoiDaMua - i.SoBuoiHoc >= i.CongThucTinhHocPhi.Block) {
                    i.GiamTru = TinhHocPhi(i.CongThucTinhHocPhi, i.SoBuoiTheoLich, 0, 0, i.SoBuoiDaMua - i.SoBuoiHoc);
                } else {
                    i.GiamTru = 0;
                }
            } else {
                i.PhuThu = 0;
                i.GiamTru = 0;
            }
        })
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        NamHoc: { type: 'number', editable: true },
                        SoBuoiTheoLich: { type: 'number', editable: true, defaultValue: 1, validation: { min: 1 } },
                        HocDuoi: { type: 'number', editable: true },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLop: { type: 'text', editablle: false },
                        GhiChu: { type: 'text', editablle: true },
                        GiaBan: { type: 'number', editablle: true },
                        CongThucTinhHocPhi: { defaultValue: {} },
                        CongChuan: { type: 'number', editablle: true },
                        LoaiHinh: { type: 'number', editablle: true },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                        PhuThu: { type: 'number', editablle: true, validation: { min: 0 } },
                        GiamTru: { type: 'number', editablle: true, validation: { min: 0 } }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }, { field: "PhuThu", aggregate: "sum" }, { field: "GiamTru", aggregate: "sum" }],
            pageSize: 100
        });

        $("#gridBuoiHocThangTruoc").data("kendoGrid").setDataSource(dataSource);
        setTimeout(function () {
            kendo.ui.progress($("#windowLapPhieuThu"), false);
        }, 500);
    });
}
function TaoPhieuThu() {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn tạo và in phiếu thu?</b>", function () { LuuPhieuThu(); }, function () { });
}

function InTamTinh() {
    //if ($("#ID_PhieuTamTinh").val() > 0) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn in phiếu tạm và gửi thông báo?</b>", function () { InPhieuTamTinh(); }, function () { });
    //} else {
    //    notification.show({ kValue: "Vui lòng chọn và kiểm tra phiếu tạm tính trước khi gửi!" }, "error");
    //}
}

function LuuPhieuThu() {
    kendo.ui.progress($(".body"), true);
    var lstPhieuHoc = [];
    var lstPhuThu = [];
    var lstGiamTru = [];
    var lstSanPham = [];
    var Tong = $("#gridPhieuMua").data("kendoGrid").dataSource.aggregates().DonGia.sum

        + $("#gridSanPham").data("kendoGrid").dataSource.aggregates().TongTien.sum
        + $("#TienPhuThu").data("kendoNumericTextBox").value()
        - $("#TienGiamTru").data("kendoNumericTextBox").value();
    var check_pm = true;
    //var check_pt = true;
    //var check_gt = true;
    var check_sp = true;
    $.each($("#gridPhieuMua").data("kendoGrid").dataSource.data(), function (index, item) {
        if (item.SoBuoi <= 0) {
            check_pm = false;
        }
        lstPhieuHoc.push({
            ID: item.ID,
            ID_HocSinh: $("#ID_HocSinh").val(),
            SoBuoi: item.SoBuoi,
            SoTien: item.DonGia,
            ID_Lop: item.ID_LopHoc,
            HocDuoi: item.HocDuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            NamHoc: item.NamHoc,
            GhiChu: item.GhiChu ? item.GhiChu : ""
        })
    })
    var grid = $("#gridBuoiHocThangTruoc").data("kendoGrid");
    $.each(grid.select(), function (index, item) {
        var row = grid.dataItem(item);
        if (row.PhuThu > 0) {
            lstPhuThu.push({
                ID: row.ID_PhuThuGiamTru,
                LyDo: row.TenLop,
                DonGia: parseInt(row.PhuThu),
                Type: 0,
                SoBuoi: row.SoBuoiHoc - row.SoBuoiDaMua,
                Thang: row.Thang,
                ThangText: "Tháng " + row.Thang + "/" + row.Nam,
                ID_Lop: row.ID_LopHoc,
                Nam: row.Nam,
                ID_PhieuHoc: row.ID_PhieuHoc
            })
        }
        if (row.GiamTru > 0) {
            lstGiamTru.push({
                ID: row.ID_PhuThuGiamTru,
                LyDo: row.TenLop,
                DonGia: parseInt(row.GiamTru),
                Type: 1,
                SoBuoi: row.SoBuoiDaMua - row.SoBuoiHoc,
                Thang: row.Thang,
                ThangText: "Tháng " + row.Thang + "/" + row.Nam,
                ID_Lop: row.ID_LopHoc,
                Nam: row.Nam,
                ID_PhieuHoc: row.ID_PhieuHoc
            })
        }
    })

    $.each($("#gridSanPham").data("kendoGrid").dataSource.data(), function (index, item) {
        if (item.SoLuong <= 0) {
            check_sp = false;
        }
        lstSanPham.push({
            ID: item.ID,
            ID_SanPham: item.ID_SanPham,
            SoLuong: item.SoLuong,
            GiaBan: item.GiaBan,
        })
    })

    if (!check_pm || !check_sp) {
        if (!check_pm) {
            alert("số lượng phiếu học muốn mua phải lớn hơn 0");
        }
        if (!check_sp) {
            alert("số lượng sản phẩm muốn mua phải lớn hơn 0");
        }
        if ($("#ID_PhieuThu").val() == '0') {
            kendo.ui.progress($(".body"), false);
            return;
        }
        openSuaPhieuThu($("#ID_PhieuThu").val());
        kendo.ui.progress($(".body"), false);
        return;
    }
    var data = {
        ID: $("#ID_PhieuThu").val(),
        ID_HocSinh: $("#ID_HocSinh").val(),
        lstPhieuHoc: lstPhieuHoc,
        lstPhuThu: lstPhuThu,
        lstGiamTru: lstGiamTru,
        lstSanPham: lstSanPham,
        TongThu: parseInt(Tong),
        HinhThucThanhToan: $("#HinhThuc").data("kendoComboBox").value(),
        NgayLapPhieu: kendo.toString($("#NgayLapPhieu").data("kendoDatePicker").value(), 'yyyy-MM-dd')
    }
    $.ajax({
        url: '/PhieuThu/CreateOrUpdate',
        type: 'POST',
        data: data
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $("#ID_PhieuThu").val(response.ID_Phieu);
            openSuaPhieuThu(response.ID_Phieu);
            //InPhieuThu();
            if ($('#guithongbao:checkbox:checked').length > 0) {
                //GuiThongBao_DaNopTien(response.ID_Phieu);
                //GuiEmail_DaNopTien(response.ID_Phieu);
            }
            LoadGridLichSuMuaPhieu($("#ID_HocSinh").val());
            HuyPhieuThu();
            //LoadGridDataTimKiemHocSinh();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
        kendo.ui.progress($(".body"), false);
    });
}

function HuyPhieuThu() {
    $("#windowLapPhieuThu").data("kendoWindow").close();
    $("#ID_HocSinh").val(0);
    $("#ID_PhieuThu").val(0);
    ClearInputGrid();
}

function openLichSuPhieuThu(id) {
    LoadGridLichSuMuaPhieu(id);
    $("#windowLichSuPhieuThu").data("kendoWindow").center().open();
}

function LoadGridLichSuMuaPhieu(ID_HocSinh) {
    $.ajax({
        url: '/PhieuThu/GetbyHocSinh?ID_HocSinh=' + ID_HocSinh,
        type: 'GET'
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            }
        });
        $("#gridLichSuPhieuThu").data("kendoGrid").setDataSource(dataSource);
    });
}


function ThanhToan() {
    $.ajax({
        url: '/PhieuThu/GetByID?ID=' + $("#ID_PhieuThu").val(),
        type: 'GET',
    }).done(function successCallback(response) {
        var tienthanhtoan = $("#SoTienThanhToan").data("kendoNumericTextBox").value();
        //if (tienthanhtoan > (response.TongThu - response.DaThanhToan)) {
        //    notification.show({ kValue: "Số tiền vượt quá số tiền còn lại!" }, "error");
        //    return;
        //}
        if (tienthanhtoan == null || tienthanhtoan <= 0) {
            notification.show({ kValue: "Số tiền không hợp lệ!" }, "error");
            return;
        }
        var data = {
            ID_PhieuThu: response.ID,
            TongTien: tienthanhtoan,
            ConLai: response.TongThu - response.DaThanhToan - tienthanhtoan,
            NgayTao: kendo.toString($("#NgayThanhToan").data("kendoDatePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
            GhiChu: "",
            HinhThucThanhToan: $("#HinhThuc").data("kendoComboBox").value()
        }
        kendo.ui.progress($("#windowLapPhieuThu"), true);
        $.ajax({
            url: '/PhieuThu/ThanhToan',
            type: 'POST',
            data: data
        }).done(function successCallback(response2) {
            if (response2.status) {
                notification.show({ kValue: response2.msg }, "success");
                openSuaPhieuThu(response.ID);
                InPhieuThu();
            } else {
                notification.show({ kValue: response2.msg }, "error");
            }
            kendo.ui.progress($("#windowLapPhieuThu"), false);
        });
    })
}


function CalcTongTien() {
    var Tong = $("#gridPhieuMua").data("kendoGrid").dataSource.aggregates().DonGia.sum
        + $("#gridSanPham").data("kendoGrid").dataSource.aggregates().TongTien.sum
        + $("#TienPhuThu").data("kendoNumericTextBox").value()
        - $("#TienGiamTru").data("kendoNumericTextBox").value();
    $("#TongTien").text(kendo.toString(Tong, "n0"));
}

function openSuaPhieuThu(id) {
    $.ajax({
        url: '/PhieuThu/GetByID?ID=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        var item = response;
        $("#windowLapPhieuThu").data("kendoWindow").maximize().open();
        $("#ID_HocSinh").val(item.ID_HocSinh);
        $("#ID_PhieuThu").val(item.ID);
        $("#TenHocSinh").text(item.TenHocSinh);
        $("#TongTien").text(kendo.toString(item.TongThu, 'n0'));
        $("#DaThanhToan").text(kendo.toString(item.DaThanhToan, 'n0'));
        $("#ConLai").text(kendo.toString(item.TongThu - item.DaThanhToan, 'n0'));
        if (item.TongThu == item.DaThanhToan) {
            $("#btnThanhToan").hide();
            $("#btnTaoPhieu").hide();
            $("#btnGuiThongBao").hide();
        } else {
            $("#btnThanhToan").show();
            $("#btnTaoPhieu").show();
            $("#btnGuiThongBao").show();
        }
        if (item.DaThanhToan > 0) {
            $("#btnTaoPhieu").hide();
        } else {
            $("#btnTaoPhieu").show();
        }
        $("#HinhThuc").data("kendoComboBox").value(item.HinhThucThanhToan);
        console.log(item);

        LoadGridThongKeSoBuoiHocThangTruoc(item.ID_HocSinh, item.lstPhuThu, item.lstGiamTru);

        var dtphieumua = new kendo.data.DataSource({
            data: item.lstPhieuHoc,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].ThangText = "Tháng " + data[i].Thang + "/" + data[i].Nam;
                        data[i].ID_LopHoc = data[i].ID_Lop;
                        data[i].DonGia = data[i].SoTien
                    }
                    return data;
                },
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        NamHoc: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, defaultValue: 1, validation: { min: 1 } },
                        HocDuoi: { type: 'number', editable: true },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLop: { type: 'text', editablle: false },
                        GhiChu: { type: 'text', editablle: true },
                        GiaBan: { type: 'number', editablle: true },
                        CongThucTinhHocPhi: { defaultValue: {} },
                        CongChuan: { type: 'number', editablle: true },
                        LoaiHinh: { type: 'number', editablle: true },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        });
        var dtsanpham = new kendo.data.DataSource({
            data: item.lstSanPham,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].TongTien = data[i].GiaBan * data[i].SoLuong;
                    }
                    return data;
                },
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_SanPham: { type: 'number', editable: true },
                        TenSanPham: { type: 'string', editable: true },
                        GiaBan: { type: 'number', editable: true },
                        SoLuong: { type: 'number', editable: true, validation: { min: 1 }, defaultValue: 1 },
                        TongTien: { type: 'number', editable: false },
                    }
                }
            },
            aggregate: [{ field: "TongTien", aggregate: "sum" }],
            pageSize: 100
        });

        $("#gridPhieuMua").data("kendoGrid").setDataSource(dtphieumua);
        $("#gridSanPham").data("kendoGrid").setDataSource(dtsanpham);
    })
}

function InPhieuThu() {
    var ID_PhieuThu = $("#ID_PhieuThu").val();
    //$.ajax({
    //    url: '/PhieuThu/InPhieu?ID_PhieuThu=' + ID_PhieuThu + "&GuiEmail=" + $('#guithongbao:checkbox:checked').length,
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //HuyPhieuThu();
    window.open('/PhieuThu/InPhieu?ID_PhieuThu=' + ID_PhieuThu + "&GuiEmail=" + $('#guithongbao:checkbox:checked').length, '_blank');
    //});
}

function InPhieuTamTinh() {
    var ID_PhieuThu = $("#ID_PhieuThu").val();
    window.open('/PhieuThu/InPhieuTamTinh?ID_PhieuThu=' + ID_PhieuThu, '_blank');
}

function ThongBaoHocPhi() {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn gửi thông báo học phí đến phụ huynh?</b>", function () { GuiThongBao(); }, function () { });
}

function GuiThongBao() {
    var idphieutamtinh = $("#ID_PhieuTamTinh").val();
    if (idphieutamtinh > 0) {
        let hocsinh = $("#gridTimKiemHocSinh").data("kendoGrid").dataSource.get($("#ID_HocSinh").val());
        let link = "http://" + window.location.host + "/PhieuThu/ThongBaoHocPhi?ID_PhieuThu=" + idphieutamtinh;
        let html = "<a style='display:block;width:100%;text-align:center;font-size:6em;text-decoration:none;' href='" + link + "'>Bấm để mở</a>"
        let model = {
            Users: [],
            Tokens: [],
            TieuDe: "Trung Tâm Luyện Thi Dương Hòa",
            NoiDung: "Thông báo học phí",
            NoiDungHTML: html,
            NoiDungRieng: "",
            AnhDaiDien: "logodh.png"
        };
        model.Users.push(hocsinh.DienThoaiMacDinh);
        model.Tokens.push(hocsinh.NotifyID);
        $.ajax({
            url: '/FBNotification/PushNotify',
            data: model,
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    } else {
        notification.show({ kValue: "Vui lòng chọn phiếu tạm tính cần gửi" }, "error");
    }
}


function GuiThongBao_DaNopTien(id_phieuthu) {
    if (id_phieuthu > 0) {
        let hocsinh = $("#gridTimKiemHocSinh").data("kendoGrid").dataSource.get($("#ID_HocSinh").val());
        let link = "http://" + window.location.host + "/PhieuThu/ThongBaoDaNopHocPhi?ID_PhieuThu=" + id_phieuthu;
        let html = "<a style='display:block;width:100%;text-align:center;font-size:6em;text-decoration:none;' href='" + link + "'>Bấm để mở</a>"
        let model = {
            Users: [],
            Tokens: [],
            TieuDe: "Trung Tâm Luyện Thi Dương Hòa",
            NoiDung: "Thanh toán học phí thành công. Chi tiết xin vui lòng xem đường dẫn đính kèm. Xin chân thành cảm ơn quý phụ huynh!",
            NoiDungHTML: html,
            NoiDungRieng: "",
            AnhDaiDien: "logodh.png"
        };
        model.Users.push(hocsinh.DienThoaiMacDinh);
        model.Tokens.push(hocsinh.NotifyID);
        $.ajax({
            url: '/FBNotification/PushNotify',
            data: model,
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    } else {
        notification.show({ kValue: "Phiếu thu chưa được gửi, vui lòng thử lại" }, "error");
    }
}

