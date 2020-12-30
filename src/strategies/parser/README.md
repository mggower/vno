## PARSER
- Has one required argument (this.root), and one optional argument (this.vue) which defines the CDN. 

## The Utils Folder
- Each function called in the parser.parse method has been defined in it's own file in the utils folder. 

## Parser.parse
- Enters a loop (comparable to a BST breadth-first-search) that while the queue (imported from the utils.ts file) has length, we parse through the first index of our queue to seperate the HTML, Javascript, and CSS from each Vue component. 

## Parse Template
- Iterates through the split property on the current component which is the array of data that has been broken up by each "\n". It looks for the <template> tag, saves the date in between the two tags a string onto the current component object's template property. 
- We replace the value of the split to remove the data that has already been parsed

## Parse Script
- Iterates through the new, more concised split property on the current component. This time looking for the <script> tags. 
- Inside the script, we isolate the 'name' property, if found, we save it to the name property on the current component. If not, we define the name using the Utils.toKebab() method to traslate any multi-word names into kebab case (e.g. name: 'this-example-name').
- We then find everything inside our export default statement, this value is then saved onto the script property of the current component. 
- It then locates the 'components:' property, and uses this portion of the script to find any children relational components and then populate the queue in the correct order and assign the relationships in our data structure. 
  - We account for irregularities in construction of the components: property by stringifying the values before attempting to parse. 
- If the current component does have children, we instatiate a new SiblingList to track each child relationship
- It then iterates through foundChildren and invokes the SiblingList.add() method to add each child to the previous child as a sibling. 
