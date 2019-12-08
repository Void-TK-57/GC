# Compiler binary:
CPP= g++

# Compiler Flags
CFLAGS = -lglut -lGL -lGLEW -lGLU

# Objects:
OBJECTS = objects.cpp main.cpp window.cpp


# Targets:
all: main

main: $(OBJECTS)
	$(CPP) $(OBJECTS) $(CFLAGS) -o main

test:
	$(CPP) test.cpp $(CFLAGS) -o test

clean:
	rm -f test main