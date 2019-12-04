
#ifndef WINDOW_H
#define WINDOW_H

#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>
#include <string>

class WindowController {
public:
    std::string mode;
    WindowController();
    ~WindowController();

    void input(char);

};

#endif