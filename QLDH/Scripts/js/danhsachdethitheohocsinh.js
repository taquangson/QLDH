var selectedDanhMuc;
var lstCauHoiTrongDe = [];
var lstIDCauHoiTrongDe = [];
var lstIDHocSinhTrongDe = [];
var dataSourceCombo;
var count = 1;
var Ans = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
$(document).ready(function () {
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridDeThi").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
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
        columns: [
            {
                width: "30px",
                selectable: true,
                hidden: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "80px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "dethi.TenDeThi",
                title: "Tên đề thi",
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
                field: "SoLanLam",
                title: "Số lần làm",
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
                field: "ThoiGianBatDau",
                title: "Lần cuối làm bài",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "Diem",
                title: "Điểm",
                template: function (e) {
                    if (e.Diem > 0) {
                        return e.Diem;
                    } else {
                        return "";
                    }
                },
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
                    style: "text-align: center;",
                }
            },
            {
                title: "Số câu hỏi",
                width: "100px",
                template: function (e) {
                    let count = e.dethi.lstCauHoi.length;
                    $.each(e.dethi.lstChiTiet, function (index, item) {
                        count += item.SoLuongCauHoi;
                    });
                    return count;
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
                field: "dethi.TenKhoi",
                title: "Khối",
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
                field: "dethi.TenMonHoc",
                title: "Môn học",
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
                field: "dethi.NgayTao",
                title: "Ngày tạo",
                template: function (e) {
                    var dateString = e.dethi.NgayTao.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
                },
                width: "10%",
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
                field: "dethi.TenTaiKhoan",
                title: "Người tạo",
                width: "10%",
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
                field: "dethi.TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.dethi.TrangThai == 1) {
                        return "Mở";
                    } else {
                        return "Đóng";
                    }
                },
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
                    style: "text-align: center;",
                }
            },
            {
                title: "Xem trước",
                template: function (e) {
                    return "<i onclick='XemTruocDeThi(\"" + e.uid + "\"," + e.dethi.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
                },
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
                    style: "text-align: center;",
                }
            }
        ]

    });

   
    $("#windowXemDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Xem đề thi"
    });
    LoadGridDeThi();
    $("#listviewcauhoi").kendoListView({
        template: kendo.template($("#templatecauhoi").html())
    });
})



function LoadGridDeThi() {
    $.ajax({
        url: '/TracNghiem/GetAllBaiLamTracNghiem_ByHocSinh?' + window.location.href.split("#")[0].split("?")[1],
        type: 'GET',
    }).done(function successCallback(response) {
        $.each(response, function (index, item) {
            item.SoLanLam = item.lstLichsu.length;
        })
        kendo.ui.progress($("#gridDeThi"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridDeThi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridDeThi"), false);
    });
}

function XemTruocDeThi(uid, id) {
    $("#windowXemDeThi").data("kendoWindow").center().open().maximize();
    var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
    $("#TenDe").text(dataRow.dethi.TenDeThi);
    $("#TenMon").text(dataRow.dethi.TenMonHoc);
    $("#ThoiGianLamBai").text(dataRow.dethi.ThoiGian);
    console.log(dataRow);
    count = 1;
    var dataSource = new kendo.data.DataSource({
        data: dataRow.dethi.lstCauHoi,
        schema: {
            model: {
                id: "ID",
                fields: {
                    NgayTao: {
                        type: 'date'
                    }
                }
            }
        }
    });
    $("#listviewcauhoi").data("kendoListView").setDataSource(dataSource);
    kendo.ui.progress($("#rootContainer"), false);
}

function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}