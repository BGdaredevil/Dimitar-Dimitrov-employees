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
    <div className="table">
      <table>
        <thead>
          <tr>
            <td>Employee ID #1</td>
            <td>Employee ID #2</td>
            <td>Project ID</td>
            <td>Days Worked</td>
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
