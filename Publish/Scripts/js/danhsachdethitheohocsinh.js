
var selectedDanhMuc;
var lstCauHoiTrongDe = [];
var lstIDCauHoiTrongDe = [];
var lstIDHocSinhTrongDe = [];
var ID_CurrentQuest = 0;
var lstTraLoi = [];
var dataSourceCombo;
var count = 1;
var timers = 0;
var count_AlertChangeTab = 60000;
var timerInterval;
var timerInterval_counrtAlert;
var isTamDung = null;
var Ans = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

$(document).ready(function () {
    MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
    MathJax.Hub.Config({ tex2jax: { displayMath: [['$$', '$$'], ['\\(', '\\)']] } });
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
                template: function (e) {
                    if (e.ThoiGianBatDau != null) {
                        var dateString = e.ThoiGianBatDau.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        if (currentTime.getFullYear() != 1) {
                            return kendo.toString(currentTime, "hh:mm dd/MM/yyyy");
                        } else {
                            return "";
                        }
                    } else {
                        return "";
                    }
                },
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
                    return "<i onclick='XemTruocDeThi(\"" + e.uid + "\"," + e.dethi.ID + "," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
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
        title: "Bài làm trắc nghiệm",
        actions: []
    });
    LoadGridDeThi();
    //$("#listviewcauhoi").kendoListView({
    //    template: kendo.template($("#templatecauhoi").html())
    //});
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function () {
        if ((screen.height <= screen.width) && (screen.width < 1000)) {
            $("#alertOrientation").show();
            console.log('show');
        } else {
            $("#alertOrientation").hide();
            console.log('hide');
        }
    }, false);

    $(window).blur(function () {
        if (timers > 0) {
            tamDungBaiThi("Chuyển tab hoặc rời khỏi trang thi");
        }
    });
})

function tamDungBaiThi(type) {
    $("#typeAlert").html(type);
    if (isTamDung == false) {
        isTamDung = true;

        //var wnd = $("#windowXemDeThi").data("kendoWindow");
        //if (wnd.element.is(":hidden") == false) {
        if (timers > 0) {
            clearInterval(timerInterval);
            $("#alertChangetab").show();
            timerInterval_counrtAlert = setInterval(function () {
                console.log(count_AlertChangeTab);
                if (count_AlertChangeTab == 0) {
                    ketthucbaithi();
                } else {
                    count_AlertChangeTab -= 1000;
                    $("#countAlertChangeTab").text(kendo.toString(new Date(count_AlertChangeTab), 'mm:ss') + " giây");
                }
            }, 1000);
        } else {
            //$("#alertChangetab").hide();
        }
    }
}

function window_resize() {
    if (window.innerHeight != screen.height) {
        tamDungBaiThi("Thoát khỏi trạng thái toàn màn hình");
    }
}

function tiepTucLamBai() {
    isTamDung = false;
    $("#alertChangetab").hide();
    if (timers > 0) {
        clearInterval(timerInterval_counrtAlert);
        timerInterval = setInterval(function () {
            timers += 1000;
            $("#thoigian").text(kendo.toString(new Date(timers), 'mm:ss'));
        }, 1000);
    }
}



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

function XemTruocDeThi(uid, id_dethi, idbailam) {
    kendo.ui.progress($("#windowXemDeThi"), true);
    isTamDung = false;
    $("#windowXemDeThi").data("kendoWindow").center().open().maximize();
    var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
    $("#TenDe").text(dataRow.dethi.TenDeThi);
    $("#TenMon").text(dataRow.dethi.TenMonHoc);
    $("#ThoiGianLamBai").text(dataRow.dethi.ThoiGian);
    $("#ID_BaiLamTracNghiem").val(idbailam);
    let html = '';
    ID_CurrentQuest = dataRow.dethi.lstCauHoi[0].ID;
    lstCauHoiTrongDe = [];
    lstTraLoi = [];
    $.each(dataRow.dethi.lstCauHoi, function (index, item) {
        item.ID_BaiLamTracNghiem = idbailam;
        if (index == 0) {
            html += '<span id="ch' + item.ID + '" class="question-item selected" onclick="loadCauHoi(' + index + ')">Câu ' + (index + 1) + '</span>';
        } else {
            html += '<span id="ch' + item.ID + '" class="question-item" onclick="loadCauHoi(' + index + ')">Câu ' + (index + 1) + '</span>';
        }
        lstCauHoiTrongDe.push(item);
    })
    $(".question-list").html(html);
    $("#btnbatdau").show();
    $("#btnketthuc").hide();
    $(".question-item").hide();

    if ((screen.height <= screen.width) && (screen.width < 1000)) {
        $("#alertOrientation").show();
    } else {
        $("#alertOrientation").hide();
    }

    document.querySelector("#windowXemDeThi").requestFullscreen({ navigationUI: "hide" })
        .then(function () {
            var dialog = $("#windowXemDeThi").data("kendoWindow");
            dialog.bind("resize", window_resize);
        })
        .catch(function (error) {

        });
    kendo.ui.progress($("#windowXemDeThi"), false);
}

