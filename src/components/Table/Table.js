import "./Table.css";

function Table({ data }) {
  if (data === undefined) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div className="table">
        <p>Sorry it looks like teams did not form on these projects.</p>
      </div>
    );
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days Worked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r["EmpIDOne"]}</td>
              <td>{r["EmpIDTwo"]}</td>
              <td>{r["ProjectID"]}</td>
              <td>{r["daysWorked"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
