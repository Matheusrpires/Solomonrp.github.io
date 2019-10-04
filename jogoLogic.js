let ponto = 0;
let IntervarlId;
let timer = 30;
let start = 1;
let players = [];
let player;
let ranking = [];

function randomImg() {
    let img, img2, topx, lefty;
    let num;
    let screenHeight, screenWidth;

    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;

    img2 = document.getElementsByClassName('ball')

    for (let i = 0; i < img2.length; i++) {
        num = Math.floor(Math.random() * 200);
        if (num > 90) {
            img2[i].style.height = num + 'px';
            img2[i].style.width = num + 'px';
        }
        topx = Math.floor(Math.random() * (screenHeight - num));
        lefty = Math.floor(Math.random() * (screenWidth - num));

        img2[i].style.top = topx + 'px';
        img2[i].style.left = lefty + 'px';
    }
}

function pontos() {
    let points;
    let finalPoints;
    ponto++;
    points = document.getElementsByClassName('points');
    finalPoints = document.getElementsByClassName('pointsR');
    points[0].innerText = `Pontos: ${ponto}`;
    finalPoints[0].innerText = `Seus pontos: ${ponto}`
}

function getPlayerandPoints() {
    let pontos = ponto;
    players.push({
        player: player,
        pontos: pontos
    });
    localStorage.setItem('player', players);
}

function tiraPontos() {
    let menosPoints, points;
    menosPoints = document.getElementsByClassName('points');
    points = menosPoints[0].innerText.slice(8, 9);
    points = parseInt(points);
    if (points !== 0) {
        ponto--;
        menosPoints[0].innerText = `Pontos: ${ponto}`;
    }
}

function sumir(img) {

    img.style.width = '0px';
    img.style.height = '0px';

    console.log('clicado');

}


function stopImages() {
    let img = document.getElementById('img');
    img.remove();
    // endBoard();
}

function endBoard() {
    let pontos = document.getElementById('pointsboard');
    pontos.remove();

    ranking = localStorage.getItem('player');
    console.log(ranking);

    let endPoints = document.getElementById('ranking');
    endPoints.setAttribute('style', 'visibility:visible')
}

function end() {
    clearInterval(IntervarlId);
    stopImages();
    getPlayerandPoints();
    endBoard();
}

function times() {
    let time;
    let ending = 30;
    time = document.getElementsByClassName('timer');
    IntervarlId = setInterval(() => {
        timer -= 1;
        ending -= 1;
        time[0].innerText = `Tempo Restante: ${timer}s`
        if (ending === 0) {
            console.log('acabou');
            end();
        }
    }, 1000)
}

function starts() {
    player = document.getElementById('tagName').value;
    let name = document.getElementById('getName');
    name.remove();
    main();
}

// window.addEventListener('click', function (e) {
//     main();
// })

// lembrar de mudar velocidade para mais rápido
function main() {
    let boardpoints = document.getElementById('pointsboard');
    boardpoints.setAttribute('style', 'visibility:visible');

    let remove = document.getElementsByTagName('h1');
    remove[0].remove();


    setInterval(function () { randomImg() }, 1500);

    times();

    document.querySelectorAll('.ball').forEach(bal => {
        bal.addEventListener('click', function () {
            sumir(this);
            pontos();
        });
    })

    window.addEventListener('click', function (e) {
        if (document.getElementById('img').contains(e.target)) {
            console.log('dentro')
        } else {
            tiraPontos();
        }
    });
}


