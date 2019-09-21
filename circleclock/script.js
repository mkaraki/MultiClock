var hour = new ProgressBar.Circle(hpc, {
    strokeWidth: 3,
    easing: 'easeInOut',
    duration: 1400,
    color: '#ef5310',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
});

var minute = new ProgressBar.Circle(mpc, {
    strokeWidth: 3,
    easing: 'easeInOut',
    duration: 1400,
    color: '#57ef10',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
});

var second = new ProgressBar.Circle(spc, {
    strokeWidth: 3,
    easing: 'easeInOut',
    duration: 1400,
    color: '#10e8ef',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
});

var disp = document.getElementById('timed');

function clock()
{
    var now = new Date();

    var time_h = now.getHours();
    var time_m = now.getMinutes();
    var time_s = now.getSeconds();

    ctime_m = time_h * 60 + time_m;

    dtime_h = time_h;
    dtime_m = time_m;
    dtime_s = time_s;
    if (time_m < 10) dtime_m = '0' + time_m;
    if (time_s < 10) dtime_s = '0' + time_s;

    hour.animate(time_h / 24);
    minute.animate(time_m / 60);
    second.animate(time_s / 60);

    disp.innerText = dtime_h + ':' + dtime_m + ':' + dtime_s
}

setInterval(clock, 1000);