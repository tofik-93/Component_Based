import { Table } from '@repo/ui-components'
import { sortByKey } from '@repo/utils'

interface DataTableProps {
  data: Record<string, any>[]
  columns: string[]
}

export function DataTable({ data, columns }: DataTableProps) {
  const sortedData = sortByKey(data, columns[0])

  return (
    <Table className="w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="text-left p-2 border-b">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col} className="p-2 border-b">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
