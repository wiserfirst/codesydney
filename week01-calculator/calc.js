$(function($) {
  var add = function(a, b) {
    return a + b;
  }

  var substract = function(a, b) {
    return a - b;
  }

  var multiply = function(a, b) {
    var val = a * b;
    return val >= 0 ? Math.floor(val) : Math.ceil(val);
  }

  var divide = function(a, b) {
    return Math.floor(a / b);
  }

  var operations = Object.freeze({
    "+": add,
    "-": substract,
    "*": multiply,
    "/": divide
  });

  var input = [];

  var calcStatus = Object.freeze({INIT: 0, FIRST_NUMBER: 1, SECOND_NUMBER: 2, RESULT: 3});

  var calcObject = {
    fn: 0,
    sn: 0,
    op: '',
    result: 0,
    status: calcStatus.INIT
  };

  var clear = function() {
    calcObject.fn = 0;
    calcObject.sn = 0;
    calcObject.op = '';
    calcObject.result = 0;
    calcObject.status = calcStatus.INIT;
  };

  var updateScreen = function() {
    var displayString = "";
    switch(calcObject.status) {
      case calcStatus.INIT: // Fall through
      case calcStatus.FIRST_NUMBER:
        displayString = calcObject.fn;
        break;
      case calcStatus.SECOND_NUMBER:
        displayString = calcObject.fn + calcObject.op + (calcObject.sn != 0 ? calcObject.sn : '');
        break;
      case calcStatus.RESULT:
        displayString = calcObject.result;
        break;
      default:
        console.log("Unknown Status when updating screen");
        break;
    }
    $(".screen").html(displayString);
    console.log(calcObject);
    console.log(displayString);
  };

  $("div.number").click(function() {
    var number = parseInt($(this).text());
    switch(calcObject.status) {
      case calcStatus.RESULT:
        clear();
        // Fall through
      case calcStatus.INIT: // Fall through
        calcObject.status = calcStatus.FIRST_NUMBER;
      case calcStatus.FIRST_NUMBER:
        calcObject.fn *= 10;
        calcObject.fn += number;
        break;
      case calcStatus.SECOND_NUMBER:
        calcObject.sn *= 10;
        calcObject.sn += number;
        break;
      default:
        console.log("Unknown Status when pressing number key " + number);
        break;
    }
    updateScreen();
  });

  $("div.operator").click(function() {
    var operator = $(this).text();
    switch(calcObject.status) {
      case calcStatus.SECOND_NUMBER:
        if (calcObject.sn != 0) {
          calcObject.status = calcStatus.RESULT;
          calcObject.result = operations[calcObject.op](calcObject.fn, calcObject.sn);
          // Fall through
        } else {
          break;
        }
      case calcStatus.RESULT:
        calcObject.fn = calcObject.result;
        calcObject.result = 0;
        calcObject.sn = 0;
        // Fall through
      case calcStatus.INIT:
      case calcStatus.FIRST_NUMBER:
        calcObject.status = calcStatus.SECOND_NUMBER;
        calcObject.op = operator;
        break;
      default:
        console.log("Unknown Status when pressing operator key " + operator);
        break;
    }
    updateScreen();
  });

  $("div.equal").click(function() {
    switch(calcObject.status) {
      case calcStatus.INIT: // Fall through
      case calcStatus.FIRST_NUMBER:
      case calcStatus.RESULT:
        console.log("Nothing happen here");
        break;
      case calcStatus.SECOND_NUMBER:
        calcObject.status = calcStatus.RESULT;
        calcObject.result = operations[calcObject.op](calcObject.fn, calcObject.sn);
        break;
      default:
        console.log("Unknown Status when pressing equal key ");
        break;
    }
    updateScreen();
  });

  $("div.clear").click(function() {
    clear();
    updateScreen();
  });

});
