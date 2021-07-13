import Clock from './clock';

const data = {
    tourId: 1,
    levelIndex: 0,
    levels: [
        {
            id: "1",
            levelType: "play",
            duration: 20,
            bigBlind: 25,
            smallBlind: 25,
            ante: 0,
            bigBlindAnte: 0
        },
        {
            id: "2",
            levelType: "break",
            duration: 10,
            bigBlind: 0,
            smallBlind: 0,
            ante: 0,
            bigBlindAnte: 0
        },
        {
            id: "3",
            levelType: "play",
            duration: 20,
            bigBlind: 50,
            smallBlind: 25,
            ante: 0,
            bigBlindAnte: 0
        },
    ],
    entries: 20,
    playersLeft: 10,
    timeLeft: 300,
    stack: 20000,
    playing: true
};

describe("Static methods", function () {
    it('formatNumber', () => {
        expect(Clock.formatNumber(0)).toBe("00");
        expect(Clock.formatNumber(1)).toBe("01");
        expect(Clock.formatNumber(10)).toBe("10");
    });
});


describe("Clock Class", function () {
    it('constructor', () => {
        const clock = new Clock(data);

        expect({ ...clock }).toEqual(data);
    });

    it('showTime', () => {
        const clock = new Clock(data);

        expect(clock.showTime).toEqual("05 : 00");

        clock.timeLeft = 3600;
        expect(clock.showTime).toEqual("01 : 00 : 00");
    });


    it('currentLevel', () => {
        const clock = new Clock(data);

        expect(clock.currentLevel).toEqual(data.levels[0]);

        clock.levelIndex = 10;
        expect(clock.currentLevel).toEqual(data.levels[2]);
    });


    it('nextLevel', () => {
        const clock = new Clock(data);

        expect(clock.nextLevel).toEqual(data.levels[1]);


        clock.levelIndex = 10;
        expect(clock.nextLevel).toEqual(data.levels[2]);
    });


    it('levelName', () => {
        const clock = new Clock(data);

        expect(clock.levelName).toEqual("Level 1");

        clock.levelIndex = 1;
        expect(clock.levelName).toEqual("Break");

        clock.levelIndex = 2;
        expect(clock.levelName).toEqual("Level 2");
    });


    it('totalChips', () => {
        const clock = new Clock(data);

        expect(clock.totalChips).toEqual(400000);;
    });


    it('averageStack', () => {
        const clock = new Clock(data);

        expect(clock.averageStack).toEqual(40000);;
    });


    it('forward', () => {
        const clock = new Clock(data);

        clock.forward();
        expect(clock.timeLeft).toEqual(240);

        clock.timeLeft = 50;
        clock.forward();
        expect(clock.timeLeft).toEqual(0);
    });


    it('play & pause & stop', () => {
        const clock = new Clock(data);

        clock.play();
        expect(clock.playing).toEqual(true);

        clock.pause();
        expect(clock.playing).toEqual(false);

        clock.play();
        expect(clock.playing).toEqual(true);

        clock.stop();
        expect(clock.playing).toEqual(false);
    });

    it('tick', () => {
        const clock = new Clock(data);

        clock.tick();
        expect(clock.timeLeft).toEqual(299);

        clock.timeLeft = 0;
        clock.tick();
        expect(clock.levelIndex).toEqual(1);
        expect(clock.timeLeft).toEqual(600);
    });

    it('rewind', () => {
        const clock = new Clock(data);

        clock.rewind();
        expect(clock.timeLeft).toEqual(360);

        clock.timeLeft = 1180;
        clock.rewind();
        expect(clock.timeLeft).toEqual(1200);
    });


    it('addPlayer & removePlayer', () => {
        const clock = new Clock(data);

        clock.addPlayer();
        expect(clock.playersLeft).toEqual(11);

        clock.removePlayer();
        expect(clock.playersLeft).toEqual(10);

        clock.playersLeft = 20;
        clock.addPlayer();
        expect(clock.playersLeft).toEqual(20);

        clock.playersLeft = 0;
        clock.removePlayer();
        expect(clock.playersLeft).toEqual(0);
    });



    it('skipPrevious & skipNext', () => {
        const clock = new Clock(data);

        clock.skipNext();
        expect(clock.levelIndex).toEqual(1);
        expect(clock.timeLeft).toEqual(600);

        clock.skipPrevious();
        expect(clock.levelIndex).toEqual(0);
        expect(clock.timeLeft).toEqual(1200);
    });
});