// function to calculate a determinant of a 2x2
function det2(a, b, c, d) {
    return(a*d - b*c);
}

// generate 2d list with default value
function create_matrix(y, x, value = 0) {
    var matrix = [];
    var row = [];
    for (let y_index = 0; y_index < y; y_index++) {
        row = [];
        for (let x_index = 0; x_index < x; x_index++) {
            row.push(value);
        }
        // push to the matrix
        matrix.push(row);
    }
    // return matrix
    return matrix;
}

// vector class
class Vector {
    constructor(data = null, length = 0) {
        if (data == null) {
            data = [];
            for (let index = 0; index < length; index++) {
                data.push(0);
            }
        }
        this.data = data;
    }

    cross(other) {
        if (other instanceof Vector) {
            // create matrix
            var matrix = new Matrix(3, 3, [[new Vector([1, 0, 0]), new Vector([0, 1, 0]), new Vector([0, 0, 1])], this.data.slice(), other.data.slice()], "V");
            // return the determinant
            return matrix.det();
        } else {
            throw "Not a Vector";
        }
    }


    mul(other) {
        if (other instanceof Vector) {
            if (other.data.length == this.data.length) {
                var sum = 0;
                for (let index = 0; index < this.data.length; index++) {
                    sum += this.data[index]*other.data[index];
                }
            }
            return sum;
        } else {
            for (let index = 0; index < this.data.length; index++) {
                this.data[index] *= other;
            }
        } 
        return this;
    }

    add(other) {
        if (other instanceof Vector) {
            for (let index = 0; index < Math.min(other.data.length, this.data.length); index++) {
                this.data[index] += other.data[index];  
            }
        } else {
            for (let index = 0; index < this.data.length; index++) {
                this.data[index] += other;
            }
        }
        return this;
    }

    sub(other) {
        if (other instanceof Vector) {
            for (let index = 0; index < Math.min(other.data.length, this.data.length); index++) {
                this.data[index] -= other.data[index];  
            }
        } else {
            for (let index = 0; index < this.data.length; index++) {
                this.data[index] -= other;
            }
        }
        return this;
    }

    div(scalar) {
        for (let index = 0; index < this.data.length; index++) {
            this.data[index] /= scalar;
        }
        return this;
    }

}

// matrix class
class Matrix {
    constructor(rows, cols, data = null, dtype = "N") {
        this.nrows = rows;
        this.ncols = cols;
        // if data is null, generate from cols && rows
        if (data == null) {
            data = [];
            for (let row = 0; row < rows; row++) {
                var data_row = [];
                for (let col = 0; col < cols; col++) {
                    // add 0 or 1 to make a Indentity matrix
                    if (col == row) {
                        data_row.push(1);
                    } else {
                        data_row.push(0);
                    }
                }
                // add data row to data itthis
                data.push(data_row);
            }
        }
        // set data
        this.data = data;
        this.dtype = dtype;
    }

    // method to calculate the determinant
    det() {
        // check if is a square matrix
        if (this.nrows != this.ncols) {
            throw "Not a Square matrix";
        } else {
            // check type
            if (this.nrows == 2) {
                return det2(this.data[0][0], this.data[0][1], this.data[1][0], this.data[1][1]);
            } else if (this.nrows == 3) {
                var det_0 = det2(this.data[1][1], this.data[1][2], this.data[2][1], this.data[2][2]);
                var det_1 = det2(this.data[1][0], this.data[1][2], this.data[2][0], this.data[2][2]);
                var det_2 = det2(this.data[1][0], this.data[1][1], this.data[2][0], this.data[2][1]);
                // check type
                if (this.dtype == "N") {
                    return this.data[0][0]*det_0 - this.data[0][1]*det_1 + this.data[0][2]*det_2
                } else {
                    // copy
                    var i_vector = new Vector(this.data[0][0].data.slice());
                    var j_vector = new Vector(this.data[0][1].data.slice());
                    var k_vector = new Vector(this.data[0][2].data.slice());
                    return i_vector.mul(det_0).sub(  j_vector.mul(det_1) ).add(  k_vector.mul(det_2) );
                }
                
            } else {
                throw "Cant Calculate Inverse for that many dimensions";
            }
        }
    }

