# LIBRARY

## Defaults

- Here lives our default values
- [ ] A default CDN for vue
- [ ] A default HTML setting for Server Side Rendering
- [ ] A default VNO_PATH, BUILD_PATH, and STYLE_PATH for the build tool
- [ ] A default IGNORE script to prevent linter errors

## Deps

- Needs no explanation

## Types

- Interface Definitions

## Utils

- [ ] Global Queue - Temporary for the purpose of queueing components to be parsed (i.e. In line for the ride)
- [ ] Global Storage - Holds the components before the parsing begins. Populated by the intialize.ts file via the walk method (i.e. Waiting to get into the park)

#### Utils

- [ ] indexOfRegExp - Takes an array and a regular expression as arguments and returns the first element that passes the regex test.
- [ ] sliceAndTrim - Takes and array and 2 indexes (a start and and end) It then slices the array from the start (inclusive) to the end (exclusive). It then joins them together as a string. And replaces whitespaces greater than one as the default.
- [ ] toKebab - Takes a PascalCase (or UpperCamelCase) string and returns the same string converted to kebab-case.

#### Print - (Artwork by Mikey Gower)

- [ ] Returns a VERY sexy ASCII printout when the parsing is complete
