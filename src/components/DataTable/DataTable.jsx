import "./DataTable.css";

const DataTable = ({ columns, data = [], renderActions, renderCell }) => {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {renderCell ? renderCell(row, col) : row?.[col.key] ?? "-"}
                  </td>
                ))}
                {renderActions && <td>{renderActions(row)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (renderActions ? 1 : 0)}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