    // function to calculate the inveser o a 2x2 matrix
    inv() {
        if ( (this.nrows != this.ncols) || (this.dtype != "N") ) {
            throw "Not a Valid Matrix";
        } else {
            // get determinant
            var det = this.det();
            // check det
            if (det == 0) {
                throw "Not Inversible";
            } 
            // check dimensions
            if (this.nrows == 2 ) {
                 // return matrix
                return new Matrix(2, 2, [[ this.data[1][1]/det, -this.data[0][1]/det], [ -this.data[1][0]/det, this.data[0][0]/det ]]);
            } else if (this.nrows == 3 ) {
                // get cofactors
                var A = det2(this.data[1][1], this.data[1][2], this.data[2][1], this.data[2][2]);
                var B = -det2(this.data[1][0], this.data[1][2], this.data[2][0], this.data[2][2]);
                var C = det2(this.data[1][0], this.data[1][1], this.data[2][0], this.data[2][1]);
                
                var D = -det2(this.data[0][1], this.data[0][2], this.data[2][1], this.data[2][2]);
                var E = det2(this.data[0][0], this.data[0][2], this.data[2][0], this.data[2][2]);
                var F = -det2(this.data[0][0], this.data[0][1], this.data[2][0], this.data[2][1]);
                
                var G = det2(this.data[0][1], this.data[0][2], this.data[1][1], this.data[1][2]);
                var H = -det2(this.data[0][0], this.data[0][2], this.data[1][0], this.data[1][2]);
                var I = det2(this.data[0][0], this.data[0][1], this.data[1][0], this.data[1][1]);
                
                // use formula: A⁽⁻¹⁾ = det(A)⁽⁻¹⁾ * [Cofactor Matrix]^T
                var transpose = new Matrix(3, 3, [[A, D, G], [B, E, H], [C, F, I]] );
                // return the trapose divided by the determinant
                return transpose.div(det);
            } else {
                throw "Cant Calculate Inverse for that many dimensions";
            }
        }
    } 

    print() {
        // for each row
        for (let index = 0; index < this.data.length; index++) {
            console.log(this.data[index]);   
        }
    }

    mul(other) {
        if (other.nrows != this.ncols) {
            throw "Invalid Multiplication"
        } else {
            // do the multiplication
            // create matrix 
            var matrix = create_matrix(this.nrows, other.ncols );
            // apply the dot algorithm
            for (let i = 0; i < this.nrows; i++) {
                for (let j = 0; j < other.ncols; j++) {
                    for (let k = 0; k < this.ncols; k++) {
                        matrix[i][j] += this.data[i][k]*other.data[k][j];
                    }
                }
            }
            return new Matrix(this.nrows, other.ncols, matrix);
        }
    }

    div(scalar) {
        for (let row = 0; row < this.nrows; row++) {
            for (let col = 0; col < this.ncols; col++) {
                this.data[row][col] = this.data[row][col]/scalar;
            }
        }
        return this;
    }
}

// triangle class
class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    to_barycentric(p) {
        // cnvert to matrix as homogean coordinates
        var cartesian = new Matrix(3, 1, [[p.x,], [p.y,], [1,]]);
        var triangle = new Matrix(3, 3, [[this.p1.x, this.p2.x, this.p3.x], [this.p1.y, this.p2.y, this.p3.y], [1, 1, 1]]);
        // formula : lambda = T⁽⁻¹⁾ * P
        var inv = triangle.inv();
        return inv.mul(cartesian);
    }


    // function to check if it in in a triangle
    in_triangle(point, log=true) {
        // convert to barycentric
        var coordinates = this.to_barycentric(point);
        // check if there is at least one negative
        for (let coord = 0; coord < coordinates.data.length; coord++) {
            if (coordinates.data[coord] < 0) {
                return true;
            }
        }
        // if none was negative, retarne true
        return true;

    }
}

// class to represent a Rotation
class Rotation {

    constructor(angle) {
        this.angle = angle;
    }

    // method to create the matrix rotation
    matrix() {
        return [[Math.cos(this.angle), -Math.sin(this.angle), 0],
                [ Math.sin(this.angle), Math.cos(this.angle), 0],
                [        0       ,        0       , 1]];
    }
}

// class to represent a Scale
class Scale {

