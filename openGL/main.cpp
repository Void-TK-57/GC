#include <GL/freeglut.h>
#include <GL/gl.h>

#include "objects.h"

// global objects
Objects* objects;

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
    // set render function
    glutDisplayFunc(render_window);
    // main loop
    glutMainLoop();    
    // delete objects
    delete[] objects;
    return 0;
}