import React, {useRef, useEffect, useState} from 'react';
import {Animated, StyleSheet, Easing} from 'react-native';

const styles = StyleSheet.create({
  BgEffect: {
    color: 'white',
    position: 'absolute',
  },
});

const START_Y_POSITION = -30;
// const type = ['❄', '❅', '❆'];
const BgEffect_Types_Default = ['🌸'];

export default function BgEffect({scene, type = BgEffect_Types_Default}) {
  const [config, setConfig] = useState(() => getConfig(type));
  const animatedY = useRef(new Animated.Value(START_Y_POSITION)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedSwing = useRef(new Animated.Value(0)).current;

  const runAnimation = () => {
    animatedY.setValue(START_Y_POSITION);
    animatedRotation.setValue(0);

    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: config.rotationDuration,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedSwing, {
          toValue: -1,
          duration: config.swingDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedSwing, {
          toValue: 1,
          duration: config.swingDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.sequence([
      Animated.delay(config.fallDelay),
      Animated.timing(animatedY, {
        toValue: scene.height,
        duration: config.fallDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const newConfig = getConfig(type);
      setConfig(newConfig);
    });
  };

  useEffect(() => {
    if (config) {
      runAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const rotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: config.rotationDirection
      ? ['0deg', '360deg']
      : ['360deg', '0deg'],
  });

  const translateX = animatedSwing.interpolate({
    inputRange: [-1, 1],
    outputRange: [-config.swingAmplitude, config.swingAmplitude],
  });

  return (
    <Animated.Text
      style={[
        styles.BgEffect,
        {
          left: config.xPosition,
          fontSize: config.size,
          opacity: config.opacity,
          transform: [{translateY: animatedY}, {rotate}, {translateX}],
        },
      ]}>
      {config.type}
    </Animated.Text>
  );
}

function getConfig(type) {
  const size = randomInt(10, 20);
  const opacity = randomInt(3, 7) / 10;
  const type = type[randomInt(0, 2)];
  const xPosition = `${randomInt(0, 100)}%`;

  const fallDuration = randomInt(8000, 15000);
  const fallDelay = randomInt(1000, 8000);

  const rotationDuration = randomInt(7000, 10000);
  const rotationDirection = randomInt(0, 1);

  const swingDuration = randomInt(3000, 8000);
  const swingAmplitude = randomInt(0, 60);

  return {
    size,
    opacity,
    type,
    xPosition,
    fallDelay,
    fallDuration,
    rotationDuration,
    rotationDirection,
    swingDuration,
    swingAmplitude,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
