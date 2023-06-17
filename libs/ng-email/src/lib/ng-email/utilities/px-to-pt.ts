export function pxToPt(px: string): string | undefined {
  return isNaN(Number(px)) ? undefined : `${(parseInt(px, 10) * 3) / 4}pt`;
}
