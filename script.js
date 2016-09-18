 

// ship lengths [2,3,3,4]

// create board.
// set board.

// function Player() {
//   name: "Player",
//   shipCount: 12,
//   board: [[],[],[],[],[],[],[],[],[],[]]
// }




enemyBoard = [[null, 'X', 'X', 'X', null,null, 'X', 'X', 'X', null,],
              [null, null, null, null, null,null, null, null, null, null],
              [null, 'X', 'X', 'X', null,null, 'X', 'X', 'X', null],
              [null, null, null, null, null,null, null, null, null, null],
              [null, null, null, null, null,null, null, null, null, null],
              [null, 'X', 'X', 'X', null,null, 'X', 'X', 'X', null,],
              [null, null, null, null, null,null, null, null, null, null],
              [null, 'X', 'X', 'X', null,null, 'X', 'X', 'X', null],
              [null, null, null, null, null,null, null, null, null, null],
              [null, null, null, null, null,null, null, null, null, null]];

function toNumber(letter) {
  switch(letter) {
    case 'a' || 'A':
      return 0;
      break;
    case 'b' || 'B':
      return 1;
      break;
    case 'c' || 'C':
      return 2;
      break;
    case 'd' || 'D':
      return 3;
      break;
    case 'e' || 'E':
      return 4;
      break;
    case 'f' || 'F':
      return 5;
      break;
    case 'g' || 'G':
      return 6;
      break;
    case 'h' || 'H':
      return 7;
      break;
    case 'i' || 'I':
      return 8;
      break;
    case 'j' || 'J':
      return 9;
      break;
    default:
      console.log("Uh oh. Invalid Input.");
      break;
  }
}

function fire() {
  var input = prompt("Please enter your target: ");

    if(input.length > 2) {
      console.log("Uh oh. Invalid Input.");
      enterInput();  
    } else {
      
      var x = toNumber(input[0]);
      var y = input[1];

      if(enemyBoard[x]) {
        console.log(enemyBoard[x][y] != null ? "HIT!" : "miss..."); 
      } else {
        enterInput();
      }
    }
}

$('#name-form').on("submit", submitName);
$('#opponent-form').on("submit", submitOpponentName);

function sayHi() {
  console.log('hi');
}

$('.box').on('click', checkHit);
// $('#box01').on('click', checkHit);


function checkHit() {
  var tempBox = $(this).attr('id');
  var boxNumber = tempBox[3]+tempBox[4];
  console.log($(this).attr('id'));
  console.log(boxNumber);

  var x = boxNumber[0];
  var y = boxNumber[1];

  if(enemyBoard[x]) {

    if (enemyBoard[x][y] != null) {
       $(this).css('backgroundColor', 'green');  
      console.log('HIT!');
     }  
     else {
        $(this).css('backgroundColor', 'red');  
      console.log('miss...'); 
   }
  }
}


function submitName() {
    event.preventDefault();
    var player1name = $('#player-input').val();
    console.log(player1name);
    $('#player1name').html('Player: ' + player1name);
}

function submitOpponentName() {
    event.preventDefault();
    var player2name = $('#opponent-input').val();
    console.log(player2name);
    $('#player2name').html('Opponent: ' + player2name);
}

// begin game

// ask user for target via click event

// on click, the targeted spot will check to see if it matches a ship spot.
// turns red if miss, green if hit.

// ship spot

// when all hits = ships, winner is declared.


// create div
// set it's color based on hit/miss
// set it's position based on spot
// append the div



