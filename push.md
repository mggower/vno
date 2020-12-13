# build method

### file system

deleted:

- HeyGirl.vue
- App.vue in root directory (copy inside repo parsingVNO)
- ALL files inside of strategies directory (i.e. traverse.ts, parseImport, parseScript)
- vnoParserCompleted
- testTake2.js
- test.js (inside and outside /src)

renamed:

- green --> Green.vue
- orange --> Orange.vue
- purple --> Purple.vue
- red --> Red.vue

### vno-parser.ts

- export default vno
- change interface component property 'name' to 'label'
- converted into a class, exports the instance
- the class implements a typescript interface
- added property 'root' to the class; this will define the component trees root immediately to be referenced later as needed.
- introduced the build and instance methods
- the build method writes javascript into vno-build/build.js
- the instance method writes out the proper invocation of vue as a string
- added cute ascii to the console
- added types.ts for typescript definitions.
