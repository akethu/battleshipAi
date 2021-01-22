var playerZone = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var opponentZone = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function draw() {
    document.getElementById('player').innerHTML = "";
    document.getElementById('opponent').innerHTML = "";
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            if (playerZone[y][x] === 0) {
                document.getElementById('player').innerHTML += '<div class="plain"></div>';
            } else if (playerZone[y][x] === 1) {
                document.getElementById('player').innerHTML += '<div class="boat"></div>';
            } else if(playerZone[y][x] === 2) {
                document.getElementById('player').innerHTML += '<div class="hit"></div>';
            }
            else {
                document.getElementById('player').innerHTML += '<div class="sea"></div>';
            }
            if (opponentZone[y][x] === 3) {
                document.getElementById('opponent').innerHTML += '<div class="sea"></div>';
            } else if (opponentZone[y][x] === 2) {
                document.getElementById('opponent').innerHTML += '<div class="hit"></div>';
            } else {
                document.getElementById('opponent').innerHTML += '<div class="plain" onclick="button(' + y + ',' + x + ')"></div>';
            }
        }
        document.getElementById('opponent').innerHTML += '<br>';
        document.getElementById('player').innerHTML += '<br>';
    }
}

function start() {
    for(var a = 0; a < 10; a++) {
        for(var b = 0; b < 10; b++) {
            playerZone[a][b] = 0;
            opponentZone[a][b] = 0
        }
    }
    var name = prompt("What's your name Captain?", 'Adi');
    document.getElementById('playerhead').innerHTML = name + "'s Battleground";
    document.getElementById('gameplay').style.display = "block";
    document.getElementById('gameplay').innerHTML = "Let's begin! Your turn..";
    playerSetUp();
    opponentSetUp();
    checker();
}

draw();

function instructions() {
    alert("Welcome to Battleship AI!\nAn AI controlled Battleship experience.");
    alert("Click on 'Start' to initiate the AI engine. The ships for both you and the 'Opponent' will be set up automatically.");
    alert("Once set up, you can start playing right away. All you need to do is select a plain box [white] in the 'Opponent' region which you think will be where the opponents' ship is.");
    alert("If it's a hit, then the color of the box will turn red, and if it's a miss then it will turn blue.");
    alert("The AI opponent will subsequently shoot strategically. Try destroying all the ships before the AI opponent. Good luck!");
}

function playerSetUp() {
    oneShip();
    twoShip();
    threeShip();
    fourShip();
    fiveShip();
    draw();
}

function opponentSetUp() {
    oneShipOpponent();
    recursionOpponent(2);
    recursionOpponent(3);
    recursionOpponent(4);
    recursionOpponent(5);
    draw();
}

var guide = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
];

function oneShip() {
    var a = Math.floor(Math.random() * 9);
    var b = Math.floor(Math.random() * 9);
    if (playerZone[a][b] === 0) {
        playerZone[a][b] = 1;
    } else {
        oneShip();
    }
}

function oneShipOpponent() {
    var a = Math.floor(Math.random() * 9);
    var b = Math.floor(Math.random() * 9);
    if (opponentZone[a][b] === 0) {
        opponentZone[a][b] = 1;
    } else {
        oneShip();
    }
}

function twoShip() {
    recursion(2);
}

function threeShip() {
    recursion(3);
}

function fourShip() {
    recursion(4);
}

function fiveShip() {
    recursion(5);
}

function recursion(c) {
    while (true) {
        var a = Math.floor(Math.random() * 7);
        var b = Math.floor(Math.random() * 7);
        var num = 0;
        var recNum = 1;
        var rand = Math.floor(Math.random() * 4);
        if (playerZone[a][b] !== 0) {
            continue;
        }
        playerZone[a][b] = 1;
        for (var d = 1; d < c; d++) {
            if ((a + ((d) * guide[rand][0]) <= 9) && (b + ((d) * guide[rand][1]) <= 9) && (a + ((d) * guide[rand][0]) >= 0) && (b + ((d) * guide[rand][1]) >= 0)) {
                if ((playerZone[a + (d * guide[rand][0])][b + (d * guide[rand][1])] === 0)) {
                    playerZone[a + (d * guide[rand][0])][b + (d * guide[rand][1])] = 1;
                    recNum = recNum + 1;
                } else {
                    num = num + 1;
                    break;
                }
            } else {
                num = num + 1;
                break;
            }
        }
        if (num > 0) {
            playerZone[a][b] = 0;
            for (var f = 1; f < (recNum); f++) {
                playerZone[a + (f * guide[rand][0])][b + (f * guide[rand][1])] = 0;
            }
        } else {
            break;
        }
    }
}

