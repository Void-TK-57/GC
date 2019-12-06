
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
    // mode of the tr
    std::string mode;

    WindowController();
    ~WindowController();

    // transformations
    void input(int, int);
    // function to clear objects
    void clear_objects();

    // render function
    void render();

};

#endif