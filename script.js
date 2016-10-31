
function Player() {
  this.name = "";
  this.ships = 28;
  this.wins = 0;
}

var gameOn = true;
var user = new Player();
var enemy = new Player({name: "Blackbeard"});

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
    arrangeEnemyBoard();
    createScoreBoard();
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
    newEnemyRow.className = "row enemy-row";
    document.getElementById("enemyGameBoard").appendChild(newEnemyRow);
    for (var j=0; j<10; j++) {
      var newEnemyBox = document.createElement("div");
      newEnemyBox.className = "enemy-box"
      newEnemyBox.id = "enemy-box" + i + j
      newEnemyRow.appendChild(newEnemyBox)
    }
  }
}

function arrangeEnemyBoard() {
  var enemyBoardVersion = Math.floor(Math.random() * 4);
  for(var i = 0; i < enemyBoardVersion; i++) {
    enemyBoard = transposeBoard(enemyBoard);
  }
}

function transposeBoard(a) {
  return Object.keys(a[0]).map(function (c) {
    return a.map(function (r) {
      return r[c];
    });
  });
}

function createScoreBoard() {
  for (var i = 0; i < 28; i++) {
    var playerPoint = document.createElement("div");
    playerPoint.className = "playerPoint";
    playerPoint.id = "playerPoint-" + (i + 1);
    document.getElementById("player-score").appendChild(playerPoint);
  }  
  for (var i = 0; i < 28; i++) {
    var enemyPoint = document.createElement("div");
    enemyPoint.className = "enemyPoint";
    enemyPoint.id = "enemyPoint-" + (i + 1);
    console.log(enemyPoint.id)
    document.getElementById("enemy-score").appendChild(enemyPoint);
  }
}



$('#name-form').on("submit", submitName);
$('.box').off('click', checkHit);

function checkHit() {
  var tempBox = $(this).attr('id');
  var boxNumber = tempBox[3]+tempBox[4];

  var x = boxNumber[0];
  var y = boxNumber[1];
  $('.box').off('click', checkHit);
  $('#player1name').css('text-shadow', 'none');
  $('#player2name').css('text-shadow', '0 0 10px white');

  if(enemyBoard[x]) {
    if (enemyBoard[x][y] != null) {
      $(this).css('backgroundColor', 'rgba(109,20,20,0.73)');
      $(this).css('box-shadow', '0px 0px 0px 5px white inset');
      $('#userResult').html("HIT");
      enemyPointId = "#enemyPoint-" + enemy.ships;
      $(enemyPointId).css("background", "url()");
      enemy.ships--;

      checkWin();
      fireHit.play();
    } else {
      $(this).css('backgroundColor', 'rgba(0,0,0,0)');  
      $(this).css('box-shadow', '0px 0px 0px 5px black inset');
      $('#userResult').html("MISS");
      fireMiss.play();
    }
  }
  setTimeout(enemyFire, 3700);
}

function enemyFire() {
  var a = Math.floor(Math.random()*10);
  var b = Math.floor(Math.random()*10);
  var enemyAttacks = a.toString() + b.toString();
  var tempBox1 = "#enemy-box" + enemyAttacks;
  var tempBox = $(tempBox1);

  $('#player1name').css('text-shadow', '0 0 10px white');
  $('#player2name').css('text-shadow', 'none');
  $('#enemyFireButton').removeClass('beforeShot');
  $('#enemyFireButton').addClass('afterShot');
  if (userBoard[a][b] != null) {
    tempBox.css('backgroundColor', 'rgba(109,20,20,0.73)');
    playerPointId = '#playerPoint-'+user.ships;
    console.log(playerPointId);
    $(playerPointId).css("background", "url()");
    $('#userResult').html("HIT");
    user.ships--;
    enemyHit.play();
    checkWin();
  } else {
    enemyMiss.play();
    tempBox.css('backgroundColor', 'rgba(0,0,0,0)');  
    $('#userResult').html("MISS");
  }
  setTimeout( function() { 
    $('#enemyFireButton').removeClass('afterShot');
    $('#enemyFireButton').addClass('beforeShot');
    $('.box').on('click', checkHit);
  }, 2500);
}

function submitName() {
  event.preventDefault();
  var player1name = $('#player-input').val();
  user.name = player1name;
  enemy.name = "Blackbeard";
  $('#player1name').html(player1name)
  $('#player1name').css('text-shadow', '0 0 10px white');
  loadMusic.pause();
  battleMusic.play();
  $('#game-board').toggle();
  $('#pre-game-board').toggle();
  $('#myModal').modal('hide');
  $('.box').on('click', checkHit);
}

function checkWin() {
  if (enemy.ships === 0) {
    $('#nameTitle').html(user.name + " wins!")
    $('.box').off('click', checkHit);
    battleMusic.pause();
    youWin.play();
  } else if (user.ships === 0) {
    $('#nameTitle').html(user.name + " loses...")
    $('.box').off('click', checkHit);
    battleMusic.pause();
    youLose.play();
  }
}
