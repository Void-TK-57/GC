
#ifndef POINT_H
#define POINT_H

#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>

// color struct
class rgb {
public:
    float r, g, b;

    rgb(float, float, float);
    ~rgb();
};

class Point {
public:
    double x, y, z;
    rgb color; 
    Point(double, double, double, rgb);
    ~Point();

    bool collision(double, double, double, int);

    void render();
};

class Line {
public:
    Point p1, p2;
    rgb color; 
    Line(Point, Point, rgb);
    ~Line();

    bool collision(double, double, double, int);

    void render();
};

class Polygon {
public:
    Point* points;
    int n;
    rgb color; 
    Polygon(Point*, int, rgb);
    ~Polygon();

    bool collision(double, double, double, int);

    void render();
};

class Triangle {
public:
    Point p1, p2, p3;
    rgb color; 
    Triangle(Point, Point, Point, rgb);
    ~Triangle();

    bool collision(double, double, double, int);

    void render();
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

    void render();

};

#endif