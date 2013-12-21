var $p5Canvas;
var p5Engine;
var canvasWidth, canvasHeight;
var screenSizeRatio;
var p5Font;
var p5FontSize=18;
var nodeCount=0;
var springCount=0;
var shadowDisplacement=3;

$(document).ready(function(){	
	$p5Canvas=$('#p5Canvas').get(0);
	canvasWidth=$("#p5Parent").width();
	canvasHeight=$( window ).height();
	screenSizeRatio=canvasWidth/960;
	if(canvasWidth>640)p5FontSize=18;
	else if(canvasWidth<640)p5FontSize=12;
	p5Engine=new Processing($p5Canvas,mySketch);
	//console.log("DectectTierIphone= "+MobileEsp.DetectTierIphone());
	//mdectec.js > MobileEsp

	if(!MobileEsp.DetectTierIphone()){
		$('section.scrollsections').scrollSections({
			createNavigation: false,
			navigation: true,
			after: function($currentSection, $previousSection){
				window.location.hash=$currentSection.attr('id');
			}
		});
	}	

});

$(window).resize(function() {
	$p5Canvas=$('#p5Canvas').get(0);
	canvasWidth=$("#p5Parent").width();
	canvasHeight=$( window ).height();
	screenSizeRatio=canvasWidth/960;
	p5Engine.resize();
	/*  */
	//p5Engine.stopDrawing();
	//p5Engine=new Processing($p5Canvas, mySketch);
});

function showMyName(){
	$('*').each(function(){
		var current=this;
		this.onclick=function(event){
			if(!event) event=window.event;
			var target=(event.target)?event.target:event.srcElement;
		}
	});	
}

