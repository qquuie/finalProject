// 使用陣列來取得週天的名稱
function getWeekdayName(weekday) {
    var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdayNames[weekday];
}
//取得月份
function getMonthName(month) {
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}

// ----------------------------------標題年月-----------------------------------//
function updateDates() {
    //新增一個Date物件，命名為today
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
}

function previousMonth() {
    thisMonth--;
    if (thisMonth === -1) {
        thisMonth = 11;
        thisYear--;
    }
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    console.log(firstDay);
    fillInMonth(thisYear, thisMonth, thisDate);
}

function nextMonth() {
    thisMonth++;
    if (thisMonth === 12) {
        thisMonth = 0;
        thisYear++;
    }
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    console.log(firstDay);
    fillInMonth(thisYear, thisMonth, thisDate);
}
// ----------------------------------表格日期-----------------------------------//
function getUID(year, month, date) {
    if (month < 10) {
        month = '0' + month; //如果數字是1位數的話，前面補0
    }
    if (date < 10) {
        date = '0' + date;
    }
    return '' + year + month + date;
}

function fillInMonth(thisYear, thisMonth, thisDate) {
    let firstDayThisMonthYear = new Date(thisYear, thisMonth, 1).getDay();
    // 填滿月曆表格日期
    var days = document.getElementsByTagName("td"); //取得月曆表格html所有的TD標籤物件陣列
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //記錄每個月的天數
    if (thisYear % 400 == 0 || (thisYear % 4 == 0 && thisYear % 100 != 0)) {
        monthDays[1] = 29; //閏年的話，2月為29天
    }

    var uid;
    //填本月的天數，從1到本月的最後一天(取本月的天數)
    for (let i = 1; i <= monthDays[thisMonth]; i++) {
        uid = getUID(thisYear, thisMonth, i);
        // console.log(uid);
        days[i + firstDayThisMonthYear - 1].innerHTML = i;
        days[i + firstDayThisMonthYear - 1].setAttribute("data-uid", uid);
    }

    //填上月的天數，從上個月的最後1天開始遞減地填
    let lastMonth = thisMonth - 1;
    if (lastMonth === -1) lastMonth = 11; //1月的"上個月"是12月
    let d = monthDays[lastMonth];

    for (let i = firstDayThisMonthYear - 1; i >= 0; i--) {
        if (lastMonth == 11) {
            uid = getUID(thisYear - 1, lastMonth, d);

        } else {
            uid = getUID(thisYear, lastMonth, d);
        }
        // console.log(uid);
        // days[i].classList.add("not_important");
        // days[i].classList.remove("normal");
        days[i].innerHTML = d;
        days[i].classList.remove("prev-month-last-day");
        days[i].setAttribute("data-uid", uid);
        d--;
    }
    if (firstDayThisMonthYear > 0) days[firstDayThisMonthYear - 1].classList.add("prev-month-last-day");

    var nextMonth = thisMonth + 1;
    //填下月的天數，從1到最後1格    
    for (let i = firstDayThisMonthYear + monthDays[thisMonth], d = 1; i <= 41; i++, d++) {
        if (nextMonth == 12) {
            uid = getUID(thisYear + 1, 0, d);

        } else {
            uid = getUID(thisYear, nextMonth, d);
        }
        // console.log(uid);
        days[i].innerHTML = d;
        days[i].setAttribute("data-uid", uid);
    }

}
// ----------------------------------表格日期END-----------------------------------//
// ----------------------------------標題年月END-----------------------------------//

// ----------------------------------月曆按鈕按下-----------------------------------//
function Nextdialog() {
    $("#modal_block").show();
    $("#calendar_win").hide();
}

function Alldialog() {
    $(".cal").addClass("important");
}

var clock = 0;
$("#times").click(function() {
    if (clock % 2 == 0) {
        $(this).find("p").text("sec");
    } else {
        $(this).find("p").text("times");
    }
    clock++;
});
$("#modal_back").click(function() {
    $("#calendar_win").show();
    $("#modal_block").hide();
});
$("#modal_OK").click(function() {
    $("#modal_block").hide();
    $(".cal").removeClass("important");
});

$("#calender_close").click(function() {
    $("#calendar_win").hide();
});
/*--------------------------------------以下為要存的資料------------------------------*/
//----------------------------------------按下日期格子----------------------------------
var choice_d = []; //存放所有選擇日期陣列
var choice; //選擇某格日期
$('.cal').click(function() {
    choice = $(this).attr("data-uid");
    if ($(this).hasClass("important") == false) {
        $(this).addClass("important");
        choice_d.push(choice); //儲存選擇年月日-->推入陣列
    } else {
        $(this).removeClass("important");
        // var ind = choice_d.indexOf(choice);
        for (let value of choice_d) {
            if (value == choice) {
                var ind = choice_d.indexOf(choice);
                choice_d.splice(ind, 1);
                break;
            }
        }
    }
    console.log(choice_d);
});
//紀錄運動名稱
let workout_sth_c = ""; //運動名稱
let workout_times; //運動次數或秒數
$(".calender").click(function() {
    var $father = $(this).parent().parent().parent().parent();
    workout_sth_c = $father.find(".card h1").text();
    $("#modal_workout_name p").text(workout_sth_c);
    console.log(workout_sth_c);
});
$("#modal_OK").click(function() {
    //存選擇的日期、運動名稱、運動次數或秒數-->存進物件
    var $ff = $(this).parent();
    workout_times = $ff.find("#input_num").val() + $ff.find("#times p").text();
    //之後將存放這些資料的變數清空
});