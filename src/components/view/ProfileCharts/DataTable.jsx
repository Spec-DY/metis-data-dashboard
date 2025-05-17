const DataTable = ({
  data = [],
  labelField = "ageGroup",
  columns = ["total", "aboriginal", "metis", "nonAboriginal"],
  columnLabels = {
    total: "Total",
    aboriginal: "Aboriginal",
    metis: "Métis",
    nonAboriginal: "Non-Aboriginal",
  },
  labelHeader = "Age Group",
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              {labelHeader}
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-right font-semibold text-gray-700"
              >
                {columnLabels[column] || column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={
                index === data.length - 1
                  ? "bg-gray-200"
                  : index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              }
            >
              <td className="px-4 py-3 border-b border-gray-200">
                {row[labelField]}
              </td>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-3 border-b border-gray-200 text-right"
                >
                  {typeof row[column] === "number"
                    ? row[column].toLocaleString()
                    : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