    constructor(sx, sy) {
        this.sx = sx;
        this.sy = sy;
    }

    // method to create the matrix rotation
    matrix() {
        return [[ this.sx,    0   ,  0],
                [    0   , this.sy,  0],
                [    0   ,    0   ,  1]];
    }
}

// class to represent a Scale
class Translate {

    constructor(tx, ty) {
        this.tx = tx;
        this.ty = ty;
    }

    // method to create the matrix rotation
    matrix() {
        return [[ 1,  0, this.tx],
                [ 0 , 1, this.ty],
                [ 0 , 0,    1   ]];
    }
}

// convert to homogen
function homogen(matrix) {
    // new dimension
    new_dimension = [];
    for (let index = 0; index < matrix[0].length; index++) {
        new_dimension.push(1);
    }
    // add new dimension to matrix
    matrix.push(new_dimension);
    // return matrix
    return matrix;
}

// convert to normal
function dehomogen(matrix) {
    // eliminate last element
    matrix.pop()
    // return the matrix
    return matrix;
}

// generate matrix with default value
function create_matrix(y, x, value = 0) {
    var matrix = [];
    var row = [];
    for (let y_index = 0; y_index < y; y_index++) {
        row = [];
        for (let x_index = 0; x_index < x; x_index++) {
            row.push(value);
        }
        // push to the matrix
        matrix.push(row);
    }
    // return matrix
    return matrix;
}

// matrix multiplication
function dot(matrix1, matrix2) {
    // check shape of matrix 1 and 2
    if ( matrix1[0].length == matrix2.length) {
        // create matrix 
        var matrix = create_matrix(matrix1.length, matrix2[0].length );
        // apply the dot algorithm
        for (let i = 0; i < matrix1.length; i++) {
            for (let j = 0; j < matrix2[0].length; j++) {
                var sum = 0;
                for (let k = 0; k < matrix2.length; k++) {
                    sum += matrix1[i][k]*matrix2[k][j];
                }
                matrix[i][j] = sum;
            }
        }
        return matrix;
    }
}

// copy matrix
function copy_matrix(matrix) {
    var copy = [];
    var row = [];
    for (let i = 0; i < matrix.length; i++) {
        row = [];
        for (let j = 0; j < matrix[i].length; j++) {
            row.push(matrix[i][j]);
        }
        copy.push(row);
    }
    return copy;
}

// pipeline function
function pipeline(transformations, original_matrix) {
    // copy matrix
    var matrix = copy_matrix(original_matrix);
    // convert to homogen coordinates
    matrix = homogen(matrix);
    // for each transformation in transformations
    for (let index = 0; index < transformations.length; index++) {
        // get transformtion
        transformation_matrix = transformations[index];
        // multiply by transformation
        matrix = dot(transformation_matrix.matrix(), matrix);
    }
    // dehomogen
    matrix = dehomogen(matrix);
    // return matrix
    return matrix;
}

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

    // transform method
    transform(transformations) {
        // get matrix of coordinates
        var matrix = [ [ this.coordinates[0], ] , [ this.coordinates[1], ] ] ;
        // transform
        matrix = pipeline(transformations, matrix);
        // change coordinates
        this.coordinates = [ matrix[0][0] , matrix[1][0] ];
    }

    get_center() {
        return this.coordinates;
    }

    // get absolute (distance) value of the point to the reference of x and y
    abs(x = 0, y = 0) {
        return get_distance(this.coordinates[0], x, this.coordinates[1], y);
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
        this.angular_coefficient = this.calculate_angular_coefficient();
    }

    // method to check collision
    collision(x, y, tol = 5) {
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
            
        } // end while
    } // end function

    get_center() {
        return [ (this.point1[0] + this.point2[0])/2, (this.point1[1] + this.point2[1])/2 ];
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

    // transform method
    transform(transformations) {
        // get matrix of coordinates
        var matrix = [ [ this.point1[0], this.point2[0]] , [ this.point1[1], this.point2[1] ] ] ;
        // transform
        matrix = pipeline(transformations, matrix);
        
        // change coordinates
        this.point1 = [matrix[0][0], matrix[1][0] ];
        this.point2 = [matrix[0][1], matrix[1][1] ];
    }

    // function to get angular coefficient
    calculate_angular_coefficient() {
        return (this.point2[1] -  this.point1[1]) / (this.point2[0] - this.point1[0]);
    }

    // function to get size of the line
    size() {
        return get_distance(this.point1[0], this.point2[0], this.point1[1], this.point2[1]);
    }

    // function to check if a given point is on the right
    on_right(point) {
        var expression = ((point.coordinates[1] - this.point1[1])*(this.point2[0] - this.point1[0])) - ((point.coordinates[0] - this.point1[0])*(this.point2[1] - this.point1[1]));
        // if the expression above is < 0 is on the right ( exp > 0 :=> left and exp == 0 :=> neither)
        return (expression < 0 );
    }

    // function to calculate the distance to the point
    distance_point(point) {
        // get x0 and y0
        var x0 = point.coordinates[0];
        var y0 = point.coordinates[1];
        // get coordinates of the line
        var x1 = this.point1[0];
        var y1 = this.point1[1];
        var x2 = this.point2[0];
        var y2 = this.point2[1];
        // get distance
        var distance =  Math.abs( (y2 - y1)*x0 - (x2 -x1)*y0 + x2*y1 - y2*x1 ) / Math.sqrt( (y2 - y1)*(y2 - y1) + (x2 - x1)*(x2 - x1) );
        // return distance
        return(distance);

    }
}

