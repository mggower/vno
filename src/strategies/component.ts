import {
  ComponentInterface,
  ParentInterface,
  RootInterface,
  ScriptInterface,
  SiblingInterface,
} from "../lib/types.ts";
import _def from "../lib/defaults.ts";
import SiblingList from "./sibling.ts";
/**
 * Component
 * the component defines the architecture for parsing data
 * it is constructed with file data and then parsed.
 * #endregion
 */
export function createComponent(label: string, path: string): ComponentInterface {
  const sourceRaw = Deno.readTextFileSync(path);
  const split = sourceRaw.split(/\n/);
  return {
    label,
    path,
    sourceRaw,
    split,
    sibling: null,
    isRoot: false,
    isParsed: false,
  };
}

export function saveAsRoot(component: ComponentInterface): RootInterface {
  return {
    ...component,
    isRoot: true,
    vue: _def.CDN,
  };
}

export function saveAsParent(component: ScriptInterface): ParentInterface {
  const child = new SiblingList();
  return {
    ...component,
    child,
  };
}

// const Test = createComponent("Test", "./Test.vue");
// // console.log(Test)
// const Rooty = saveAsRoot(Test);
// // console.log(Rooty);
// const Parent = saveAsParent(Rooty);
// console.log("sluts");
// console.log(Parent);
// class Component implements ComponentInterface {
//   public label: string;
//   public path: string | URL;
//   public isRoot: boolean;
//   public isParsed: boolean;
//   public child: SiblingInterface | null = null;
//   public sibling: ComponentInterface | null = null;
//   public data: any;
//   public sourceRaw: string = "";
//   public vue: string = _def.CDN;
//   public split?: string[] | undefined;
//   public name?: string | undefined;
//   public template?: string | undefined;
//   public script?: string | undefined;
//   public style?: string | undefined;
//   public instance?: string | undefined;
//   public middlecode?: string | undefined;

//   constructor(label: string, path: string, isRoot: boolean = false) {
//     this.label = label;
//     this.path = path;
//     this.isRoot = isRoot;
//     this.isParsed = false;
//     this.runData();
//   }

//   /**
//    * runData is invoked in the constructor
//    * the method reads the vue file and splits the file
//    * into an array of strings broken at each "new line"
//    */
//   public runData(): void {
//     try {
//       if (!this.path) {
//         throw `There was an error identifying the path for ${this.label}`;
//       }
//       this.sourceRaw = Deno.readTextFileSync(this.path);
//       this.split = this.sourceRaw.split(/\n/);
//     } catch (error: any) {
//       console.error(
//         "Error inside of Component.runData():",
//         { error },
//       );
//     }
//   }
// }

// export default Component;
