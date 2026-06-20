import "./DataTable.css";

const DataTable = ({ columns, data = [], renderActions, renderCell }) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {renderActions && <th className="actions-header">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row._id}>
                {columns.map((col) => (
                  /* Yahan data-label add kiya hai responsive labels ke liye */
                  <td key={col.key} data-label={col.label}>
                    <div className="td-content">
                      {renderCell ? renderCell(row, col) : row?.[col.key] ?? "-"}
                    </div>
                  </td>
                ))}
                {renderActions && (
                  <td data-label="Actions" className="actions-cell">
                    <div className="td-content actions-wrapper">
                      {renderActions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (renderActions ? 1 : 0)} className="no-data-cell">
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