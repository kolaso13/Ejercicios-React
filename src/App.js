import { useCallback, useState } from "react";

const width = 5000;
const height = 3500;

const circleRadius = 30;

const initialMousePosition = {
  x: width / 2,
  y: height / 2,
};

function App() {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const handleMouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    },
    [setMousePosition]
  );
  return (
    <div className="App">
      <svg width={width} height={height} onMouseMove={handleMouseMove}>
        <circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
      </svg>
    </div>
  );
}

export default App;
