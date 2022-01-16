import "./App.css";
import Home from "./containers/home/Home.js";

function App() {
  return (
    <div className="App">
      {/* <form onSubmit={submitHandler} encType="multipart/form-data">
        <label htmlFor="infoFile">Upload your file here</label>
        <input type="file" id="infoFile" name="infoFile" />
        <input type="submit" value="Upload" />
      </form> */}
      <Home />
    </div>
  );
}

export default App;
