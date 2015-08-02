function Projectile() {
    this.x = undefined;
    this.y = undefined;
    this.speed= undefined;
    this.angle = undefined;
    this.gravity = 9.8;
    this.nextX = undefined;
    this.nextY = undefined;
    this.acceleration = 10;
    this.stallingTime = undefined;
    
}

Projectile.prototype.calculateStallingTime = function(obj) {
    //v = u - gt; u = gt; t=u/g;
    
    obj.stallingTime = obj.getVerticalSpeedComponent(obj) / obj.gravity;
}

Projectile.prototype.setX = function(obj,xCoord) {
    obj.x=xCoord;
}

Projectile.prototype.setY = function(obj,yCoord) {
    obj.y=yCoord;
}

Projectile.prototype.getHorizontalSpeedComponent = function(obj) {
    return obj.speed * Math.cos(obj.angle);
    
}

Projectile.prototype.getVerticalSpeedComponent = function(obj) {
    return obj.speed * Math.sin(obj.angle);
}

Projectile.prototype.getNextPosition = function(obj,timeStep) {
    obj.nextX = 0.5 * obj.acceleration*timeStep*timeStep  ;          //s=ut+1/2at^2;
    obj.nextY = 0.5 * obj.gravity * timeStep * timeStep  ;
    
    if ( timeStep < obj.stallingTime )
        obj.nextY*=-1;
    
    
}