var MP3;
var buttonPlay = $('#button-play');
var src = buttonPlay.data('src');
var start = $("#button-start");
var pause = $("#button-pause");
var timeStart = $("#time-start");
var timeAll = $("#time-all");
var time;
var min;
var sec;

var timeCount;

var init = function() {
    initAudio();
    initEvent();
};

var initAudio = function() {
    soundManager.setup({
        url: '../audio/',
        bgColor: '#000',
        flashVersion: 9,
        wmode: 'opaque',
        onready: function() {
            MP3 = soundManager.createSound({
                id: 'audio',
                url: '../' + src
            });
        },
    });

};

var initEvent = function() {
    buttonPlay.on('click', function() {
        console.log(MP3);
        if (MP3.playState === 0) {
            MP3.play();

            setTimeout(function() {
                var _time = Math.round(MP3.duration / 1000);
                var _min = parseInt(_time / 60);
                var _sec = _time - _min * 60;
                if(_sec < 10) {
                    _sec = "0" + _sec;
                }
                timeAll.text(_min + ':' + _sec);
            }, 1000);

            timeCount = setInterval(function() {
                time = Math.round(MP3.position / 1000);
                min = parseInt(time / 60);
                sec = time - min * 60;
                if(sec < 10) {
                    sec = "0" + sec;
                }
                timeStart.text(min + ':' + sec);
            }, 1000);
            start.hide();
            pause.show();
        } else {
            if (MP3.paused) {
                MP3.play();
                start.hide();
                pause.show();
            } else {
                MP3.pause();
                pause.hide();
                start.show();
            }
        }
    });

};

init();
