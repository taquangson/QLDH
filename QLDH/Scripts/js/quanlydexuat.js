$(document).ready(function () {
    $("#window").kendoWindow({
        width: "680px",
        height: "570px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function (e) {
            $("#grid").data("kendoGrid").clearSelection();
        }
    });
    $("#windowThemHangHoa").kendoWindow({
        width: "800px",
        height: "500px",
        title: "Thêm mới hàng hóa",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
    });

    //$("#HinhThucPhanBo").kendoComboBox({
    //    dataTextField: "text",
    //    dataValueField: "value",
    //    filter: "contains",
    //    suggest: true,
    //    delay: 500,
    //    dataSource: new kendo.data.DataSource({
    //        data: [
    //            { text: 'Phân bổ theo thời gian khấu hao', value: 1 },
    //            { text: 'Phân bổ theo tháng chi', value: 2 }
    //        ],
    //    }),
    //});

    $("#grid").kendoGrid({
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
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        TongTien: { type: 'number' },
                        TenHangHoa: { type: 'string'},
                        TenNguoiDuyet: { type: 'string'},

                    }
                }
            },
            aggregate: [{ field: "TongTien", aggregate: "sum" }],
            pageSize: 50,
        }),
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách đề xuất các khoản chi";
            for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                var flag = false;
                if (rowIndex == 0) {
                    flag = true;
                }
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {

                    if (flag) {
                        row.cells[cellIndex].textAlign = 'center';
                        row.cells[cellIndex].bold = true;
                    }
                    row.cells[cellIndex].borderBottom = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderTop = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderleft = { color: "#000", size: 1 };
                }
            }
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
                title: "STT",
                template: "#= ++record #",
                width: "40px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "ID",
                title: "ID",
                width: "50px",
                hidden: true,
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
                field: "MaDeXuat",
                title: "Mã Đề Xuất",
                width: "120px",
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
                field: "TenDeXuat",
                title: "Tên Đề Xuất",
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
                field: "NgayTao",
                title: "Ngày Tạo",
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
                    class: "text-center"
                }
            },
            {
                field: "MaPhieuChi",
                title: "Mã Phiếu Chi",
                width: "120px",
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
                field: "NoiDung",
                title: "Nội dung",
                width: "250",
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
                field: "TenNhomChi",
                title: "Danh mục chi",
                width: "250",
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
                field: "TenHangHoa",
                title: "Hàng hóa đề xuất",
                width: "250",
                template: function (dataItem) {
                    return dataItem.TenHangHoa.replace(/\n/g, "<br>");
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
                field: "NguoiTao",
                title: "Người tạo",
                width: "60px",
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
                field: "TenNguoiDuyet",
                title: "Người duyệt",
                width: "60px",
                template: function (dataItem) {
                    return dataItem.TenNguoiDuyet.replace(/\n/g, "<br>");
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
                field: "ThoiGianPhanBo",
                title: "Thời gian phân bổ",
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
                    class: "text-center"
                },
                template: function (e) {
                    return e.ThoiGianPhanBo + " tháng";
                }
            },
            {
                field: "ThoiGianKhauHao",
                title: "Thời gian khấu hao",
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
                    class: "text-center"
                },
                template: function (e) {
                    return e.ThoiGianKhauHao + " tháng";
                }
            },
            {
                field: "ThoiGianDuKienSuDung",
                title: "Thời gian sử dụng dự kiến",
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
                    class: "text-center"
                }
            },
            {
                field: "TongTien",
                title: "Tổng tiền",
                format: "{0:n0}",
                aggregates: ["sum"],
                width: "80px",
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
                    class: "text-center"
                },
                footerTemplate: "<div>Tổng tiền: #= kendo.toString(sum, 'n0') #</div>"

            },
            //{
            //    field: "HinhThucPhanBo",
            //    title: "Hình thức thanh toán",
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
            //    template: function (dataItem) {
            //        var hinhThucPhanBoValue = dataItem.HinhThucPhanBo;
            //        if (hinhThucPhanBoValue === 1) {
            //            return "Theo thời gian khấu hao";
            //        } else if (hinhThucPhanBoValue === 2) {
            //            return "Theo tháng chi";
            //        }
            //    }
            //},
            {
                field: "TrangThaiDuyet",  
                title: "Trạng thái duyệt",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%");
                        },                      
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },              
                template: function (e) {
                    if (e.TrangThaiDuyet === 3) {
                        return "<span style='color: blue;'>Đề xuất đang chờ phê duyệt</span>";
                    }
                    else if (e.TrangThaiDuyet === 1) {
                        return "<span style='color: green;'>Đề xuất đã được duyệt</span>";
                    }
                    else if (e.TrangThaiDuyet === 2) {
                        return "<span style='color: red;'>Đề xuất đã bị từ chối!!!</span>";
                    }
                }
            }

        ]

    });
    $("#griddetail").kendoGrid({
        height: function () {
            var height = $(window).height() - 460;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID_hangHoa: { type: 'number', editable: true },
                        TenHangHoa: { type: 'text', editable: true },
                        SoLuong: { type: 'text', editable: true },
                        QuyCachSuDung: { type: 'text', editable: true },
                        SoTien: { type: 'number', editable: true },

                    }
                }
            },
            aggregate: [{ field: "SoTien", aggregate: "sum" }],
            pageSize: 50,
        }),
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        pageable: pageableShort,
        editable: true,
        filterable: {
            mode: "row",
        },
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                field: "",
                title: "ID",
                width: "20px",
                template: function (e) {
                    return "<i onclick='DeleteRow(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
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
                    style: "text-align:center"
                }
            },
            {
                field: "ID_HangHoa",
                width: "250px",
                hidden: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },               
            },
            {
                field: "TenHangHoa",
                title: "Tên hàng hóa",
                width: "250px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.parent().html("<a class='k-button' title='Thêm' style='width:100%; height:25px;' onclick='AddNewRow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
                template: function (e) {
                    if (e.TenHangHoa) {
                        return e.TenHangHoa;
                    } else {
                        return "";
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                editor: function (container, options) {
                    $('<input name="' + options.field + '"/>')
                        .appendTo(container)
                        .kendoComboBox({
                            dataSource: {
                                transport: {
                                    read: {
                                        url: '/DanhMucHangHoa/GetAllByLoaiSanPham?ID_LoaiSanPham=' + $("#LoaiDinhMucChi").data("kendoComboBox").value(),
                                        type: 'GET',
                                        dataType: 'json'
                                    }
                                }
                            },
                            dataTextField: "Ten",
                            autoBind: false,
                            valuePrimitive: true,
                            change: function (e) {
                                let model = e.sender.dataItem()
                                options.model.ID = model.ID;
                                options.model.SoTien = model.GiaBanLe;
                                options.model.QuyCachSuDung = model.DonViTinh;
                                options.model.TenHangHoa = model.Ten;
                                options.model.ID_HangHoa = model.ID;
                                setTimeout(function () {
                                    $("#griddetail").data("kendoGrid").refresh();
                                })
                            },
                            footerTemplate: '<button class="k-button bg-blue" onclick="themMoiHangHoa()"><i class="fa fa-plus-square"> Thêm mới</i></button>'

                        });
                },
            },
            {
                field: "SoLuong",
                title: "Số Lượng",
                width: "100px",
                filterable: false,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                editor: function (container, options) {
                    var numericTextBox = $('<input name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        culture: "vi-VN",
                        change: function (e) {
                            CalcTongTien();;
                        }
                    }).data("kendoNumericTextBox");

                    numericTextBox.element.on("keydown", function (e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            CalcTongTien();
                        }
                    });
                },
            },
            {
                field: "QuyCachSuDung",
                title: "Đơn Vị Tính",
                width: "150px",
                filterable: false,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                }
            },
            {
                field: "SoTien",
                title: "Đơn Giá",
                format: "{0:n0}",
                width: "100px",
                filterable: false,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                },
                editor: function (container, options) {
                    var numericTextBox = $('<input name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        culture: "vi-VN",
                        change: function (e) {
                            CalcTongTien();;
                        }
                    }).data("kendoNumericTextBox");

                    numericTextBox.element.on("keydown", function (e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            CalcTongTien();
                        }
                    });
                },
            }
        ],
    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        $("#NoiDung").prop("readonly", false);
        $("#ThoiGianDuKien").prop("readonly", false);
        $("#ThoiGianKhauHao").prop("readonly", false);
        $("#ThoiGianPhanBo").prop("readonly", false);

        $("#KhuVucSuDung").data("kendoComboBox").readonly(false);
        $("#NguoiDuyet").data("kendoDropDownTree").readonly(false);

        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        var arr = $("#grid").data("kendoGrid").selectedKeyNames();
        if (arr.length != 1) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
        } else {
            $("#window").data("kendoWindow").center().maximize().open();

            var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());

            if (userinfor.ID === selectedItem.ID_NguoiTao && selectedItem.TrangThaiDuyet === 2) {
                document.getElementById("luu").disabled = false;
            }
            else {
                document.getElementById("luu").disabled = true;
            }

            $.ajax({
                url: '/QuanLyDeXuat/GetNoiDungDuyetTheoID?ID_NguoiDuyet=' + userinfor.ID + '&ID_DeXuat=' + selectedItem.ID,
                type: 'GET',
            }).done(function successCallback(response) {
                if (response.data === undefined) {
                    $("#FormPheDuyet").hide();
                }
                else {
                    $("#FormPheDuyet").show();
                    if (response.data.NoiDungDuyet != null) {
                        $("#NoiDungPheDuyet").val(response.data.NoiDungDuyet);
                        $("#NoiDungPheDuyet").val(response.data.NoiDungDuyet).prop("readonly", true);
                        $("#buttonPheDuyet").hide();
                        $("#lbTrangThaiPheDuyet").show();

                        if (response.data.TrangThaiDuyet === 1) {
                            $("#lbTrangThaiPheDuyet").text("Bạn đã phê duyệt đề xuất");
                            $("#lbTrangThaiPheDuyet").css("color", "blue");
                        }
                        else {
                            $("#lbTrangThaiPheDuyet").text("Bạn đã từ chối đề xuất!!!");
                            $("#lbTrangThaiPheDuyet").css("color", "red");
                        }
                    }
                    else {
                        $("#NoiDungPheDuyet").val(response.data.NoiDungDuyet).prop("readonly", false);
                        $("#buttonPheDuyet").show();
                        $("#lbTrangThaiPheDuyet").hide()
                    }
                }
            });
            $("#ID").val(selectedItem.ID);
            $("#TenDeXuat").val(selectedItem.TenDeXuat);
            $("#LoaiDinhMucChi").data("kendoComboBox").value(selectedItem.ID_DinhMucChi);
            $("#NguoiTao").val(selectedItem.NguoiTao);
            $("#NoiDung").val(selectedItem.NoiDung);
            $("#ThoiGianDuKien").val(selectedItem.ThoiGianDuKienSuDung);
            $("#ThoiGianKhauHao").val(selectedItem.ThoiGianKhauHao);
            $("#ThoiGianPhanBo").val(selectedItem.ThoiGianPhanBo);

            //$("#HinhThucPhanBo").data("kendoComboBox").value(selectedItem.HinhThucPhanBo);
            $("#KhuVucSuDung").data("kendoComboBox").value(selectedItem.KhuVucSuDung);
            $("#tongTienLabel").text("Tổng Tiền: " + kendo.toString(selectedItem.TongTien, 'n0'));

            $.ajax({
                url: '/QuanLyDeXuat/GetNguoiDuyet?ID_DeXuat=' + selectedItem.ID,
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
            }).done(function successCallback(response) {
                var list = response.data.split(",");
                var multiSelect = $("#NguoiDuyet").data("kendoDropDownTree");
                var selectedValues = multiSelect.value();
                selectedValues = [];
                for (var i = 0; i < list.length - 1; i++) {
                    if (selectedValues.indexOf(list[i]) === -1) {
                        selectedValues.push(list[i]);
                    }
                }
                multiSelect.value(selectedValues);
            });

            LoadGridDetail(selectedItem.ID);

            if (selectedItem.TrangThaiDuyet != 2) {
                $('#formContainer').empty();
                if (selectedItem.NguoiTao != 0) {
                    $("#LoaiDinhMucChi").data("kendoComboBox").readonly(true);
                    $("#NoiDung").prop("readonly", true);
                    $("#ThoiGianDuKien").prop("readonly", true);
                    $("#ThoiGianKhauHao").prop("readonly", true);
                    $("#ThoiGianPhanBo").prop("readonly", true);

                    $("#KhuVucSuDung").data("kendoComboBox").readonly(true);
                    $("#NguoiDuyet").data("kendoDropDownTree").readonly(true);
                }
                else {
                    $("#NguoiDuyet").data("kendoDropDownTree").readonly(true);
                }
            }
            else {
                $.ajax({
                    url: '/QuanLyDeXuat/GetUserXetDuyetByID?ID_DeXuat=' + selectedItem.ID,
                    type: 'GET',
                }).done(function successCallback(response) {
                    var data = response.data;

                    var formContainer = $('#formContainer');
                    var FormTemplate = $('#FormTemplate').html();
                    formContainer.empty();
                    $.each(data, function (index, data) {
                        var Form = $(FormTemplate);
                        Form.addClass('row-container'); 

                        Form.find('.nguoiDuyet').text(data.NguoiDuyet);

                        if (data.TrangThaiDuyet === 1) {
                            Form.find('.trangThai').text('Đề xuất được chấp nhận');
                            Form.find('.trangThai').addClass('accepted'); 
                        } else {
                            Form.find('.trangThai').text('Đề xuất bị từ chối');
                            Form.find('.trangThai').addClass('rejected'); 
                        }

                        Form.find('.noiDung').text(data.NoiDungDuyet);
                        var formattedDate = new Date(parseInt(data.NgayDuyet.substr(6)));
                        Form.find('.ngayDuyet').text(kendo.toString(formattedDate, "d/M/yyyy h:mm tt"));

                        formContainer.append(Form);
                    });
                });
            }
        }

    })

    $("#ThoiGianDuKien").kendoDateTimePicker();
    LoadGridData();
    LoadComboBoxDinhMucNhomChi();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

    $("#fileDMHH").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file ảnh danh mục hàng hóa',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg"],
        select: function (e) {
            var files = e.files[0];

            if (files.extension.toLowerCase() != ".jpg" && files.extension.toLowerCase() != ".png" && files.extension.toLowerCase() != ".jpeg") {
                e.preventDefault();
                notification.show({ kValue: "Vui lòng chọn đúng định dạng" + " .jpg;.png;.jpeg" }, "error");
            }
            $("#preview").empty();
            for (var i = 0; i < e.files.length; i++) {
                var file = e.files[i].rawFile;

                if (file) {
                    var reader = new FileReader();

                    reader.onloadend = function () {
                        $("<img width=100 height=100>").attr("src", this.result).appendTo($("#preview"));
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    });
    LoadDonViTinh();
    LoadLoaiSanPham();
})

