// namespace our game
// http://paulirish.com/2011/requestanimationframe-for-smart-animating
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var POP = {

    // set up some initial values
    WIDTH: 320, 
    HEIGHT:  480, 
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    cardval: 1,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    scale: 1,
    offsetTop: 0, 
    offsetLeft: 0,
    entities: [],

    init: function() {

        // the proportion of width to height
        POP.RATIO = POP.WIDTH / POP.HEIGHT;
        // these will change when the screen is resized
        POP.currentWidth = POP.WIDTH;
        POP.currentHeight = POP.HEIGHT;
        // this is our canvas element
        POP.canvas = document.getElementsByTagName('canvas')[0];
        // setting this is important
        // otherwise the browser will
        // default to 320 x 200
        POP.canvas.width = POP.WIDTH;
        POP.canvas.height = POP.HEIGHT;
        // the canvas context enables us to 
        // interact with the canvas api
        POP.ctx = POP.canvas.getContext('2d');
        // we need to sniff out Android and iOS
        // so that we can hide the address bar in
        // our resize function
        POP.ua = navigator.userAgent.toLowerCase();
        POP.android = POP.ua.indexOf('android') > -1 ? true : false;
        POP.ios = ( POP.ua.indexOf('iphone') > -1 || POP.ua.indexOf('ipad') > -1  ) ? 
            true : false;

        // we're ready to resize
        POP.resize();
        // resize the width in proportion

        // listen for clicks
        window.addEventListener('click', function(e) {
            e.preventDefault();
            POP.Input.set(e);
        }, false);

        // listen for touches
        window.addEventListener('touchstart', function(e) {
            e.preventDefault();
            // the event object has an array
            // named touches; we just want
            // the first touch
            POP.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function(e) {
            // we're not interested in this,
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function(e) {
            // as above
            e.preventDefault();
        }, false);
        // Add this at the end of POP.init;
        // it will then repeat continuously
      




        POP.Draw.clear();
        //POP.Draw.text('Hello World', 100, 100, 10, '#000');
                // Add this at the end of POP.init;
        // it will then repeat continuously
        POP.loop();
    },

    // Add the following functions after POP.init:

// this is where all entities will be moved
// and checked for collisions, etc.
update: function() {

// at the start of POP.update, we set a flag for checking collisions
    var i,
        checkCollision = false; // we only need to check for a collision
                                // if the user tapped on this game tick

// and then incorporate into the main logic








    // spawn a new instance of Touch
    // if the user has tapped the screen
    if (POP.Input.tapped) {

        if (POP.Input.x > 10 && POP.Input.x <20){
            if (POP.Input.y > 5 && POP.Input.y <25){
                // create a function to get pos which returns array of x, y and gives it a direction and speed
            
                POP.entities.push(new POP.Bubble(200, 120, 'yellow', 11));
            }
            

            if (POP.Input.y > 90 && POP.Input.y <110){

                POP.entities.push(new POP.Bubble(70, 190, 'blue', 5));
        
            }

            if (POP.Input.y > 130 && POP.Input.y <150){
                POP.entities.push(new POP.Bubble(220, 250, 'green', 3));
        
            }

            if (POP.Input.y > 160 && POP.Input.y <180){

                POP.entities.push(new POP.Bubble(60, 120, 'red', 2));

        
            }



        } 
            if (POP.Input.y < 50 && POP.Input.x >20){

                POP.entities.push(new POP.Numdisplay(cardval));
        
            }

        else {
            POP.entities.push(new POP.Touch(POP.Input.x, POP.Input.y));
        }

        // set tapped back to false
        // to avoid spawning a new touch
        // in the next cycle
        POP.Input.tapped = false;
        checkCollision = true;
        }
 // cycle through all entities and update as necessary
    for (i = 0; i < POP.entities.length; i += 1) {
        POP.entities[i].update();

        if (POP.entities[i].type === 'bubble' && checkCollision) {
            hit = POP.collides(POP.entities[i], 
                                {x: POP.Input.x, y: POP.Input.y, r: 7});
            POP.entities[i].remove = hit;
        }

        // delete from array if remove property
        // is set to true
        if (POP.entities[i].remove) {
            POP.entities.splice(i, 1);
        }
    }
},





// this is where we draw all the entities
render: function() {

   POP.Draw.clear(); 
        POP.Draw.roundedRect(10,10,300,460,20,'rgb(20,20,20)');
        POP.Draw.roundedRect(20,20,280,440,17,'white');
        //POP.Draw.rect(120,120,150,150, 'green');
        POP.Draw.circle(10, 240, 10, 'black')
        POP.Draw.circle(10, 210, 7, 'white'); 
        POP.Draw.circle(10, 170, 7, 'red'); 
        POP.Draw.circle(10, 140, 7, 'green'); 
        POP.Draw.circle(10, 100, 7, 'blue'); 
        POP.Draw.circle(15, 15, 7, 'yellow'); 
// cycle through all entities and render to canvas
    for (i = 0; i < POP.entities.length; i += 1) {
        POP.entities[i].render();
    }



},

// the actual loop
// requests animation frame,
// then proceeds to update
// and render
loop: function() {

    requestAnimFrame( POP.loop );

    POP.update();
    POP.render();
},


    resize: function() {

        POP.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        POP.currentWidth = POP.currentHeight * POP.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll past
        // the address bar, thus hiding it.
        if (POP.android || POP.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width and height
        // note: our canvas is still 320 x 480, but
        // we're essentially scaling it with CSS
        POP.canvas.style.width = POP.currentWidth + 'px';
        POP.canvas.style.height = POP.currentHeight + 'px';
        POP.scale = POP.currentWidth/POP.WIDTH;
        POP.offsetLeft = POP.canvas.offsetLeft;
        POP.offsetTop = POP.canvas.offsetTop;

        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }

/*   */

};





// + add this at the bottom of your code,
// before the window.addEventListeners
POP.Input = {
    
    x: 0,
    y: 0,
    tapped :false,
    str : "",
    

    set: function(data) {
        this.x = (data.pageX - POP.offsetLeft) / POP.scale;
        this.y = (data.pageY - POP.offsetTop) / POP.scale;
        this.tapped = true; 


/*        if (this.x > 10 && this.x <20){
        POP.Draw.circle(this.x, this.y, 10, 'red');
        str = this.x + ", " + this.y;
        POP.Draw.text(str, this.x, this.y, 10, 'black')

            if (this.y > 5 && this.y <25){
                // create a function to get pos which returns array of x, y and gives it a direction and speed

                  POP.Draw.circle(200, 120, 40, 'yellow');
        
            }

            if (this.y > 90 && this.y <110){

                  POP.Draw.circle(90, 320, 40, 'blue');
        
            }

            if (this.y > 130 && this.y <150){

                  POP.Draw.circle(70, 70, 40, 'green');
        
            }

            if (this.y > 160 && this.y <180){

                  POP.Bubble.render(240, 320, 'rgba(255,0,0,1)');
        
            }

        }*/
    }

};

POP.Touch = function(x, y) {

    this.type = 'touch';    // we'll need this later
    this.x = x;             // the x coordinate
    this.y = y;             // the y coordinate
    this.r = 5;             // the radius
    this.opacity = 1;       // initial opacity; the dot will fade out
    this.fade = 0.05;       // amount by which to fade on each game tick
    this.remove = false;    // flag for removing this entity. POP.update
                            // will take care of this

    this.update = function() {
        // reduce the opacity accordingly
        this.opacity -= this.fade; 
        // if opacity if 0 or less, flag for removal
        this.remove = (this.opacity < 0) ? true : false;
    };

    this.render = function() {
        POP.Draw.circle(this.x, this.y, this.r, 'rgba(255,255,255,'+this.opacity+')');
    };

};

POP.Numdisplay = function(value) {

    this.value = value;
    this.opcity = 1;
    this.remove = false;

    this.update = function(){
        this.opcity -= 0.02;
        if (this.opcity < 0){
            this.remove = true;
        }
    }

    this.render = function() {
        POP.Draw.roundedRect(50,100,140,80,30,'gray');
        POP.Draw.text(this.value, 80, 120, 30, 'black');

    }
}


POP.Bubble = function(x,y,col, value) {

    this.type = 'bubble';
    this.x = x;
    this.r = 40;                // the radius of the bubble
    this.y = y; // make sure it starts off screen
    this.col = col;
    this.value = value
    this.remove = false;
    this.directionx = value;
    this.directiony = -1;

    this.update = function() {

        // move up the screen by 1 pixel
        this.y += this.directiony;
        this.x += this.directionx;

        // if near border, change direction
        if (this.y < 55) {
            this.directiony = -this.directiony;
        }

        if (this.y > 415) {
            this.directiony = -this.directiony;
        }

        if (this.x < 55) {
            this.directionx = -this.directionx;
        }

        if (this.x > 255) {
            this.directionx = -this.directionx;
        }

    };

    this.render = function() {

        POP.Draw.circle(this.x, this.y, this.r, this.col);
    };

};

// this function checks if two circles overlap
POP.collides = function(a, b) {

        var distance_squared = ( ((a.x - b.x) * (a.x - b.x)) + 
                                ((a.y - b.y) * (a.y - b.y)));

        var radii_squared = (a.r + b.r) * (a.r + b.r);

        if (distance_squared < radii_squared) {
            return true;
        } else {
            return false;
        }
};


window.addEventListener('load', POP.init, false);
window.addEventListener('resize', POP.resize, false);

    // abstracts various canvas operations into
// standalone functions
POP.Draw = {

    clear: function() {
        POP.ctx.clearRect(0, 0, POP.WIDTH, POP.HEIGHT);
    },

    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col;
        POP.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        POP.ctx.strokeStyle='grey';
        POP.ctx.lineWidth=1;
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
        POP.ctx.closePath();
        POP.ctx.fill();
        POP.ctx.stroke();
    },

    text: function(string, x, y, size, col) {
        POP.ctx.font = 'bold '+size+'px Monospace';
        POP.ctx.fillStyle = col;
        POP.ctx.fillText(string, x, y);
    },

    roundedRect: function(x,y,width,height,radius,col){
        POP.ctx.strokeStyle='rgb(50,50,50)';
        POP.ctx.fillStyle=col;
        POP.ctx.lineWidth=1;
        POP.ctx.beginPath();
        // draw top and top right corner
        POP.ctx.moveTo(x+radius,y);
        POP.ctx.arcTo(x+width,y,x+width,y+radius,radius);
        // draw right side and bottom right corner
        POP.ctx.arcTo(x+width,y+height,x+width-radius,y+height,radius); 

        // draw bottom and bottom left corner
        POP.ctx.arcTo(x,y+height,x,y+height-radius,radius);

        // draw left and top left corner
        POP.ctx.arcTo(x,y,x+radius,y,radius);

        // if(fill){
        POP.ctx.fill();
        // }
        // if(stroke){
        POP.ctx.stroke();
        // }
    }

/*     
      Pop.ctx.save(); // save the context so we don't mess up others  
     

      
    //Pop.ctx.restore();  // restore context to what it was on entry
  */

    /* roundedRect(ctx,x,y,width,height,radius,fill,stroke)
   Arguments:  ctx - the context to be used to draw with.
         x,y - the top left corner
         width - how wide the rectangle
         height - how high the rectangle
         radius - the radius of the corner
         fill   - true if the rectangle should be filled
         stroke - true if the rectangle should be stroked */



/*var c4=document.getElementById("c4");
var ctx4=c4.getContext('2d');


roundedRect(ctx4,15,15,160,120,20,true,true);

ctx4.strokeStyle='rgb(150,0,150)';
ctx4.fillStyle='rgba(0,0,150,0.6)';
ctx4.lineWidth=7;
roundedRect(ctx4,95,95,160,150,40,true,false);*/

};