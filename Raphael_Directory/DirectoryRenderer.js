/**
@author: Nishant
This class is used for rendering the basic shapes.
*/

function Renderer() {
	//Init Variables.
	this._maxWidth = undefined;
	this._maxHeight = undefined;
	this._context = undefined;

	

};

function Renderer(mW,mH,ctx) {
	//console.log(mW);
	this._maxHeight = mH;
	this._maxWidth = mW;
	this._context = ctx;
	//Some Constants.
	this._iconWidth = 75;
	this._iconHeight=100;
	this._radius = 10;
	this._animationDuration = 200;
	//Offsets
	this._horizontalGap = 60;
	this._verticalGap = 70;

};

Renderer.prototype._setFolderLookAndFeel = function(folder) {
	//set the colour
	folder.attr({
		stroke: '#91B3E6',
		'stroke-width': 2,
		fill: '#5492ED',
		"fill-opacity": 1,
		cursor: 'pointer'
	});

	//set the Hover Effect
	folder.hover(function() {
		folder.animate({
			
			'stroke-width': 6
			},
			this._animationDuration);
	}, function() {
		 // Stuff to do when the mouse leaves the element 
		folder.attr({
			stroke: '#91B3E6',
			'stroke-width': 2,
			fill: '#5492ED',
			"fill-opacity": 1,
			cursor: 'pointer'
		});	
	});
};


Renderer.prototype.layoutFilesAndFolders = function(startX, startY, fsobjects) {
	var plotX=startX;
	var plotY=startY;
	
	//Okay, the hard works starts.
	for(var i=0;i<fsobjects.length;i++) {
		//check for width before plotting
		if (plotX >= (this._maxWidth-this._iconWidth-this._horizontalGap)) {
			
			//the width has become greater than max-width
			plotX = startX;	//reset plotX to start.
			//now see if the next row can fit within the current height.
			if( (plotY+2*this._verticalGap+this._iconHeight) > this._maxHeight ) {
				//expand the container.
				this._maxHeight=this._maxHeight+ this._iconHeight+ this._verticalGap;
				this._context.setSize(this._maxWidth,this._maxHeight);
				//console.log("Resized Canvas ! to->"+this._context.height);

			}
			//increment the plotY to point to the next Row.
			plotY  = plotY + this._iconHeight + this._verticalGap;
			

		}

		//Draw the icon

		if(fsobjects[i].isDirectory()) {
			this.createFolderIcon(plotX,plotY,fsobjects[i].getName());
		}
		else {
			this.createFileIcon(plotX,plotY,fsobjects[i].getName());
		}

		plotX = plotX + this._iconWidth + this._horizontalGap;		//increment the variable Plot.

	}

};

Renderer.prototype._setFileLookAndFeel = function(file) {
	//set the colour
	file.attr({
		stroke: '#91B3E6',
		fill:'black',
		'stroke-width': 2,
		cursor: 'pointer'
	});

	//set the Hover Effect
	file.hover(function() {
		file.animate({
			
			'stroke-width': 4
			},
			this._animationDuration);
	}, function() {
		 // Stuff to do when the mouse leaves the element 
		file.attr({
			stroke: '#91B3E6',
			'stroke-width': 2,
			fill:'black',
			cursor: 'pointer'
		});	
	});

};

Renderer.prototype._updateBreadCrumb = function(fileName) {
	var navItem = document.createElement("span");
	$(navItem).text(fileName+" > ").addClass('crumb').appendTo($("#breadcrumb"));
	
};

Renderer.prototype.createFileIcon = function(x,y,fileName) {
	//Create an Aggretation
	var fileIcon = this._context.set();

	//The Rectangle Part.
	var file=this._context.rect(x,y,this._iconWidth,this._iconHeight,this._radius);

	//console.debug(file);
	//set the folder l&f
	this._setFileLookAndFeel(file);

	//create the Text Node.
	var textNode=this._context.text((x+(this._iconWidth)/2),y+this._iconHeight+15,fileName);

	textNode.attr({
		'font-familiy':'Helvetica Neue',
		'font-size': 12,
		fill:'white'
	});

	//Push these to the Set.
	fileIcon.push(file);
	fileIcon.push(textNode);

	//add the Scale Effect :)
	fileIcon.hover(function() {
		/* Stuff to do when the mouse enters the element */
		fileIcon.animate({transform:'s1.1 1.1'}, this._animationDuration);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		fileIcon.animate({transform:'s1.0 1.0'}, this._animationDuration);
	});	

	var that =this;

	//add the "Click" handler
	fileIcon.click(function(event) {
		that._updateBreadCrumb(fileName);
		that._doPuffOut(fileIcon);

	});
};

Renderer.prototype._doPuffOut = function(targetElement) {
	targetElement.animate({
			transform: 's20.0 20.0',
			opacity:0.1
			},
			300,function() {
				targetElement.remove();
	});
	
};

Renderer.prototype.createFolderIcon = function(x,y,directoryName) {

	//Create an Aggretation
	var folderIcon = this._context.set();

	//The Rectangle Part.
	var folder=this._context.rect(x,y,this._iconWidth,this._iconHeight,this._radius);
	
	//set the folder l&f
	this._setFolderLookAndFeel(folder,this);

	//create the Text Node.
	var textNode=this._context.text((x+(this._iconWidth)/2),y+this._iconHeight+15,directoryName);

	textNode.attr({
		'font-familiy':'Helvetica Neue',
		'font-size': 12,
		fill:'white'
	});

	//Push these to the Set.
	folderIcon.push(folder);
	folderIcon.push(textNode);

	//add the Scale Effect :)
	folderIcon.hover(function() {
		/* Stuff to do when the mouse enters the element */
		folderIcon.animate({transform:'s1.1 1.1'}, this._animationDuration);
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		folderIcon.animate({transform:'s1.0 1.0'}, this._animationDuration);
	});	

	var that = this;

	//add the "Click" handler
	folderIcon.click(function(event) {
		that._updateBreadCrumb(directoryName);
		that._doPuffOut(folderIcon);

	});

	

}