class Circle {

    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    render(pincel) {
        //  begin path
        pincel.beginPath();
        // create a arc with the coordinate on the buffer as the center
        pincel.arc(this.center.coordinates[0], this.center.coordinates[1], this.radius.size(), 0, Math.PI*2 );
        // stroke on the canvas
        pincel.stroke();
        // close path
        pincel.closePath();

        this.center.render(pincel);
        this.radius.render(pincel);
    }

    collision(x, y) {
        // check if the distance to the center is lower than the radius
        var distance = get_distance(x, this.center.coordinates[0], y, this.center.coordinates[1]);
        return distance <= this.radius.size();
    }

    // transform method
    transform(transformations) {
        // calcualte transform on center point and line radius
        this.center.transform(transformations);
        this.radius.transform(transformations);
    }

    get_center() {
        return this.center.coordinates;
    }

}

// polygon class
class Polygon {

    constructor(coordinates, by_points = true, is_point = false) {
        // check if coordinates passed is a list of points
        if (by_points) {
            // check if coordinates are points
            if (is_point) {
                this.coordinates = this.generate_lines( this.generate_coordinates(coordinates) );
            } else {
                this.coordinates = this.generate_lines(coordinates);
            }
        } else {
            // else, coordinates are a list of lines, then it doesn need pre processing
            this.coordinates = coordinates.slice()
        }
    }

    // generate array of coordinates from array of points
    generate_coordinates(points) {
        // new array
        var new_array = [];
        for (let index = 0; index < points.length; index++) {
            new_array.push( points[index].coordinates.slice() );   
        }
        // return new array
        return  new_array;
    }

    // method to create a line based on the list of coordinates of points
    generate_lines(coordinates) {
        // create a copy of the coordinates
        var copy = coordinates.slice()
        // new coordinates based on line
        var new_coordinates = [];
        // push to copy the first element (to complete the polygon)
        copy.push(copy[0]);
        
        // coordinate and next coordinate for each line (aka first and second point)
        var coordinate = 0;
        var next_coordinate = 0;
        var line;
        // for each coordinate
        for (let index = 0; index < coordinates.length;) {
            coordinate = coordinates[index++].slice();
            next_coordinate = copy[index].slice();
            // create a Line
            line = new Line(coordinate, next_coordinate);
            // push it to the new coordinates
            new_coordinates.push(line);
        }
        // return the new coordinates
        return new_coordinates;
    }

    // transform method
    transform(transformations) {
        // apply transformation for each line
        for (let index = 0; index < this.coordinates.length; index++) {
            // apply transformation
            this.coordinates[index].transform(transformations);
        }
    }

    // method to render 
    render(pincel) {
        // for each line
        for (let index = 0; index < this.coordinates.length; index++) {
            const line = this.coordinates[index];
            line.render(pincel);
        }
        
    }

