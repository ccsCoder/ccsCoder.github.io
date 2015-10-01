function Particle() {
    this.x = undefined;
    this.y = undefined;
    this.color = undefined;
    this.velocity = undefined;
    this.element = undefined;
}



function ParticleSystem() {
    this.particles = [];
    this.attractable = true;
    this.xBound = undefined;
    this.yBound = undefined;
}

function getRandom(limit) {
    //console.debug(Math.random()*limit);
    return Math.random()*limit;
}

ParticleSystem.prototype.plot = function(selfReference) {
    //plot these particles on the page...
    for(var i=0;i<selfReference.particles.length;i++) {
        $("body").append(selfReference.particles[i].element);
    }
}

ParticleSystem.prototype.repel = function(selfReference) {
    $(".particle").each(function(index,val) {
        $(this).animate({
            "left":selfReference.particles[index].x,
            "top":selfReference.particles[index].y
        },3000);
       
    });
}

ParticleSystem.prototype.animate = function(selfReference) {
    $(".particle").animate({
        "left":selfReference.xBound/2+"px",
        "top":selfReference.yBound/2+"px"
    }, 3000);
}

function getRandomColor() {
    
    var R = getRandom(255);
    var G = getRandom(255);
    var B = getRandom(255);
    
    return rgb(R,G,B);
    
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/**
 * method to init the particle system.
 */
ParticleSystem.prototype.init = function(numberOfParticles,attractable,selfReference) {
    //init window bounds...
    selfReference.xBound = $(window).width();
    selfReference.yBound = $(window).height();
    //create some particles...
    var tempParticle;
    for(var i=0;i<numberOfParticles;i++) {
        
        tempParticle = new Particle();
        tempParticle.x = getRandom(selfReference.xBound-20);
        tempParticle.y = getRandom(selfReference.yBound-20);
        tempParticle.velocity = getRandom(30);
        
        tempParticle.element = document.createElement("div");
        $(tempParticle.element).addClass("particle");
        $(tempParticle.element).css("left",tempParticle.x+"px");
        $(tempParticle.element).css("top",tempParticle.y+"px");
        $(tempParticle.element).css("background-color",get_random_color());
        
        selfReference.particles.push(tempParticle);
        
        //console.debug(tempParticle);
        
    }
}

