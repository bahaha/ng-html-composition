const attributesOnPrefix = (prefix: string) =>
  new RegExp(` ${prefix}[a-zA-Z0-9-]+="[^"]*"`, 'g');

const elementsOnPrefix = (prefix: string) =>
  new RegExp(`<${prefix}-[^>]*>((.|\\n)*?)<\\/${prefix}-[^>]*>`, 'g');

export function sanitize(hydratedHtml: string): string {
  return (hydratedHtml ?? '')
    .replace(attributesOnPrefix('_ng'), '')
    .replace(attributesOnPrefix('ng-'), '')
    .replace(attributesOnPrefix('cc'), '')
    .replace(elementsOnPrefix('cc'), '$1');
}
