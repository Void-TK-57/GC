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
        } else if (this.nrows == 2 ) {
            // get determinant
            var det = this.det();
            // check det
            if (det == 0) {
                throw "Not Inversible";
            } else {
                // return matrix
                return new Matrix(2, 2, [[ this.data[1][1]/det, -this.data[0][1]/det], [ -this.data[1][0]/det, this.data[0][0]/det ]]);
            }
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

            // get determinant
            var det = this.det();
            // use formula: A⁽⁻¹⁾ = det(A)⁽⁻¹⁾ * [Cofactor Matrix]^T
            var transpose = new Matrix(3, 3, [[A, D, G], [B, E, H], [C, F, I]] );
            return transpose.div(det);
        } else {
            throw "Cant Calculate Inverse for that many dimensions";
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

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(p1, p2) {
        this.point1 = p1;
        this.point2 = p2;
        this.angular = (p1.y - p2.y)/(p1.x - p2.x);
        this.intercpt = (p1.y - this.angular*p1.x);
    }

    intersection(other, segment = true) { 
        var x1 = this.point1.x;
        var y1 = this.point1.y;
        var x2 = this.point2.x;
        var y2 = this.point2.y;
        var x3 = other.point1.x;
        var y3 = other.point1.y;
        var x4 = other.point2.x;
        var y4 = other.point2.y;
        
        var denominator = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);

        // check if the denominator is 0 (aka the lines are pararel)
        if (denominator == 0) {
            if (this.intercpt == other.intercpt) {
                if ( (( Math.min(Math.abs(x1), Math.abs(x2)) ) <= ( Math.max(Math.abs(x3), Math.abs(x4)) ) )  && (( Math.min(Math.abs(x3), Math.abs(x4)) ) <= ( Math.max(Math.abs(x1), Math.abs(x2)) )) && (( Math.min(Math.abs(y1), Math.abs(y2)) ) <= ( Math.max(Math.abs(y3), Math.abs(y4)) )) && (( Math.min(Math.abs(y3), Math.abs(y4)) ) <= ( Math.max(Math.abs(y1), Math.abs(y2)) )) ) {
                    return true;
                } else {
                    return false;
                }
            }
            else { 
                return false;
            }
        }

        var x = ( (x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4) ) / denominator;
        var y = ( (x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4) ) / denominator;
        
        // check if the collision should be within the segment lines
        if ( segment ) { 
            if ( ( ((x1<=x)&&(x<=x2)) || ((x2<=x)&&(x<=x1)) ) && ( ((x3<=x)&&(x<=x4)) || ((x4<=x)&&(x<=x3)) ) && ( ((y1<=y)&&(y<=y2)) || ((y2<=y)&&(y<=y1)) ) && ( ((y3<=y)&&(y<=y4)) || ((y4<=y)&&(y<=y3)) ) ) {
                return new Point(x, y);
            } else { 
                return false;
            }
        } else { 
            return new Point(x, y);
        }
    }
}

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
}

function intersect(line1, line2) {
    var intersection = line1.intersection(line2, true);
    if ( intersection == null) {
        return false;
    } else if (intersection == false) {
        return false;
    } else {
        return true
    }
}

// function to check if it in in a triangle
function in_triangle(triangle, point, log=true) {
    var coordinates = triangle.to_barycentric(point);
    // check if there is a negative coordinate
    var there_is_negative = false;
    for (let coord = 0; coord < coordinates.data.length; coord++) {
        if (coordinates.data[coord] < 0) {
            there_is_negative = true;
            break;
        }
    }
    if (log) {
        console.log("Coordinates:");
        coordinates.print();
        if (there_is_negative) {
            console.log("The Point is outside the Triangle");
        } else {
            console.log("The Point is inside the Triangle");
        }
    }
    return there_is_negative

}


console.log("================================");
console.log("Cross Product:\n");
var v1 = new Vector([3, -3, 1]);
console.log(v1);
var v2 = new Vector([4, 9, 2]);
console.log(v2);
var v3 = v1.cross(v2);
console.log(v3);
console.log("================================");




console.log("Interception:\n");
var l1 = new Line(new Point(0, 0), new Point(-3, -3));
var l2 = new Line(new Point(-1, -2), new Point(-2, -1));

if (intersect(l2, l1)) {
    console.log("They intercept!!!");
} else {
    console.log("They do not interepet!!!");
}
console.log("================================");


console.log("Barycentric Coordinates:\n");


var point = new Point(2, 2);
var triangle = new Triangle(new Point(4, 4), new Point(2, 0), new Point(0, 3));
in_triangle(triangle, point, log=true);

/*

var matrix = new Matrix(3, 3, [[0, 1, 0], [0, 0, 1], [1, 1, 1]]);
matrix.print();
console.log(matrix.det());
matrix.inv().print();
console.log("\n");
matrix.mul(matrix.inv()).print();
*/