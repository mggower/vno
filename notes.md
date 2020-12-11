#notes

_future tests_

- Test to be sure all components have a 'name' property


## Parsing Ideation

function VNO.parse(component) {
- Argument for method is an object 
  - component = { name, pathname }
- component object is pushed into the `queue`
- loop through the queue, *while* it has length,
- inside a loop
--> access parsing function () =>
- parse function will read data, and pick apart each portion to provide a fuller deep dive of the components parts
- after the function, we will access the 'imports' property of this object, in order to push its children into the queue
- in this portion, it will be important to check the cache for any objects that may or may not have already been parsed.
- after a component has been parsed and picked for child components it is pushed into the cache
- after loop, enter a write function which will write our data to a new file inside of the vno-build directory.