import { Workbook, type Column, type Cell } from 'exceljs'

export function exportTableToXLSX(): void {
  const workbook = new Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')

  const table = document.getElementById('toExcel')

  const rows = table?.querySelectorAll('tr')

  rows?.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('th, td')
    cells.forEach((cell, cellIndex) => {
      const cellValue = (cell as HTMLElement).innerText

      const font = {
        bold: rowIndex === 0,
      }

      const excelCell = worksheet.getCell(rowIndex + 1, cellIndex + 1)
      excelCell.value = cellValue
      excelCell.font = font
    })
  })

  worksheet.columns.forEach((column: Partial<Column>) => {
    let maxLength = 0
    column.eachCell?.((cell: Cell) => {
      const length = cell.value?.toString().length ?? 0
      maxLength = Math.max(maxLength, length)
    })
    column.width = maxLength + 2
  })

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'table.xlsx'
    link.click()
  })
}
