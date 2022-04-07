import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import SegmentChart from "./components/SegmentChart";
import SegmentChartGrandient from "./components/SegmentChartGrandient";

function App() {
  return (
    <div className="App">
      <div style={{ width: "400px" }}>
        <BarChart />
      </div>
      <div style={{ width: "400px" }}>
        <LineChart />
      </div>
      <div style={{ width: "400px" }}>
        <SegmentChart />
      </div>
      <div style={{ width: "400px" }}>
        <SegmentChartGrandient />
      </div>
    </div>
  );
}

export default App;
