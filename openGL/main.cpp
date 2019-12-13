#include <GL/freeglut.h>
#include <GL/gl.h>

#include "objects.h"
#include "window.h"
#include <iostream>

// window controller
WindowController* control;

// create objets
void create_objects() { 
    // create virus
    // Virus* p = new Virus(250.0, 400.0, 2.0 , new rgb(1.0f, 1.0f, 1.0f)); // 249.0f/255.0f, 134.0f/255.0f, 167.0f/255.0f

    // Cube* c = new Cube(0.0, 0.0, 0.0, 50.0, new rgb(0.318f, 0.835f, 0.498f) );
    // create point for reference of the sphere
    Point* p = new Point(0.0, 0.0, 0.0, new rgb(0.1f, 0.1f, 0.1f));
    
    // add
    // control->objects.push_back(p);
    control->objects.push_back(p);
    
    // set selected
    control->selected = p;
    
}

// keyboard event handler by char
void keyboard_evnet_handler(unsigned char key, int x, int y) {
    switch (key) {
        case 't': 
            control->mode = "translate"; 
            std::cout<<">> Changing to Translation Mode"<<std::endl; 
            break;
        case 'r': 
            control->mode = "rotate"; 
            std::cout<<">> Changing to Rotation Mode"<<std::endl; 
            break;
        case 's': 
            control->mode = "scale"; 
            std::cout<<">> Changing to Scale Mode"<<std::endl; 
            break;
        case 'c':
            control->mode = "camera"; 
            std::cout<<">> Changing to Camera Mode"<<std::endl; 
            break;
        case 'l':
            control->mode = "light"; 
            std::cout<<">> Changing to Lightning Mode"<<std::endl; 
            break;
        case 'o':
            control->projection = "orthogonal"; 
            std::cout<<">> Changing to Orthogonal Mode"<<std::endl; 
            break;
        case 'p':
            control->projection = "perspective"; 
            std::cout<<">> Changing to Perspective Mode"<<std::endl; 
            break;
        case '-':
            control->input(0, 0, -1);
            break;
        case '+':
            control->input(0, 0, 1);
            break;
    }
    // redisplay
    glutPostRedisplay();
}

// keyboard event handler by int
void keyboard_evnet_handler(int key, int x, int y) {
    switch (key) {
        case GLUT_KEY_UP:
            control->input(0, 1, 0);
            break;
        case GLUT_KEY_DOWN:
            control->input(0, -1, 0);
            break;
        case GLUT_KEY_LEFT:
            control->input(-1, 0, 0);
            break;
        case GLUT_KEY_RIGHT:
            control->input(1, 0, 0);
            break;
    }
    // redisplay
    glutPostRedisplay();
}


// reshape function
void reshape(int w, int h){
    // viewport
    glViewport(0, 0, (GLsizei) w, (GLsizei) h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    // check type of projection
    if (control->projection == "orthogonal") {
        glOrtho(-250.0, 250.0, -250.0, 250.0, 250.0*1.5, 250.0*20.0);
    } else if (control->projection == "perspective") {
        glFrustum(-250.0, 250.0, -250.0, 250.0, 250.0*1.5, 250.0*20.0);
    }
    glMatrixMode(GL_MODELVIEW);
}

// render window
void render_window() {
    // get size
    double width = glutGet(GLUT_WINDOW_WIDTH);
    double height = glutGet(GLUT_WINDOW_HEIGHT);
    // reshape
    reshape(width, height);
    // set background
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glClear(GL_COLOR_BUFFER_BIT);
    glLoadIdentity();
    // look at
    gluLookAt(control->eye_x, control->eye_y, control->eye_z, control->center_x, control->center_y, control->center_z, 0.0, 1.0, 0.0);
    // render objects
    control->render();
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
    // enable light
    glEnable(GL_LIGHTING); 
	// glEnable(GL_LIGHT0); 
	glEnable(GL_LIGHT1); 
	glEnable(GL_NORMALIZE); 

    // create window controller
    std::cout<<">> Creating control"<<std::endl;
    control = new WindowController;
    
	
    // reshape
    reshape(500, 500);
    
}

// main function
int main(int argc, char** argv) {
    // init 
    std::cout<<">> openGL init"<<std::endl;
    glutInit(&argc, argv);
    // init window
    std::cout<<">> openGL paramter init"<<std::endl;
    init();
    // create objects
    std::cout<<">> Creating Objects"<<std::endl;
    create_objects();
    // set render function
    std::cout<<">> Setting Render Function"<<std::endl;
    glutDisplayFunc(render_window);
    // set reshape function
    std::cout<<">> Setting Reshape Function"<<std::endl;
    glutReshapeFunc(reshape);
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