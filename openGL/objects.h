
#ifndef POINT_H
#define POINT_H

#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>


class rgb {
public:
    float r, g, b;

    rgb(float, float, float);
    rgb();
    ~rgb();
};

// for c++ shity header things
class Point;

class Object {
public:
    Object();
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

};

class Point : public Object{
public:
    double x, y, z;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    rgb color; 
    Point(double, double, double, rgb);
    Point();
    ~Point();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

    
};

class Line : public Object{
public:
    Point p1, p2;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    rgb color; 
    Line(Point, Point, rgb);
    Line();
    ~Line();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();
};

class Polygon : public Object{
public:
    Point* points;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    int n;
    rgb color; 
    Polygon(Point*, int, rgb);
    Polygon();
    ~Polygon();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();
};

class Triangle : public Object {
public:
    Point p1, p2, p3;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    rgb color; 
    Triangle(Point, Point, Point, rgb);
    ~Triangle();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();
};

// example for test (virus object)

class Virus : public Object {
public:
    int n_legs;
    Line* legs;
    Polygon head;
    Polygon body;
    double x, y, z;

    Virus(double, double, double);
    ~Virus();

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

};
 

#endif