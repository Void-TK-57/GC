#include <GL/freeglut.h>
#include <GL/gl.h>

#include "objects.h"
#include "window.h"
#include <iostream>

// window controller
WindowController* control;

// create objets
void create_objects() { 
    // point
    Point p1( 300.0, 200.0, -1.0, rgb(1.0f, 1.0f, 1.0f));
    Point p2( 250.0, 250.0, 1.0, rgb(1.0f, 1.0f, 1.0f));
    Point p3( 200.0, 200.0, -1.0, rgb(1.0f, 1.0f, 1.0f));
    Triangle* t = new Triangle(p1, p2, p3, rgb(0.0f, 0.0f, 1.0f));
    // add
    control->objects.push_back(t);
    // set selected
    control->selected = t;
}

// render window
void render_window() {
    // set background
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glClear(GL_COLOR_BUFFER_BIT);
    // render objects
    control->render();
    // flush
    glFlush();
}

// keyboard event handler by char
void keyboard_evnet_handler(unsigned char key, int x, int y) {
    switch (key) {
        case 't': 
            control->mode = "translate"; 
            std::cout<<">> Changing to Translation Mode"<<std::endl; 
            break;
        case 'r': 
            control->mode = "rotation"; 
            std::cout<<">> Changing to Rotation Mode"<<std::endl; 
            break;
        case 'e': 
            control->mode = "scale"; 
            std::cout<<">> Changing to Scale Mode"<<std::endl; 
            break;
    }
}

// keyboard event handler by int
void keyboard_evnet_handler(int key, int x, int y) {
    switch (key) {
        case GLUT_KEY_UP:
            control->input(0, 1);
            break;
        case GLUT_KEY_DOWN:
            control->input(0, -1);
            break;
        case GLUT_KEY_LEFT:
            control->input(-1, 0);
            break;
        case GLUT_KEY_RIGHT:
            control->input(1, 0);
            break;
    }
    // redisplay
    glutPostRedisplay();
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
    std::cout<<">> openGL init"<<std::endl;
    glutInit(&argc, argv);
    // init window
    std::cout<<">> openGL paramter init"<<std::endl;
    init();
    // create window controller
    std::cout<<">> Creating control"<<std::endl;
    control = new WindowController;
    // create objects
    std::cout<<">> Creating Objects"<<std::endl;
    create_objects();
    // set render function
    std::cout<<">> Setting Render Function"<<std::endl;
    glutDisplayFunc(render_window);
    // set keyboard event handler for nornal and special
    std::cout<<">> Setting Keyboard Events"<<std::endl;
    glutKeyboardFunc(keyboard_evnet_handler);
    glutSpecialFunc(keyboard_evnet_handler);
    // main loop
    std::cout<<">> Starting Main Loop"<<std::endl;
    glutMainLoop();    
    // delete objects
    std::cout<<">> Cleaning Memory"<<std::endl;
    control->clear_objects();
    delete[] control;

    return 0;
}