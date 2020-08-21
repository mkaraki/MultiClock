ge = id => document.getElementById(id);
gv = id => ge(id).value;
gvi = id => parseInt(gv(id));
st = (id, str) => ge(id).innerText = str;
tset = sec => {
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    if (s < 10) s = '0' + s;
    st('timedisp1', m + ':' + s);
}
pset = perc => ge('progress-main').setAttribute('style', `width: ${perc}%;`);
pcset = c => ge('body').setAttribute('class', `bg-${c} text-white`)

sset = s => st('statusdisp', s);

astart = c => {
    var e = ge(`a-${c}`);
    e.currentTime = 0;
    e.play();
}

var timer = undefined;

var state = 0;

var stime, ttime, itime;
var ostime, ottime, oitime;


function tick() {
    if (state == 0) return stop();

    var d, p, pc, s;

    if (state == 1 && ostime) {
        s = 'Starting'
        pc = 'info';
        d = stime--;
        p = stime / (ostime - 1);

        if (stime < 1) {
            state = 3;
            astart('notify');
        } else if (stime < 4) {
            astart('pre');
        }
    } else if (state == 2 && oitime) {
        s = 'Interval'
        pc = 'primary';
        d = itime--;
        p = itime / (oitime - 1);

        if (itime < 1) {
            itime = oitime;
            state = 3;
            astart('notify');
        } else if (itime < 4) {
            astart('pre');
        }
    } else {
        s = 'Counting'
        pc = 'success';
        d = ttime--;
        p = ttime / (ottime - 1);

        if (ttime < 1) {
            ttime = ottime;
            state = (oitime != true) ? 2 : 3;
            astart('notify');
        }
    }

    tset(d - 1);
    pset(p * 100);
    pcset(pc);
    sset(s);
}

function stop() {
    clearInterval(timer);
    state = 0;
    pcset('dark');
    sset('No Timer');
}

function settimer() {
    if (timer != undefined) stop();
    stime = gvi('timerconf-startsec');

    itime = (gvi('timerconf-nextmin') * 60) + gvi('timerconf-nextsec');
    itime = (itime > 0) ? itime : false;

    ttime = (gvi('timerconf-min') * 60) + gvi('timerconf-sec');

    ostime = stime;
    oitime = itime;
    ottime = ttime;

    state = (stime > 0) ? 1 : 2;
    timer = setInterval(tick, 1000);
}