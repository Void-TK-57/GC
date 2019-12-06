
#include "objects.h"


#include <GL/freeglut.h>
#include <GL/gl.h>

 
#include <cmath>

// ==========================================================================================================================
// Point Class
// ==========================================================================================================================


Point::Point(double x_, double y_, double z_, rgb color_ ) : x(x_), y(y_), z(z_), color(color_), Object() {}
Point::~Point() {}

// function to check collision with a click x, y with a toleranceerance
bool Point::collision(double p_x, double p_y, double p_z, int tolerance = 5) {
    return (x < p_x + tolerance) && (x > p_x - tolerance) && (y < p_y + tolerance) && (y > p_y - tolerance) && (z < p_z + tolerance) && (z > p_z - tolerance);
}

// function to render the point
void Point::render() {
    // begin points
    glBegin(GL_POINTS);
        glColor3f(color.r, color.g, color.b);
        glVertex3f(x, y, z);
    glEnd();
}

Point* Point::get_center() {
    // create point
    Point* center = new Point(x, y, z, color);
    // return center
    return center;
}

// ==========================================================================================================================
// Line Class
// ==========================================================================================================================


Line::Line(Point p1_, Point p2_, rgb color_ ) : p1(p1_), p2(p2_), color(color_), Object() {}
Line::~Line() {}


// function to render the point
void Line::render() {
    // begin points
    glBegin(GL_LINES);
        glColor3f(color.r, color.g, color.b);
        glVertex3f(p1.x, p1.y, p1.z);
        glVertex3f(p2.x, p2.y, p2.z);
    glEnd();
}

Point* Line::get_center() {
    // create point with the median value of the coordinates of both points
    Point* center = new Point((p1.x + p2.x)/2.0, (p1.y + p2.y)/2.0, (p1.z + p2.z)/2.0, color);
    // return center
    return center;
}

// ==========================================================================================================================
// Polygon Class
// ==========================================================================================================================


Polygon::Polygon(Point* points_, int n_, rgb color_) : points(points_), n(n_), color(color_), Object() {}
Polygon::~Polygon() { delete[] points; }


// function to render the point
void Polygon::render() {
    // begin points
    glBegin(GL_POLYGON);
        glColor3f(color.r, color.g, color.b);
        // for each point
        for (int i = 0; i < n; i++) {
            glVertex3f(points[i].x, points[i].y, points[i].z);
        }
        
    glEnd();
}


Point* Polygon::get_center() {
    // coordinates of center point
    double x = 0.0, y = 0.0, z = 0.0;
    // for each point
    for (int i = 0; i < n; i++) {
        // add each coordinate
        x += points[i].x;
        y += points[i].y;
        z += points[i].z;
    }
    x = x / ( (double) n );
    y = y / ( (double) n );
    z = z / ( (double) n );
    // create point with the median value of the coordinates of both points
    Point* center = new Point(x, y, z, color);
    // return center
    return center;
}

// ==========================================================================================================================
// Triangle Class
// ==========================================================================================================================


Triangle::Triangle(Point p1_, Point p2_, Point p3_, rgb color_ ) : p1(p1_), p2(p2_), p3(p3_), color(color_), Object() {}
Triangle::~Triangle() {}

// function to render the point
void Triangle::render() {
    // begin points
    glBegin(GL_TRIANGLES);
        glColor3f(color.r, color.g, color.b);
        glVertex3f(p1.x, p1.y, p1.z);
        glVertex3f(p2.x, p2.y, p2.z);
        glVertex3f(p3.x, p3.y, p3.z);
    glEnd();
}

Point* Triangle::get_center() {
    // create point with the median value of the coordinates of both points
    Point* center = new Point((p1.x + p2.x + p3.x)/3.0, (p1.y + p2.y + p3.y)/3.0, (p1.z + p2.z + p3.z)/3.0, color);
    // return center
    return center;
}


// ==========================================================================================================================
// rgb Class
// ==========================================================================================================================

rgb::rgb(float r_, float g_, float b_) : r(r_), g(g_), b(b_) {}
rgb::~rgb() {}

// ==========================================================================================================================
// Object Class
// ==========================================================================================================================

Object::Object() {
    // set parameters to initial values
    tx = ty = tz = angle = 0;
    sx = sy = sz = 1;
}


void Object::render() {}

Point* Object::get_center() { return new Point(0.0, 0.0, 0.0, rgb(0.0f, 0.0f, 0.0f)); }

