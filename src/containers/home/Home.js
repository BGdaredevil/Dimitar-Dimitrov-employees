import { useState } from "react";
import Table from "../../components/Table/Table.js";
import UploadForm from "../../components/UploadForm/UploadForm.js";

function Home() {
  const [data, setData] = useState();
  const dataSetter = (data) => setData(data);

  return (
    <div className="home">
      <UploadForm dataSetter={dataSetter} />
      <Table data={data} />
    </div>
  );
}

export default Home;
