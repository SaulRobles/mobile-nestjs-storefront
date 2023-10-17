export class GlobalService {
  static cleanShopifyResponse(object: any, name: string, res = {}) {
    const keys = Object.keys(object);

    keys.forEach((key) => {
      if (object[key] === null || object[key] === undefined) {
        res[key] = null;
      } else if (Array.isArray(object[key])) {
        if (key !== 'edges') {
          res[key] = object[key];
        } else {
          const aux = object[key].map((ele): any => {
            return {
              cursor: ele?.cursor ? ele.cursor : null,
              ...ele.node,
            };
          });

          const deepAux = aux.map((product): any => {
            return this.cleanShopifyResponse(product, '');
          });

          res[name] = deepAux;
        }
      } else if (typeof object[key] === 'object') {
        return this.cleanShopifyResponse(object[key], key, res);
      } else {
        res[key] = object[key];
      }
    });

    return res;
  }
}
