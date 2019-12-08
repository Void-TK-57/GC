
#ifndef POINT_H
#define POINT_H

#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>


class rgb {
public:
    float r, g, b;

    rgb(float, float, float);
    rgb(const rgb&);
    rgb();
    ~rgb();
};

// for c++ shitty header things
class Point;

class Object {
public:
    // transformations parameters
    double tx, ty, tz, sx, sy, sz, angle;
    // color
    rgb* color;
    
    Object();
    Object(rgb*);
    ~Object();

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

};

class Point : public Object{
public:
    double x, y, z;
    Point(double, double, double, rgb*);
    Point(double, double, double);
    Point();
    ~Point();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

    // print function
    void print();
    
};

class Line : public Object{
public:
    Point* p1, *p2;
    Line(Point*, Point*, rgb*);
    Line(Point*, Point*);
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
    std::vector<Point*> points;
    Polygon(std::vector<Point*>, rgb*);
    Polygon(std::vector<Point*>);
    Polygon();
    ~Polygon();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

    // print points
    void print();
};

class Triangle : public Object {
public:
    Point* p1, *p2, *p3;
    Triangle(Point*, Point*, Point*, rgb*);
    Triangle(Point*, Point*, Point*);
    ~Triangle();

    bool collision(double, double, double, int);

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();
};

class Cube : public Object {
public:
    std::vector<Polygon*> faces;
    Cube(double, double, double, double, rgb*);
    Cube(double, double, double, double);
    ~Cube();

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();
    
};

// example for test (virus object)
class Virus : public Object {
public:
    std::vector<Line*> legs;
    Polygon* head;
    Polygon* body;
    double x, y, z;

    Virus(double, double, double, rgb*);
    ~Virus();

    // render function
    virtual void render();

    // get center function
    virtual Point* get_center();

};
 

#endif