function mySketch(processing){
	var p5=processing;
	var numNodes=20;
	var seletecNodeId=-1;
	var nodeArray=new Array();
	var springArray=new Array();
	var readmePieAngle=0;

	p5.setup=function(){
		p5.size(canvasWidth,canvasHeight);		
		p5.background(252,250,242);
		p5.frameRate(30);
		p5.smooth();
		p5.fill(0);
		p5.stroke(0);
		p5Font=p5.createFont('Oxygen', p5FontSize, true);
		p5.textSize(p5FontSize);
		p5.textFont(p5Font);

		initializeGraphic();
	}

	p5.draw=function(){
		p5.background(252,250,242);
		createReadme();
		for(var i=0; i<springArray.length; i++){
			springArray[i].update();
			springArray[i].render();			
		}
		p5.noStroke();
		
		for(i=0; i<nodeArray.length; i++){
			if(i!=seletecNodeId){
				nodeArray[i].attractArray(nodeArray);
				nodeArray[i].update();
				nodeArray[i].render();
			}			
		}
		if(seletecNodeId>-1){
			nodeArray[seletecNodeId].location.x=p5.mouseX;
			nodeArray[seletecNodeId].location.y=p5.mouseY;
			nodeArray[seletecNodeId].render();		
		}
		for(i=0; i<nodeArray.length; i++){
			nodeArray[i].renderText();
		}		
	}

	p5.mousePressed=function(){
		var mouseLoc=new p5.PVector(p5.mouseX, p5.mouseY);
		for(var i=0; i<nodeArray.length; i++){
			var distToCurosr=p5.PVector.sub(nodeArray[i].location, mouseLoc);
			if(distToCurosr.mag()<10){
				//TODO: onPress : Show skill level/ experience effect
				seletecNodeId=i;				
				nodeArray[seletecNodeId].setSelected(1);
				nodeArray[seletecNodeId].pieChartAngle=0;
				nodeArray[seletecNodeId].setShowSkill(1);
				nodeArray[seletecNodeId].enlarge();
				break;
			}
		}	
	}

	p5.mouseReleased=function(){
		if(seletecNodeId>-1){
			nodeArray[seletecNodeId].setSelected(0);
			nodeArray[seletecNodeId].setShowSkill(0);
			nodeArray[seletecNodeId].shrink();
		}		
		seletecNodeId=-1;
	}

	p5.resize=function(){		
		p5.size(canvasWidth,canvasHeight);
		//resize node.
	}

	p5.stopDrawing=function(){
		/* Stop all the drawing before reset pjs.*/
		this.draw=function(){}
	}

	var createReadme=function(){
		var readmePieRadius=24;
		var pieX=20;
		var pieY=96;
		//p5.fill(145,152,159,150);
		//p5.ellipse(pieX + shadowDisplacement,pieY + shadowDisplacement,32,32);
		p5.fill(79,79,72);
		p5.ellipse(pieX,pieY,32,32);
		p5.fill(252,250,242);
		p5.ellipse(pieX,pieY,24,24);
		p5.fill(189,192,186);		
		createReadmePie(pieX, pieY);
		p5.fill(79,79,72);
		p5.text("= Click / Drag",pieX+20,pieY+6);
		p5.textSize(36);
		p5.text("MY SKILL SET",pieX-16,pieY-32);
		p5.textSize(p5FontSize);
	}

	var createReadmePie=function(initX, initY){
		var pieRadius=12;
		var radTarget=720;
		var radPieChart=p5.radians(readmePieAngle);
		p5.beginShape();
		p5.vertex(initX,initY);
		for(var i=0; i<radPieChart; i+=0.01){
			var rotateAngle=i-p5.PI/2;
			p5.vertex(initX + pieRadius*p5.cos(rotateAngle),initY + pieRadius*p5.sin(rotateAngle));
		}
		p5.vertex(initX,initY);
		p5.endShape(p5.CLOSE);
		if(readmePieAngle<radTarget)readmePieAngle+=2;
		if(readmePieAngle>=radTarget)readmePieAngle=0;
	}

	// var createRandomGraphic=function(){
	// 	for(var i=0; i<numNodes; i++){
	// 		nodeArray[i]=new p5Node(p5);
	// 		nodeArray[i].setLocation(p5.width/2+p5.random(-1,1), p5.height/2+p5.random(-1,1));
	// 	}
	// 	var springCount=0;
	// 	for(i=0; i<nodeArray.length-1; i++){
	// 		var randomCount=p5.floor(p5.random(1,2));
	// 		for(var j=0; j<randomCount; j++){
	// 			var randomNodeId=p5.floor(p5.random(i+1, nodeArray.length));
	// 			springArray[springCount]=new p5Spring(p5);
	// 			springArray[springCount].setupNode(nodeArray[i],nodeArray[randomNodeId]);
	// 			springCount++;
	// 		}
	// 	}
	// }

	var initializeSprings=function(){
		var i=0;
		createSpringArrayItem(i,"Graphic");
	}

	var createNodeArrayItem=function(index, size, color, name){
		nodeArray[index]=new p5Node(p5);
		nodeArray[index].setRadius(size);
		nodeArray[index].setColor(color);
		nodeArray[index].setName(name);		
		nodeArray[index].setLocation(p5.width/2+p5.random(-1,1), p5.height/2+p5.random(-1,1));
		nodeCount++;
	}

	var createSpringArrayItem=function(index, length, n1, n2){
		springArray[index]=new p5Spring(p5);
		springArray[index].setupNaturalLength(length);
		springArray[index].setupNode(n1,n2);
		springCount++;
	}

	var initializeGraphic=function(){
		var regNodeRadius=50*screenSizeRatio;
		var largeNodeRadius=80*screenSizeRatio;
		var regSpringLength=120*screenSizeRatio;
		var randLength=100*screenSizeRatio;	
		var longSpringLength=240*screenSizeRatio;
		var cGraphic="ff90b44b";
		var cInteractive="ff00aa90";
		var cTechnical="ff2ea9df";

		createNodeArrayItem(nodeCount, largeNodeRadius, cGraphic, "Graphic");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createNodeArrayItem(nodeCount, largeNodeRadius, cInteractive, "Interactive");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createNodeArrayItem(nodeCount, largeNodeRadius, cTechnical, "Technical");
		nodeArray[nodeCount-1].setSkillLevel(270);
		
		createSpringArrayItem(springCount, longSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[0], nodeArray[1]);
		createSpringArrayItem(springCount, longSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[1], nodeArray[2]);
		createSpringArrayItem(springCount, longSpringLength+p5.floor(p5.random(randLength,randLength*2)), nodeArray[0], nodeArray[2]);

		createNodeArrayItem(nodeCount, regNodeRadius, cGraphic, "Visual");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[0], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cGraphic, "Typography");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[0], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cGraphic, "Print");
		nodeArray[nodeCount-1].setSkillLevel(180);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[0], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cGraphic, "Layout");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[0], nodeArray[nodeCount-1]);

		createNodeArrayItem(nodeCount, regNodeRadius, cInteractive, "Information Architecture");
		nodeArray[nodeCount-1].setSkillLevel(270);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[1], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cInteractive, "Cognative Psycology");
		nodeArray[nodeCount-1].setSkillLevel(180);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[1], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cInteractive, "Prototyping");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[1], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cInteractive, "UI");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(randLength/2,randLength)), nodeArray[0], nodeArray[nodeCount-1]);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(randLength/2,randLength)), nodeArray[1], nodeArray[nodeCount-1]);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(randLength/2,randLength)), nodeArray[2], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cInteractive, "User-Centred Design");
		nodeArray[nodeCount-1].setSkillLevel(270);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[1], nodeArray[nodeCount-1]);

		createNodeArrayItem(nodeCount, regNodeRadius, cTechnical, "HTML/CSS");
		nodeArray[nodeCount-1].setSkillLevel(270);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[2], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cTechnical, "Javascript");
		nodeArray[nodeCount-1].setSkillLevel(270);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[2], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cTechnical, "Acctionscript");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[2], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cTechnical, "Processing");
		nodeArray[nodeCount-1].setSkillLevel(360);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[2], nodeArray[nodeCount-1]);
		createNodeArrayItem(nodeCount, regNodeRadius, cTechnical, "Android/JAVA");
		nodeArray[nodeCount-1].setSkillLevel(90);
		createSpringArrayItem(springCount, regSpringLength+p5.floor(p5.random(0,randLength)), nodeArray[2], nodeArray[nodeCount-1]);
	}
}

