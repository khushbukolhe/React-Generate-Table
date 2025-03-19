import { useState } from "react";

export const GenerateTable = () => {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [tableData, setTableData] = useState<number[][]>([]);

  const handleGenerateTable = (e: React.FormEvent) => {
    e.preventDefault();

    let count = 1;
    const newTableData: number[][] = Array.from({ length: rows }, () => 
      Array.from({ length: columns }, () => count++)
  );
    setTableData(newTableData);
  };

  return (
    <>
      <form onSubmit={handleGenerateTable}>
        <label>rows</label>
        <input
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          name="rows"
          min={1}
        />
        <label>columns</label>
        <input
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          name="columns"
          min={1}
        />
        <button type="submit"> Generate Table </button>
      </form>
      {tableData.length > 0 && (
        <table>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
