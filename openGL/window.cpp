#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>
#include <string>
#include "window.h"
#include <cmath>

WindowController::WindowController() {mode = "translate"; selected = nullptr;}
WindowController::~WindowController() {}

// input function
void WindowController::input(int side, int upwards) {
    // check if selected object is not nullptr
    if (selected != nullptr) {
        // check mode
        if (mode == "translate") {
            selected->tx+=10*side;
            selected->ty+=10*upwards;
        } else if (mode == "rotate") {
            selected->angle += side;
        } else if (mode == "scale") {
            selected->sx *= std::pow( 1.01, (double) side );
            selected->sy *= std::pow( 1.01, (double) upwards );
        }
    }
}

void WindowController::render() {
    // call render for each element
    for (auto it = objects.begin(); it!=objects.end(); ++it) {
        // get element
        auto element = *it;
        // call element render function
        element->render();
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

