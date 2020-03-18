import "core-js/stable";
import "regenerator-runtime/runtime";
import * as Utils from "./utils";
import * as Apis from "./apis";
import Item from "./classes/Item";

export async function main(): Promise<number> {
  // call api
  const apiResult = await Apis.getItems(10);

  // call Class constructor
  const items = apiResult.items.map(data => new Item(data));

  // return value
  return Utils.sum(...items.map(i => i.taxIncludedPrice));
}

const MY_NAMESPACE = {
  main
};
// export to window
if (typeof window !== "undefined") {
  (function() {
    (<any>window).MY_NAMESPACE = MY_NAMESPACE;
  })();
}
