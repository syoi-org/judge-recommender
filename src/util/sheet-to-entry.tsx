export function sheetToEntry(sheet: any): { cols: any[], data: any[] } {
  const cols = sheet.table.cols.map((col: any) => ({
    label: col.label,
    type: col.type,
  }));

  const sanitizeCell = (cell: any, cellType: string) => {
    if (cell && cell.v) {
      if (cellType === "number")
        return cell.v;
      return cell.v.trim();
    } else {
      if (cellType === "number")
        return 0;
      return "";
    }
  }

  const data = sheet.table.rows.map((row: any) =>
    row.c.map((cell: any, id: any) => [cols[id].label, sanitizeCell(cell, cols[id].type)])
      .reduce((o: Object, [k, v]: [any, any]) => ({ ...o, [k]: v }), {}));

  return { cols, data };
}
