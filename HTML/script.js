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

    // funtion which indicates with the point was selected by a tolrence t
    collision(x, y, tol = 5) {
        return (this.coordinates[0] < x + tol) && (this.coordinates[0] > x - tol) && (this.coordinates[1] < y + tol) && (this.coordinates[1] > y - tol);
    }
    
}

//function to code the point based on another point
function CodeCoordinate(x, y, xc, yc, tol) {
    /*
     * 0 -> above
     * 1 -> right
     * 2 -> under
     * 3 -> left
    */
    return [y > yc + tol, x > xc + tol, y < yc - tol, x < xc - tol];
}

class Line {

    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
        this.angular_coefficient = (this.point2[1] -  this.point1[1]) / (this.point2[0] - this.point1[0])
    }

    // method to check collision
    collision(x, y, tol = 5) {
        console.log("----------------------")
        console.log("mouse: " + x + ' - ' + y)
        console.log("Top Vertice: " + this.point2[0] + ' - ' + this.point2[1]);
        // checking points of the line (starting at the vertice)
        var x0 = this.point1[0];
        var y0 = this.point1[1];
        var i = 0;
        // get code of first and second point
        var code2 = CodeCoordinate(this.point2[0], this.point2[1], x, y, tol);
        var code1 = CodeCoordinate(this.point1[0], this.point1[1], x, y, tol);
        // while there is still bunding box left
        var code_result = (code1[0] & code2[0]) | (code1[1] & code2[1]) | (code1[2] & code2[2]) | (code1[3] & code2[3]) ;
        while (true) {
            // do the code for the point one
            code1 = CodeCoordinate(x0, y0, x, y, tol);
            console.log(i + ": ");
            console.log(code1);
            console.log(code2);
            console.log("x0y0: " + x0 + ' - ' + y0);

            // calculate code
            code_result = (code1[0] & code2[0]) | (code1[1] & code2[1]) | (code1[2] & code2[2]) | (code1[3] & code2[3]) ;

            // check if code result = 0
            if (code_result == true) {
                // return false
                return false;
            } else {
                // check code1[0] (or if it is above)
                if (code1[0]) {
                    // change x0 to the next border by calculating it using the angular coefficient of the line (using the formula x = y0 + DeltaY/Angular_Coefficient)
                    x0 += ( (y + tol) - y0)/this.angular_coefficient
                    // change y0 to the next boder (+ tol distance)
                    y0 = y + tol;
                } else if (code1[1]) {
                    // check code1[1] (or if it is at the right)
                    // change x0 to the next border by calculating it using the angular coefficient of the line (using the formula y = y0 + DeltaX*Angular_Coefficient)
                    y0 += ( (x + tol) - x0)*this.angular_coefficient
                    // change y0 to the next boder (+ tol distance)
                    x0 = x + tol;
                } else if (code1[2]) {
                    // check code1[2] (or if it is under)
                    // change x0 to the next border by calculating it using the angular coefficient of the line (using the formula y = y0 + DeltaX*Angular_Coefficient)
                    x0 += ( (y - tol) - y0)/this.angular_coefficient
                    // change y0 to the next boder (- tol distance)
                    y0 = y - tol;
                    
                } else if (code1[3]) {
                    // check code1[3] (or if it is at the left)
                    // change x0 to the next border by calculating it using the angular coefficient of the line (using the formula x = y0 + DeltaY/Angular_Coefficient)
                    y0 += ( (x - tol) - x0)*this.angular_coefficient
                    // change y0 to the next boder (- tol distance)
                    x0 = x - tol;
                    
                } else {
                    // return true
                    return true
                }
            }
            
        }
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
        this.coordinates = this.generateLine(coordinates);
    }

    // method to create a line based on the coordinates
    generateLine(coordinates) {
        // create a copy of the coordinates
        var copy = coordinates.slice()
        // new coordinates based on line
        var new_coordinates = [];
        // push to copy the first element (to complete the polygon)
        copy.push(copy[0]);
        
        // coordinate and next coordinate for each line (aka first and second point)
        var coordinate = 0;
        var next_coordinate = 0;
        // for each coordinate
        for (let index = 0; index < coordinates.length;) {
            coordinate = coordinates[index++];
            next_coordinate = copy[index];
            // create a Line
            line = new Line(coordinate, next_coordinate);
            // push it to the new coordinates
            new_coordinates.push(line);
        }
        // return the new coordinates
        return new_coordinates;
    }

    // method to render 
    render(pincel) {
        // for each line
        for (let index = 0; index < this.coordinates.length; index++) {
            const line = this.coordinates[index];
            line.render(pincel);
        }
    }
}

//get canvas and pincel
var canvas = document.getElementById('canvas');
var pincel = canvas.getContext('2d');

// variable representes current action to do on the canvas
/*
 * 0 - Point
 * 1 - Line
 * 2 - Circle
 * 3 - Polygon
 * 4 - Translate
 * 5 - Rotate
 * 6 - Scale
 * 7 - Select
 */
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
// selected object
var selected_object = null;

var mouse_x = 0;
var mouse_y = 0;

