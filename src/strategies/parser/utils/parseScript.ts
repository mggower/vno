import { ComponentInterface } from "../../../lib/types.ts";

const indexOfRegExp = function iRe(regex: RegExp, array: any[]) {
  return array.findIndex((element) => regex.test(element));
};

const sarahJessicaParker = function sJP(
  array: any[],
  start: number,
  end: number,
) {
  return array.slice(start, end).join("").replace(/(\s)/g, "");
};

const parseScript = function pS(current: ComponentInterface) {
  try {
    const { split } = current;
    if (!split) {
      throw `There was an error locating 'split' data for ${current.label} component`;
    }
    const open: number | undefined = split.indexOf("<script>");
    const close: number | undefined = split.indexOf("</script>");

    if (typeof open !== "number" || typeof close !== "number") {
      throw `There was an error isolating content inside of <script> tags for ${current.label}.vue`;
    }

    const script = split.slice(open + 1, close);

    if (!script) {
      throw `There was an error while reading through the script tag in ${current.label}.vue`;
    }

    const nameIndex = indexOfRegExp(/(name)/, script);

    if (nameIndex < 0) {
      throw `There was an error while identifying the name property inside ${current.label}.vue`;
    }

    current.name = script[nameIndex].split(/[`'"]/)[1];

    const exportStart = indexOfRegExp(/^(export)/, script);
    const exportEnd: number | undefined = script.lastIndexOf("}");

    if (typeof exportStart !== "number" || typeof exportEnd !== "number") {
      throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
    }

    current.script = sarahJessicaParker(script, exportStart + 1, exportEnd);
  
    const cmpsStart = indexOfRegExp(/(components:)/, script);
    const children = cmpsStart > 0 && script.slice(cmpsStart);

    if (children) {
      const cmpsEnd = children.findIndex((element) => element.includes("}"));
      const cmpsString = sarahJessicaParker(children, 0, cmpsEnd + 1);
      let array = cmpsString
        .slice(cmpsString.indexOf("{") + 1, cmpsString.indexOf("}"))
        .split(",")
        .filter((el) => el);

      console.log(
        "child comps",
        array,
      );
    }

    // console.log("components exist?", cmpsStart > 0);
    // const fromComp = script.slice(start + 1);
    // end = fromComp.findIndex((el) => el.includes("}"));
    // // end = fromComp.indexOf("}");
    // console.log("SLICDCOMPON", fromComp);
    // console.log("sliceddd", fromComp.slice(0, end));

    return "parseScript()=> successful";
  } catch (error) {
    console.error("Error inside of Parser.script:", { error });
  }
};

export default parseScript;

/*

function listBuilder(parent: component) {
  parent.child = new (SiblingList as any)();
  while (komponents.length) {
    const str = komponents.pop(); // <-- currently "Orange"
    const descendent = Storage[str]; // <-- storage['Orange'] = component {}
    parent.child?.add(descendent);
  }
  console.log("sibling list", parent.child);
}



/**
 * parser will contain the components of the tree:: cache will be the tree
 *
 * this.root = App;
 * App.child = Green;
 * Green.sibling = Purple
 * Purple.sibling = Orange
 
 * queue = [ Green, Purple, Orange ]
*/
