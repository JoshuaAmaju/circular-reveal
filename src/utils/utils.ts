export function getRect(element: Element): any {
  return element.getBoundingClientRect();
}

export function getBounds(str: string) {
  const bounds = str.split(",");
  return {
    top: parseFloat(bounds[0]),
    left: parseFloat(bounds[1]),
    width: parseFloat(bounds[2]),
    height: parseFloat(bounds[3])
  };
}
