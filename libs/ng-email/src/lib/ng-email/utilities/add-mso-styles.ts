import type { Properties } from 'msotype';

function toKebabCase(text: string) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function addMsoStyles(el: HTMLElement): (msoProps: Properties) => void;
export function addMsoStyles(el: HTMLElement, msoProps: Properties): void;
export function addMsoStyles(
  el: HTMLElement,
  props?: Properties
): ((msoProps: Properties) => void) | void {
  const _addMsoStyles = (msoProps: Properties): void => {
    if (!el || !msoProps) return;
    const style = el.getAttribute('style') ?? '';
    const styleWithMso = Object.entries(msoProps).reduce(
      (acc, [key, value]) => {
        const msoKey = toKebabCase(key);
        const msoValue = value.toString();

        if (style.includes(msoKey)) {
          return style.replace(
            new RegExp(`${msoKey}:.*;`),
            `${msoKey}: ${msoValue};`
          );
        }
        return `${acc} ${msoKey}: ${msoValue};`;
      },
      style.length > 0 && style.charAt(style.length - 1) !== ';'
        ? `${style};`
        : style
    );

    el.setAttribute('style', styleWithMso);
  };

  return props ? _addMsoStyles(props) : _addMsoStyles;
}
