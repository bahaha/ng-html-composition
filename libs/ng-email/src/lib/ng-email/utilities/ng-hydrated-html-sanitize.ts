const attributesOnPrefix = (prefix: string) =>
  new RegExp(` ${prefix}[a-zA-Z0-9-]+="[^"]*"`, 'g');

export function sanitize(hydratedHtml: string): string {
  return (hydratedHtml ?? '')
    .replace(attributesOnPrefix('_ng'), '')
    .replace(attributesOnPrefix('cc'), '');
}