function p5Node(processing){
	var p5=processing;
	var node=this;	
	node.location=new p5.PVector();
	node.velocity=new p5.PVector();
	node.minAttractDistance=160.0;
	node.gravity=2*9.8;
	node.maxSpeed=15.0;
	node.damping=0.75;
	node.mass = 1.0;
	node.attractDirection=-1;
	node.attracting=false;
	node.radius=30;
	node.pieChartAngle=0;
 	node.targetAngle=0;
	node.name="interactive design";
	node.selected=0;
	node.showSkill=0;
	node.color="ffbdc0ba";

	node.setLocation=function(inputX, inputY){
		node.location.x=inputX;
		node.location.y=inputY;
	}

	node.setSelected=function(flag){
		node.selected=flag;
	}

	node.setShowSkill=function(flag){
		node.showSkill=flag;
	}

	node.setRadius=function(size){
		node.radius=size;		
	}

	node.setName=function(inputName){
		node.name=inputName;		
	}

	node.setColor=function(color){
		node.color=color;
	}
	node.setSkillLevel=function(level){
		node.targetAngle=level;
	}

	node.enlarge=function(){
		node.radius*=1.5;		
	}

	node.shrink=function(){
		node.radius/=1.5;		
	}
	
	node.attractArray=function(nodeArray){
		for(var i=0; i<nodeArray.length; i++){
			var otherNode=nodeArray[i];
			if(otherNode == null) break;
      		if(otherNode == node) continue;
      		node.attractOther(otherNode);
		}
	}

	node.attractOther=function(otherNode){
   		var centralDiff=p5.PVector.sub(node.location,otherNode.location);
	    var centralDist=centralDiff.mag();    
	    if(centralDist>0 && centralDist < node.minAttractDistance){
	      var distRatio = p5.pow(centralDist/node.minAttractDistance, 1);
	      var force = node.mass * node.mass * node.gravity * node.attractDirection /(centralDist*centralDist);
	      centralDiff.mult(force); 
	      otherNode.velocity.add(centralDiff);
	    }
	}

	node.update=function(){
		node.velocity.limit(node.maxSpeed);
		node.location.add(node.velocity);
		node.velocity.mult(node.damping);
	}

	node.render=function(){
		if(Boolean(node.showSkill)){
			p5.fill(145,152,159,60);
			p5.ellipse(node.location.x + shadowDisplacement * 8, node.location.y + shadowDisplacement * 8, 
						node.radius - shadowDisplacement* 4, node.radius - shadowDisplacement* 4);
		}else{
			p5.fill(145,152,159,150);
			p5.ellipse(node.location.x + shadowDisplacement, node.location.y + shadowDisplacement, node.radius,node.radius);
		}
		p5.fill(p5.unhex(node.color));
		p5.ellipse(node.location.x, node.location.y, node.radius,node.radius);
		p5.fill(255);		
		p5.ellipse(node.location.x, node.location.y, node.radius-node.radius/5,node.radius-node.radius/5);
		if(Boolean(node.showSkill)){
			p5.fill(247,92,47);
			node.drawPie();
		}
	}

	node.drawPie=function(){
		var pieRadius=(node.radius-node.radius/5)/2;
		var radTarget=p5.radians(node.targetAngle);
		var radPieChart=p5.radians(node.pieChartAngle);
		p5.beginShape();
		p5.vertex(node.location.x,node.location.y);
		for(var i=0; i<radPieChart; i+=0.01){
			var rotateAngle=i-p5.PI/2;
			p5.vertex(node.location.x + pieRadius*p5.cos(rotateAngle),node.location.y + pieRadius*p5.sin(rotateAngle));
		}
		p5.vertex(node.location.x,node.location.y);
		p5.endShape(p5.CLOSE);
		if(node.pieChartAngle<node.targetAngle)node.pieChartAngle+=20;
		if(node.pieChartAngle>=node.targetAngle)node.pieChartAngle=node.targetAngle;
	}

	node.renderText=function(){
		p5.fill(79,79,72);
		var textWidth=p5.textWidth(node.name);
		p5.text(node.name,node.location.x-textWidth/2,node.location.y-4-node.radius/2);
	}
}

