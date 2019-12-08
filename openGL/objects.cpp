
#include "objects.h"


#include <GL/freeglut.h>
#include <GL/gl.h>

 
#include <cmath>
#include <iostream>

// ==========================================================================================================================
// Point Class
// ==========================================================================================================================


Point::Point(double x_, double y_, double z_, rgb* color_ ) : x(x_), y(y_), z(z_), Object(color_) {}
Point::Point(double x_, double y_, double z_) : x(x_), y(y_), z(z_), Object() {}
Point::Point() {}
Point::~Point() {}

// function to check collision with a click x, y with a toleranceerance
bool Point::collision(double p_x, double p_y, double p_z, int tolerance = 5) {
    return (x < p_x + tolerance) && (x > p_x - tolerance) && (y < p_y + tolerance) && (y > p_y - tolerance) && (z < p_z + tolerance) && (z > p_z - tolerance);
}

// function to render the point
void Point::render() {
    // begin points
    glBegin(GL_POINTS);
        glColor3f(color->r, color->g, color->b);
        glVertex3f(x, y, z);
    glEnd();
}

/*
Point& Point::operator=(Point other) {
    double this_x = other.x;
    double this_y = other.y;
    double this_z = other.z;
    rgb this_color = rgb(color.r, color.g, color.b);
    // create Point
    Point* created = new Point(this_x, this_y, this_z, this_color);
    // return created
    return *created;
}
*/

Point* Point::get_center() {
    // create point
    Point* center = new Point(x, y, z, new rgb(*color));
    // return center
    return center;
}

void Point::print() {
    std::cout<<">> Point => x: " << x << ", y: " << y << ", z: " << z << std::endl;
}

// ==========================================================================================================================
// Line Class
// ==========================================================================================================================


Line::Line(Point* p1_, Point* p2_, rgb* color_ ) : p1(p1_), p2(p2_), Object(color_) {}
Line::Line(Point* p1_, Point* p2_ ) : p1(p1_), p2(p2_), Object() {}
Line::Line() {}
Line::~Line() {delete p1; delete p2;}


// function to render the point
void Line::render() {
    // begin points
    glBegin(GL_LINES);
        glColor3f(color->r, color->g, color->b);
        glVertex3f(p1->x, p1->y, p1->z);
        glVertex3f(p2->x, p2->y, p2->z);
    glEnd();
}

Point* Line::get_center() {
    // create point with the median value of the coordinates of both points
    Point* center = new Point((p1->x + p2->x)/2.0, (p1->y + p2->y)/2.0, (p1->z + p2->z)/2.0, new rgb(*color));
    // return center
    return center;
}

// ==========================================================================================================================
// Polygon Class
// ==========================================================================================================================


Polygon::Polygon(std::vector<Point*> points_, rgb* color_) : points(points_), Object(color_) {}
Polygon::Polygon(std::vector<Point*> points_) : points(points_), Object() {}
Polygon::Polygon() {}
Polygon::~Polygon() { 
    for(auto it = points.begin(); it != points.end(); it++) { 
        delete (*it);
    }
    points.clear();
}


// function to render the point
void Polygon::render() {
    // begin points
    glBegin(GL_POLYGON);
        glColor3f(color->r, color->g, color->b);
        // fo each point
        for(auto it = points.begin(); it != points.end(); it++) { 
            // get point
            auto point = (*it);
            glVertex3f(point->x, point->y, point->z);
        }
        
    glEnd();
}


Point* Polygon::get_center() {
    // coordinates of center point
    double x = 0.0, y = 0.0, z = 0.0, n = 0.0;
    // for each point
    for(auto it = points.begin(); it != points.end(); it++) { 
        // get point
        auto point = (*it);
        // add each coordinate
        x += point->x;
        y += point->y;
        z += point->z;
        // increase n
        n += 1.0;
    }
    x = x / ( (double) n );
    y = y / ( (double) n );
    z = z / ( (double) n );
    // create point with the median value of the coordinates of both points
    Point* center = new Point(x, y, z, new rgb(*color));
    // return center
    return center;
}


void Polygon::print() {
    std::cout << ">> Polygon: " << std::endl;
    for (auto it = points.begin(); it != points.end(); it++) {
        // call print on point
        (*it)->print();
    }
}


// ==========================================================================================================================
// Triangle Class
// ==========================================================================================================================


Triangle::Triangle(Point* p1_, Point* p2_, Point* p3_, rgb* color_ ) : p1(p1_), p2(p2_), p3(p3_), Object(color_) {}
Triangle::Triangle(Point* p1_, Point* p2_, Point* p3_) : p1(p1_), p2(p2_), p3(p3_), Object() {}
Triangle::~Triangle() {delete p1; delete p2; delete p3;}

// function to render the point
void Triangle::render() {
    // begin points
    glBegin(GL_TRIANGLES);
        glColor3f(color->r, color->g, color->b);
        glVertex3f(p1->x, p1->y, p1->z);
        glVertex3f(p2->x, p2->y, p2->z);
        glVertex3f(p3->x, p3->y, p3->z);
    glEnd();
}

