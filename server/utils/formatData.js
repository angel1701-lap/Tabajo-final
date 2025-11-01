export function toMonthlySeries(rows) {
  const months = []
  const values = []
  for (const r of rows || []) {
    months.push(r.month ?? '')
    values.push(Number(r.total ?? 0))
  }
  return { months, values }
}

export function topItems(rows, keyMap = { label: 'name', value: 'total' }) {
  return (rows || []).map(r => ({
    label: r[keyMap.label] ?? '',
    value: Number(r[keyMap.value] ?? 0),
  }))
}