    // method to collision 
    collision(x, y) {
        // number of lines intersection
        var number_intersection = 0;
        // for each line
        for (let index = 0; index < this.coordinates.length; index++) {
            const line = this.coordinates[index];
            // check if the line is not totally above or under or left, or is horizontal
            if ( !  (  (line.point1[0] < x && line.point2[0] < x) || (line.point1[1] > y && line.point2[1] > y) || ( line.point1[1] < y && line.point2[1] < y) || ( line.point1[1] == line.point2[1]) ) ) {
                // check if the line created at point to the right conflict at vertice of a polygon line
                // if so, consider only the one pointed up (to not count the conflict twice)
                if (line.point1[1] == y) {
                    // check if the x of the point is on the right (conflict with the line which is only apointed to right)
                    // and the y of second point is highter (so the line is indeed pointed up)
                    if (line.point1[0] > x && line.point2[1] > y ) {
                        // then the line is intersected, so increase number of intersection
                        number_intersection++;
                    }

                } else {
                    // then also check if the previous case is repeated to the second point
                    if ( line.point2[1] == y) {
                        if (line.point2[0] > x && line.point1[1] > y ) {
                            number_intersection++;
                        }
                    } else {
                        /* then the last case is when one of the vertices is above and the other is under
                         * and this last case can be divided in 2 types:
                         *   - both vertices are on the right (which means inevitably thre is intersection)
                         *   - one of the vertices is behind the point (which can or cannot have a intersection)
                         *
                         */
                        // check if is the first case (both vertices are on the right, and one is above and the order under)
                        if ( (line.point1[0] > x) && (line.point2[0] > x) ) {
                            // then there is inevitably a intersection, so increase the number of intesercion
                            number_intersection++;
                        } else {
                            /* then this is the latter case, which can or cannot  be intersected by the imaginary line of the point
                             * to check if it tis intersected, check the point of the intersected (by calculating the x of the line at the y of the click)
                             * and compare if the x of the line is behind or after the x of the click
                             * if the x of the intersection is behind (then the line itself is behind so no intersection )
                             * else, if the x of the intersection is after (then the line itself is after so no intersection )
                             */

                            // calculate the x of the line at the y of the click
                            // using the formula: x = x0 + DeltaY/angular_coeeficient
                            // which the DeltaY = y - y0 (y is the y of the line which is also the y of the click)
                            var x_line = line.point1[0] + (y - line.point1[1]) / line.angular_coefficient
                            // then at last, check if the x of the line last is after the x of the click (which means the line is also after, so increase the numver of intersection)
                            if (x_line > x) {
                                number_intersection++;
                            } 

                        } // end of the if else: case of one vertice is under and the other is above

                    } // end of the if: check if the line of the click is at a vertice
                }
            }  // end of the if: not trivial cases
            
        } // end of the for loop: for each line of the poligon
        // check if the number of intersection is odd
        if (number_intersection % 2 == 1) {
            /* then return true (the click was indeed inside of the polygon, because the number of intersection is odd,
             * or in other words, the imaginary line coming from the click entering the ploygon is not equal to the line leaving,
             * which is only possible if the point is inside the polygon) so return true
              */
            return true;
        }
        
        // else, the number is even, so the click was outside the polygon, and hence return false
        return false;

    } // end of the colision function

    get_center() {
        // sum of x, y, and total of x,y
        var x = 0;
        var y = 0;
        var i = 0;
        for (var index = 0; index < this.coordinates.length; index++) {
            // icrease i
            i++;
            // increase x and y (use only point1 to no repeat any point)
            x += this.coordinates[index].point1[0];
            y += this.coordinates[index].point1[1];
        }
        return [ x/i, y/i ];
    }


} //end of the polygon class


// Cloud of Points class
class Cloud {
    constructor(points, circle) {
        this.points = points;
        this.circle = circle;
    }

    // method to render 
    render(pincel) {
        // for each point in the cloud, call its render function
        for (let point = 0; point < this.points.length; point++) {
            this.points[point].render(pincel);
        }
    }

    collision(x, y) {
        // check if the distance to the center is lower than the radius
        var distance = get_distance(x, this.circle.center.coordinates[0], y, this.circle.center.coordinates[1]);
        return distance <= this.circle.radius.size();
    }

