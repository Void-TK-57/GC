#include <GL/freeglut.h>
#include <GL/gl.h>

#include "objects.h"
#include "window.h"
#include <iostream>

// global
Objects* objects;
WindowController* control;

// create objets
void create_objects() {   
    // allocate memory
    objects = new Objects;

    // point
    Point p1( 500.0, 500.0, 0.5, rgb(1.0f, 1.0f, 1.0f));
    Point p2( 250.0, 250.0, 0.2, rgb(1.0f, 1.0f, 1.0f));
    Line l(p1, p2, rgb(1.0f, 1.0f, 1.0f));
    // add
    objects->lines.push_back(l);
}

// render window
void render_window() {
    // set background
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glClear(GL_COLOR_BUFFER_BIT);
    // render objects
    objects->render();
    // flush
    glFlush();
}

// keyboard event handler
void keyboard_evnet_handler(unsigned char key, int x, int y) {
    switch (key) {
        case 't': control->mode = "translate"; std::cout<<"Changing to Translation Mode"<<std::endl; break;
        case 'r': control->mode = "rotation"; std::cout<<"Changing to Rotation Mode"<<std::endl; break;
        case 'e': control->mode = "scale"; std::cout<<"Changing to Scale Mode"<<std::endl; break;
        default: break;
    }
}


// init function 
void init() {
    // set display mode
    glutInitDisplayMode(GLUT_SINGLE);

    // set widow size
    glutInitWindowSize(500,500);
    // set init position
    glutInitWindowPosition(100,100);
    // set window title
    glutCreateWindow("GC");

    // clear color
    glClearColor(0.0, 0.0, 0.0, 0.0);
    // matrix mode
    glMatrixMode(GL_PROJECTION);
    // load identity
    glLoadIdentity();
    // set ortho
    glOrtho(0, 500, 0, 500, -1.0, 1.0);
    
}

// main function
int main(int argc, char** argv) {
    // init 
    glutInit(&argc, argv);
    // init window
    init();
    // create objects
    create_objects();
    // create window controller
    control = new WindowController;
    // set render function
    glutDisplayFunc(render_window);
    // set keyboard event handler
    glutKeyboardFunc(keyboard_evnet_handler);
    // main loop
    glutMainLoop();    
    // delete objects
    delete[] objects;
    delete[] control;
    return 0;
}