function recursionOpponent(c) {
    while (true) {
        var a = Math.floor(Math.random() * 7);
        var b = Math.floor(Math.random() * 7);
        var num = 0;
        var recNum = 1;
        var rand = Math.floor(Math.random() * 4);
        if (opponentZone[a][b] !== 0) {
            continue;
        }
        opponentZone[a][b] = 1;
        for (var d = 1; d < c; d++) {
            if ((a + ((d) * guide[rand][0]) <= 9) && (b + ((d) * guide[rand][1]) <= 9) && (a + ((d) * guide[rand][0]) >= 0) && (b + ((d) * guide[rand][1]) >= 0)) {
                if ((opponentZone[a + (d * guide[rand][0])][b + (d * guide[rand][1])] === 0)) {
                    opponentZone[a + (d * guide[rand][0])][b + (d * guide[rand][1])] = 1;
                    recNum = recNum + 1;
                } else {
                    num = num + 1;
                    break;
                }
            } else {
                num = num + 1;
                break;
            }
        }
        if (num > 0) {
            opponentZone[a][b] = 0;
            for (var f = 1; f < (recNum); f++) {
                opponentZone[a + (f * guide[rand][0])][b + (f * guide[rand][1])] = 0;
            }
        } else {
            break;
        }
    }
}

function checker() {
    var playerNum = 0;
    var oppNum = 0;
    for(var a = 0; a < 10; a++) {
        for(var b = 0; b < 10; b++) {
            if(playerZone[a][b] === 1)
                playerNum++;
            if(opponentZone[a][b] === 1)
                oppNum++;
            if(playerZone[a][b] === 0)
                playerZone[a][b] = 3;
        }
    }
    draw();
    if(playerNum < 15 || oppNum < 15) 
        alert("Engine Failure! Please click on 'Reset' and 'Start' again.");
}

//button();
var control = 0;
var oppScore = 0;
var playerScore = 0;
var bombTime;

function button(y,x) {
    if(control === 0) {
        if(opponentZone[y][x] === 1) {
            opponentZone[y][x] = 2;
            playerScore++;
            document.getElementById('gameplay').innerHTML = "It's a hit!" + "(" + playerScore + ")";
            draw();
        }
        else {
            document.getElementById('gameplay').innerHTML = "Opponent's turn..";
            opponentZone[y][x] = 3;
            control = 1;
            draw();
            bombTime = setInterval('bomb()', 400);
        }  
    }
    else {
        document.getElementById('gameplay').innerHTML = "Wait..";
    }
}

var tempA = 0;
var tempB = 0;
var time;

function bomb() {
    var a = Math.floor(Math.random() * 10);
    var b = Math.floor(Math.random() * 10);
    if(playerZone[a][b] === 1) {
        playerZone[a][b] = 2;
        oppScore++;
        document.getElementById('gameplay').innerHTML = "You got hit!" + "(" + oppScore + ")";
        draw();
        tempA = a;
        tempB = b;
        clearInterval(bombTime);
        time = setInterval("hitRecur()", 400);
    }
    else if (playerZone[a][b] === 3){
        document.getElementById('gameplay').innerHTML = "Your turn..";
        playerZone[a][b] = 0;
        control = 0;
        draw();
        clearInterval(bombTime);
    }
}

function hitRecur() {
    var rand = Math.floor(Math.random() * 4);
    var x = tempA + guide[rand][0]; 
    var y = tempB + guide[rand][1];
    if((x <= 9) || (x >= 0) || (y <= 9) || (y >= 0)) {
        if(playerZone[x][y] === 1) {
            oppScore++;
            document.getElementById('gameplay').innerHTML = "You got hit!" + "(" + oppScore + ")";
            playerZone[x][y] = 2;
            tempA = x;
            tempB = y;
            draw();
        }
        else if (playerZone[x][y] !== 1 && playerZone[x][y] !== 2){
            document.getElementById('gameplay').innerHTML = "Your turn..";
            playerZone[x][y] = 0;
            draw();
            control = 0;
            clearInterval(time);
        }
    }
}

var scoreCheck = setInterval("scoreChecker()", 1000);

function scoreChecker() {
    if(playerScore == 15) {
        document.getElementById('gameplay').innerHTML = "You won! Click on 'Restart' to refresh.";
        clearInterval(scoreCheck);
    }
    if(opponentScore == 15) {
        document.getElementById('gameplay').innerHTML = "The AI won :( Click on 'Restart' to refresh.";
        clearInterval(scoreCheck);
    }
}
