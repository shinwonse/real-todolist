const notRenderValues = [undefined, null, false];

const filterValue = (value) => (notRenderValues.includes(value) ? '' : value);

export function bind(template) {
  template = template.replace(/<!--(.*)-->/g, '');
  return template.replace(/{{\s*[\w.+? ()]+\s*}}/g, (mustache) => {
    return eval(mustache.match(/[\w.?+ ()]+/)[0]);
  });
  // .split('.')
  // .reduce((acc, current, index, src) => {
  //   if (!acc) {
  //     return filterValue(acc);
  //   }
  //   if (current[current.length - 1] === '?') {
  //     const result = current.slice(0, current.length - 1);
  //     return filterValue(acc[result]);
  //   }
  //   if (index !== src.length - 1 && !acc[current]) {
  //     throw ReferenceError(
  //       `${JSON.stringify(acc, null, 2)} 에는 ${current}가 없어요!`
  //     );
  //   }
  //   return filterValue(acc[current]);
  // }, state)
}
