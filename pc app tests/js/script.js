// namespace our game
var POP = {

    // set up some initial values
    WIDTH: 320, 
    HEIGHT:  480, 
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
    scale: 1,
    offsetTop: 0, 
    offsetLeft: 0,

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
        POP.Draw.clear();
        POP.Draw.roundedRect(10,10,300,460,20,'rgb(0,0,0,0.5)');
        POP.Draw.roundedRect(20,20,280,440,17,'white');
        //POP.Draw.rect(120,120,150,150, 'green');
        POP.Draw.circle(10, 240, 10, 'black')
        POP.Draw.circle(10, 210, 7, 'white'); 
        POP.Draw.circle(10, 170, 7, 'red'); 
        POP.Draw.circle(10, 140, 7, 'green'); 
        POP.Draw.circle(10, 100, 7, 'blue'); 
        POP.Draw.circle(15, 15, 7, 'yellow'); 
        //POP.Draw.text('Hello World', 100, 100, 10, '#000');
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


        if (this.x > 10 && this.x <20){
/*        POP.Draw.circle(this.x, this.y, 10, 'red');
        str = this.x + ", " + this.y;
        POP.Draw.text(str, this.x, this.y, 10, 'black')
*/
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

                  POP.Draw.circle(240, 320, 40, 'red');
        
            }

        }
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