function LoadGridData() {
    $.ajax({
        url: '/QuanLyDeXuat/GetAllDeXuat',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                parse: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var thoiGianDuKienSuDung = new Date(parseInt(data[i].ThoiGianDuKienSuDung.substr(6)));
                        data[i].ThoiGianDuKienSuDung = kendo.toString(thoiGianDuKienSuDung, "d/M/yyyy h:mm tt");

                        var ngayTao = new Date(parseInt(data[i].NgayTao.substr(6)));
                        data[i].NgayTao = kendo.toString(ngayTao, "d/M/yyyy h:mm tt");

                        data[i].TenHangHoa = "";
                        data[i].TenNguoiDuyet = "";

                        for (var j = 0; j < data[i].ChiTiet.length; j++) {
                            data[i].TenHangHoa += "- " + data[i].ChiTiet[j].TenHangHoa + "\n";
                        }

                        for (var j = 0; j < data[i].NguoiDuyet.length; j++) {
                            data[i].TenNguoiDuyet += "- " + data[i].NguoiDuyet[j].NguoiDuyet + "\n";                           
                        }
                    }
                    return data;
                },
                model: {
                    id: "ID",
                    fields: {
                        ThoiGianDuKienSuDung: { type: "string" },
                        NgayTao: { type: "string" },
                        TongTien: { type: "number" },
                        TenHangHoa: { type: 'string'},
                        TenNguoiDuyet: { type: 'string'},

                    }
                },
                
            },         
            aggregate: { field: "TongTien", aggregate: "sum" },
            pageSize: 50,
        });

        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}
