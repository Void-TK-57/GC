//main object classes
class Point {

    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    // method to render the point
    render(pincel) {
        // start path
        pincel.beginPath();
        // create a small circle at the pouse coordenates (full arc with radius 1)
        pincel.arc(this.coordinates[0], this.coordinates[1], 1, 0, Math.PI*2 );
        // fill on the canvas
        pincel.fill();
        //close path
        pincel.closePath();
    }
    
}

class Line {

    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }

    // method to render 
    render(pincel) {
        // begin path
        pincel.beginPath();
        // move pincel to that coordinates
        pincel.moveTo(this.point1[0], this.point1[1]);
        // then create a line to the current coordinates calculated
        pincel.lineTo(this.point2[0], this.point2[1]);
        // stroke on the canvas
        pincel.stroke();
        // close path
        pincel.closePath();
    }
}

class Circle {

    constructor(coordinates, radius) {
        this.coordinates = coordinates;
        this.radius = radius;
    }

    render(pincel) {
        //  begin path
        pincel.beginPath();
        // create a arc with the coordinate on the buffer as the center
        pincel.arc(this.coordinates[0], this.coordinates[1], this.radius, 0, Math.PI*2 );
        // stroke on the canvas
        pincel.stroke();
        // close path
        pincel.closePath();
    }

}

class Polygon {

    constructor(coordinates) {
        this.coordinates = coordinates;
    }

    // method to render 
    render(pincel) {
        // begin path
        pincel.beginPath();
        // move pincel to that coordinates
        pincel.moveTo(this.point1[0], this.point1[1]);
        // then create a line to the current coordinates calculated
        pincel.lineTo(this.point2[0], this.point2[1]);
        // stroke on the canvas
        pincel.stroke();
        // close path
        pincel.closePath();
    }
}

//get canvas and pincel
var canvas = document.getElementById('canvas');
var pincel = canvas.getContext('2d');

// variable representes current action to do on the canvas
var buttonAction = -1;

// variable which indicates if a drawing was alread started
var drawing_mode = false;

// rotation mode ( 0 = select origin point, 1 = select vector point, 2 = rotationate the vector formed by the 2 points selected)
var rotation_mode = 0;

var mousePressed = false;

// buffer for the coordinates of the drawing
var buffer = [];

