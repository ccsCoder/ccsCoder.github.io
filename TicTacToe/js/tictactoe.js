	
	function handleCanvasClicks(event) {
		var myCanvas = document.getElementById("ticTacToe");
		x = event.pageX - myCanvas.offsetLeft,
		y = event.pageY - myCanvas.offsetTop;
		var zoneString=getZoneNumber(x,y);
		zoneString = zoneString.split("#");
		var xZone = zoneString[0];
		var yZone = zoneString[1];
		
		
		drawShape(xZone,yZone);
		
		
	}
	
	function drawPatternOnCanvas(canvas) {
		var imageObj = new Image();
		imageObj.onload = function() {
			var pattern = context.createPattern(imageObj,"repeat");
			context.rect(0, 0, canvas.width, canvas.height);     
			context.fillStyle = pattern;
			context.fill();
			drawBoard();
		};
		imageObj.src = "images/wood.jpg";
	}
	
	/**
	 * function to get the X mid point of a particular zone
	 * 
	 */
	function getMidPointForZone_X(xZone) {
		return (xZone * width/3 + width/6)
	}
	
	
	/**
	 * function to get the Y mid point of a particular zone. 
	 * 
	 */
	function getMidPointForZone_Y(yZone) {
		return (yZone * height/3 + height/6);
	}
	
	
	function drawShape(xZone,yZone) {		
		//check if it has already been marked.
		if (checkedMatrix[xZone-1][yZone-1]!=-1)
			return;
		//find the midpoint now for this zone.
		var midX = ((xZone-1) * width/3 + width/6);
		var midY = ((yZone-1) * height/3 + height/6);

		if (crossToggle) {
			drawCross(midX,midY);
			//set the flag
			checkedMatrix[xZone-1][yZone-1]=1;	
		}
		else {
			drawCircle(midX,midY);
			//set the flag
			checkedMatrix[xZone-1][yZone-1]=0;
		}
		crossToggle= !crossToggle;
		
		checkAndMarkSolution(xZone-1,yZone-1);
	}
	
	function drawWinningLine(row,col,diagonal) {
		//console.debug("drawWinningLine "+row+","+col+","+diagonal);
		//context.strokeStyle="#00FF00";
		var startx,starty,endx,endy,offset=50;
		if (diagonal!=undefined) {
			//mark this diagonal as won...
			if (row==0) {		//top lef to bottom right
				startx = getMidPointForZone_X(0);
				starty = getMidPointForZone_Y(0);
				endx = getMidPointForZone_X(2);
				endy = getMidPointForZone_Y(2);
				startx -=offset;
				starty-=offset;
				endx+=offset;
				endy+=offset;
			}
			else if(col==0) {
				startx = getMidPointForZone_X(0);
				starty = getMidPointForZone_Y(2);
				endx = getMidPointForZone_X(2);
				endy = getMidPointForZone_Y(0);
				
				startx -=offset;
				starty+=offset;
				endx+=offset;
				endy-=offset;
			}
			
			
			
			//console.debug("Diagonal win-["+startx+","+starty+"] and ["+endx+","+endy+"]");
			context.moveTo(startx,starty);
			context.lineTo(endx,endy);			
			context.stroke();
			
			//detach the event.
			document.getElementById("ticTacToe").removeEventListener("click",handleCanvasClicks);
			
			return;
		}
		
		if (row!=undefined) {
			
			//mark this row as won...
			startx = getMidPointForZone_X(0);
			starty = getMidPointForZone_Y(row);
			endx = getMidPointForZone_X(2);
			endy = starty;
			
			startx -=offset;
			//starty-=offset;
			endx+=offset;
			//endy+=offset;
			
			//console.debug("Row win-["+startx+","+starty+"] and ["+endx+","+endy+"]");
			
		}
		else if (col!=undefined) {
			//mar this col as won...
			startx = getMidPointForZone_X(col);
			endx = startx;
			starty = getMidPointForZone_Y(0);
			endy = getMidPointForZone_Y(2);
			
			//startx -=offset;
			starty-=offset;
			//endx+=offset;
			endy+=offset;
			
			console.debug("Col win-["+startx+","+starty+"] and ["+endx+","+endy+"]");
			
		}
		
	
		
		//finally draw that winning line...
		context.moveTo(startx,starty);
		context.lineTo(endx,endy);
		context.stroke();
		//detach the event.	
		document.getElementById("ticTacToe").removeEventListener("click",handleCanvasClicks);
	}
	
	function checkAndMarkSolution(x,y) {
		var solved=true;
		
		//check rowwise...
		for(var col=0;col<2;col++) {
			if (checkedMatrix[col][y]!=checkedMatrix[col+1][y]) {
				solved=false;
				break;		//not solved for this row.
			}
		}
		if (solved) {
			//alert("Won ! at Row-"+y);
			drawWinningLine(y,undefined,undefined);		//don't send anything in the other arguments
			return;
		}
		
		//check in that column.
		solved=true;
		for(var row=0;row<2;row++) {
			if (checkedMatrix[x][row]!=checkedMatrix[x][row+1]) {
				solved=false;
				break;		//not solved for this column...
			}
		}
		if (solved) {
			//alert("Won! at column-"+x);
			drawWinningLine(undefined,x,undefined);
			return;
		}
		
		//else check diagonally left top -> down right.
		solved = true;
		for(var diag=0;diag<2;diag++) {
			if (checkedMatrix[diag][diag]==-1 || checkedMatrix[diag][diag]!=checkedMatrix[diag+1][diag+1]) {
				solved =false;
				break;
			}
		}
		if (solved) {
			//alert("Won diagonally at left->top ");
			drawWinningLine(0,2,true);
			return;
		}
		
		solved = true;
		for(var diag=0,ydiag=2;diag<2;diag++,ydiag--) {
			if (checkedMatrix[diag][ydiag]==-1 || checkedMatrix[diag][ydiag]!=checkedMatrix[diag+1][ydiag-1]) {
				solved=false;
				break;
			}
		}
		
		if (solved) {
			//alert("Won diagonally at right top->left bottom");
			drawWinningLine(2,0,true);
			return;
		}
				
			
		
	}
	
	function getZoneNumber(x,y) {
		var prevBound=0;
		var nextBound=0;
		for(var i=1;i<=3;i++) {
			nextBound+=width/3;
			if (x>=prevBound && x<=nextBound)
				break;
			prevBound=nextBound+1;	
		}
		
		prevBound=0;
		nextBound=0;
		for(var j=1;j<=3;j++) {
			nextBound+=height/3;
			if (y>=prevBound && y<=nextBound) 
				break;
			prevBound = nextBound+1;
		}
		
		
		return i+"#"+j;
	}
	
	function drawBoard() {
		context.lineWidth=10;
		context.strokeStyle = "#000000";
		//context.fillStyle="#000000";
		
		//vertical lines
		context.moveTo(width/2-offset,0);
		context.lineTo(width/2-offset,height-10);
		context.moveTo(width/2+offset,0);
		context.lineTo(width/2+offset,height-10);
		context.stroke();
		
		//horizontal lines
		context.moveTo(0,height/2-offset);
		context.lineTo(width-10,height/2-offset);
		context.moveTo(0,height/2+offset);
		context.lineTo(width-10,height/2+offset);
		context.stroke();
		
	}
	
	function drawCircle(x,y) {
		context.beginPath();								
		context.arc(x,y,30,0,2*Math.PI,true);
		context.stroke();
	}
	
	function drawCross(x,y) {
		context.moveTo(x-30,y+30);
		context.lineTo(x+30,y-30);
		context.moveTo(x-30,y-30);
		context.lineTo(x+30,y+30);
		context.stroke();
	}
