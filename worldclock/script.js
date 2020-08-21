var d = new Date();
var timezone = d.getTimezoneOffset() * -60000;

var tzone_h = Math.floor(timezone / 1000 / 60 / 60);
var tzone_hd = Math.abs(Math.floor(timezone / 1000 / 60 / 60));
var tzone_m = (Math.abs(timezone) / 1000 / 60) % 60

if (tzone_h < 10 && tzone_h > -10) tzone_hd = '0' + tzone_hd;
if (tzone_h >= 0) tzone_hd = '+' + tzone_hd;
else tzone_hd = '-' + tzone_hd;
if (tzone_m < 10) tzone_m = '0' + tzone_m;

var tzonestr = "UTC" + tzone_hd + ':' + tzone_m
document.getElementById('currentlocaltimezone').innerText = tzonestr;

function updatewidtime() {
    var time = new Date(Date.now());

    var utc_h = time.getUTCHours();
    var utc_m = time.getUTCMinutes();
    var utc_s = time.getUTCSeconds();

    var lt_h = time.getHours();
    var lt_m = time.getMinutes();
    var lt_s = time.getSeconds();

    if (utc_h < 10) utc_h = '0' + utc_h;
    if (utc_m < 10) utc_m = '0' + utc_m;
    if (utc_s < 10) utc_s = '0' + utc_s;

    if (lt_h < 10) lt_h = '0' + lt_h;
    if (lt_m < 10) lt_m = '0' + lt_m;
    if (lt_s < 10) lt_s = '0' + lt_s;

    document.getElementById('utccurrent').innerText = utc_h + ':' + utc_m + ':' + utc_s;
    document.getElementById('localtimecurrent').innerText = lt_h + ':' + lt_m + ':' + lt_s;
}

function clock() {
    updatewidtime();

    cleartimeitem();

    var time = Date.now();

    for (var i = 0; i < offsets.length; i++) {
        var timeos = offsets[i];
        var ofst = offsetsac[i] * 1000;

        if (offsetsiv[i]) {
            ofst = ofst * -1;
        }

        var tblcls = '';
        if (timezone == ofst) {
            tblcls = 'bg-danger';
        } else if (ofst == 0) {
            tblcls = 'bg-primary';
        }

        var ci = new Date(time + ofst);

        h = ci.getUTCHours();
        m = ci.getUTCMinutes();
        s = ci.getUTCSeconds();

        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;

        var timestr = h + ':' + m + ':' + s;

        addtimeitem(timeos, offsetnm[i], timestr, tblcls);
    }

}

function addtimeitem(ofv, ofn, oft, altclass = "") {
    var tblrow = document.createElement('tr');
    tblrow.setAttribute('class', altclass);
    tblrow.appendChild(createtd('UTC' + ofv));
    tblrow.appendChild(createtd(oft));
    tblrow.appendChild(createtd(ofn));

    document.getElementById('tablelistbody').appendChild(tblrow);
}

function createtd(str) {
    var work = document.createElement('td');
    work.innerText = str;
    return work;
}

function cleartimeitem() {
    $('#tablelistbody').empty();
}

setInterval(clock, 1000);