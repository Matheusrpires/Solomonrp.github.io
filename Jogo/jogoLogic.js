let ponto = 0;
let IntervarlId;
let timer = 30;
let ending = 30;
let start = 1;
let players = [];
let player;
let ranking = [];
let imgFF = 0;
let imgTT = 0;
let imgTF = 0;
let imgTG = 0;
let numberGrenades = 0;
// velocidade
let quick = 1300;
let enemiesNumber = 0;

function randomImg() {
    let img2, topx, lefty;
    let num;
    let screenHeight, screenWidth;
    
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    
    img2 = document.getElementsByClassName('ball');
    
    for (let i = 0; i < img2.length; i++) {
        num = Math.floor(Math.random() * 300);
        if (num > 50) {
            img2[i].style.height = num + 'px';
            img2[i].style.width = num + 'px';
        }
        topx = Math.floor(Math.random() * (screenHeight - num-50));
        lefty = Math.floor(Math.random() * (screenWidth - num-50));

        img2[i].style.top = topx + 'px';
        img2[i].style.left = lefty + 'px';
    }
}


function pontos(ene) {
    let points;
    let finalPoints;
    
    if (ene.classList[1] === 'enemies') {
        ponto++;
    }
    
    
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
    localStorage.setItem(player, JSON.stringify({
        player: player,
        pontos: pontos
    }));
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

    let imgNow = document.getElementById('flashba');


    if (img.id === 'ball6') {
        end();
    }
    if (img.id === 'ball7') {
        timer += 5;
        ending += 5;
    }
    if (img.id === 'ball8') {
        imgNow.classList.toggle('hidden');
        imgNow.classList.toggle('visible');
        setTimeout(function () {
            imgNow.classList.toggle('visible');
            imgNow.classList.toggle('hidden');
        }, 2000);
    }
    if (img.id === 'ball9') {
        img.style.width = '0px';
        img.style.height = '0px';
        numberGrenades += 1;
        console.log('total de granadas', numberGrenades);

    }

    img.style.width = '0px';
    img.style.height = '0px';

    enemiesNumber += 1;
}


function stopImages() {
    let img = document.getElementById('img');
    img.remove();
}

function getPlayerStorage() {
    let keys = Object.keys(localStorage);
    let size = keys.length;

    for (let i = 0; i < size; i += 1) {
        ranking.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    console.log('values', ranking);

}

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function endBoard() {
    let pontos = document.getElementById('pointsboard');
    pontos.remove();
    let grenade = document.getElementById('grenadeIcon');
    grenade.remove();
    getPlayerStorage();


    // let remove = document.getElementsByTagName('h1');
    // remove[0].remove();

    console.table(ranking);

    ranking.sort((a, b) => {
        if (a.pontos > b.pontos) {
            return -1;
        }
        if (a.pontos < b.pontos) {
            return 1;
        }
        return 0;
    })

    console.log('ordenado');
    console.table(ranking);

    let endPoints = document.getElementById('ranking');
    let father = endPoints.getElementsByTagName('h3')[0];
    let place = ranking.length;


    for (let i = 0; i < ranking.length; i += 1) {
        let p = document.createElement('p');
        let data = document.createTextNode(`#${ranking.indexOf(ranking[i])} - ${ranking[i].player} - Pontos: ${ranking[i].pontos}`);
        p.appendChild(data);
        endPoints.appendChild(p);
        // insertAfter(p,father);
    }

    endPoints.setAttribute('style', 'visibility:visible');
}

function end() {
    clearInterval(IntervarlId);
    stopImages();
    getPlayerandPoints();
    endBoard();
}

function times() {
    let time;
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

function checkBuff() {
    let imgf = document.getElementsByClassName('ball');
    // console.log('flash', imgTF);
    if (imgFF == 6) {
        imgf[5].classList.toggle('friend');
        setTimeout(function () { imgf[5].classList.toggle('friend'); }, 2000);
        imgFF = 0;
    } else if (imgTT == 7) {
        imgf[6].classList.toggle('time');
        setTimeout(function () { imgf[6].classList.toggle('time'); }, 1500);
        imgTT = 0;
    } else if (imgTF == 5) {
        imgf[7].classList.toggle('flash');
        setTimeout(function () { imgf[7].classList.toggle('flash'); }, 1500);
        imgTF = 0;
    } else if (imgTG == 4) {
        imgf[8].classList.toggle('flash');
        setTimeout(function () { imgf[8].classList.toggle('flash'); }, 2500);
        imgTG = 0;
    } else {
        imgFF += 1;
        imgTT += 1;
        imgTF += 1;
        imgTG += 1;
    }
}

function timeout() {

    switch (ponto) {
        case 5:
            quick = 1100;
            break;
        case 7:
            quick = 1000;
            break;
        case 9:
            quick = 900;
            break;
        case 11:
            quick = 800;
            break;

    }

    setTimeout(function () {
        randomImg();
        checkBuff();
        timeout();
        enemiesNumber = 0;
        // console.log('inimigos mortos', enemiesNumber);
    }, quick);

}
// checar se tem amigo na explosão, se tiver acabar o jogo. Checar pegando todos os elementos e 
// checar se na classe do amigo tem a classe de esconder o elemento ou não
function grenade() {

    let friends = document.getElementById('ball6'); 

    if (numberGrenades > 0 && friends.classList.length === 2) {
        let audio = new Audio('/sounds/grenade.mp3');
        audio.play();
        
        numberGrenades -= 1;

        let updatePlayer = 5 - enemiesNumber;

        let enemiesImg = document.getElementsByClassName('enemies');

        for (let i = 0; i < 5; i += 1) {
            enemiesImg[i].style.width = '0px';
            enemiesImg[i].style.height = '0px';
        }

        
        // console.log('ponto', ponto);
        // console.log('update', updatePlayer);

        ponto += updatePlayer;
        // console.log('ponto', ponto);

        enemiesNumber = 0;
    } else if(friends.classList.length === 1) {
        end();
    } else {
        console.log('sem granda');
    }

}

// lembrar de mudar velocidade para mais rápido
function main() {
    let boardpoints = document.getElementById('pointsboard');
    let grenadeItem = document.getElementsByClassName('grenadeItem');
    boardpoints.setAttribute('style', 'visibility:visible');
    grenadeItem[0].setAttribute('style', 'visibility:visible');

    // let remove = document.getElementsByTagName('h1');
    // remove[0].remove();

    timeout();
    times();

    let imgAppear = document.getElementsByClassName('enemies');

    for (let j = 0; j < 5; j += 1) {
        imgAppear[j].style.opacity = 1;
    }


    document.querySelectorAll('.ball').forEach(bal => {
        bal.addEventListener('click', function () {
            sumir(this);
            pontos(this);
 
            

            if (imgTG == 4) {
                enemiesNumber += 1;

            }
            // console.log(document.getElementsByClassName('enemies'))
        });
    })



    window.addEventListener('click', function (e) {
        if (document.getElementById('img').contains(e.target)) {
            console.log('dentro')
            let shots = new Audio('/sounds/ak47-1.wav');
            shots.play();
        } else if(document.getElementById('grenadeIcon').contains(e.target)) {
            console.log('Só granada')
        } else{
            let shots = new Audio('/sounds/ak47-1.wav');
            shots.play();
            tiraPontos();
        }
    });
}