// function to get center point
Point* Triangle::get_center() {
    // create point with the median value of the coordinates of both points
    Point* center = new Point((p1->x + p2->x + p3->x)/3.0, (p1->y + p2->y + p3->y)/3.0, (p1->z + p2->z + p3->z)/3.0, color);
    // return center
    return center;
}


// ==========================================================================================================================
// Cube Class
// ==========================================================================================================================

Cube::Cube(double x, double y, double z, double size, rgb* color_) : Object(color_) {
    // points
    /*
    Point Point(x - (size/2.0), y - (size/2.0), z - (size/2.0), color); = Point(x - (size/2.0), y - (size/2.0), z - (size/2.0), color);
    Point Point(x + (size/2.0), y - (size/2.0), z - (size/2.0), color); = Point(x + (size/2.0), y - (size/2.0), z - (size/2.0), color);
    Point Point(x - (size/2.0), y + (size/2.0), z - (size/2.0), color); = Point(x - (size/2.0), y + (size/2.0), z - (size/2.0), color);
    Point Point(x + (size/2.0), y + (size/2.0), z - (size/2.0), color); = Point(x + (size/2.0), y + (size/2.0), z - (size/2.0), color);
    Point Point(x - (size/2.0), y - (size/2.0), z + (size/2.0), color); = Point(x - (size/2.0), y - (size/2.0), z + (size/2.0), color);
    Point Point(x + (size/2.0), y - (size/2.0), z + (size/2.0), color); = Point(x + (size/2.0), y - (size/2.0), z + (size/2.0), color);
    Point Point(x - (size/2.0), y + (size/2.0), z + (size/2.0), color); = Point(x - (size/2.0), y + (size/2.0), z + (size/2.0), color);
    Point Point(x + (size/2.0), y + (size/2.0), z + (size/2.0), color); = Point(x + (size/2.0), y + (size/2.0), z + (size/2.0), color);
    */
    // create polygons
    
    std::vector<Point*> f1;
    f1.insert(f1.end(), new Point(x + size - (size/2.0), y + size - (size/2.0), z - (size/2.0) ) );
    f1.insert(f1.end(), new Point(x + size + (size/2.0), y + size - (size/2.0), z - (size/2.0) ) );
    f1.insert(f1.end(), new Point(x + size + (size/2.0), y + size + (size/2.0), z - (size/2.0) ) );
    f1.insert(f1.end(), new Point(x + size - (size/2.0), y + size + (size/2.0), z - (size/2.0) ) );
    faces.insert(faces.end(), new Polygon(f1, new rgb(*color) ) );

    std::vector<Point*> f2;
    f2.insert(f2.end(), new Point(x - (size/2.0), y - (size/2.0), z + (size/2.0) ) );
    f2.insert(f2.end(), new Point(x + (size/2.0), y - (size/2.0), z + (size/2.0) ) );
    f2.insert(f2.end(), new Point(x + (size/2.0), y + (size/2.0), z + (size/2.0) ) );
    f2.insert(f2.end(), new Point(x - (size/2.0), y + (size/2.0), z + (size/2.0) ) );
    faces.insert(faces.end(), new Polygon(f2, new rgb(*color) ) );

    std::vector<Point*> f3;
    f3.insert(f3.end(), new Point(x + size - (size/2.0), y + size - (size/2.0), z - (size/2.0) ) );
    f3.insert(f3.end(), new Point(x + size - (size/2.0), y + size + (size/2.0), z - (size/2.0) ) );
    f3.insert(f3.end(), new Point(x - (size/2.0), y + (size/2.0), z + (size/2.0) ) );
    f3.insert(f3.end(), new Point(x - (size/2.0), y - (size/2.0), z + (size/2.0) ) );
    faces.insert(faces.end(), new Polygon(f3, new rgb(*color) ) );

    std::vector<Point*> f4;
    f4.insert(f4.end(), new Point(x + size + (size/2.0), y + size - (size/2.0), z - (size/2.0) ) );
    f4.insert(f4.end(), new Point(x + size + (size/2.0), y + size + (size/2.0), z - (size/2.0) ) );
    f4.insert(f4.end(), new Point(x + (size/2.0), y + (size/2.0), z + (size/2.0) ) );
    f4.insert(f4.end(), new Point(x + (size/2.0), y - (size/2.0), z + (size/2.0) ) );
    faces.insert(faces.end(), new Polygon(f4, new rgb(*color) ) );
        

    std::vector<Point*> f5;
    f5.insert(f5.end(), new Point(x + size - (size/2.0), y + size - (size/2.0), z - (size/2.0) ) );
    f5.insert(f5.end(), new Point(x + size + (size/2.0), y + size - (size/2.0), z - (size/2.0) ) );
    f5.insert(f5.end(), new Point(x + (size/2.0), y - (size/2.0), z + (size/2.0) ) );
    f5.insert(f5.end(), new Point(x - (size/2.0), y - (size/2.0), z + (size/2.0) ) );
    faces.insert(faces.end(), new Polygon(f5, new rgb(*color) ) );
        

    std::vector<Point*> f6;
    f6.insert(f6.end(), new Point(x + size - (size/2.0), y + size + (size/2.0), z - (size/2.0) ) );
    f6.insert(f6.end(), new Point(x + size + (size/2.0), y + size + (size/2.0), z - (size/2.0) ) );
    f6.insert(f6.end(), new Point(x + (size/2.0), y + (size/2.0), z + (size/2.0) ) );
    f6.insert(f6.end(), new Point(x - (size/2.0), y + (size/2.0), z + (size/2.0) ) );
    faces.insert(faces.end(), new Polygon(f6, new rgb(*color) ) );

    // for each face
    int i = 0;
    for(auto it = faces.begin(); it != faces.end(); it++) {
        std::cout<<">> Face " << i++ << ": " << std::endl;
        (*it)->print();
    }

}
Cube::~Cube() {}