function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function loadCauHoi(index) {
    count = index;
    $("span#ch" + ID_CurrentQuest).removeClass("selected");
    ID_CurrentQuest = lstCauHoiTrongDe[index].ID;
    var temp = kendo.template($("#templatecauhoi").html());
    $("#listviewcauhoi").html(temp(lstCauHoiTrongDe[index]))
    $("span#ch" + ID_CurrentQuest).addClass("selected");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
}

function updateDapAn(ID_BaiLamTracNghiem, ID_CauHoi, ID_DapAn, IsDapAnDung, Diem) {
    if ($("span#ch" + ID_CauHoi).hasClass("answered")) {
        $.each(lstTraLoi, function (index, item) {
            if (item.ID_CauHoi == ID_CauHoi) {
                item.TraLoi = ID_DapAn;
                item.TraLoiDung = IsDapAnDung;
            }
        })
    } else {
        var item = {
            ID_BaiLamTracNghiem: ID_BaiLamTracNghiem,
            ID_CauHoi: ID_CauHoi,
            TraLoiDung: IsDapAnDung,
            TraLoi: ID_DapAn,
            Diem: Diem.toString().replace('.', ',')
        }
        lstTraLoi.push(item);
        $("span#ch" + ID_CauHoi).addClass("answered");
    }
}

function batdaulambai() {
    $.ajax({
        url: '/TracNghiem/BaiLamTracNghiem_BatDauLamBai',
        type: 'POST',
        data: {
            ID: $("#ID_BaiLamTracNghiem").val()
        }
    }).done(function successCallback(response) {
        kendo.ui.progress($("#windowXemDeThi"), true);
        loadCauHoi(0);
        isTamDung = false;
        $("#btnbatdau").hide();
        $("#btnketthuc").show();
        $(".question-item").show();
        $("#batdau").text(kendo.toString(new Date(), 'hh:mm dd/MM/yyyy'));
        timerInterval = setInterval(function () {
            timers += 1000;
            $("#thoigian").text(kendo.toString(new Date(timers), 'mm:ss'));
        }, 1000);
        if (window.innerHeight != screen.height) {
            document.querySelector("#windowXemDeThi").requestFullscreen({ navigationUI: "hide" })
                .then(function () {
                    var dialog = $("#windowXemDeThi").data("kendoWindow");
                    dialog.bind("resize", window_resize);
                })
                .catch(function (error) {

                });
        }
        kendo.ui.progress($("#windowXemDeThi"), false);
    });
}

function ketthucbaithi() {
    $.ajax({
        url: '/TracNghiem/BaiLamTracNghiem_KetThucLamBai',
        type: 'POST',
        data: {
            ID: $("#ID_BaiLamTracNghiem").val(),
            lstChitiet: lstTraLoi
        }
    }).done(function successCallback(response) {
        clearInterval(timerInterval);
        clearInterval(timerInterval_counrtAlert);
        timers = 0;
        $("#listviewcauhoi").html("");
        $("#thoigian").text(kendo.toString(new Date(timers), 'mm:ss'));
        $("#alertOrientation").hide();
        $("#alertChangetab").hide();
        $("#windowXemDeThi").data("kendoWindow").unbind("resize");
        count_AlertChangeTab = 60000;
        document.exitFullscreen()
            .then(function () {

            })
            .catch(function (error) {
                // element could not exit fullscreen mode
                // error message
                console.log(error.message);
            });
        $("#windowXemDeThi").data("kendoWindow").close();
        kendo.ui.progress($("#windowXemDeThi"), false);
    });

}