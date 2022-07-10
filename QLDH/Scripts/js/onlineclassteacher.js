window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};



kendo.mobile.ui.Drawer.current = null;
var app = new kendo.mobile.Application(document.body, { skin: "nova" });
var Video = null;
var room = null;
var participants = [
];

window.addEventListener("beforeunload", function (e) {
    var idlop = getParameterByName("ID_Lop");
    completeRoom(idlop);
});

/*SignalR*/
$.connection.hub.start().done(function () {
    console.log("Connect signalR OK!");
});
var signalR = $.connection.boardcastHub;
signalR.client.push_chat = function (id, description) {
    if (parseInt(id) > 0) {
        $("#chat").data("kendoChat").renderMessage({
            type: "text",
            text: description
        }, {
            id: id,
            name: id,
            iconUrl: "../Images/img.png"
        });
    }
}
/*SignalR end*/


/* Chat */
function sendMessage(senderId, value, hubpush) {
    $.ajax({
        url: '/LiveClass/InitCallSession',
        type: 'POST',
        data: { senderId: senderId, message: value, hubname: hubpush }
    }).done(function (response) {

    })
}
/* Chat end*/


/* Twilio */
function getTwilioToken(roomName) {
    $.ajax({
        url: '/LiveClass/GetTwilio_AccessToken?RoomName=' + roomName,
        type: 'GET',
    }).done(function (response) {
        connectRoom(response.token, roomName);
    })
}

function connectRoom(token, roomName) {
    Video.createLocalTracks({
        audio: { name: 'microphone' },
        video: { name: 'camera' }
    }).then(function (localTracks) {
        localTracks.forEach(function (localTrack) {
            console.log(localTrack.name);
        });

        Video.connect(token, { name: roomName, track: localTracks }).then(room => {
            console.log('Successfully joined a Room: ' + roomName);
            $("#running-text").show();
            $("#start-stream").hide();
            $("#txtRunning").text("On Streamming!...Đang phát trực tiếp!...");
            participants = room.participants;
            room.participants.forEach(participantConnected);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            room.once('disconnected', error => room.participants.forEach(participantDisconnected));
        }, error => {
            console.error(`Unable to connect to Room: ${error.message}`);
        });
    });
}

function getParticipants() {
    $.ajax({
        url: '/LiveClass/GetRoom_Participants?SID=' + room.Sid,
        type: 'GET',
    }).done(function (response) {
        console.log(response);
    })
}


function createRoom(ID_Lop) {
    $("#start-stream").hide();
    $("#running-text").show();
    $.ajax({
        url: '/LiveClass/CreateRoom?ID_Lop=' + ID_Lop,
        type: 'POST',
    }).done(function (response) {
        room = response.room;
        getTwilioToken(room.UniqueName);
    })
}

function completeRoom(ID_Lop) {
    $.ajax({
        url: '/LiveClass/CompleteRoom',
        type: 'POST',
        data: { ID_Lop: ID_Lop, SID: room.Sid }
    }).done(function (response) {

    })
}

function participantConnected(participant) {
    console.log('Participant "%s" connected', participant.identity);

    const div = document.createElement('div');
    div.className = "participant-view"
    div.id = participant.sid;
    div.innerText = participant.identity;
    var track_item = null;
    participant.on('trackSubscribed', function (track) { trackSubscribed(div, track); track_item = track});
    participant.on('trackUnsubscribed', trackUnsubscribed);

    participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
            trackSubscribed(div, publication.track);
        }
    });

    document.getElementById("participant").append(div);


    $("#ul-list-participant").append("<li class='li-participant'><label style='width:100%;color:#fff;font-size:1.2em;font-weight:500'>" + participant.identity + "</label> <div class='group-combo'> " +
        "<input type='checkbox' checked='checked' id='cb-video-" + participant.sid + "' class='km-checkbox'/><label class= 'km-checkbox-label' for='cb-video-" + participant.sid + "'> <i class='fa fa-video-camera'></i></label>"
        + "<input type='checkbox' checked='checked' onchange='changeVoice(this,\'" + participant.sid + "\')' id='cb-voice-" + participant.sid + "' class='km-checkbox'/><label class= 'km-checkbox-label' for='cb-voice-" + participant.sid + "'> <i class='fa fa-microphone'></i></label>"
        + "<input type='checkbox' checked='checked' onchange='changeChat(this,\'" + participant.sid + "\')' id='cb-chat-" + participant.sid + "' class='km-checkbox'/><label class= 'km-checkbox-label' for='cb-chat-" + participant.sid + "'> <i class='fa fa-comments'></i></label>"
        + "</div></li>");


    var checkbox_video = document.querySelector("input[id=cb-video-" + participant.sid + "]");
    var checkbox_voice = document.querySelector("input[id=cb-video-" + participant.sid + "]");

    checkbox_video.addEventListener('change', function () {
        console.log(this.checked);
        if (this.checked) {
            $("#participant-" + participant.sid).show();
            trackSubscribed(div, track_item);
        } else {
            $("#participant-" + participant.sid).hide();
            trackUnsubscribed(track_item);
        }

    });
}

