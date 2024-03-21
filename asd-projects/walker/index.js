/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40
  }
  
  // Game Item Objects
  var walker = {
    "positionX": 1,
    "positionY": 1,
    "speedX": 0,
    "speedY": 0,
    "width": 50,
    "height": 50,
  }
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp)

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    wallCollision()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      console.log("up pressed")
      walker.speedY = -5
    }
    if (event.which === KEY.RIGHT) {
      console.log("right pressed")
      walker.speedX = 5
    }
    if (event.which === KEY.DOWN) {
      console.log("down pressed")
      walker.speedY = 5
    }
    if (event.which === KEY.LEFT) {
      console.log("left pressed")
      walker.speedX = -5
    }
    console.log(event.which)
  }
  function handleKeyUp(event) {
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0
      if (event.which === KEY.UP) {
        console.log("up unpressed")
      }
      if (event.which === KEY.DOWN) {
        console.log("down unpressed")
      }
    }
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0
      if (event.which === KEY.LEFT) {
        console.log("left unpressed")
      }
      if (event.which === KEY.RIGHT) {
        console.log("right unpressed")
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem () {
    walker.positionX += walker.speedX
    walker.positionY += walker.speedY
  }
  function redrawGameItem () {
    $("#walker").css("left", walker.positionX)
    $("#walker").css("top", walker.positionY)
  }
  function wallCollision () {
    if (walker.positionX + walker.width >= $("#board").width() || walker.positionX <= 0 || walker.positionY + walker.height >= $("#board").height() || walker.positionY <= 0) {
      endGame()
      console.log("GAME OVER")
    }
  }
  
}