// function to be callend when the event of clicking the mouse is triggered
function onDown(event) {
    // get the relative position x and y of the mouse on the drawing canvas
    mouse_x = event.clientX - pincel.canvas.offsetLeft;
    mouse_y = event.clientY - pincel.canvas.offsetTop;
    // set mouse pressed to true
    mousePressed = true;
    // swittch between the action mode
    switch (buttonAction) {
        case 0:
            // if the mode selected is point (code: 0)
            
            // create a point object
            point = new Point( [mouse_x, mouse_y] );

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
                buffer.push([mouse_x, mouse_y]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();

                // create line object
                line = new Line( coordinates, [mouse_x, mouse_y] );

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
                buffer.push([mouse_x, mouse_y]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // else, then a starting point for the line was already calculated and stored, so get them on the buffer
                coordinates = buffer.pop();
                // calculate radius
                var radius = Math.sqrt( Math.pow(coordinates[0]- mouse_x, 2) + Math.pow(coordinates[1]- mouse_y, 2) );

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
                // start path
                pincel.beginPath();
                // add current coordinates to the buffer
                buffer.push([mouse_x, mouse_y]);
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
                if ( (Math.abs(buffer[0][0] - mouse_x) <= 4) && (Math.abs(buffer[0][1] - mouse_y) <= 4) ) {
                    // then create a line to the current coordinates calculated
                    pincel.lineTo(buffer[0][0], buffer[0][1]);
                    // stroke on the canvas
                    pincel.stroke();
                    // close path
                    pincel.closePath();

                    // create line object
                    polygon = new Polygon( buffer.slice() );

                    // add to objects
                    objects["Polygon"].push(polygon);

                    // clear buffer
                    buffer = [];
                
                    // for last, set drawing mode to false again
                    drawing_mode = false;

                } else {
                    // then create a line to the current coordinates calculated
                    pincel.lineTo(mouse_x, mouse_y);
                    // push mouse_x and mouse_y to buffer
                    buffer.push([mouse_x, mouse_y]);
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
            buffer.push([mouse_x, mouse_y]);
            // increase mode
            rotation_mode++;

        case 7:
            // set selected object to null
            selected_object = null;
            // for each object
            // for each point
            for (let index = 0; index < objects["Point"].length; index++) {
                const object = objects["Point"][index];
                if (object.collision(mouse_x, mouse_y)) {
                    // set selected object to object
                    selected_object = object;
                    break;
                }
                
            }
            // for each line
            for (let index = 0; index < objects["Line"].length; index++) {
                const object = objects["Line"][index];
                if (object.collision(mouse_x, mouse_y)) {
                    // set selected object to object
                    selected_object = object;
                    break;
                }
                
            }
            // clear and render again
            pincel.clearRect(0, 0, canvas.width, canvas.height);
            renderObjects();

    }
}

function onMove(event) {
    // check if the mouse is pressed
    if (mousePressed) {
        // check action
        switch(buttonAction) {
            // if the action is translate
            case 4: 
                var x = event.clientX - pincel.canvas.offsetLeft - mouse_x;
                var y = event.clientY - pincel.canvas.offsetTop - mouse_y;
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
                mouse_x = event.clientX - pincel.canvas.offsetLeft;
                mouse_y = event.clientY - pincel.canvas.offsetTop;
                break;
            case 5:
                // check if the mode ir rotationate
                if (rotation_mode == 2) {
                    // get second and first coordinates
                    first = buffer[0];
                    second = buffer.pop();
                    // get current coordinate
                    mouse_x = event.clientX - pincel.canvas.offsetLeft;
                    mouse_y = event.clientY - pincel.canvas.offsetTop;
                    pincel.save();

                    var backCanvas = document.createElement('canvas');
                    backCanvas.width = canvas.width;
                    backCanvas.height  = canvas.height;
                    var backCanvasCtx = backCanvas.getContext('2d');
                    backCanvasCtx.drawImage(canvas, 0, 0);

                    //calcualte agnle
                    var angle = getAngleOf3Points(first[0], first[1], second[0], second[1], mouse_x, mouse_y);

                    pincel.transform(
                        Math.cos(angle), -Math.sin(angle),
                        Math.sin(angle),  Math.cos(angle),
                                0      ,         0       );
                    pincel.clearRect(0, 0, canvas.width, canvas.height);

                    pincel.drawImage(backCanvas, 0, 0);
                    pincel.restore();

                    // add the new point to the buffer
                    buffer.push([mouse_x, mouse_y]);
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
    buttonAction = newaction;
    drawing_mode = false;
    rotation_mode = 0;
    mousePressed = false;
    selected_object = null;
    // clear buffer
    buffer = [];

}

// function to clear canvas
function clearCanvas() {
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    resetAction();
}

function renderObjects() {
    // get types of objects
    const keys = Object.keys(objects);
    console.log(selected_object)

    // for each type
    for (const key of keys) {
        // for each object of that type
        for (let index = 0; index < objects[key].length; index++) {
            const element = objects[key][index];
            // check if the object is selected
            if (element == selected_object) {
                pincel.strokeStyle = "#0000FF";
                pincel.fillStyle = "#0000FF";
                // render element
                element.render(pincel);
                pincel.strokeStyle = "#000000";
                pincel.fillStyle = "#000000";
             
            } else {
                // render element
                element.render(pincel);
            }
        }
    }
    
}

// for each button element, add a event listener for the click, which will execute the function to change the button to its corresponding code
document.getElementById('button_point').addEventListener("click", function() {resetAction(0); } );

document.getElementById('button_line').addEventListener("click", function() {resetAction(1); } );

document.getElementById('button_circle').addEventListener("click", function() {resetAction(2); } );

document.getElementById('button_polygon').addEventListener("click", function() {resetAction(3); } );

document.getElementById('button_translate').addEventListener("click", function() {resetAction(4); } );

document.getElementById('button_rotate').addEventListener("click", function() {resetAction(5); } );

document.getElementById('button_scale').addEventListener("click", function() {resetAction(6); } );

document.getElementById('button_select').addEventListener("click", function() {resetAction(7); } );

document.getElementById('button_clear').addEventListener("click", function() {clearCanvas();} );

document.getElementById('button_restore').addEventListener("click", function() {renderObjects(); } );


// add a event listener to the canvas to click event to call the onDown function
canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);
