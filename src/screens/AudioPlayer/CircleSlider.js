import React, {useState, useRef, useCallback} from 'react';
import {PanResponder, Dimensions} from 'react-native';
import Svg, {Path, Circle, G, Text} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withDecay,
  withSpring,
} from 'react-native-reanimated';
import {MAIN} from '../../configs';
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const CircleSlider = ({
  audio,
  btnRadius = 15,
  dialRadius = 120,
  dialWidth = 5,
  meterColor = '#0cd',
  textColor = '#fff',
  fillColor = 'none',
  strokeColor = '#fff',
  strokeWidth = 0.5,
  onTouchEnd,
  onTouchStart,
  textSize = 10,
  value = 0,
  min = 0,
  max = 359,
  xCenter = Dimensions.get('window').width / 2,
  yCenter = Dimensions.get('window').height / 2,
  isPlaying,
  onValueChange = (x) => x,
}) => {
  const [angle, setAngle] = useState(value);
  const [shouldExpand, setShouldExpand] = useState(false);
  // React.useEffect(() => {
  //   setAngle(value);
  // }, [value]);
  const handleTouchStart = () => {
    //onTouchStart();
    setShouldExpand(true);
  };
  const handleTouchEnd = () => {
    //onTouchEnd();
    setShouldExpand(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onPanResponderStart: () => handleTouchStart(),
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        let xOrigin = xCenter - (dialRadius + btnRadius);
        let yOrigin = yCenter - (dialRadius + btnRadius);
        let a = cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);
        if (a <= min) {
          //onValueChange(min);
          setAngle(min);
        } else if (a >= max) {
          //onValueChange(max);
          setAngle(max);
        } else {
          //onValueChange(a);
          setAngle(a);
        }
      },
      onPanResponderEnd: () => handleTouchEnd(),
    }),
  ).current;

  const polarToCartesian = useCallback(
    (angle) => {
      let r = dialRadius;
      let hC = dialRadius + btnRadius;
      let a = ((angle - 90) * Math.PI) / 180.0;

      let x = hC + r * Math.cos(a);
      let y = hC + r * Math.sin(a);
      return {x, y};
    },
    [dialRadius, btnRadius],
  );

  const cartesianToPolar = useCallback(
    (x, y) => {
      let hC = dialRadius + btnRadius;

      if (x === 0) {
        return y > hC ? 0 : 180;
      } else if (y === 0) {
        return x > hC ? 90 : 270;
      } else {
        return (
          Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
          (x > hC ? 90 : 270)
        );
      }
    },
    [dialRadius, btnRadius],
  );

  const width = (dialRadius + btnRadius) * 2;
  const bR = btnRadius;
  const dR = dialRadius;
  const startCoord = polarToCartesian(0);
  let endCoord = polarToCartesian(angle);
  const ApathProps = useAnimatedProps(() => {
    return {
      strokeWidth: withSpring(
        !isPlaying ? dialWidth : dialWidth * 3,
        MAIN.spring,
      ),
      d: `M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${
        angle > 180 ? 1 : 0
      } 1 ${endCoord.x} ${endCoord.y}`,
    };
  });
  const AcirlceProps = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(isPlaying ? 1 : 0.5)}],
    };
  });
  const AgProps = useAnimatedProps(() => {
    let x = isPlaying ? endCoord.x - bR : endCoord.x - bR / 2;
    let y = isPlaying ? endCoord.y - bR : endCoord.y - bR / 2;
    return {
      x: withSpring(x, MAIN.spring),
      y: withSpring(y, MAIN.spring),
    };
  });
  const ApathCircleProps = useAnimatedProps(() => {
    return {
      fill: fillColor,
    };
  });
  return (
    <Svg width={width} height={width}>
      <AnimatedCircle
        r={dR}
        cx={width / 2}
        cy={width / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        animatedProps={ApathCircleProps}
      />
      <AnimatedPath
        stroke={meterColor}
        strokeWidth={dialWidth}
        animatedProps={ApathProps}
        fill="none"
        // d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${
        //   angle > 180 ? 1 : 0
        // } 1 ${endCoord.x} ${endCoord.y}`}
      />

      <AnimatedG animatedProps={AgProps}>
        <AnimatedCircle
          r={bR}
          cx={bR}
          cy={bR}
          fill={meterColor}
          style={[AcirlceProps]}
          {...panResponder.panHandlers}
        />
        {/* <Text
          x={bR}
          y={bR + textSize / 2}
          fontSize={textSize}
          fill={textColor}
          textAnchor="middle">
          {onValueChange(angle) + ''}
        </Text> */}
      </AnimatedG>
    </Svg>
  );
};

export default React.memo(CircleSlider);
