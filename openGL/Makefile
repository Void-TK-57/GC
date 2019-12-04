# Compiler binary:
CPP= g++

# Compiler Flags
CFLAGS = -lglut -lGL -lGLEW -lGLU

# Objects:
OBJECTS = objects.cpp main.cpp


# Targets:
all: main

main: $(OBJECTS)
	$(CPP) $(OBJECTS) $(CFLAGS) -o main

clean:
	rm -f main