import { arc } from "d3";
const Mouth = ({ mouthRadious, mouthWidth }) => {
  const mouthArc = arc()
    .innerRadius(mouthRadious)
    .outerRadius(mouthRadious + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2);
  return <path d={mouthArc()} />;
};

export default Mouth;
