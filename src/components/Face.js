import FaceContainer from "./FaceContainer";
import Mouth from "./Mouth";
import BackgroundCircle from "./BackgroundCircle";
import Eyes from "./Eyes";

const Face = ({
  width,
  height,
  centerX,
  centerY,
  strokeWidth,
  eyeOffsetX,
  eyeOffsetY,
  eyeRadius,
  mouthWidth,
  mouthRadious,
}) => {
  return (
    <FaceContainer
      width={width}
      height={height}
      centerX={centerX}
      centerY={centerY}
    >
      <BackgroundCircle
        radious={centerY - strokeWidth / 2}
        strokeWidth={strokeWidth}
      />
      <Eyes
        eyeOffsetX={eyeOffsetX}
        eyeOffsetY={eyeOffsetY}
        eyeRadius={eyeRadius}
      />
      <Mouth mouthWidth={mouthWidth} mouthRadious={mouthRadious} />
    </FaceContainer>
  );
};

export default Face;
