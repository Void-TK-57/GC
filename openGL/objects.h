
#ifndef POINT_H
#define POINT_H

#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>


class rgb {
public:
    float r, g, b;

    rgb(float, float, float);
    ~rgb();
};

class Object {
public:
    Object();
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    // render function
    virtual void render();
    // get center function
    
};

class Point : public Object{
public:
    double x, y, z;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    rgb color; 
    Point(double, double, double, rgb);
    ~Point();

    bool collision(double, double, double, int);

    virtual void render();
};

class Line : public Object{
public:
    Point p1, p2;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    rgb color; 
    Line(Point, Point, rgb);
    ~Line();

    bool collision(double, double, double, int);

    virtual void render();
};

class Polygon : public Object{
public:
    Point* points;
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    int n;
    rgb color; 
    Polygon(Point*, int, rgb);
    ~Polygon();

    bool collision(double, double, double, int);

    virtual void render();
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

    virtual void render();
};


// objects class
class Objects {
public:
    // vector of objects
    std::vector< Point > points;
    std::vector< Line > lines;
    std::vector< Triangle > triangles;
    std::vector< Polygon > polygons;
    
    // constructor
    Objects();
    ~Objects();

    virtual void render();

};

#endif