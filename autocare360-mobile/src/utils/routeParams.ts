export function leerIdPositivo(idParam: string | string[] | undefined): number | null {
  if (!idParam) return null;
  const idStr = Array.isArray(idParam) ? idParam[0] : idParam;
  if (!idStr || !/^\d+$/.test(idStr)) return null;
  const num = Number(idStr);
  return Number.isSafeInteger(num) && num > 0 ? num : null;
}
