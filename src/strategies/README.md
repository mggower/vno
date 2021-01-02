# STRATEGIES

## components.ts

- This file defines the constructor function for instantiating each individual component.

#### RunData Method

- When we create a new component, this is run immediately and collects the whole file as a string, and breaks up the file into an array on every new line.
- Each of these components is saved on the global storage

## sibling.ts

- Defines the data structure for the relationship between chidren of the same parent component

#### Add Method

- Establish the location of the current component in the sibling list

#### Scrub Method

- Removes repeat instances of components from the bottom to the top until the final instance of the component is written.

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

# PARSER

- Has one required argument (this.root), and one optional argument (this.vue) which defines the CDN.

## The Utils Folder

- Each function called in the parser.parse method has been defined in it's own file in the utils folder.

## Parser.parse

- Enters a loop (comparable to a BST breadth-first-search) that while the queue (imported from the utils.ts file) has length, we parse through the first index of our queue to seperate the HTML, Javascript, and CSS from each Vue component.

#### Parse Template

- Iterates through the split property on the current component which is the array of data that has been broken up by each "\n". It looks for the <template> tag, saves the date in between the two tags a string onto the current component object's template property.
- We replace the value of the split to remove the data that has already been parsed

#### Parse Script

- Iterates through the new, more concised split property on the current component. This time looking for the <script> tags.
- Inside the script, we isolate the 'name' property, if found, we save it to the name property on the current component. If not, we define the name using the Utils.toKebab() method to traslate any multi-word names into kebab case (e.g. name: 'this-example-name').
- We then find everything inside our export default statement, this value is then saved onto the script property of the current component.
- It then locates the 'components:' property, and uses this portion of the script to find any children relational components and then populate the queue in the correct order and assign the relationships in our data structure.
  - We account for irregularities in construction of the components: property by stringifying the values before attempting to parse.
- If the current component does have children, we instatiate a new SiblingList to track each child relationship
- It then iterates through foundChildren and invokes the SiblingList.add() method to add each child to the previous child as a sibling.

#### Parse Style

- Iterates through the split property on the current component. This time looking for the <style> tags.
- Save the data between the style tags to a string on the current component object's style property.
- REMINDER: Scoped styling currently not supported. Please use unique id tags to style your components.

#### Component Stringify

- Takes the strings from each property on the current object, to assemble the components in the correct order to prepare for the final build.
- Looks to see if the current component is the root. If so, in creates the string as a new Vue instance. If not, it creates the string as a Vue.component.

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


# RENDERER

- This is where we have built the logic to use the built parser to easily boost SEO with Server Side Rendering

# Methods

## Create Renderer

- [ ] Takes two arguments
  - 1. An object of options the user would like to change from the defaults provided in the HTML object defined in the defaults.ts file.
  - 2. A component object defining which file the user would like to create a serveable HTML file(this feature is not yet complete)

## HTML Stringify

- Creates the stringified version of the HTML file to be rendered from the server.
