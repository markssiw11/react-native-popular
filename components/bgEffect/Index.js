import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import BgEffect from './BgEffect';

const dimensions = Dimensions.get('window');

export default function Main({snowflakesCount = 15, type}) {
  return (
    <View
      style={[
        styles.container,
        {width: dimensions.width, height: dimensions.height},
      ]}>
      {new Array(snowflakesCount).fill(true).map((_, i) => (
        <BgEffect key={i} scene={dimensions} type={type} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
