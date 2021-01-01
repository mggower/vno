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
