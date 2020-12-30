# COMPILER

## Base

- This is the constructor for the compiler object.
- Establishes the Vue import as defined earlier in initialize.
- Dynamically creates the App.\$mount statment to be written at the bottom of the file.

## Compiler

#### Build Method

- Prepares the file structure to write our bundle
- This includes a build.js file and a style.css file
- Checks if the vno-build directory exists. If so, it overwrites to prevent appending onto old builds. If not, it creates the directory
- Checks to see if the build.js and style.css files exist. If so, they are overwritten. If not, they are created and populated.

#### Traverse Method

- Starting at the root, recursively moves down the component tree until it finds a node without a child or sibling.
- It then calls the write method on the node and pops off the stack, until we reach the root component.
- Ensures that the individual files are written in the correct order so the children are always written before the parents.

#### Write Method

- Checks to see if the current component has an instance. It then writes the value of instance into the build.js file.
- Checks to see if the current component has style. It then writes the value of style into the style.css file.
