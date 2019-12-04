
#include "objects.h"


#include <GL/freeglut.h>
#include <GL/gl.h>

// ==========================================================================================================================
// Point Class
// ==========================================================================================================================


Point::Point(double x_, double y_, double z_, rgb color_ ) : x(x_), y(y_), z(z_), color(color_) {}

// function to check collision with a click x, y with a toleranceerance
bool Point::collision(double p_x, double p_y, double p_z, int tolerance = 5) {
    return (x < p_x + tolerance) && (x > p_x - tolerance) && (y < p_y + tolerance) && (y > p_y - tolerance) && (z < p_z + tolerance) && (z > p_z - tolerance);
}

// function to render the point
void Point::render() {
    // begin points
    glBegin(GL_POINTS);
        glColor3f(color.r, color.g, color.b);
        glVertex3f(x, y, z);
    glEnd();
}

// ==========================================================================================================================
// Line Class
// ==========================================================================================================================


Line::Line(Point p1_, Point p2_, rgb color_ ) : p1(p1_), p2(p2_), color(color_) {}


// function to render the point
void Line::render() {
    // begin points
    glBegin(GL_LINES);
        glColor3f(color.r, color.g, color.b);
        glVertex3f(p1.x, p1.y, p1.z);
        glVertex3f(p2.x, p2.y, p2.z);
    glEnd();
}

// ==========================================================================================================================
// Polygon Class
// ==========================================================================================================================


Polygon::Polygon(Point* points_, int n_, rgb color_) : points(points_), n(n_), color(color_) {}
Polygon::~Polygon() { delete[] points }


// function to render the point
void Polygon::render() {
    // begin points
    glBegin(GL_POLYGON);
        glColor3f(color.r, color.g, color.b);
        // for each point
        for (int i = 0; i < n; i++) {
            glVertex3f(points[i].x, points[i].y, points[i].z);
        }
        
    glEnd();
}

// ==========================================================================================================================
// Triangle Class
// ==========================================================================================================================


Triangle::Triangle(Point p1_, Point p2_, Point p3_, rgb color_ ) : p1(p1_), p2(p2_), p3(p3_), color(color_) {}

/* function to check collision with a click x, y with a toleranceerance
bool Line::collision(float p_x, float p_y, int tolerance = 5) {
    return (x < p_x + tolerance) && (x > p_x - tolerance) && (y < p_y + tolerance) && (y > p_y - tolerance);
}
*/

// function to render the point
void Triangle::render() {
    // begin points
    glBegin(GL_TRIANGLES);
        glColor3f(color.r, color.g, color.b);
        glVertex3f(p1.x, p1.y, p1.z);
        glVertex3f(p2.x, p2.y, p2.z);
        glVertex3f(p3.x, p3.y, p3.z);
    glEnd();
}

// ==========================================================================================================================
// Objects Class
// ==========================================================================================================================


Objects::Objects() {
    std::vector< Point > points;
    std::vector< Line > lines;
    std::vector< Triangle > triangles;
    std::vector< Polygon > polygons;
}

void Objects::render() {
    // if its not null, for each elemente call render
    for (auto it = points.begin(); it!=points.end(); ++it) it->render();
    for (auto it = lines.begin(); it!=lines.end(); ++it) it->render();
    for (auto it = triangles.begin(); it!=triangles.end(); ++it) it->render();
    for (auto it = polygons.begin(); it!=polygons.end(); ++it) it->render();
}