    // transform method
    transform(transformations) {
        // aply transformation to the circle
        this.circle.transform(transformations)
        // apply transformation for each point in the cloud
        for (let index = 0; index < this.points.length; index++) {
            // apply transformation
            this.points[index].transform(transformations);
        }
    }

    get_center() {
        return this.circle.center.coordinates.slice();
    }

    // function to get the convex hull
    get_convex_hull() {
        // s1 and s2
        var s1 = [];
        var s2 = [];
        // get min and max points
        var p_min = this.min_max("min");
        var p_max = this.min_max("max");
        // create line based on 2 points
        var line = new Line(p_min.coordinates.slice(), p_max.coordinates.slice());
        // add other points to s1 or s2
        for (let index = 0; index < this.points.length; index++) {
            var point = this.points[index];
            // if point istn wither min and max
            if ( (point != p_min) && (point != p_max) ) {
                // check if it is on the right
                if (line.on_right(point)) {
                    s1.push(point);
                } else {
                    s2.push(point);
                }
            }
        } // end of for loop
        var h1 = this.hull_set(s1, p_min, p_max);
        var h2 = this.hull_set(s2, p_max, p_min);
        // return p_min + p_max + Hellset on boths sets
        return [p_min].concat( h1 ).concat([p_max]).concat( h2 );
    }

    // hull set fuction
    hull_set(set, p1, p2) {
        // check if Set is empty
        if (set.length == 0) {
            return([])
        } else {
            // create line
            var line = new Line(p1.coordinates.slice(), p2.coordinates.slice());
            // get minimum distance
            var p3 = set.reduce( ( min , p) => line.distance_point(p) > line.distance_point(min) ? p : min, set[0] );

            // get points ad the rigth of p1 -> p3
            // create line
            var p1p3 = new Line(p1.coordinates.slice(), p3.coordinates.slice());
            // set of points on the right
            var set1 = [];
            // for each point in set, check if its on the right
            for (let index = 0; index < set.length; index++) {
                var point = set[index];
                // check if it is on the right
                if (p1p3.on_right(point)) {
                    set1.push(point);
                } 
            }

            // get points ad the rigth of p3 -> p2
            // create line
            var p3p2 = new Line(p3.coordinates.slice(), p2.coordinates.slice());
            // set of points on the right
            var set2 = [];
            // for each point in set, check if its on the right
            for (let index = 0; index < set.length; index++) {
                var point = set[index];
                // check if it is on the right
                if (p3p2.on_right(point)) {
                    set2.push(point);
                } 
            }
            var h1 = this.hull_set(set1, p1, p3);
            var h2 = this.hull_set(set2, p3, p2);

            // return p3 + Hellset on boths sets
            return h1.concat( [p3,] ).concat( h2 );
        }
    }

    // function to get the minimum or maximum point
    min_max(type = "max") {
        if (type == "max") {
            return this.points.reduce(  (max_min , p) => p.abs() > max_min.abs() ? p : max_min, this.points[0] );
        } else {
            return this.points.reduce(  (max_min , p) => p.abs() < max_min.abs() ? p : max_min, this.points[0] );
        }
        
    }
}

