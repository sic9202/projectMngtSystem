/*zoomchart License*/
var ZoomChartsLicense = "ZCP-ptib8410f: ags_dashboard";
var ZoomChartsLicenseKey = "3cd6390dd0f67207a40736f491502645775e9dae9e94a015c3"+
"8ee66f5d744167d3ba1f3053345fabd4757819c5f38dfcd54c2be89954cdf8e67b29cfe319f0c"+
"205d9a7dda93dfe8aa30a48ab20af0e7ba46188f73b5a4991b9e2932b564d763ff5dcae689055"+
"9bd74ec602a0f145224dbf4cea3e37fe761dae273328b46467ef1c0ac5b55e92188abaeff5dc0"+
"fc675138367ce6bcf04da90d5887f67bc13b9cbc61a62be1add5a02c0b947682f742a4a80526a"+
"fafb4a7583948f3a8aeaf175140eff49411bcca6013c9d35318c3009297a48e379baaef37568f"+
"4189af705b5669efb2b9d5ab89c98f1bb03cbe2c34c1c78dd0a2c4defa2e5419b6c7c953ece42";

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
    var weekName;
    weekName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){
    var s = '', i = 0;
    while (i++ < len){
        s += this;
    }
    return s;
};
String.prototype.zf = function(len){
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function(len){
    return this.toString().zf(len);
};
String.prototype.format = function() {
    var theString = this;

    // start with the second argument (i = 1)
    for (var i = 0; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
};
if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}

function get_duration(duration) {
    // duration type : unixtimestamp * 1000
    duration = parseInt(duration) / 1000;
    var duration = duration / 60;
    if (duration < 60) {
        return parseInt(duration) + "분";
    } else {
        duration = duration / 60;
        if (duration < 24) {
            return parseInt(duration) + "시간";
        } else {
            duration = duration / 24;
            if (duration < 30) {
                return parseInt(duration) + "일";
            } else {
                duration = duration / 30;
                if (duration < 12) {
                    return parseInt(duration) + "개월";
                } else {
                    duration = duration / 12;
                    return parseInt(duration) + "년";
                }
            }
        }
    }
}

function init_clock() {
    startTimeClock();
    checkTime();
    weekly();
    dayCheck();
    getTimeZone();
}
function startTimeClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout("startTimeClock()", 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
    return i;
}
function weekly() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";

    var n = weekday[d.getDay()];
    document.getElementById("weekly").innerHTML = n;
}
function dayCheck() {
    var d = new Date();
    var dn = d.getDate();
    if(dn<10){
        dn = '0' + d.getDate();
    }else{
        dn = d.getDate();
    }

    var month = new Array(12);
    month[0] = "01";
    month[1] = "02";
    month[2] = "03";
    month[3] = "04";
    month[4] = "05";
    month[5] = "06";
    month[6] = "07";
    month[7] = "08";
    month[8] = "09";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";
    var mn = month[d.getMonth()];

    document.getElementById("dayCheck").innerHTML = mn +'.'+ dn;
}
function getTimeZone(){
    var newdate = new Date();
    var tz_tw = "";
    tz_tw += newdate;
    var timezone_tw = tz_tw.split(" ")[5];
    document.getElementById("tw_timezone").innerHTML = timezone_tw;
}

function SwapTab3(hide_class, show_id) {
    console.log('swaptab3');
    var duplicated_jquery_select_dot_hide_class = $("."+hide_class);

	cnt = duplicated_jquery_select_dot_hide_class.length;
    duplicated_jquery_select_dot_hide_class.css("display", "none");
	$("#"+show_id).css("display", "block");
}
function ActionTab(tab) {
    $("#li_"+tab).addClass('enable').siblings().removeClass('enable');
    if( tab == 'div_tab02') {
    } else if( tab == 'div_tab03' ){
    } else if( tab == 'div_tab05' ){
    } else if( tab == 'div_tab06' ){
    } else if( tab == 'div_tab07' ){
    } else if( tab == 'div_tab09' ){
    }
}

function idFormatUnified(ID){
    if(!!ID){
        if ( ID.indexOf("#") == -1 ) {
            ID = "#"+ID;
        }
    }
    return ID;
}

