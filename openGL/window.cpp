#include <GL/freeglut.h>
#include <GL/gl.h>
#include <vector>
#include <string>
#include "window.h"
#define _USE_MATH_DEFINES
#include <cmath>
#include <iostream>

WindowController::WindowController() {
    mode = "light";
    projection = "perspective"; // perspective
    // ligthning
    ambient = specular = difuse = 1;


    selected = nullptr;
    eye_x = eye_y = center_x = center_y = center_z = 0.0;
    eye_z = 2.0*250.0;
    
    // anbient light
    GLfloat ambient_light[] = {0.1f, 0.1f, 0.1f, 1.0f}; 
    // set light
    glLightfv( GL_LIGHT1, GL_AMBIENT, ambient_light);
    std::cout<<">> Turing on Ambient Light"<<std::endl; 
    // difuse light
    GLfloat difuse_light[] = {0.4f, 0.4f, 0.4f, 1.0f};
    // set light
    glLightfv( GL_LIGHT1, GL_DIFFUSE, difuse_light);
    std::cout<<">> Turing on Difuse Light"<<std::endl;
    // specular light
    GLfloat specular_light[] = {1.0f, 1.0f, 1.0f, 1.0f};
    // set light
    glLightfv( GL_LIGHT1, GL_SPECULAR, specular_light);
    std::cout<<">> Turing on Specular Light"<<std::endl;
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
            //selected->alpha = std::fmod(selected->alpha - 360.0*side*0.01, 360.0);
            selected->alpha = selected->alpha - 360.0*side*0.01;
            //selected->beta = std::fmod(selected->beta - 360.0*upwards*0.01, 360.0);
            selected->beta = selected->beta - 360.0*upwards*0.01;
            //selected->gamma = std::fmod(selected->gamma - 360.0*near*0.01, 360.0);
            selected->gamma = selected->gamma - 360.0*near*0.01;
        
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
        } else if (mode == "light") {
	            
            if (near == 1) {
                // anbient light
                GLfloat ambient_light[] = {0.1f, 0.1f, 0.1f, 1.0f}; 
                // set light
                glLightfv( GL_LIGHT1, GL_AMBIENT, ambient_light);
                std::cout<<">> Turing on Ambient Light"<<std::endl; 
                
            } else if (near == -1){
                // anbient light
                GLfloat ambient_light[] = {0.0f, 0.0f, 0.0f, 1.0f}; 
                // set light
                glLightfv( GL_LIGHT1, GL_AMBIENT, ambient_light);
                std::cout<<">> Turing off Ambient Light"<<std::endl; 
            } 
            if (side == 1) {
                // difuse light
                GLfloat difuse_light[] = {0.4f, 0.4f, 0.4f, 1.0f};
                // set light
                glLightfv( GL_LIGHT1, GL_DIFFUSE, difuse_light);
                std::cout<<">> Turing on Difuse Light"<<std::endl;
                
            } else if (side == -1){
                // difuse light
                GLfloat difuse_light[] = {0.0f, 0.0f, 0.0f, 1.0f}; 
                // set light
                glLightfv( GL_LIGHT1, GL_DIFFUSE, difuse_light);
                std::cout<<">> Turing off Difuse Light"<<std::endl;
            } 
            if (upwards == 1) {
                // specular light
                GLfloat specular_light[] = {1.0f, 1.0f, 1.0f, 1.0f};
                // set light
                glLightfv( GL_LIGHT1, GL_SPECULAR, specular_light);
                std::cout<<">> Turing on Specular Light"<<std::endl;
                
            } else if (upwards == -1){
                // specular light
                GLfloat specular_light[] = {0.0f, 0.0f, 0.0f, 1.0f}; 
                // set light
                glLightfv( GL_LIGHT1, GL_SPECULAR, specular_light);
                std::cout<<">> Turing off Specular Light"<<std::endl;
            } 
            
        }
    }
}

void WindowController::render() {    
    // light position
	GLfloat light_pos[] = {100.0f, 100.0f, -120.0f, 1.0f}; 
	
	// call render for each element
    for (auto it = objects.begin(); it!=objects.end(); ++it) {
        // get element
        auto object = *it;
        // push matrix to save
        glPushMatrix();
        glLightfv(GL_LIGHT1, GL_POSITION, light_pos);

        // get object center
        Point* center = object->get_center();

        // translate for object center
        glTranslated(center->x, center->y, center->z);


        // rotate, scale and then translate
        glTranslated(object->tx, object->ty, object->tz);
        glRotated(object->alpha, 0.0, 0.0, 1.0);
        glRotated(object->beta, 0.0, 1.0, 0.0);
        glRotated(object->gamma, 1.0, 0.0, 0.0);
        glScaled(object->sx, object->sy, object->sz);

        // return to original center
        glTranslated(-1.0*center->x, -1.0*center->y, -1.0*center->z);
        
        // set material
        float ambient_material[4] = {0.0f, 0.0f, 0.8f, 1.0f };
        float difuse_material[4] = {0.5f, 0.5f, 0.9f, 1.0f };
        float specular_material[4] = {0.6f, 0.6f, 0.9f, 1.0f };
        float shiny_material[4] = {0.5f, 0.5f, 0.95f, 1.0f };
        glMaterialfv(GL_FRONT, GL_AMBIENT, ambient_material );
        glMaterialfv(GL_FRONT, GL_DIFFUSE, difuse_material );
        glMaterialfv(GL_FRONT, GL_SPECULAR, specular_material );
        glMaterialfv(GL_FRONT, GL_SHININESS, shiny_material );
        

        // call element render function
        // object->render();
        glutSolidSphere(50.0, 36, 36);
        

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


