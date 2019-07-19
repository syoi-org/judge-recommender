function sheetToEntry(sheet) {
  const cols = sheet.table.cols.map((col) => ({
    label: col.label,
    type: col.type,
  }));

  const sanitizeCell = (cell, cellType) => {
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

  const data = sheet.table.rows.map((row) =>
    row.c.map((cell, id) => [cols[id].label, sanitizeCell(cell, cols[id].type)])
      .reduce((o, [k, v]) => ({ ...o, [k]: v }), {}));

  return { cols, data };
}

export default sheetToEntry;