// render function
void Cube::render() {
    // for each face
    for (auto it = faces.begin(); it != faces.end(); it++) {
        (*it)->render();
    }
}

// get center function
Point* Cube::get_center() {
    double x = 0.0, y = 0.0, z = 0.0, n = 0.0;
    // for each face
    for (auto it = faces.begin(); it != faces.end(); it++) {
        // get face
        auto face = *it;
        // get its center
        Point* center = face->get_center();
        // add to coordinates
        x += center->x;
        y += center->y;
        z += center->z;
        n += 1.0;
        // free memory
        delete center;
    }
    
    // create point
    Point* center = new Point(x/n, y/n, z/n, new rgb(*color) );
    // return center
    return center;
}


// ==========================================================================================================================
// rgb Class
// ==========================================================================================================================

rgb::rgb(float r_, float g_, float b_) : r(r_), g(g_), b(b_) {}
rgb::rgb(const rgb& other) : r(other.r), g(other.g), b(other.b) {}
rgb::rgb() {};
rgb::~rgb() {}

// ==========================================================================================================================
// Object Class
// ==========================================================================================================================

Object::Object() {
    // set parameters to initial values
    tx = ty = tz = angle = 0;
    sx = sy = sz = 1;
    color = new rgb(1.0f, 1.0f, 1.0f);
}

Object::Object(rgb* color_) : color(color_) {
    // set parameters to initial values
    tx = ty = tz = angle = 0;
    sx = sy = sz = 1;

}

Object::~Object() { delete color; }


void Object::render() {}

Point* Object::get_center() { return new Point(0.0, 0.0, 0.0, new rgb(*color)); }

// ==========================================================================================================================
// Virus Class
// ==========================================================================================================================


Virus::Virus(double x_, double y_, double z_, rgb* color_) : x(x_), y(y_), z(z_), Object(color_) {
    // create body ===================================================================
    // body points vector
    std::vector<Point*> body_points;
    body_points.insert(body_points.end(), new Point(x - 5.0, y, z) );
    body_points.insert(body_points.end(), new Point(x - 5.0, y + 50.0, z) );
    body_points.insert(body_points.end(), new Point(x , y + 55.0, z) );
    body_points.insert(body_points.end(), new Point(x + 5.0, y + 50.0, z) );
    body_points.insert(body_points.end(), new Point(x + 5.0, y, z) );
    // create body
    body = new Polygon(body_points, new rgb(*color));

    // create Head ===================================================================
    // head points
    std::vector<Point*> head_points;
    head_points.insert(head_points.end(), new Point(x , y + 55.0, z) );
    head_points.insert(head_points.end(), new Point(x - 13.0, y + 62.0, z) );
    head_points.insert(head_points.end(), new Point(x - 13.0, y + 78.0, z) );
    head_points.insert(head_points.end(), new Point(x , y + 85.0, z) );
    head_points.insert(head_points.end(), new Point(x + 13.0, y + 78.0, z) );
    head_points.insert(head_points.end(), new Point(x + 13.0, y + 62.0, z) );
    // create head
    head = new Polygon(head_points, new rgb(*color));

    // create Head ===================================================================
    // create Line
    legs.insert(legs.end(), new Line(new Point(x -  5.0, y, z), new Point(x - 20.0, y + 15.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x - 20.0, y + 15.0, z), new Point(x - 30.0, y - 10.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x -  5.0, y, z), new Point(x - 40.0, y + 10.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x - 40.0, y + 10.0, z), new Point(x - 60.0, y - 10.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x +  5.0, y, z), new Point(x + 20.0, y + 15.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x + 20.0, y + 15.0, z), new Point(x + 30.0, y - 10.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x +  5.0, y, z), new Point(x + 40.0, y + 10.0, z), color) );
    legs.insert(legs.end(), new Line(new Point(x + 40.0, y + 10.0, z), new Point(x + 60.0, y - 10.0, z), color) );

}

Virus::~Virus() { delete body; delete head; }

// render
void Virus::render() {
    // render body and head
    body->render();
    head->render();
    // for each line
    for (auto it = legs.begin(); it != legs.end(); it++) {
        // render it
        (*it)->render();
    }
    
}

Point* Virus::get_center() { return new Point(x, y, z, new rgb(1.0f, 1.0f, 1.0f)); }

