let folder = [];

function getUSerCookie() {
    var tmp = getCookie('username');
    $('h4#welcome').text('Wellcome ' + tmp);
}

function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

$(document).ready(function() {
    $('#folder1').addClass("d-none");
    $('#action1').addClass("d-none");



    $('#add_fol').click(function() {
        addFolder();
    });

    $("#inforFolder").click(function() {
        listfile();
        //     // var $father = $(this).parent().parent().parent().parent();
        //     // workout_sth = $father.find(".card-body h3").text();
        //     // console.log(workout_sth);
        //     // $("#folder_win").show();
    });

    $('button#closeBtnfolder').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal_folder").addClass("fade");
        $("div#smallPageModal_folder").css('z-index', '-1');
        $(".page").css('z-index', '1000');
        for (var i = 0; i < total; i++) {
            $('.' + i).remove();
        }
    })

    // $('.delete_folder').click(function() {
    //     console.log(this.id);
    //     // removeFolder()
    // })

})

var total = 0;

function listfile() {
    var api = "http://127.0.0.1:3000/api/listfile";
    var acc = {
        acc: getCookie('username'),
    }
    var fol = 0;
    jQuery.post(api, acc, function(data) {
        total = data.length;
        var ar = new Array();
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < fol;j++)
                ar[i] = data[i].title;
            newFolder(data[i], i);
        }


    });

}

// -----------------新增文件夾------------------
function addFolder() {
    let title = $('#yourfolder').val();
    if (title == "") {
        alert("Please enter the folder name!");
    } else {
        var api = "http://127.0.0.1:3000/api/addFolder";
        let data = {
            'title': title,
            'status': false,
            'acc': getCookie('username'),
        };
        total++;
        jQuery.post(api, data, function(res) {
            if (res.status == 0) {
                $('#yourfolder').val('');
            } else if (res.status == 1) {
                alert(res.msg)
            }
        });

    }
}
// -----------------刪除文件夾------------------
function removeFolder(data) {
    $('#' + data).remove();
    var api = "http://127.0.0.1:3000/api/removeFolder";
    let acc = {
        'acc': getCookie('username'),
        'id': data
    };
    jQuery.post(api, acc, function(res) {

    });
}

// -----------------進入文件夾------------------
function FolderList(data) {
    $('#folder').addClass("d-none");
    $('#folder1').removeClass("d-none");
    
    var api = "http://127.0.0.1:3000/api/FolderList";
    let acc = {
        'acc': getCookie('username'),
        'id':data
    };
    jQuery.post(api, acc, function(res) {
        // console.log(res[0].title);
        newFolderList(res[0]);
    });
}
// -----------------文件中的動作div------------------
function newFolderList(data){
    let content =
    `<div >
        <img src="img/icon_folder.png" />
        <h1 id="fol_name">${data.title}</h1>
    </div>`;
    $('#fol_title').append(content);
}
// -----------------刪除動作------------------
// function removeList(data) {
//     let index = folder.findIndex(element => element.data._id == id);
//     folder.splice(index, 1);
//     $('#' + data._id).remove();
// }
// -----------------回到所有文件夾------------------
function backBtn(data) {
    $('#folder').removeClass("d-none");
    $('#folder1').addClass("d-none");
    $('#fol_title').empty();
}
// -----------------進入新增動作介面------------------
function addBtn(){
    $('#action1').removeClass("d-none");
    $('#folder1').addClass("d-none");
}
// -----------------新增動作------------------
function newpose(){
    let content =
    ``;
    $('#').append(content);
}
function addPose() {
    let folder=document.getElementById("fol_name").innerText;;
    console.log(folder);
    let pose = $('#addinput').val();
    if (pose == "") {
        alert("Please enter the pose!");
    } else {
        var api = "http://127.0.0.1:3000/api/addPose";
        let posedata = {
            'pose': pose,
            'acc': getCookie('username')
        };
        jQuery.post(api, posedata, function(res) {
            if (res.status == 0) {
                $('#addinput').val('');
            } else if (res.status == 1) {
                alert(res.msg);
            }
        });

    }
}
// -----------------回到上一個文件夾------------------
function backBtn_act(data) {
    $('#folder1').removeClass("d-none");
    $('#action1').addClass("d-none");
}

// -----------------新增文件夾div------------------
function newFolder(data, i) {
    let status = (data.status) ? "checked" : "";
    let content =
        `<div class="d-flex flex-row alr-folder position-relative ${i}" id="${data._id}">
            <img src="img/icon_folder.png">
            <p onclick="FolderList('${data._id}')">${data.title}</p>
            <img src="img/close_r.png" class="close delete_folder" id="del_folder${data._id}" onclick="removeFolder('${data._id}')">
        </div>`;
    $('#all_fol').append(content);
}
