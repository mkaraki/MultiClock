var timezone = jstz.determine().name();

var timer_enabled = false
var timer_left = 0;
var timer_full = 0;

var alerm_enabled = false;
var alerm_time_h = 0;
var alerm_time_m = 0;

function clock() 
{
    var now = new Date();

    var date_y = now.getFullYear();
    var date_m = now.getMonth() + 1;
    var date_d = now.getDate();

    if (date_m < 10) date_m = '0' + date_m;
    if (date_d < 10) date_d = '0' + date_d;

    var datestr = date_m + '/' + date_d + '/' + date_y;

    var time_h = now.getHours();
    var time_m = now.getMinutes();
    var time_s = now.getSeconds();

    ctime_m = time_h * 60 + time_m;

    if (time_h < 10) time_h = '0' + time_h;
    if (time_m < 10) time_m = '0' + time_m;
    if (time_s < 10) time_s = '0' + time_s;

    var timestr = time_h + ':' + time_m + ':' + time_s;

    document.getElementById('display-main').innerText = timestr;

    if (timer_enabled)
    {
        showdismissbtn();
        timer_left--;
        if (timer_left > 0)
        {
            setperc('progress-main', timer_left / timer_full * 100);
            setperccolor('progress-main', 'bg-primary');
            document.getElementById('display-sub').innerText = timer_left + " Seconds Left";
        }
        else
        {
            setperc('progress-main', 100);
            setperccolor('progress-main', 'bg-danger');
            document.getElementById('display-sub').innerText = Math.abs(timer_left) + " Seconds Over";
            playaudio();
        }

        document.getElementById('cdisplay-main').innerText = datestr + ' (' + timezone + ')';
    }
    else if (alerm_enabled)
    {
        showdismissbtn();
        if ( alerm_time_h == time_h && alerm_time_m <= time_m) {
            setperc('progress-main', 100);
            setperccolor('progress-main', 'bg-danger');
            playaudio();
        }
        else 
        {
            setperc('progress-main', 100);
            setperccolor('progress-main', 'bg-primary');
        }

        document.getElementById('cdisplay-main').innerText = datestr + ' (' + timezone + ')';

        var d_ah = alerm_time_h;
        var d_am = alerm_time_m;
        if (d_ah < 10) d_ah = '0' + d_ah;
        if (d_am < 10) d_am = '0' + d_am;
        document.getElementById('display-sub').innerText = d_ah + ':' + d_am;
    }
    else
    {
        setperc('progress-main', 100);
        setperccolor('progress-main', 'bg-primary');
        document.getElementById('display-sub').innerText = datestr;
        document.getElementById('cdisplay-main').innerText = timezone;
    }
}

function dismiss()
{
    stopaudio();
    hidedismissbtn();
    
    timer_enabled = false;
    timer_full = 0;
    timer_left = 0;

    alerm_enabled = false;
    alerm_time_h = 0;
    alerm_time_m = 0;
}

function settimer()
{
    var min = parseInt(document.getElementById('timerconf-min').value);
    var sec = parseInt(document.getElementById('timerconf-sec').value);

    var tsec = min * 60 + sec;

    timer_full = tsec;
    timer_left = tsec;
    timer_enabled = true;
    // console.log(tsec);
}

function setalerm()
{
    var h = parseInt(document.getElementById('alermconf-h').value);
    var m = parseInt(document.getElementById('alermconf-m').value);

    alerm_time_h = h;
    alerm_time_m = m;
    alerm_enabled = true;
}

function setperccolor(eid, color) {
    var elm = document.getElementById(eid);
    elm.setAttribute("class", 'progress-bar ' + color);
}

function setperc(eid, perc)
{
    var elm = document.getElementById(eid);
    elm.setAttribute("style", "width: " + perc + "%;");
    elm.setAttribute("aria-valuenow", perc);
}

function playaudio()
{
    document.getElementById('audioplayer').play();
}

function stopaudio()
{
    document.getElementById('audioplayer').pause();
}

function hidedismissbtn()
{
    document.getElementById('dismissbtn-container').setAttribute("class", "d-none");
}

function showdismissbtn() {
    document.getElementById('dismissbtn-container').setAttribute("class", "");
}

function fullscreen()
{
    if (document.fullscreenElement == null)
        document.documentElement.requestFullscreen();
    else
        document.exitFullscreen();
}

setInterval(clock, 1000);