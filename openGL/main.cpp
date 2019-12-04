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
    Point p( 500.0, 500.0, 0.5, rgb(1.0f, 1.0f, 1.0f));
    // add
    objects->points.push_back(p);
    //glClear(GL_COLOR_BUFFER_BIT);
}

// render window
void render_window() {
    // set background
    glClearColor(0.0, 0.0, 0.0, 0.0);
    // render objects
    objects->render();
    // flush
    glFlush();
}

// main function
int main(int argc, char** argv) {
    // init 
    glutInit(&argc, argv);
    // set display mode
    glutInitDisplayMode(GLUT_SINGLE);
    // set widow size
    glutInitWindowSize(500,500);
    // set init position
    glutInitWindowPosition(100,100);
    // set ortho
    glOrtho(0, 500, 0, 500, -1, 1);
    // set window title
    glutCreateWindow("GC");
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