function participantDisconnected(participant) {
    console.log('Participant "%s" disconnected', participant.identity);
    document.getElementById(participant.sid).remove();
}

function trackSubscribed(div, track) {
    div.append(track.attach());
}

function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
}

/* Twilio end */

function openSettingWindow() {
    if (mobileCheck()) {
        if (screen.availHeight > screen.availWidth) {
            console.log("Portrait")
            $("#windowSettingSource").data("kendoWindow").setOptions({
                width: screen.availWidth - 50,
                height: "200"
            });
        } else {
            console.log("Landscape")
            $("#windowSettingSource").data("kendoWindow").setOptions({
                width: "500",
                height: "200"
            })
        }
    }
    $("#windowSettingSource").data("kendoWindow").center().open();
}

function checkPhongHocOnline(sid) {
    $.ajax({
        url: '/LiveClass/GetRoomInfo?SID=' + sid,
        type: 'GET',
    }).done(function (response) {
        if (response.status) {
            room = response.room;
            if (room.EndTime == null && room.Duration == null) {
                getTwilioToken(room.UniqueName);
            } else {
                var idlop = getParameterByName("ID_Lop");
                createRoom(idlop);
            }
        } else {
            var idlop = getParameterByName("ID_Lop");
            createRoom(idlop);
        }
    })
}

