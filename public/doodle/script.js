// Contents of this file will load only once or contents of the HTML has been written
document.addEventListener('DOMContentLoaded', () => {

    // document.querySelector is a JS method that allows you to pick out elements from the HTML
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;

    function createDoodler() {
        // Putting the child, doodler, into the grid
        grid.appendChild(doodler);

        // Adds the doodler class styling
        doodler.classList.add('doodler');

        // Starts off on the first platform
        doodlerLeftSpace = platforms[0].left;

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

                // when it reaches the bottom
                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform'); // visually cannot see it anymore
                    platforms.shift(); // JS method that gets rid of the first item in the array
                    score++;
                    console.log(platforms);
                    let newPlatform = new Platform(600); // new platform will appear at top of grid
                    platforms.push(newPlatform); // adds new platform to the array
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if (doodlerBottomSpace > startPoint + 200) {
                fall();
            }
        }, 30);
    }

    function fall() {
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if (doodlerBottomSpace <= 0) {
                gameOver();
            }

            // Checks if it hits or is in the platform
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) && (doodlerBottomSpace <= platform.bottom + 15) 
                    && ((doodlerLeftSpace + 60) >= platform.left) && (doodlerLeftSpace <= (platform.left + 85))
                    && !isJumping) {
                        console.log('landed');
                        startPoint = doodlerBottomSpace;
                        jump();
                    }
            })
        }, 30);
    }

    function gameOver() {
        console.log('Game Over');
        isGameOver = true;

        // removing the doodler & platforms
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }

        grid.innerHTML = score; // displays score

        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    function control(e) {
        if (e.key === "ArrowLeft") {
            // move left
            moveLeft();
        } else if (e.key === "ArrowRight") {
            // move right
            moveRight();
        } else if (e.key === "ArrowUp") {
            // move straight
            moveStraight();
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + 'px';  
            } else {
                moveRight();
            }
        }, 20);
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function () {
            if (doodlerLeftSpace <= 340) {
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px';  
            } else {
                moveLeft();
            }
        }, 20);
    }

    function moveStraight() {
        isGoingRight = false;
        isGoingLeft = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function start() {
        if (!isGameOver) {
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30); // Moving down every 30ms
            jump();
            document.addEventListener('keyup', control);
        }
    }
    start()
    
})