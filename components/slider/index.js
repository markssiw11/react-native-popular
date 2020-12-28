import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {currencyFormat} from '../../helper';
const {width} = Dimensions.get('screen');
const maxValueDefault = 100;
type Props = {
  maximumValue?: number,
  minimumValue?: number,
  tintColor?: string,
  backgroundColor?: string,
  widthLine?: string,
  unit?: number,
  onChangeValue?: () => void,
  value: number,
  style?: React.CSSProperties,
  mode?: 'currency' | 'normal' | null,
  currencySetting?: typeof currencySettingDefault,
};
const currencySettingDefault = {
  fixed: 0,
  lang: 'vi',
};
function Slider(props: Props) {
  const {
    maximumValue = maxValueDefault,
    minimumValue = 0,
    tintColor,
    backgroundColor,
    widthLine = WIDTH_LINE,
    unit = 1,
    value = 0,
    style,
    onChangeValue,
    mode = 'normal',
    currencySetting = currencySettingDefault,
  } = props;
  const minimumX = calculatorMiniumX(
    minimumValue,
    maximumValue,
    widthLine,
    value,
  );
  const distant = (value * widthLine) / (maximumValue - minimumValue);

  const [_X, set_X] = useState(minimumX + distant);
  const [offsetX, setOffsetX] = useState(minimumX + distant);
  useEffect(() => {
    set_X(minimumX);
    setOffsetX(minimumX);
  }, [minimumX]);
  const tempValue = Math.ceil((_X * (maximumValue - minimumValue)) / widthLine);
  let displayValue = tempValue;
  if (tempValue % unit !== 0) {
    displayValue = tempValue - (tempValue % unit);
  }

  const handlePan = (event) => {
    if (typeof onChangeValue === 'function') {
      onChangeValue(displayValue);
    }
    const {nativeEvent} = event;
    const {translationX, state} = nativeEvent;
    const totalX = translationX + offsetX;

    if (totalX <= minimumX) {
      set_X(minimumX);
      if (state === State.END) {
        setOffsetX(minimumX);
      }
      return null;
    }
    const maxX = widthLine + minimumX;
    if (totalX >= maxX) {
      set_X(maxX);
      if (state === State.END) {
        setOffsetX(maxX);
      }
      return null;
    }
    set_X(totalX);
    if (state === State.END) {
      setOffsetX(totalX);
    }
  };
  const rotationRef = React.createRef();
  const panRef = React.createRef();
  const pinchRef = React.createRef();
  const translateX = _X - minimumX;
  return (
    <View style={[styles.container, {...style}]}>
      <PanGestureHandler
        ref={panRef}
        minDist={10}
        // style={{width: widthLine}}
        simultaneousHandlers={[rotationRef, pinchRef]}
        onGestureEvent={handlePan}
        onHandlerStateChange={handlePan}>
        <Animated.View
          resizeMode="contain"
          style={[
            styles.box,
            {
              backgroundColor: tintColor,

              transform: [{translateX: translateX}],
            },
          ]}
        />
      </PanGestureHandler>
      <Animated.View style={{marginLeft: 5}}>
        <View
          style={[
            styles.line,
            {
              borderColor: backgroundColor,
              width: widthLine,
            },
          ]}
        />
        <View
          style={[
            styles.lineSelect,
            {width: translateX, borderColor: tintColor},
          ]}
        />
        <View style={styles.valueStyle}>
          <Text style={{color: tintColor}}>
            {mode === 'currency'
              ? currencyFormat(
                  displayValue,
                  currencySetting.lang,
                  currencySetting.fixed,
                )
              : displayValue}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

export default Slider;

const IMAGE_SIZE = 30;
const WIDTH_LINE = width - IMAGE_SIZE - 30;
const calculatorMiniumX = (minimumValue, maximumValue, widthLine, value) => {
  return (minimumValue * widthLine) / (maximumValue - minimumValue);
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'green',
  },
  line: {
    borderWidth: 0.5,
    width: WIDTH_LINE,
    marginLeft: IMAGE_SIZE / 2,
    borderColor: 'dimgray',
  },
  lineSelect: {
    borderColor: 'green',
    zIndex: 1,
    marginLeft: IMAGE_SIZE / 2,
    borderWidth: 0.5,
    position: 'absolute',
  },
  valueStyle: {position: 'absolute', bottom: 10, alignSelf: 'center'},
});
