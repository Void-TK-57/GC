//get canvas and pincel
var canvas = document.getElementById('canvas');
var pincel = canvas.getContext('2d');

// variable representes current action to do on the canvas
var buttonAction = -1;

// variable which indicates if a drawing was alread started
var drawing_mode = false;

var mousePressed = false;

// buffer for the coordinates of the drawing
var buffer = [];

var cx = 0;
var cy = 0;

// function to be callend when the event of clicking the mouse is triggered
function onDown(event) {
    // get the relative position x and y of the mouse on the drawing canvas
    cx = event.clientX - pincel.canvas.offsetLeft;
    cy = event.clientY - pincel.canvas.offsetTop;
    // set mouse pressed to true
    mousePressed = true;
    // swittch between the action mode
    switch (buttonAction) {
        case 0:
            // if the mode selected is point (code: 0)
            // start path
            pincel.beginPath();
            // create a small circle at the pouse coordenates (full arc with radius 1)
            pincel.arc(cx, cy, 1, 0, Math.PI*2 );
            // fill on the canvas
            pincel.fill();
            //close path
            pincel.closePath();
            break;
        case 1:
            // check if a drawing was already started
            if (!drawing_mode) {
                // creeate 
                // start path
                pincel.beginPath();
                // add current coordinates to the buffer
                buffer.push([cx, cy]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();
                // move pincel to that coordinates
                pincel.moveTo(coordinates[0], coordinates[1]);
                // then create a line to the current coordinates calculated
                pincel.lineTo(cx, cy);
                // stroke on the canvas
                pincel.stroke();
                // close path
                pincel.closePath();
                // for last, set drawing mode to false again
                drawing_mode = false;
            }
            break;
        case 2:
            if (!drawing_mode) {
                // creeate 
                // start path
                pincel.beginPath();
                // add current coordinates to the buffer
                buffer.push([cx, cy]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();
                // calculate radius
                var radius = Math.sqrt( Math.pow(coordinates[0]- cx, 2) + Math.pow(coordinates[1]- cy, 2) );
                // create a arc with the coordinate on the buffer as the center
                pincel.arc(coordinates[0], coordinates[1], radius, 0, Math.PI*2 );
                // stroke on the canvas
                pincel.stroke();
                // close path
                pincel.closePath();
                // for last, set drawing mode to false again
                drawing_mode = false;
            }
            break;
        case 3:
            // check if a drawing was already started
            if (!drawing_mode) {
                // start path
                pincel.beginPath();
                // add current coordinates to the buffer
                buffer.push([cx, cy]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();
                // add it again to the buffer
                buffer.push(coordinates);
                // move pincel to that coordinates
                pincel.moveTo(coordinates[0], coordinates[1]);
                // check if the coordinates is close to the first coordinates
                if ( (Math.abs(buffer[0][0] - cx) <= 4) && (Math.abs(buffer[0][1] - cy) <= 4) ) {
                    // then create a line to the current coordinates calculated
                    pincel.lineTo(buffer[0][0], buffer[0][1]);
                    // stroke on the canvas
                    pincel.stroke();
                    // close path
                    pincel.closePath();
                    // for last, set drawing mode to false again
                    drawing_mode = false;
                    // empty buffer
                    buffer = [];
                } else {
                    // then create a line to the current coordinates calculated
                    pincel.lineTo(cx, cy);
                    // push cx and cy to buffer
                    buffer.push([cx, cy]);
                    // stroke on the canvas
                    pincel.stroke();
                    // close path
                    pincel.closePath();
                    // begin new path
                    pincel.beginPath();
                }
            }
            break;
        case 4:
            mousePressed = true;
    }
}

function onMove(event) {
    // check if the mouse is pressed
    if (mousePressed) {
        // check action
        switch(buttonAction) {
            // if the action is translate
            case 4: 
            {
                x = (event.clientX - pincel.canvas.offsetLeft) - cx;
                y = (event.clientY - pincel.canvs.offsetTop) - cy;
                pincel.save();

                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height  = canvas.height;
                var backCanvasCtx = backCanvas.getContext('2d');
                backCanvas.drawImage(canvas, 0, 0);

                pincel.transform(1, 0, 0, 1, x, y);
                pincel.clearRect(0, 0, canvas.width, canvas.height);

                pincel.drawImage(backCanvas, 0, 0);
                pincel.restore();
                cx = event.clientX - pincel.canvas.offsetLeft;
                cy = event.clientY - pincel.canvs.offsetTop;
                break;
            }
            
        }
    }
}

function onUp(event) {
    mousePressed = false;
}

// for each button element, add a event listener for the click, which will execute the function to change the button to its corresponding code
document.getElementById('button_point').addEventListener("click", function() { buttonAction = 0});

document.getElementById('button_line').addEventListener("click", function() { buttonAction = 1});

document.getElementById('button_circle').addEventListener("click", function() { buttonAction = 2});

document.getElementById('button_polygon').addEventListener("click", function() { buttonAction = 3});

document.getElementById('button_translate').addEventListener("click", function() { buttonAction = 4});

document.getElementById('button_rotate').addEventListener("click", function() { buttonAction = 5});

document.getElementById('button_scale').addEventListener("click", function() { buttonAction = 6});

document.getElementById('button_clear').addEventListener("click", function() { 
    buttonAction = -1;
    pincel.clearRect(0, 0, canvas.width, canvas.height);
});


// add a event listener to the canvas to click event to call the onDown function
canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);