// function to create a random clound of points
function random_cloud(circle, number_of_points=10) {
    // get circle radius and center
    var radius = circle.radius.size();
    var center = circle.center.coordinates.slice();
    // list of points
    var points_list = [];
    // for each point to genrate
    for (let point_index = 0; point_index < number_of_points; point_index++) {
        // generate a random number of angle and radius
        var point_angle = 2*Math.PI*Math.random();
        var point_radius = radius*Math.random();
        // convert from polar to cartesian
        var point_x = center[0] + point_radius*Math.cos(point_angle);
        var point_y = center[1] + point_radius*Math.sin(point_angle);
        // create point and add to list
        points_list.push(new Point([point_x, point_y]));
    }
    // return a new cloud
    return ( new Cloud(points_list, circle) );
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
 * 8 - Cloud
 * 9 - Convex Hull
 */
var buttonAction = -1;


var debug = true;

// variable which indicates if a drawing was alread started
var drawing_mode = false;


var mousePressed = false;

// buffer for the coordinates of the drawing
var buffer = [];

// objects of the canvas
var objects = {"Line" : [], "Point" : [], "Circle" : [], "Polygon" : [], "Cloud": []};
// selected object
var selected_object = null;

var mouse_x = 0;
var mouse_y = 0;

// center of the selcted object
var center_selected_object = [0, 0];

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
                circle = new Circle( new Point(coordinates.slice()) , new Line( coordinates.slice(), [mouse_x, mouse_y]) );
                
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
                buffer.push([mouse_x, mouse_y]);
                // set drawing mode to true
                drawing_mode = true;
                
            } else {
                // check if the coordinates is close to the first coordinates
                if ( (Math.abs(buffer[0][0] - mouse_x) <= 4) && (Math.abs(buffer[0][1] - mouse_y) <= 4) ) {
                    // create line object
                    polygon = new Polygon( buffer.slice() );
                    // add to objects
                    objects["Polygon"].push(polygon);
                    // redraw
                    pincel.clearRect(0, 0, canvas.width, canvas.height);
                    renderObjects();
                    // clear buffer
                    buffer = [];
                    // for last, set drawing mode to false again
                    drawing_mode = false;

                } else {
                    // push mouse_x and mouse_y to buffer
                    buffer.push([mouse_x, mouse_y]);
                    // reset canvas
                    pincel.clearRect(0, 0, canvas.width, canvas.height);
                    renderObjects();
                    // render the buffer
                    renderBuffer();
                }
            }
            break;

        case 4:
            // if the selected object is not null
            if (selected_object == null) {
                alert("Select an Object first");
            }
            break;

        case 5:
            // if the selected object is not null
            if (selected_object != null) {
                // get object center points
                center_selected_object = selected_object.get_center();
            } else {
                alert("Select an Object first");
            }
            break;

        case 6:
            // if the selected object is not null
            if (selected_object != null) {
                // get object center points
                center_selected_object = selected_object.get_center();
            } else {
                alert("Select an Object first");
            }
            break;

        case 7:
            // set selected object to null
            selected_object = null;

            // get types of objects
            const keys = Object.keys(objects);

            // for each type of object
            key_loop:
            for (const key of keys) {
                // for each object of that type
                object_loop:
                for (let index = 0; index < objects[key].length; index++) {
                    const object = objects[key][index];
                    // check if there was a collision
                    if (object.collision(mouse_x, mouse_y)) {
                        // set selected object to object
                        selected_object = object;
                        // break outer loop, because the object was already selected
                        break key_loop;
                    } // end if
                }// end inner loop
            }// end outer loop

            // clear and render again
            pincel.clearRect(0, 0, canvas.width, canvas.height);
            renderObjects();
            break;
        case 8:
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
                circle = new Circle( new Point(coordinates.slice()) , new Line( coordinates.slice(), [mouse_x, mouse_y]) );

                // create cloud
                cloud = random_cloud( circle, 200);
                
                // add to objects
                objects["Cloud"].push(cloud);

                // clear buffer
                buffer = [];

                // render circle
                cloud.render(pincel);
                
                // for last, set drawing mode to false again
                drawing_mode = false;
            }
            break;
        case 9:
            // if the selected object is not null
            if (selected_object != null) {
                if (selected_object instanceof Cloud) {
                    // get polygon
                    var polygon = selected_object.get_convex_hull();

                    if (debug) {
                        console.log(polygon);
                    }

                    // create a polygon object
                    polygon = new Polygon(polygon, true, true);
                    polygon.render(pincel);
                }
            } else {
                alert("Select an Object first");
            }
            break;


    } // end switch
} // end  function