// objects of the canvas
var objects = {"Line" : [], "Point" : [], "Circle" : [], "Polygon" : []};

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
            
            // create a point object
            point = new Point( [cx, cy] );

            // add to objects
            objects["Point"].push(point);

            // clear buffer
            buffer = [];

            // render point
            point.render(pincel);

            break;

        case 1:
            // check if a drawing was already started
            if (!drawing_mode) {
                // add current coordinates to the buffer
                buffer.push([cx, cy]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();

                // create line object
                line = new Line( coordinates, [cx, cy] );

                // add to objects
                objects["Line"].push(line);

                // clear buffer
                buffer = [];

                // render point
                line.render(pincel);
                
                // for last, set drawing mode to false again
                drawing_mode = false;
            }
            break;
        case 2:
            if (!drawing_mode) {
                // add current coordinates to the buffer
                buffer.push([cx, cy]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();
                // calculate radius
                var radius = Math.sqrt( Math.pow(coordinates[0]- cx, 2) + Math.pow(coordinates[1]- cy, 2) );

                // create cicle object
                circle = new Circle( coordinates , radius);
                
                // add to objects
                objects["Circle"].push(circle);

                // clear buffer
                buffer = [];

                // render circle
                circle.render(pincel);
                
                // for last, set drawing mode to false again
                drawing_mode = false;
            }
            break;
        case 3:
            // check if a drawing was already started
            if (!drawing_mode) {
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
                    
                    // create cicle object
                    polygon = new Polygon( buffer );
                
                    // add to objects
                    objects["Polygon"].push(polygon);

                    // clear buffer
                    buffer = [];
                
                    // for last, set drawing mode to false again
                    drawing_mode = false;

                } else {
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
        case 5:
            // add coordinates to buffer
            buffer.push([cx, cy]);
            // increase mode
            rotation_mode++;
    }
}

function onMove(event) {
    // check if the mouse is pressed
    if (mousePressed) {
        // check action
        switch(buttonAction) {
            // if the action is translate
            case 4: 
                var x = event.clientX - pincel.canvas.offsetLeft - cx;
                var y = event.clientY - pincel.canvas.offsetTop - cy;
                pincel.save();

                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height  = canvas.height;
                var backCanvasCtx = backCanvas.getContext('2d');
                backCanvasCtx.drawImage(canvas, 0, 0);

                pincel.transform(1, 0, 0, 1, x, y);
                pincel.clearRect(0, 0, canvas.width, canvas.height);

                pincel.drawImage(backCanvas, 0, 0);
                pincel.restore();
                cx = event.clientX - pincel.canvas.offsetLeft;
                cy = event.clientY - pincel.canvas.offsetTop;
                break;
            case 5:
                // check if the mode ir rotationate
                if (rotation_mode == 2) {
                    // get second and first coordinates
                    first = buffer[0];
                    second = buffer.pop();
                    // get current coordinate
                    cx = event.clientX - pincel.canvas.offsetLeft;
                    cy = event.clientY - pincel.canvas.offsetTop;
                    pincel.save();

                    var backCanvas = document.createElement('canvas');
                    backCanvas.width = canvas.width;
                    backCanvas.height  = canvas.height;
                    var backCanvasCtx = backCanvas.getContext('2d');
                    backCanvasCtx.drawImage(canvas, 0, 0);

                    //calcualte agnle
                    var angle = getAngleOf3Points(first[0], first[1], second[0], second[1], cx, cy);

                    pincel.transform(
                        Math.cos(angle), -Math.sin(angle),
                        Math.sin(angle),  Math.cos(angle),
                                0      ,         0       );
                    pincel.clearRect(0, 0, canvas.width, canvas.height);

                    pincel.drawImage(backCanvas, 0, 0);
                    pincel.restore();

                    // add the new point to the buffer
                    buffer.push([cx, cy]);
                }

        }
    }
}

function onUp(event) {
    mousePressed = false;
    // check action
    switch(buttonAction) {

        case 5:
            //check if the mode is to ratationate
            if (rotation_mode == 2) {
                // then set the mode to select the orgigin points again
                rotation_mode = 0;
            }
    }
}

// function to get the distance between 2 points
function getDistance(x1, x2, y1, y2) {
    return Math.sqrt( Math.pow( x1-x2, 2) + Math.pow( y1-y2, 2) );
}

// function to get the angle formed by 3 points (as 2 latter points connect to the first point)
function getAngleOf3Points(x1, y1, x2, y2, x3, y3) {
    // get the distance of the line
    var d12 = getDistance(x1, y1, x2, y2);
    var d13 = getDistance(x1, y1, x3, y3);
    var d23 = getDistance(x2, y2, x3, y3);
    // apply cossine law and return the result
    return Math.acos( ( d12*d12 + d23*d23 - d23*d23) / (2*d12*d13) );
}

// function to reset action
function resetAction(newaction = -1) {
    if (newaction == -1) {
        // the also reset canvas
        pincel.clearRect(0, 0, canvas.width, canvas.height);
    }
    buttonAction = newaction;
    drawing_mode = false;
    rotation_mode = 0;
    mousePressed = false;
    // clear buffer
    buffer = [];

}

// for each button element, add a event listener for the click, which will execute the function to change the button to its corresponding code
document.getElementById('button_point').addEventListener("click", function() {resetAction(0); } );

document.getElementById('button_line').addEventListener("click", function() {resetAction(1); } );

document.getElementById('button_circle').addEventListener("click", function() {resetAction(2); } );

document.getElementById('button_polygon').addEventListener("click", function() {resetAction(3); } );

document.getElementById('button_translate').addEventListener("click", function() {resetAction(4); } );

document.getElementById('button_rotate').addEventListener("click", function() {resetAction(5); } );

document.getElementById('button_scale').addEventListener("click", function() {resetAction(6); } );

document.getElementById('button_clear').addEventListener("click", function() {resetAction(-1); } );


// add a event listener to the canvas to click event to call the onDown function
canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);
