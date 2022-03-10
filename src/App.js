import Face from "./components/Face";

const width = 960;
const height = 500;

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function App() {
  return (
    <div className="body">
      {array.map((i = 0) => {
        i++;
        return (
          <Face
            width={width}
            height={height}
            centerX={width / 2}
            centerY={height / 2}
            strokeWidth={20}
            eyeOffsetX={90}
            eyeOffsetY={100}
            eyeRadius={40}
            mouthWidth={20}
            mouthRadious={140}
            key={i}
          />
        );
      })}
    </div>
  );
}

export default App;
