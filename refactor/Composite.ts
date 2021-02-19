import { App, Factory } from "../lib/types/interfaces.ts";
import DepsList from "./DepsList.ts";
import Primitive from "./Primitive.ts";
import { _ } from "../lib/deps.ts";
import utils from "../lib/utils.ts";

export default class Composite extends Primitive implements App.Composite {
  public type: "composite";
  public child: Factory.DepsList;

  constructor(obj: Primitive) {
    super(obj.label, obj.path);
    this.type = "composite";
    this.child = new DepsList();
    this.label = obj.label;
    this.path = obj.path;
    this.sourceRaw = obj.sourceRaw;
    this.split = obj.split;
    this.name = obj.name;
    this.sibling = obj.sibling;
    this.template = obj.template;
    this.script = obj.script;
    this.middlecode = obj.middlecode;
    this.style = obj.style;
    this.instance = obj.instance;
    this.isParsed = obj.isParsed;
  }

  public attachChildren(
    children: string[],
    storage: Factory.Storage,
    queue: Factory.Queue,
  ) {
    const componentsEnd = children.findIndex((el: any) => el.includes("}")) + 1;
    const componentsStr = utils.sliceAndTrim(children, 0, componentsEnd);

    // iter becomes a string[] of any child component's label
    const iter: string[] = _.compact(
      utils.trimAndSplit(
        componentsStr,
        componentsStr.indexOf("{") + 1,
        componentsStr.indexOf("}"),
      ),
    );
    const childComponents: App.Component[] = iter.map((child: string) =>
      storage.app[child]
    );

    while (childComponents.length) {
      const component = childComponents.pop() as App.Component;
      if (component === undefined) continue;

      if (!component.isParsed) queue.enqueue(component);
      utils.preorderScrub(component.label, this, storage);
      this.child?.add(component);
    }
  }
}
