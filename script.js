
function Player() {
  this.name = "";
  this.ships = 28;
  this.wins = 0;
}

var gameOn = true;
var user = new Player();
var enemy = new Player();

userBoard =  [[null, null, null, null, null, 'bs', 'bs', 'bs', 'bs', 'bs'],
              [null, null, null, null, null, null, 'bs', 'bs', null, null],
              [null, null, null, null, null, null, null, null, null, null],
              [null, null, null, null, 'bs', 'bs', 'bs', 'bs', null, null],
              ['bs', 'bs', 'bs', 'bs', 'bs', 'bs', null, null, 'bs', null],
              [null, null, null, null, null, null, null, null, 'bs', null],
              [null, null, null, null, null, null, null, null, 'bs', null],
              [null, null, null, null, null, null, null, null, 'bs', null],
              [null, null, null, null, null, null, null, null, null, null],
              ['bs', 'bs', 'bs', null, null, null, 'bs', 'bs', 'bs', 'bs']];

enemyBoard = [[null, 'bs', 'bs', 'bs', null, null, null, null, null, null,],
              [null, null, null, null, null, null, 'bs', 'bs', null, null],
              [null, 'bs', null, null, null, null, null, null, null, null],
              [null, 'bs', null, null, 'bs', 'bs', 'bs', 'bs', null, null],
              [null, 'bs', null, null, null, null, null, null, null, 'bs'],
              [null, 'bs', null, null, null, null, null, null, null, 'bs'],
              [null, 'bs', null, null, null, null, null, null, null, 'bs'],
              [null, null, 'bs', 'bs', 'bs', 'bs', 'bs', 'bs', null, 'bs'],
              [null, null, null, null, null, null, null, null, null, null],
              ['bs', 'bs', 'bs', 'bs', null, null, null, null, null, null]];


// MUS variables
var battleMusic = document.getElementById("battleMusic");
var loadMusic = document.getElementById("loadMusic");

// SFX variables
var boatSFX = document.getElementById("bgSFX");
var fireHit = new Audio('music/fireHit.mp3');
var fireMiss = new Audio('music/fireMiss.mp3');
var enemyHit = new Audio('music/enemyHit.mp3');
var enemyMiss = new Audio('music/enemyMiss.mp3');
var youWin = new Audio('music/youWin.mp3');
var youLose = new Audio('music/youLose.mp3');


window.onload = function() {
    loadMusic.play();
    boatSFX.play();
    createBoard();
    createEnemyBoard();
}

function createBoard() {
  for(var i = 0; i<10; i++) {
    var newRow = document.createElement("div");
    newRow.className = "row";
    document.getElementById("gameBoard").appendChild(newRow);
    for (var j=0; j<10; j++) {
      var newBox = document.createElement("div");
      newBox.className = "box"
      newBox.id = "box" + i + j
      newRow.appendChild(newBox)
    }
  }
}

function createEnemyBoard() {
  for(var i = 0; i<10; i++) {
    var newEnemyRow = document.createElement("div");
    newEnemyRow.className = "row";
    document.getElementById("enemyGameBoard").appendChild(newEnemyRow);
    for (var j=0; j<10; j++) {
      var newEnemyBox = document.createElement("div");
      newEnemyBox.className = "enemy-box"
      newEnemyBox.id = "enemy-box" + i + j
      newEnemyRow.appendChild(newEnemyBox)
    }
  }
}






$('#name-form').on("submit", submitName);
$('#opponent-form').on("submit", submitOpponentName);

$('.box').off('click', checkHit);
$('#enemyFireButton').off('click', enemyFire);


function checkHit() {
  var tempBox = $(this).attr('id');
  var boxNumber = tempBox[3]+tempBox[4];

  var x = boxNumber[0];
  var y = boxNumber[1];
  $('.box').off('click', checkHit);
  $('#enemyFireButton').on('click', enemyFire);
  $('#player1name').css('text-shadow', 'none');
  $('#player2name').css('text-shadow', '0 0 10px white');


  if(enemyBoard[x]) {

    if (enemyBoard[x][y] != null) {
      $(this).css('backgroundColor', 'rgba(109,20,20,0.73)');
      $(this).css('box-shadow', '0px 0px 0px 5px white inset');
      // console.log('HIT!');
      $('#userResult').html("HIT");
      enemy.ships--;
      $('#player2name').html("Opponent: " + enemy.name + " (" + enemy.ships + " ships left...)");
      checkWin();
      fireHit.play();
     }  
     else {
        $(this).css('backgroundColor', 'rgba(0,0,0,0)');  
        $(this).css('box-shadow', '0px 0px 0px 5px black inset');
        $('#player2name').html("Opponent: " + enemy.name + " (" + enemy.ships + " ships left...)");
         $('#userResult').html("MISS");
         fireMiss.play();
   }
  }
}

function enemyFire() {
    var a = Math.floor(Math.random()*10);
    var b = Math.floor(Math.random()*10);
    var enemyAttacks = a.toString() + b.toString();

    var tempBox1 = "#enemy-box" + enemyAttacks;

    var tempBox = $(tempBox1);
    // console.log(tempBox);
    $('#enemyFireButton').off('click', enemyFire);
    $('.box').on('click', checkHit);
    $('#player1name').css('text-shadow', '0 0 10px white');
    $('#player2name').css('text-shadow', 'none');


    if (userBoard[a][b] != null) {
        tempBox.css('backgroundColor', 'rgba(109,20,20,0.73)');
        user.ships--;
         $('#userResult').html("HIT");
         enemyHit.play();
        $('#player1name').html("Player: " + user.name + " (" + user.ships + " ships left...)");
        checkWin();
       }  
       else {
         $('#player1name').html("Player: " + user.name + " (" + user.ships + " ships left...)");
        enemyMiss.play();
        tempBox.css('backgroundColor', 'rgba(0,0,0,0)');  
        $('#userResult').html("MISS");
     }
}

function submitName() {
    event.preventDefault();
    var player1name = $('#player-input').val();
    user.name = player1name;
    // console.log(player1name);
    $('#name-form').css('visibility', 'hidden'); 
    $('#opponent-form').css('visibility', 'visible'); 
    $('#player1name').html("Player: " + user.name + " (" + user.ships + " ships left...)");
}

function submitOpponentName() {
    event.preventDefault();
    var player2name = $('#opponent-input').val();
    enemy.name = player2name;
    // console.log(player2name);
    $('#opponent-form').css('visibility', 'hidden'); 
    $('.box').on('click', checkHit);
    $('#player2name').html("Opponent: " + enemy.name + " (" + enemy.ships + " ships left...)");
    $('#player1name').css('text-shadow', '0 0 10px white');
    loadMusic.pause();
    battleMusic.play();
}

function checkWin() {
  if (enemy.ships === 0) {
      $('#nameTitle').html(user.name + " wins!")
      $('#enemyFireButton').off('click', enemyFire);
      $('.box').off('click', checkHit);
      battleMusic.pause();
      youWin.play();

  } else if (user.ships === 0) {
      // console.log("You else");
      $('#nameTitle').html(user.name + " loses...")
      $('#enemyFireButton').off('click', enemyFire);
      $('.box').off('click', checkHit);
      battleMusic.pause();
      youLose.play();
  }
}
