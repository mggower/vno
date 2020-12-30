## INITIALIZE

Base is the constructor function

Initialize is a collection of all the methods that do cool stuff

## Initialize.config
- The argument is an object that has 2 required properties
  - Entry
  - Root
- Third optional argument
  - CDN
- Config calls walk
- Config instantiates parser and constructs it with a possible vue argument. If there is no vue argument, it defaults to null, which our parser will default to the default cdn defined in parser. 

## Initialize.walk
- Makes use of the Deno walk method
- Looks for every file component with a .vue extension and we save the name of the file in a constant <label> we create a new component for each vue file. 
- After we instantiate these components, they are saved into global object called storage. 