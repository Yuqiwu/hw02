var box = document.getElementById("box");
var ctx = box.getContext("2d");
var stopit = document.getElementById("stop");
var startit = document.getElementById("start");
var requestID;
var stat = true;
var r = 0;
var oldr = 0;
var cont = false;

ctx.fillStyle = "red";

var clear = function(){
    ctx.clearRect(0, 0, 500, 500);
}

var stop = function(){
    oldr = r;
    cont = true;
    window.cancelAnimationFrame( requestID );
}

var stop2 = function(){
    window.cancelAnimationFrame( requestID );
}

var start = function(){
    draw();
}

var draw = function(){
    stop2();
    if (cont == true){
	r = oldr;
	cont = false;
    }
    else{
	oldr = 0;
	r = 0;
    }
    
    var animate = function(){
	clear();
	ctx.beginPath();
	ctx.arc(250, 250, r, 0, 2 * Math.PI);
	status();
	requestID = window.requestAnimationFrame(animate);
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
    
    animate();
}

stopit.addEventListener("click", stop);
startit.addEventListener("click", start);
box.addEventListener("click", draw);

