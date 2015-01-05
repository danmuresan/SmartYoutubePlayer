var swfPath = '/Scripts/SoundManager/';
var sampleMusicPath = '/Scripts/SoundManager/sampleMusic/Kalimba.mp3';

var count = 8;

var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

var beginPlay = false;


function smSetupForPlay() {
    soundManager.setup({
        url: swfPath,
        onready: function () {
            var mySound = soundManager.createSound({
                id: 'aSound',
                url: sampleMusicPath
            });

            mySound.play();

        },
        ontimeout: function () {
            // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
            Console.log('Problem starting SM2...Timeout occured');
        }
    });
}

function smSetupForStop() {
    soundManager.setup({
        url: swfPath,
        onready: function () {
            var mySound = soundManager.createSound({
                id: 'aSound',
                url: sampleMusicPath
            });

            mySound.stop();

        },
        ontimeout: function () {
            // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
            Console.log('Problem starting SM2...Timeout occured');
        }
    });
}

function timer() {
    count = count - 1;
    if (count <= 0) {
        clearInterval(counter);
        //counter ended, do something here

        smSetupForStop();
        return;
    }

    if (!beginPlay) {
        smSetupForPlay();
        beginPlay = true;
    }
}

