function fullscreen() {
    if (document.fullscreenElement == null)
        document.documentElement.requestFullscreen();
    else
        document.exitFullscreen();
}

// 10ms
var timer_left = 0;
var timer_max  = 0;

var timer_enabled = false;

function timerd(){
    if (!timer_enabled) return;
    timer_left--;

    if (timer_left < 0) return;
    updateprogress(timer_left / timer_max * 100);
}

function timers()
{
    if (!timer_enabled) return;
    var m = Math.floor(Math.abs(timer_left / 100 / 60));
    var s = Math.floor(Math.abs(timer_left / 100 % 60));
    if (s < 10) s = '0' + s;

    if (timer_left < 0)
    {
        m = '- ' + m;
        playaudio();
    }
    document.getElementById('timedisp1').innerText = m + ':' + s;
}

function updateprogress(prg)
{
    document.getElementById('timerprogress').setAttribute('style', 'height: ' + prg + '%;');
}

function settimer()
{
    var min = parseInt(document.getElementById('timerconf-min').value);
    var sec = parseInt(document.getElementById('timerconf-sec').value);

    var tsec = (min * 60 + sec) * 100;

    timer_left = timer_max = tsec;
    timer_enabled = true;
}

function dismiss() {
    stopaudio();

    timer_enabled = false;
    timer_full = 0;
    timer_left = 0;

    document.getElementById('timedisp1').innerText = '--:--';
}

function playaudio() {
    document.getElementById('audioplayer').play();
}

function stopaudio() {
    document.getElementById('audioplayer').pause();
}

setInterval(timerd, 10);
setInterval(timers, 1000);