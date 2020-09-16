import React from "react";
import Card from "@material-ui/core/Card";
import "./App.css";
import BarChart from "./d3BarChart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card className="cardhalf">
          <h4>Productivity this Week</h4>
          <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
        </Card>
        <Card className="cardhalf">
          <h4>Distractions</h4>
        </Card>
      </header>
    </div>
  );
}

export default App;
