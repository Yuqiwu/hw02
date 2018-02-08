var box = document.getElementById("box");
var ctx = box.getContext("2d");
var startit = document.getElementById("start");
var stopit = document.getElementById("stop");
var toggleit = document.getElementById("toggle");


// switch between mode
// 1 for grow and shrink
// 2 for dvd movement
var tog = 2; 

// grow and shrink properties
var requestID1;
var stat = true;
var r = 0;

// dvd movement properties
var requestID2;
var x = 100;
var y = 200;
var vx = 10;
var vy = 10;

ctx.fillStyle = "red";

var clear = function(){
    ctx.clearRect(0, 0, 500, 500);
}

var start = function(){
    draw();
}

var stop = function(){
    if ( tog == 1 ){
	window.cancelAnimationFrame( requestID1 );
    }
    else{
	window.cancelAnimationFrame( requestID2 );
    }
}

var toggle = function(){
    if ( tog == 1 ){
	tog = 2;
    }
    else{
	tog = 1;
    }
    draw();
    console.log(tog);
}

var draw = function(){
    stop();
    
    var animate1 = function(){
	clear();
	ctx.beginPath();
	ctx.arc(250, 250, r, 0, 2 * Math.PI);
	status();
	requestID1 = window.requestAnimationFrame(animate1);
	ctx.fill();
    }
    
    var status = function(){
	if (stat == true){
	    r++;
	    if (r > 250){
		stat = false;
	    }
	}
	else{
	    r--;
	    if (r < 1){
		stat = true;
	    }
	}
    }

    var animate2 = function(){
	clear();
	ctx.rect(x,y,10,10);
	movement();
	requestID2 = window.requestAnimationFrame(animate2);
	ctx.fill();
	console.log("x = " + x);
	console.log("y = " + y);
    }

    var movement = function(){
	if (x == 0 || x == 500){
	    vx = vx - 2 * vx;
	}
	if (y == 0 || y == 500){
	    vy = vy - 2 * vy;
	}
	x = x + vx;
	y = y + vy;
    }


    if (tog == 1){
	animate1();
    }
    else{
	animate2();
    }
}

draw();


startit.addEventListener("click", start);
stopit.addEventListener("click", stop);
toggleit.addEventListener("click", toggle);


