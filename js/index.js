/* default dom id (particles-js) */
//particlesJS();

/* config dom id */
//particlesJS('dom-id');

/* config dom id (optional) + config particles params */
particlesJS('particles-js', {
  particles: {
    color: '#33CCFF',
    shape: 'circle', // "circle", "edge" or "triangle"
    opacity: 1,
    size: 3,
    size_random: true,
    nb: 70,
    line_linked: {
      enable_auto: true,
      distance: 100,
      color: '#33CCFF',
      opacity: 1,
      width: 1,
      condensed_mode: {
        enable: true,
        rotateX: 400,
        rotateY: 400
      }
    },
    anim: {
      enable: true,
      speed: 1
    }
  },
  interactivity: {
    enable: false,
    mouse: {
      distance: 300
    },
    detect_on: 'canvas', // "canvas" or "window"
    mode: 'grab',
    line_linked: {
      opacity: .5
    },
    events: {
      onclick: {
        enable: false,
        mode: 'push', // "push" or "remove"
        nb: 4
      }
    }
  },
  /* Retina Display Support */
  retina_detect: true
});




/* Wave */


var canvas    = document.getElementById('canvas'),
    ctx       = canvas.getContext('2d'),
	  perlin    = new ClassicalNoise(),
    variation = .003,
    amp       = 200,
    variators = [],
    max_lines = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 30,
    canvasWidth,
    canvasHeight,
    start_y;

for (var i = 0, u = 0; i < max_lines; i++, u+=.02) {
  variators[i] = u;
}

function draw(){
  ctx.shadowColor = "rgba(43, 205, 255, 1)";
  ctx.shadowBlur = 0;
  
  for (var i = 0; i <= max_lines; i++){
    ctx.beginPath();
    ctx.moveTo(0, start_y);
    for (var x = 0; x <= canvasWidth; x++) {
      var y = perlin.noise(x*variation+variators[i], x*variation, 0);
      ctx.lineTo(x, start_y + amp*y);
    }
    var color = Math.floor(150*Math.abs(y));
    var alpha = Math.min(Math.abs(y), .8)+.1;
    ctx.strokeStyle = "rgba(80,210,240,"+alpha+")";
    ctx.stroke();
    ctx.closePath();

    variators[i] += .005;
  }
}

(function init() {
	resizeCanvas();
	animate();
	window.addEventListener('resize', resizeCanvas);
})();

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw();
  requestAnimationFrame(animate);
}

function resizeCanvas(){
	canvasWidth = document.documentElement.clientWidth,
	canvasHeight = document.documentElement.clientHeight; 

	canvas.setAttribute("width", canvasWidth);
	canvas.setAttribute("height", canvasHeight);

	start_y = canvasHeight/2;
}