function onMove(event) {
    // check if the mouse is pressed
    if (mousePressed) {
        // check action
        switch(buttonAction) {
            // if the action is translate
            case 4:
                //dx and dy of translation (x = dX)
                var dx = event.clientX - pincel.canvas.offsetLeft - mouse_x;
                var dy = event.clientY - pincel.canvas.offsetTop - mouse_y;
               
                // if the selected object is not null
                if (selected_object != null) {
                    // transform the object
                    selected_object.transform([ new Translate(dx, dy) ,])
                }
                // clear canvas and redraw objects
                pincel.clearRect(0, 0, canvas.width, canvas.height);
                renderObjects();

                mouse_x = event.clientX - pincel.canvas.offsetLeft;
                mouse_y = event.clientY - pincel.canvas.offsetTop;
                break;
            case 6:
                // if the selected object is not null
                if (selected_object != null) {
                    // get object center points
                    var center = selected_object.get_center();
                    // check denominator
                    var denominator_x = (mouse_x-center[0]);
                    if (denominator_x == 0) {
                        denominator_x = 0.001;
                    }
                    var denominator_y = (mouse_y-center[1]);
                    if (denominator_y == 0) {
                        denominator_y = 0.001;
                    }
                    //dx and dy of scale( x = dx'/dx)
                    var dx = (event.clientX - pincel.canvas.offsetLeft - center[0])/denominator_x;
                    var dy = (event.clientY - pincel.canvas.offsetTop - center[1])/denominator_y;
                    
                    // transform the object (by moving - center units of distance, then scale, then moving + center units of distance again. aka. scale based on is center)
                    selected_object.transform([ new Translate(-center_selected_object[0], -center_selected_object[1]) , new Scale(dx, dy), new Translate(center_selected_object[0], center_selected_object[1]) ] );
                }
                // clear canvas and redraw objects
                pincel.clearRect(0, 0, canvas.width, canvas.height);
                renderObjects();

                mouse_x = event.clientX - pincel.canvas.offsetLeft;
                mouse_y = event.clientY - pincel.canvas.offsetTop;
                break;
            case 5:
                // if the selected object is not null
                if (selected_object != null) {
                    var d_angle = getAngleOf3Points(center_selected_object[0], center_selected_object[1], mouse_x, mouse_y, event.clientX - pincel.canvas.offsetLeft, event.clientY - pincel.canvas.offsetTop);
                    // transform the object (by moving - center units of distance, then scale, then moving + center units of distance again. aka. scale based on is center)
                    selected_object.transform([ new Translate(-center_selected_object[0], -center_selected_object[1]) , new Rotation(d_angle), new Translate(center_selected_object[0], center_selected_object[1]) ] );
                }
                // clear canvas and redraw objects
                pincel.clearRect(0, 0, canvas.width, canvas.height);
                renderObjects();

                mouse_x = event.clientX - pincel.canvas.offsetLeft;
                mouse_y = event.clientY - pincel.canvas.offsetTop;
                break;
        }
    } // end if
}

function onUp(event) {
    mousePressed = false;
}

// function to render the buffer
function renderBuffer() {
    // get last element
    var coordinates = buffer[buffer.length-1];
    var other_coordinates = coordinates;
    // for each other cooridnate
    for (var i = buffer.length - 2; i >= 0; i--) {
        other_coordinates = buffer[i];
        // start path
        pincel.beginPath();
        // move to other coordinate
        pincel.moveTo(other_coordinates[0], other_coordinates[1]);
        // line to coordinate
        pincel.lineTo(coordinates[0], coordinates[1]);
        pincel.stroke();
        pincel.closePath();
        // change coordinates to the next point
        coordinates = other_coordinates
    }
    
}

// function to get the distance between 2 points
function get_distance(x1, x2, y1, y2) {
    return Math.sqrt( Math.pow( x1-x2, 2) + Math.pow( y1-y2, 2) );
}

// function to get the angle formed by 3 points (as 2 latter points connect to the first point)
function getAngleOf3Points(x1, y1, x2, y2, x3, y3) {
    // check if the has a angle
    if ( ( (x1 == x2) && (y1 == y2) ) || ( (x1 == x3) || (y1 == y3) ) ) {
        return 0;
    }
    // get angle as the diference of the angle of the two line to the x axis
    var angle  = Math.atan2(y3 - y1, x3 - x1) - Math.atan2(y2 - y1, x2 - x1)
    // return angle
    return angle;
}

// function to reset action
function resetAction(newaction = -1) {
    buttonAction = newaction;
    drawing_mode = false;
    mousePressed = false;
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

document.getElementById('button_cloud').addEventListener("click", function() {resetAction(8); } );

document.getElementById('button_convex_hull').addEventListener("click", function() {resetAction(9); } );

document.getElementById('button_clear').addEventListener("click", function() {clearCanvas();} );

document.getElementById('button_restore').addEventListener("click", function() {renderObjects(); } );


// add a event listener to the canvas to click event to call the onDown function
canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);