function getThongTinLopHoc() {
    var idlop = getParameterByName("ID_Lop");
    $.ajax({
        url: '/Lop/GetById?ID=' + idlop,
        type: 'GET',
    }).done(function (response) {
        if (response.Token_Room == null) {
            response.Token_Room = "";
        }
        checkPhongHocOnline(response.Token_Room)
    })
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function () {
    videoElement = document.querySelector("video");
    $("#comboAudio").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        select: function () {
            getStream;
        }
    });
    $("#comboVideo").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        select: function () {
            getStream;
        }
    });

    getStream()
        .then(getDevices)
        .then(gotDevices);

    function getDevices() {
        return navigator.mediaDevices.enumerateDevices();
    }

    function gotDevices(deviceInfos) {
        window.deviceInfos = deviceInfos;
        let dataAudio = [];
        let dataVideo = [];
        for (const deviceInfo of deviceInfos) {
            if (deviceInfo.kind === "audioinput") {
                let item = deviceInfo.label;
                dataAudio.push({ value: item, text: item });
            } else if (deviceInfo.kind === "videoinput") {
                let item = deviceInfo.label;
                dataVideo.push({ value: item, text: item });
            }
        }
        var dataSourceAudio = new kendo.data.DataSource({
            data: dataAudio
        });
        var dataSourceVideo = new kendo.data.DataSource({
            data: dataVideo
        });
        $("#comboAudio").data("kendoComboBox").setDataSource(dataSourceAudio);
        $("#comboVideo").data("kendoComboBox").setDataSource(dataSourceVideo);
    }

    function getStream() {
        if (window.stream) {
            window.stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        const audioSource = $("#comboAudio").data("kendoComboBox").value();
        const constraints = {
            audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
            video: { width: { exact: 1366 }, height: { exact: 768 } }

        };
        return navigator.mediaDevices
            .getUserMedia(constraints)
            .then(gotStream)
            .catch(handleError);
    }

    function gotStream(stream) {
        window.stream = stream;
        $("#comboAudio").data("kendoComboBox").value(stream.getAudioTracks()[0].label);
        $("#comboVideo").data("kendoComboBox").value(stream.getVideoTracks()[0].label);
        videoElement.srcObject = stream;
    }

    function handleError(error) {
        console.error("Error: ", error);
    }

    Video = Twilio.Video;
    $("#running-text").hide();

    $("#windowChat").kendoWindow({
        title: "Tin nhắn",
        modal: false,
        resizable: false,
        width: "25%"
    })

    $("#windowSettingSource").kendoWindow({
        title: "Cài đặt nguồn thiết bị",
        modal: true,
        draggable: false,
        resizable: false
    })

    $("#chat").kendoChat({
        post: function (e) {
            console.log(e.text);
            $.ajax({
                url: '/LiveClass/InitCallSession',
                type: 'POST',
                data: { senderId: "Giáo viên", message: e.text, hubname: 'chat' }
            }).done(function (response) {

            })
        },
        sendMessage: function (e) {

        }
    }).data("kendoChat");

    $("#modalview-open-button").click(function () {
        if (mobileCheck()) {
            if (screen.availHeight > screen.availWidth) {
                console.log("Portrait")
                $("#windowChat").data("kendoWindow").setOptions({
                    width: "80%",
                    //height: "calc(50vh + 50px)"
                });
                $("#chat").data("kendoChat").setOptions({
                    width: "80%",
                    //height: "calc(50vh)"
                });
            } else {
                console.log("Landscape")
                $("#windowChat").data("kendoWindow").setOptions({
                    width: "60%",
                    //height: "calc(80vh + 50px)"
                })
                $("#chat").data("kendoChat").setOptions({
                    width: "60%",
                    //height: "calc(80vh)"
                });
            }
        }
        $("#windowChat").data("kendoWindow").center().open();
    })



    //var mess =
    //    '<div class="k-message-group ">'
    //    + '<p class="k-author" > HealthCareBotService</p >'
    //    + '<img src="../Images/img.png" alt="HealthCareBotService" class="k-avatar">'
    //    + '<div class="k-message k-first">'
    //    + '<time class="k-message-time">12:26:36</time>'
    //    + '<div class="k-bubble">Hello,</div>'
    //    + '</div>'
    //    + '<div class="k-message k-middle">'
    //    + '<time class="k-message-time">12:26:36</time>'
    //    + '<div class="k-bubble">I am your Virtual Assistant at BioMed appointment management system.</div>'
    //    + '</div>'
    //    + '<div class="k-message k-middle">'
    //    + '<time class="k-message-time">12:26:36</time>'
    //    + '<div class="k-bubble">I am y.</div>'
    //    + '</div>'
    //    + '<div class="k-message k-last">'
    //    + '<time class="k-message-time">12:26:37</time>'
    //    + '<div class="k-bubble">I will assist you in finding a schedule for a check-up:'
    //    + '</div>'
    //    + '</div>'

    //    + '<div class="k-quick-replies">'
    //    + '<span class="k-quick-reply" data-value="A. 123123">A. 123123'
    //    + '</span>'
    //    + '<span class="k-quick-reply" data-value=">B. 123323">B. 123323'
    //    + '</span>'
    //    + '<span class="k-quick-reply" data-value="C. 123234">C. 123234'
    //    + '</span>'
    //    + '<span class="k-quick-reply" data-value="D. 123124">D. 123124'
    //    + '</span>'
    //    + '</div>';
    //$(".k-message-list-content").append(mess);

    $.each(participants, function (index, item) {
        $("#ul-list-participant").append("<li class='li-participant'><label style='width:100%;color:#fff;font-size:1.2em;font-weight:500'>" + item.name + "</label> <div class='group-combo'> " +
            "<input type='checkbox' checked='checked' id='cb-video-" + item.sid + "' class='km-checkbox'/><label class= 'km-checkbox-label' for='cb-video-" + item.sid + "'> <i class='fa fa-video-camera'></i></label>"
            + "<input type='checkbox' checked='checked' onchange='changeVoice(this,\'" + item.sid + "\')' id='cb-voice-" + item.sid + "' class='km-checkbox'/><label class= 'km-checkbox-label' for='cb-voice-" + item.sid + "'> <i class='fa fa-microphone'></i></label>"
            + "<input type='checkbox' checked='checked' onchange='changeChat(this,\'" + item.sid + "\')' id='cb-chat-" + item.sid + "' class='km-checkbox'/><label class= 'km-checkbox-label' for='cb-chat-" + item.sid + "'> <i class='fa fa-comments'></i></label>"
            + "</div></li>");
        const div = document.createElement('div');
        div.className = "participant-view";
        div.id = "participant-" + item.id;
        document.getElementById("participant").append(div);
    })
});

function changeVideo(tag, id) {
    if ($(tag).attr('checked') == "checked") {
        $(tag).removeAttr('checked');
    } else {
        $(tag).attr('checked', "checked");
    }
    var div = $("#" + id);
    //var track = 
    if ($(tag).attr('checked') == "checked") {
        $("#participant-" + id).show();
        trackSubscribed(div, track)
    } else {
        $("#participant-" + id).hide();
        track.detach().forEach(element => element.remove());
    }
}

function changeVoice(tag, id) {
    if ($(tag).attr('checked') == "checked") {
        $(tag).removeAttr('checked');
    } else {
        $(tag).attr('checked', "checked");
    }
    if ($(tag).attr('checked') == "checked") {
        $("#participant-" + id).show();
    } else {
        $("#participant-" + id).hide();
    }
}
