function resetWorkGrid(){
	$(".canvasBox").each(function(){
		var box = $(this)[0];	
		var canvasObject = $(this);
		var topToWindow = $(this).offset().top - $(window).scrollTop();
		canvasObject.data().midX = box.offsetLeft + box.offsetWidth * 0.5;
		canvasObject.data().midY = topToWindow + box.offsetHeight * 0.5;
	});
}


function initWorkGrid(){
	// Define the pixel ratio of each canvas element. Without this step, canvas will automatically stretch.
	$(".canvasBox canvas").attr('width', $(".canvasBox")[0].offsetWidth);
	$(".canvasBox canvas").attr('height', $(".canvasBox")[0].offsetHeight);

	$(".canvasBox").each(function(){
		var box = $(this)[0];		
		var canvasObject = $(this);
		
		canvasObject.data( "midX", box.offsetLeft + box.offsetWidth * 0.5);
		canvasObject.data( "midY", box.offsetTop + box.offsetHeight * 0.5);

		canvasObject.data( "dest1", new Point(0, 0));
		canvasObject.data( "dest2", new Point(box.offsetWidth, 0));
		canvasObject.data( "dest3", new Point(box.offsetWidth, box.offsetHeight));
		canvasObject.data( "dest4", new Point(0, box.offsetHeight));
		canvasObject.data( "p1", new Point(0, 0));
		canvasObject.data( "p2", new Point(0, 0));
		canvasObject.data( "p3", new Point(0, 0));
		canvasObject.data( "p4", new Point(0, 0));
		canvasObject.data( "speed1", 0.1);
		canvasObject.data( "speed2", 0.2);
		canvasObject.data( "speed3", 0.3);
		canvasObject.data( "speed4", 0.4);
		canvasObject.data( "finish", 0);
		//Define & attach timerObject
		var fadeInInterval, fadeOutInterval;
		canvasObject.data( "fadeInInterval", fadeInInterval);
		canvasObject.data( "fadeOutInterval", fadeOutInterval);
		//attach methods
		canvasObject.data( "setEnterPoints", function(dir, boxObj){
			canvasObject.data( "dest1", new Point(0, 0));
			canvasObject.data( "dest2", new Point(box.offsetWidth, 0));
			canvasObject.data( "dest3", new Point(box.offsetWidth, box.offsetHeight));
			canvasObject.data( "dest4", new Point(0, box.offsetHeight));
			switch(dir){
				case "LT":
					boxObj.data( "p1", new Point(0, 0));
					boxObj.data( "p2", new Point(0, 0));
					boxObj.data( "p3", new Point(0, 0));
					boxObj.data( "p4", new Point(0, 0));
					boxObj.data( "speed1", 0.2);
					boxObj.data( "speed2", 0.2);
					boxObj.data( "speed3", 0.1);
					boxObj.data( "speed4", 0.2);
					break;
				case "RT":
					boxObj.data( "p1", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "p2", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "p3", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "p4", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "speed1", 0.2);
					boxObj.data( "speed2", 0.2);
					boxObj.data( "speed3", 0.2);
					boxObj.data( "speed4", 0.1);
					break;
				case "LB":
					boxObj.data( "p1", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "p2", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "p3", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "p4", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "speed1", 0.2);
					boxObj.data( "speed2", 0.1);
					boxObj.data( "speed3", 0.2);
					boxObj.data( "speed4", 0.2);
					break;
				case "RB":
					boxObj.data( "p1", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "p2", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "p3", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "p4", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "speed1", 0.1);
					boxObj.data( "speed2", 0.2);
					boxObj.data( "speed3", 0.2);
					boxObj.data( "speed4", 0.2);
					break;
			}
		});

		canvasObject.data( "setLeavePoints", function(dir, boxObj){
			switch(dir){
				case "LT":
					boxObj.data().p1.x = 0;
					boxObj.data().p4.x = 0;	
					boxObj.data().p1.y = 0;
					boxObj.data().p2.y = 0;	
					boxObj.data( "dest1", new Point(0, 0));
					boxObj.data( "dest2", new Point(0, 0));
					boxObj.data( "dest3", new Point(0, 0));
					boxObj.data( "dest4", new Point(0, 0));
					boxObj.data( "speed1", 0.1);
					boxObj.data( "speed2", 0.1);
					boxObj.data( "speed3", 0.2);
					boxObj.data( "speed4", 0.1);
					break;
				case "RT":		
					boxObj.data().p2.x = boxObj[0].offsetWidth;
					boxObj.data().p3.x = boxObj[0].offsetWidth;
					boxObj.data().p1.y = 0;
					boxObj.data().p2.y = 0;		
					boxObj.data( "dest1", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "dest2", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "dest3", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "dest4", new Point(boxObj[0].offsetWidth, 0));
					boxObj.data( "speed1", 0.1);
					boxObj.data( "speed2", 0.1);
					boxObj.data( "speed3", 0.1);
					boxObj.data( "speed4", 0.2);
					break;
				case "LB":
					boxObj.data().p1.x = 0;
					boxObj.data().p4.x = 0;	
					boxObj.data().p3.y = boxObj[0].offsetHeight;
					boxObj.data().p4.y = boxObj[0].offsetHeight;	
					boxObj.data( "dest1", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "dest2", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "dest3", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "dest4", new Point(0, boxObj[0].offsetHeight));
					boxObj.data( "speed1", 0.1);
					boxObj.data( "speed2", 0.2);
					boxObj.data( "speed3", 0.1);
					boxObj.data( "speed4", 0.1);
					break;
				case "RB":
					boxObj.data().p2.x = boxObj[0].offsetWidth;
					boxObj.data().p3.x = boxObj[0].offsetWidth;
					boxObj.data().p3.y = boxObj[0].offsetHeight;
					boxObj.data().p4.y = boxObj[0].offsetHeight;	
					boxObj.data( "dest1", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "dest2", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "dest3", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "dest4", new Point(boxObj[0].offsetWidth, boxObj[0].offsetHeight));
					boxObj.data( "speed1", 0.2);
					boxObj.data( "speed2", 0.1);
					boxObj.data( "speed3", 0.1);
					boxObj.data( "speed4", 0.1);
					break;
			}
		});

		canvasObject.data( "updatePoints", function(boxObj){
			boxObj.data().p1.x += (boxObj.data().dest1.x - boxObj.data().p1.x) * boxObj.data().speed1;
			boxObj.data().p1.y += (boxObj.data().dest1.y - boxObj.data().p1.y) * boxObj.data().speed1;
			boxObj.data().p2.x += (boxObj.data().dest2.x - boxObj.data().p2.x) * boxObj.data().speed2;
			boxObj.data().p2.y += (boxObj.data().dest2.y - boxObj.data().p2.y) * boxObj.data().speed2;
			boxObj.data().p3.x += (boxObj.data().dest3.x - boxObj.data().p3.x) * boxObj.data().speed3;
			boxObj.data().p3.y += (boxObj.data().dest3.y - boxObj.data().p3.y) * boxObj.data().speed3;
			boxObj.data().p4.x += (boxObj.data().dest4.x - boxObj.data().p4.x) * boxObj.data().speed4;
			boxObj.data().p4.y += (boxObj.data().dest4.y - boxObj.data().p4.y) * boxObj.data().speed4;
			var distAll = distance(boxObj.data().dest1, boxObj.data().p1) 
						+ distance(boxObj.data().dest2, boxObj.data().p2)
						+ distance(boxObj.data().dest3, boxObj.data().p3)
						+ distance(boxObj.data().dest4, boxObj.data().p4);
			if(distAll < 0.4){
				boxObj.data().p1.x = boxObj.data().dest1.x;
				boxObj.data().p1.y = boxObj.data().dest1.y;
				boxObj.data().p2.x = boxObj.data().dest2.x;
				boxObj.data().p2.y = boxObj.data().dest2.y;
				boxObj.data().p3.x = boxObj.data().dest3.x;
				boxObj.data().p3.y = boxObj.data().dest3.y;
				boxObj.data().p4.x = boxObj.data().dest4.x;
				boxObj.data().p4.y = boxObj.data().dest4.y;
				boxObj.data().finish = 1;
			}
		});

		canvasObject.data( "render", function(boxObj){
			var ctx = boxObj.find('canvas')[0].getContext("2d");
			ctx.clearRect(0, 0, boxObj[0].offsetWidth, boxObj[0].offsetHeight);
			ctx.beginPath();	
			ctx.moveTo(boxObj.data().p1.x, boxObj.data().p1.y);
			ctx.lineTo(boxObj.data().p2.x, boxObj.data().p2.y);
			ctx.lineTo(boxObj.data().p3.x, boxObj.data().p3.y);
			ctx.lineTo(boxObj.data().p4.x, boxObj.data().p4.y);
			ctx.closePath();
			ctx.fillStyle = '#f75c2f';
			ctx.fill();
		});

		canvasObject.data( "cleanCanvas", function(boxObj){
			var ctx = boxObj.find('canvas')[0].getContext("2d");
			ctx.clearRect(0, 0, boxObj[0].offsetWidth, boxObj[0].offsetHeight);
		});

		//Attach mouseEvent
		$(this).mouseenter(function(event){
			var mouseEnterPosition;			
			if( event.clientX < canvasObject.data().midX && event.clientY < canvasObject.data().midY ) mouseEnterPosition = "LT";
			else if( event.clientX > canvasObject.data().midX && event.clientY < canvasObject.data().midY ) mouseEnterPosition = "RT";
			else if( event.clientX < canvasObject.data().midX && event.clientY > canvasObject.data().midY ) mouseEnterPosition = "LB";
			else if( event.clientX > canvasObject.data().midX && event.clientY > canvasObject.data().midY ) mouseEnterPosition = "RB";
		
			canvasObject.data().setEnterPoints(mouseEnterPosition, canvasObject);
			clearInterval(canvasObject.data().fadeOutInterval);			
			canvasObject.data().finish = 0;
			canvasObject.data().fadeInInterval = setInterval(function(){
				canvasObject.data().updatePoints(canvasObject);
				canvasObject.data().render(canvasObject);
				if(canvasObject.data().finish == 1){
					clearInterval(canvasObject.data().fadeInInterval);
				}
			}, 16);	
		});

		$(this).mouseleave(function(event){
			var mouseEnterPosition;			
			if( event.clientX < canvasObject.data().midX && event.clientY < canvasObject.data().midY ) mouseEnterPosition = "LT";
			else if( event.clientX > canvasObject.data().midX && event.clientY < canvasObject.data().midY ) mouseEnterPosition = "RT";
			else if( event.clientX < canvasObject.data().midX && event.clientY > canvasObject.data().midY ) mouseEnterPosition = "LB";
			else if( event.clientX > canvasObject.data().midX && event.clientY > canvasObject.data().midY ) mouseEnterPosition = "RB";
			
			canvasObject.data().setLeavePoints(mouseEnterPosition, canvasObject);
			clearInterval(canvasObject.data().fadeInInterval);
			canvasObject.data().finish = 0;
			canvasObject.data().fadeOutInterval = setInterval(function(){	
				canvasObject.data().updatePoints(canvasObject);
				canvasObject.data().render(canvasObject);
				if(canvasObject.data().finish == 1){
					clearInterval(canvasObject.data().fadeInInterval);
				}
			}, 16);		
		});

	});
}

function Point(iniX, iniY){
	this.x = iniX;
	this.y = iniY;
}

function distance(point1, point2){
	var dist = Math.sqrt(Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2));
	return dist;
}