
/**
  * parser object interface vno contains the methods used during the parsing
  * process. all methods are called inside of 'parse', which then constructs
  * our cache of components and are sent through the build process.
  */

/**
  * The queue is used to line up component files that have not yet been parsed.
  * After parsing, the componet object is pushed into the cache for build.
  */


/**
  * parse is an async method that will be invoked with the application root
  * to begin app parsing. Parse calls all vno methods.
  * @param root ;; a component object { name, path }
  */
/**
 * init will read the components file and break apart the data once,
 * this will limit the amount of times the data must be mutated
 * hopefully to limit the time complexity of our parser
 * @params current: component ;; the component currently being parsed;
 */

/**
 * instance method writes the appropriate vue instance to prep for build
 * @params: current = component object;
 */

/**
   * script parses through <script> tags, and then
   * adds to the 'script' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */

/**
   * style parses through <style> tags, and then
   * adds to the 'style' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */

/**
   * template parses through <template> tags, and then
   * adds to the 'template' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */