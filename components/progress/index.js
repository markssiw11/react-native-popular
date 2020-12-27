import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
const WIDTH_SCREEN = Dimensions.get('screen').width;
type Props = {
  widthLine: number,
  range: number,
  progressWidth: number,
  unit: number,
  maximumValue?: number,
  minimumValue?: number,
  step: number,
};
function ProgressBar(props: Props) {
  const {
    widthLine = WIDTH_LINE,
    range = 1,
    progressWidth = 0,
    unit = 1,
    maximumValue = 100,
    minimumValue = 0,
    step,
  } = props;

  const [itemWidth, setItemWidth] = useState(
    widthLine / ((maximumValue - minimumValue) / unit),
  );
  const [progress, setProgress] = useState(progressWidth);
  const [element, setElement] = useState(Math.ceil(widthLine / itemWidth));
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...Array(step).keys()]);
    setItemWidth(widthLine / ((maximumValue - minimumValue) / unit));
    setProgress(progressWidth);
  }, [
    element,
    maximumValue,
    minimumValue,
    widthLine,
    unit,
    progress,
    progressWidth,
    itemWidth,
    step,
  ]);

  const indexWidth = itemWidth - range;
  const renderItem = ({item}) => {
    const borderColor = item < progress ? 'green' : 'grey';
    return (
      <View key={item} style={styles.line}>
        <Animated.View
          style={[
            styles.index,
            {
              borderColor,
              width: indexWidth,
              marginRight: range,
            },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, {width: widthLine}]}>
      <RenderContent data={data} renderItem={renderItem} />
    </View>
  );
}
const RenderContent = ({data, renderItem}) => {
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};
const IMAGE_SIZE = 30;
const WIDTH_LINE = WIDTH_SCREEN - IMAGE_SIZE - 30;
const styles = StyleSheet.create({
  container: {
    marginLeft: 65,
  },
  line: {},
  index: {
    width: 20,
    borderColor: 'green',
    borderWidth: 0.5,
    marginRight: 2,
  },
});
export default ProgressBar;
