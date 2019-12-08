
#ifndef WINDOW_H
#define WINDOW_H

#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>
#include <string>
#include "objects.h"

class WindowController {
public:
    // selcted object
    Object* selected;
    // objects
    std::vector<Object*> objects;
    // mode of the controler
    std::string mode;
    // type projection
    std::string projection;

    // projection parameters
    double eye_x, eye_y, eye_z, center_x, center_y, center_z;

    WindowController();
    ~WindowController();

    // transformations
    void input(int, int, int);
    // function to clear objects
    void clear_objects();

    // render objects function
    void render();

};

#endif