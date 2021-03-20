// Contents of this file will load only once or contents of the HTML has been written
document.addEventListener('DOMContentLoaded', () => {

    // document.querySelector is a JS method that allows you to pick out elements from the HTML
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;

    function createDoodler() {
        // Putting the child, doodler, into the grid
        grid.appendChild(doodler);

        // Adds the doodler class styling
        doodler.classList.add('doodler');

        // Giving CSS attributes to elements
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';

    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315; // grid width - platform width
            this.visual = document.createElement('div'); // creates a div for each platform

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';

            // Putting it into the grid
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for (let i=0; i<platformCount; i++) {
            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap; // Using loop to increment gap space
            let newPlatform = new Platform(newPlatBottom); // created a new class named Platform
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        // Only want it to move when the doodler is in a certain position
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if (doodlerBottomSpace > 350) {
                fall();
            }
        }, 30);
    }

    function fall() {
        clearInterval(upTimerId);
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
        }, 30);
    }

    function start() {
        if (!isGameOver) {
            createDoodler();
            createPlatforms();
            setInterval(movePlatforms, 30); // Moving down every 30ms
            jump();
        }
    }
    start()
    
})