function fullscreen() {
    if (document.fullscreenElement == null)
        document.documentElement.requestFullscreen();
    else
        document.exitFullscreen();
}

// ms
var timer_max  = 0; // End unix epoch (ms)
var timer_start = 0; // Timer started time (ms)
var timer_target_ms = 0; // Timer max - Timer start

var timer_enabled = false;

function timerd(){
    if (!timer_enabled) return;

    const now = Date.now();

    if (now > timer_max) return; // timer ended.

    const timer_left = timer_max - now;
    updateprogress(timer_left / timer_target_ms * 100);
}

function timers()
{
    if (!timer_enabled) return;
    const timer_left = timer_max - Date.now();
    var m = Math.floor(Math.abs(timer_left / 1000 / 60));
    var s = Math.floor(Math.abs(timer_left / 1000 % 60));
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

    var tsec = (min * 60 + sec); // In seconds
    timer_target_ms = tsec * 1000; // In ms

    const now = Date.now();

    timer_max = now + timer_target_ms;
    timer_start = now;

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