function LoadGridDetail(ID) {
    $.ajax({
        url: '/QuanLyDeXuatChiTiet/GetAllDeXuatChiTiet?ID_DeXuat=' + ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#griddetail"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID_HangHoa: { type: 'number', editable: true },
                        TenHangHoa: { type: 'text', editable: true },
                        SoLuong: { type: 'text', editable: true },
                        QuyCachSuDung: { type: 'text', editable: true },
                        SoTien: { type: 'number', editable: true },

                    }
                }
            },
            aggregate: [{ field: "SoTien", aggregate: "sum" }],
            pageSize: 50,
        });

        $("#griddetail").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#griddetail"), false);
    });
}
function LoadComboBoxDinhMucNhomChi() {
    $.ajax({
        url: '/DanhMuc/QuanLyDeXuat_GetAllNhomChi',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#LoaiDinhMucChi").data("kendoComboBox") == undefined) {
            $("#LoaiDinhMucChi").kendoComboBox({
                dataTextField: "TenNhomChi",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#LoaiDinhMucChi").data("kendoComboBox").setDataSource(dataSource);
        }
    });

    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
    }).done(function successCallback(response) {
        var quantri = [];
        var nhanvien = [];
        var quanly = [];
        var norole = [];

        for (var i = 0; i < response.length; i++) {
            if (response[i].Role == 1) {
                quantri.push(response[i]);
            }
            else if (response[i].Role == 2) {
                quanly.push(response[i]);
            }
            else if (response[i].Role == 3) {
                nhanvien.push(response[i]);
            }
            else if (response[i].Role == 4) {
                norole.push(response[i]);
            }
        }

        var dataSource = new kendo.data.HierarchicalDataSource({
            sort: { field: "roleName", dir: "asc" },
            data: [
                {
                    ID: 0,
                    TenDayDu: "Quản Trị Viên",
                    expanded: true,
                    items: quantri
                },
                {
                    ID: -1,
                    TenDayDu: "Quản Lý",
                    items: quanly
                },
                {
                    ID: -2,
                    TenDayDu: "Nhân Viên",
                    items: nhanvien
                },
                {
                    ID: -3,
                    TenDayDu: "Khác",
                    items: norole
                }
            ]
        });

        $("#NguoiDuyet").kendoDropDownTree({
            placeholder: "Vui lòng chọn người duyệt ...",
            height: "auto",
            dataSource: dataSource,
            dataValueField: "ID",
            dataTextField: "TenDayDu",
            checkboxes: {
                checkChildren: true
            },
            autoClose: false
        });
    });

    $.ajax({
        url: '/DanhMucKhuVuc/GetAll',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',

    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#KhuVucSuDung").data("kendoComboBox") == undefined) {
            $("#KhuVucSuDung").kendoComboBox({
                dataTextField: "TenKhuVuc",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#KhuVucSuDung").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}
function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#tongTienLabel").text("Tổng Tiền: ");
    $("#ID").val('0');
    $("#window").data("kendoWindow").center().maximize().open();

    document.getElementById("luu").disabled = false;
    LoadGridDetail(0);

    $("#grid").data("kendoGrid").clearSelection();
    $("#LoaiDinhMucChi").data("kendoComboBox").readonly(false);
    $("#NoiDung").prop("readonly", false);

    $("#ThoiGianDuKien").prop("readonly", false);
    var currentDate = new Date();
    currentDate.setHours(15, 0, 0, 0);
    var formattedDate =
        (currentDate.getMonth() + 1) + '/' +
        currentDate.getDate() + '/' +
        currentDate.getFullYear() + ' ' +
        (currentDate.getHours() % 12 || 12) + ':' +
        ('0' + currentDate.getMinutes()).slice(-2) + ' ' +
        (currentDate.getHours() >= 12 ? 'PM' : 'AM');

    $("#ThoiGianDuKien").val(formattedDate);

    $("#ThoiGianKhauHao").prop("readonly", false);
    $("#ThoiGianKhauHao").val(1);
    $("#ThoiGianPhanBo").prop("readonly", false);
    $("#ThoiGianPhanBo").val(0);
    //setTimeout(function () {
    //    $("#HinhThucPhanBo").data("kendoComboBox").value(1);
    //}, 500);

    $("#KhuVucSuDung").data("kendoComboBox").readonly(false);
    $("#NguoiDuyet").data("kendoDropDownTree").readonly(false);
    $("#FormPheDuyet").hide();
    $('#formContainer').empty();

}
function PheDuyetNhieu() {
    var selectedIds = [];
    var grid = $("#grid").data("kendoGrid");
    var isNotificationShown = false;
    var selectedDataItems = grid.select();

    selectedDataItems.each(function (index, element) {
        var dataItem = grid.dataItem(element);

        if (dataItem.TrangThaiDuyet !== 3) {
            if (!isNotificationShown) {
                notification.show({ kValue: 'Vui lòng chọn đề xuất đang chờ phê duyệt!!!'}, "error");
                isNotificationShown = true;
                selectedIds = [];
            }
            grid.clearSelection();
            return;
        }
        selectedIds.push(dataItem.ID);
    });
    if (selectedIds.length === 0 && !isNotificationShown) {
        notification.show({ kValue: 'Vui lòng chọn đề xuất'}, "error");
    }
    else {
        isNotificationShown = false;
        for (var i = 0; i < selectedIds.length; i++) {
            $.ajax({
                url: '/QuanLyDeXuat/TrangThaiDuyet?ID=' + selectedIds[i] + '&TrangThai=' + 1 + '&NoiDungDuyet=PheDuyet',
                type: 'POST'
            }).done(function (response) {
                if (response.status) {
                    LoadGridData();
                    grid.clearSelection();
                    if (!isNotificationShown) {
                        notification.show({ kValue: response.msg }, "success");
                        isNotificationShown = true;
                    }
                } else {
                    if (!isNotificationShown) {
                        notification.show({ kValue: response.msg }, "error");
                        isNotificationShown = true;
                    }
                }                       
            })
        }           
    }
}
function pheduyet() {
    $.ajax({
        url: '/QuanLyDeXuat/TrangThaiDuyet?ID=' + $("#ID").val() + '&TrangThai=' + 1 + '&NoiDungDuyet=' + $("#NoiDungPheDuyet").val(),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}
function tuchoiduyet() {

    $.ajax({
        url: '/QuanLyDeXuat/TrangThaiDuyet?ID=' + $("#ID").val() + '&TrangThai=' + 2 + '&NoiDungDuyet=' + $("#NoiDungPheDuyet").val(),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}
function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhSachDeXuat.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}
function LuuPhieuChi() {
    var validtdx = SetValidate("TenDeXuat");
    var validdmc = SetValidate("LoaiDinhMucChi");
    var validtgsksd = SetValidate("ThoiGianDuKien");
    var validkvsd = SetValidate("KhuVucSuDung");
    var validtgkh = SetValidate("ThoiGianKhauHao");
    var validhtpb = SetValidate("ThoiGianPhanBo");

    var listChiTiet = [];
    $.each($("#griddetail").data("kendoGrid").dataSource.data(), function (index, item) {
        listChiTiet.push({
            ID_DeXuat: $("#ID").val(),
            ID_HangHoa: item.ID_HangHoa ,
            TenHangHoa: item.TenHangHoa,
            SoLuong: item.SoLuong,
            QuyCachSuDung: item.QuyCachSuDung,
            SoTien: item.SoTien,
        })
    });

    if (validdmc && validtgsksd && $("#NguoiDuyet").data("kendoDropDownTree").value() != null && validkvsd && validtgkh && listChiTiet && validhtpb && validtdx && listChiTiet.length > 0) {
        var model = {
            ID: $("#ID").val(),
            TenDeXuat: $("#TenDeXuat").val(),
            ID_DinhMucChi: $("#LoaiDinhMucChi").val(),
            ID_NguoiTao: $("#NguoiTao").val(),
            ThoiGianDuKienSuDung: kendo.toString($("#ThoiGianDuKien").val(), "yyyy/MM/dd HH:mm:ss"),
            KhuVucSuDung: $("#KhuVucSuDung").val(),
            NoiDung: $("#NoiDung").val(),
            NguoiDuyet: $("#NguoiDuyet").data("kendoDropDownTree").value(),
            ThoiGianKhauHao: $("#ThoiGianKhauHao").val(),
            ThoiGianPhanBo: $("#ThoiGianPhanBo").val(),
            HinhThucPhanBo: 0,
            TrangThaiDuyet: 3,
            TongTien: parseFloat($("#tongTienLabel").text().replace(/\D/g, '')),
            ChiTiet: listChiTiet,
        }
        console.log(model);
        $.ajax({
            url: '/QuanLyDeXuat/CreateOrUpdate',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyPhieuChi();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
    else {
        notification.show({ kValue: "Vui lòng nhập đầy đủ dữ liệu" }, "error");
    }
}
function HuyPhieuChi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    $("#window").data("kendoWindow").close();
}
function AddNewRow() {
    var grid = $("#griddetail").data("kendoGrid");
    grid.addRow();
}
function CalcTongTien() {
    var grid = $("#griddetail").data("kendoGrid");
    var dataItems = grid.dataSource.data();
    var tongtien = 0;

    for (var i = 0; i < dataItems.length; i++) {
        var tongtien = tongtien + dataItems[i].SoTien * dataItems[i].SoLuong;
    }

    $("#tongTienLabel").text("Tổng Tiền: " + kendo.toString(tongtien, 'n0'));
}
function DeleteRow(uid) {
    var dataRow = $('#griddetail').data("kendoGrid").dataSource.getByUid(uid);
    $('#griddetail').data("kendoGrid").dataSource.remove(dataRow);
}


//Them moi hang hoa
function themMoiHangHoa() {
    if ($(window).width() > 800) {
        $("#windowThemHangHoa").data("kendoWindow").center().open();
    } else {
        $("#windowThemHangHoa").data("kendoWindow").center().maximize().open();
    }

    $("#preview").empty();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#buttomXoa").hide();
}
function LuuHangHoa() {
    var validmh = SetValidate("MaHang");
    var validthh = SetValidate("TenHangHoa");
    var validdvt = SetValidate("DonViTinh");
    var validlsp = SetValidate("LoaiSanPham");
    var validgbl = SetValidate("GiaBanLe");
    var validgn = SetValidate("GiaNhap");
    var validgbb = SetValidate("GiaBanBuon");

    var upload = $("#fileDMHH").getKendoUpload().getFiles();
    if (validmh && validthh && validdvt && validlsp && validgbl && validgn && validgbb != null) {
        if (upload.length > 0) {
            PushFormDataFile(upload[0], function (path) {
                $("#HinhAnh").val(path);
                LuuData(path);
            });
        }
        else {
            LuuData($("#HinhAnh").val());
        }
    }
}
function HuyHangHoa() {
    $("#preview").empty();
    $("#ID").val("");
    $("#MaHang").val("");
    $("#TenHangHoa").val("");
    $("#DonViTinh").data("kendoComboBox").value("");
    $("#LoaiSanPham").data("kendoComboBox").value("");
    $("#SoLuongTonToiThieu").val("");
    $("#GiaBanLe").val("");
    $("#GiaNhap").val("");
    $("#GiaBanBuon").val("");
    $("#MoTaSanPham").val("");

    $("#windowThemHangHoa").data("kendoWindow").close();
}
function LuuData(path) {
    if ($("#ID").val() == 0) {
        var model = {
            MaHang: $("#MaHang").val(),
            Ten: $("#TenHangHoa").val(),
            DonViTinh: $("#DonViTinh").data("kendoComboBox").text(),
            LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").text(),
            GiaBanBuon: parseFloat($("#GiaBanBuon").val().replace(/\D/g, '')),
            GiaBanLe: parseFloat($("#GiaBanLe").val().replace(/\D/g, '')),
            GiaNhap: parseFloat($("#GiaNhap").val().replace(/\D/g, '')),
            HinhAnhSanPham: path,
            MoTaSanPham: ($("#MoTaSanPham").val() !== null && $("#MoTaSanPham").val() !== "") ? $("#MoTaSanPham").val() : "Mô tả",
            SoLuongTonToiThieu: 1,
            SoLuongBanBuonToiThieu: 5,
            ID_DonViTinh: $("#DonViTinh").data("kendoComboBox").value(),
            ID_LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").value(),

        }

        $.ajax({
            url: '/DanhMucHangHoa/Create',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyHangHoa();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });

    }
    else {
        var model = {
            ID: $("#ID").val(),
            MaHang: $("#MaHang").val(),
            Ten: $("#TenHangHoa").val(),
            DonViTinh: $("#DonViTinh").data("kendoComboBox").text(),
            LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").text(),
            GiaBanBuon: parseFloat($("#GiaBanBuon").val().replace(/\D/g, '')),
            GiaBanLe: parseFloat($("#GiaBanLe").val().replace(/\D/g, '')),
            GiaNhap: parseFloat($("#GiaNhap").val().replace(/\D/g, '')),
            HinhAnhSanPham: path,
            MoTaSanPham: ($("#MoTaSanPham").val() !== null && $("#MoTaSanPham").val() !== "") ? $("#MoTaSanPham").val() : "Mô tả",
            SoLuongTonToiThieu: 1,
            SoLuongBanBuonToiThieu: 5,
            ID_DonViTinh: $("#DonViTinh").data("kendoComboBox").value(),
            ID_LoaiSanPham: $("#LoaiSanPham").data("kendoComboBox").value(),
        }

        $.ajax({
            url: '/DanhMucHangHoa/Update',
            data: model,
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyHangHoa();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}
function clearImage() {
    event.preventDefault();
    $("#preview").empty();
    $("#HinhAnh").val("khongcohinhanh.jpg");
    $("#fileDMCB").val("");
};
function PushFormDataFile(file, callback) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);

    var t = $.ajax({
        url: '/DanhMucHangHoa/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        path = response.fileName;
        callback(path)
    });
}
function LoadDonViTinh() {
    $.ajax({
        url: '/DanhMucDonViTinh/GetAll',
        type: 'GET',
    }).done(function (response) {
        //if (response && response.length > 0) {
        //    $("#DonViTinh").kendoComboBox({
        //        dataSource: response.map(function (item) {
        //            return item.DonViTinh;
        //        })
        //    });
        //}
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#DonViTinh").data("kendoComboBox") == undefined) {
            $("#DonViTinh").kendoComboBox({
                dataTextField: "Ten",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#DonViTinh").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}
function LoadLoaiSanPham() {
    $.ajax({
        url: '/DanhMucLoaiSanPham/GetAll',
        type: 'GET',
    }).done(function (response) {
        //if (response && response.length > 0) {
        //    $("#LoaiSanPham").kendoComboBox({
        //        dataSource: response.map(function (item) {
        //            return item.TenNhomChi;
        //        })
        //    });
        //}
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#LoaiSanPham").data("kendoComboBox") == undefined) {
            $("#LoaiSanPham").kendoComboBox({
                dataTextField: "Ten",
                dataValueField: "ID",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#LoaiSanPham").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}