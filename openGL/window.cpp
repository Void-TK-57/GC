#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>
#include <string>
#include "window.h"
#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>

WindowController::WindowController() {
    mode = "camera";
    projection = "orthogonal"; // perspective
    selected = nullptr;
    eye_x = eye_y = center_x = center_y = center_z = 0.0;
    eye_z = 5.0*250.0;
}
WindowController::~WindowController() {}

// input function
void WindowController::input(int side, int upwards, int near) {
    // check if selected object is not nullptr
    if (selected != nullptr) {
        // check mode
        if (mode == "translate") {
            selected->tx+=10*side;
            selected->ty+=10*upwards;
            selected->tz+=10*near;

        } else if (mode == "rotate") {
            selected->angle = std::fmod(selected->angle - 360.0*side*0.01, 360.0);
        
        } else if (mode == "scale") {
            selected->sx *= std::pow( 1.05, (double) upwards );
            selected->sy *= std::pow( 1.05, (double) upwards );
        } else if (mode == "camera") {
            eye_x -= 15.0*side;
            eye_y -= 15.0*upwards;
            eye_z -= 15.0*near;
            center_x -= 15.0*side;
            center_y -= 15.0*upwards;
            center_z -= 15.0*near;
            std::cout<<">> Changing Camera = x: "<<eye_x<<", y: "<<eye_y<<", z: "<<eye_z<<std::endl; 
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
        glTranslated(center->x, center->y, center->z);

        // rotate, scale and then translate
        glTranslated(object->tx, object->ty, object->tz);
        glRotated(object->angle, 0.0, 0.0, 1.0);
        glScaled(object->sx, object->sy, object->sz);

        // return to original center
        glTranslated(-1.0*center->x, -1.0*center->y, -1.0*center->z);
        
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