$.postDataGetHTML = function(url, data, callback, errorCallback, cbBeforeSend, cbComplete){
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'data': data,
        'dataType': 'html',
        'success': callback,
        beforeSend: cbBeforeSend,
        "complete": cbComplete,
        "error": errorCallback
    });
};

$.postHtml = function(url, data, callback){
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'data': data,
        'success': callback
    });
};

$.postDataGetJSON = function(url, data, callback, errorCallback, cbBeforeSend, cbComplete){
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'data': data,
        'dataType': 'json',
        'success': callback,
        beforeSend: cbBeforeSend,
        "complete": cbComplete,
        "error": errorCallback
    });
};

Number.prototype.comma = function(){
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    var n = this;
    n += '';                          // 숫자를 문자열로 변환

    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};

String.prototype.comma = function(){
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    var n = this;

    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};

function highlight_on_click(obj) {
    var tr = $(obj).parent();
    tr.attr('style', 'background-color:rgba(252, 185, 0, 0.8)');
}

function highlight_off_click(obj) {
    var tr = $(obj).parent();
    tr.attr('style', 'background-color:#ffffff');
}

function set_blod_select_row(tr_obj, on_off) {
    var tr_tmp = $(tr_obj).parent().children();

    if (on_off == 'on') {

        for (var i = 0; i < tr_tmp.length; i++) {
            if (i == 0) {
                continue;
            }
            $(tr_tmp[i]).attr('style', 'font-weight:bold!important')
        }
    } else {
        for (var i = 0; i < tr_tmp.length; i++) {
            if (i == 0) {
                continue;
            }
            $(tr_tmp[i]).attr('style', '')
        }
    }
}

function setTimepicker(){
	$('#startts').timepicker({ 
		timeFormat: 'HH:mm',
		minHour: null,
		minMinutes: null,
		minTime: null,
		maxHour: null,
		maxMinutes: null,
		maxTime: null,
		startHour: null,
		startMinutes: null,
		startTime: null,
		interval: 60,
		dynamic: true,
		theme: 'standard',
		zindex: null,
		dropdown: true,
		scrollbar: true,
		// callbacks
		change: function(/*time*/) {}
	});
	$('#endts').timepicker({ 
		timeFormat: 'HH:mm',
		minHour: null,
		minMinutes: null,
		minTime: null,
		maxHour: null,
		maxMinutes: null,
		maxTime: null,
		startHour: null,
		startMinutes: null,
		startTime: null,
		interval: 60,
		dynamic: true,
		theme: 'standard',
		zindex: null,
		dropdown: true,
		scrollbar: true,
		// callbacks
		change: function(/*time*/) {}
	});
}

function inputTimeColon(time) {

    // 먼저 기존에 들어가 있을 수 있는 콜론(:)기호를 제거한다.
    var replaceTime = time.value.replace(/\:/g, "");

    // 글자수가 6개 사이일때만 동작하게 고정한다.
    if(replaceTime.length == 4) {

        // 시간을 추출
        var hours = replaceTime.substring(0, 2);

        // 분을 추출
        var minute = replaceTime.substring(2, 4);
        
        // 시간은 24:00를 넘길 수 없게 세팅
        if(hours + minute > 2400) {
            alert("시간은 24시를 넘길 수 없습니다.");
            time.value = "24:00";
            return false;
        }

        // 분은 60분을 넘길 수 없게 세팅
        if(minute > 60) {
            alert("분은 60분을 넘길 수 없습니다.");
            time.value = hours + ":00:00";
            return false;
        }
       if(second > 60) {
        alert("초는 60분을 넘길 수 없습니다.");
        time.value = hours + ":"+ minute + ":00";
        return false;
    }
        

        // 콜론을 넣어 시간을 완성하고 반환한다.
        time.value = hours + ":" + minute;
    }
}

function get_block_ui_opt(){
    var spinner_svg = '<div class="bar_spinner"></div>';
    var bo = {
        message : spinner_svg,
        css: {
            border: 'none',
            //padding: '15px',
            backgroundColor: 'transeparent',
            //'-webkit-border-radius': '10px',
            //'-moz-border-radius': '10px',
            opacity: .9,
            color: '#fff',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0'
        },
        overlayCSS: {
            opacity:.1,
            backgroundColor: "#000000"
        }
    };

    return bo;
}