import { useState } from "react";

import dateService from "../../services/dateService.js";
import parser from "../../services/parseService.js";

import "./UploadForm.css";

function UploadForm({ dataSetter }) {
  const [hasFile, setHasFile] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      console.log(reader.result);

      let { data } = parser.scvToJson(reader.result);

      let byProject = data.reduce((acc, row) => {
        if (!acc.hasOwnProperty(row["ProjectID"])) {
          acc[row["ProjectID"]] = [];
        }

        row.mates = {};

        acc[row["ProjectID"]].push(row);
        return acc;
      }, {});

      let atLeastTwo = Object.fromEntries(
        Object.entries(byProject).filter(([k, v]) => v.length > 1)
      );

      // * get info on who worked with whoom on what
      Object.entries(atLeastTwo).forEach(([ProjectID, employeeList]) => {
        employeeList.forEach((employee) => {
          employee.mates = employeeList.reduce((acc, e) => {
            if (e.EmpID !== employee.EmpID) {
              if (
                dateService.isBetween(employee["DateFrom"], e["DateFrom"], e["DateTo"]) ||
                dateService.isBetween(employee["DateTo"], e["DateFrom"], e["DateTo"]) ||
                (dateService.isOlder(employee["DateFrom"], e["DateFrom"]) &&
                  dateService.isNewer(employee["DateTo"], e["DateTo"]))
              ) {
                if (!acc.hasOwnProperty(e["EmpID"])) {
                  acc[e["EmpID"]] = 0;
                }

                acc[e["EmpID"]] += dateService.getDuration(
                  dateService.getMax(e["DateFrom"], employee["DateFrom"]),
                  dateService.getMin(e["DateTo"], employee["DateTo"])
                );
              }
            }

            return acc;
          }, {});
        });
      });

      // * combine duplicates
      Object.entries(atLeastTwo).forEach(([ProjectID, recordList]) => {
        atLeastTwo[ProjectID] = recordList.reduce((acc, record) => {
          let { EmpID } = record;
          let item = acc[EmpID];

          if (item === undefined) {
            acc[EmpID] = record;
          } else {
            Object.entries(record.mates).forEach(([mateId, workTime]) => {
              if (item.mates.hasOwnProperty(mateId)) {
                item.mates[mateId] += workTime;
              } else {
                item.mates[mateId] = workTime;
              }
            });
            acc[EmpID] = item;
          }

          return acc;
        }, {});
      });

      // * get the two longest cooperations per project
      Object.entries(atLeastTwo).forEach(([ProjectID, dataObj]) => {
        atLeastTwo[ProjectID] = Object.values(dataObj).map((employee) => {
          employee.totalWorked = Object.values(employee.mates).reduce((a, el) => (a += el), 0);
          return employee;
        });
        atLeastTwo[ProjectID] = atLeastTwo[ProjectID].filter((x) => x.totalWorked > 0)
          .sort((a, b) => b.totalWorked - a.totalWorked)
          .slice(0, 2);
      });

      const output = Object.entries(atLeastTwo)
        .reduce((rows, [ProjectID, employeeList]) => {
          if (employeeList.length < 2) {
            return rows;
          }

          let [employeeOne, employeeTwo] = employeeList;

          rows.push({
            EmpIDOne: employeeOne.EmpID,
            EmpIDTwo: employeeTwo.EmpID,
            ProjectID,
            daysWorked: employeeOne.mates[employeeTwo.EmpID],
          });
          return rows;
        }, [])
        .sort((a, b) => b.daysWorked - a.daysWorked);

      dataSetter(output);
      // console.log(data);
      // console.log(byProject);
      // console.log(atLeastTwo);
      // console.log(output);
    });

    reader.readAsText(data.infoFile);
  };

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data" className="container">
      <label htmlFor="infoFile">Upload your file here</label>
      <input type="file" id="infoFile" name="infoFile" onChange={() => setHasFile(true)} />
      <input type="submit" value="Upload" disabled={!hasFile} className="btn" />
    </form>
  );
}

export default UploadForm;
