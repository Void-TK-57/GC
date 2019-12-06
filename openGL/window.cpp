#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>
#include <string>
#include "window.h"
#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>

WindowController::WindowController() {mode = "translate"; selected = nullptr;}
WindowController::~WindowController() {}

// input function
void WindowController::input(int side, int upwards) {
    // check if selected object is not nullptr
    if (selected != nullptr) {
        // check mode
        if (mode == "translate") {
            selected->tx+=50*side;
            selected->ty+=50*upwards;
        } else if (mode == "rotate") {
            selected->angle = std::fmod(selected->angle + M_PI*side*0.25, M_PI);
            std::cout <<">> Angle: "<< selected->angle << std::endl;
        } else if (mode == "scale") {
            selected->sx *= std::pow( 2.00, (double) upwards );
            selected->sy *= std::pow( 2.00, (double) upwards );
        }
    }
}

void WindowController::render() {
    // call render for each element
    for (auto it = objects.begin(); it!=objects.end(); ++it) {
        // get element
        auto object = *it;
        // push matrix to save
        glPushMatrix();

        // get object center
        Point* center = object->get_center();

        // translate for object center
        glTranslated(-1.0*center->x, -1.0*center->y, -1.0*center->z);
        // rotate, scale and then translate
        glRotated(object->angle, 0.0, 0.0, 1.0);
        glScaled(object->sx, object->sy, object->sz);
        glTranslated(object->tx, object->ty, object->tz);
        // return to original center
        glTranslated(center->x, center->y, center->z);

        // call element render function
        object->render();

        // delete center point
        delete center;

        // pop matrix to restore
        glPopMatrix();
    }
}


// function to clear objects
void WindowController::clear_objects() {
    // call render for each element
    for (auto it = objects.begin(); it!=objects.end(); ++it) {
        // get elemente
        auto element = *it;
        // delete it
        delete[] element;
    }
    // clear vector
    objects.clear();
}