function p5Spring(processing){
	var p5=processing;
	var spring=this;
	spring.naturalLength=120.0;
	spring.currentLength=120.0;
	spring.damping=0.25;
	spring.springFactor=1.2;
	spring.tension=189;

	spring.setupNode=function(start, end){
		spring.startNode=start;
		spring.endNode=end;
	}

	spring.setupNaturalLength=function(length){
		spring.naturalLength=length;		
	}

	spring.update=function(){
		var diff=p5.PVector.sub(spring.endNode.location, spring.startNode.location);
		spring.currentLength=diff.mag();
		var displacement=spring.currentLength-spring.naturalLength;
		var forceStrength=displacement*spring.springFactor;		
		diff.normalize();
		var target=p5.PVector.add(spring.startNode.location,diff);
		var force=p5.PVector.mult(diff,forceStrength);
		force.mult(spring.damping);
		spring.startNode.velocity.add(force);
		spring.endNode.velocity.add(p5.PVector.mult(force,-1));
		spring.tension=189 * spring.currentLength/ spring.naturalLength;
	}

	spring.render=function(){
		p5.strokeWeight(4);
		p5.stroke(145,152,159,200);
		p5.line(spring.startNode.location.x + shadowDisplacement/2, spring.startNode.location.y + shadowDisplacement/2,
				spring.endNode.location.x + shadowDisplacement/2, spring.endNode.location.y + shadowDisplacement/2);
		p5.stroke(spring.tension,192,186);		
		p5.line(spring.startNode.location.x, spring.startNode.location.y,
				spring.endNode.location.x, spring.endNode.location.y);

	}
}

