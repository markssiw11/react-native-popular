import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';
const {Value} = Animated;
const size = 50;
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 16,
    margin: 10,
  },
  ctn: {
    position: 'absolute',
    right: 15,
    bottom: 100,
    flexDirection: 'column',
  },
  floatButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    // bottom: 4,
    flex: 1,
    height: size,
    paddingRight: 5,
    borderRadius: size / 2,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F05D23',
    width: size,
    height: size,
    borderRadius: size / 2,
    marginLeft: 2,
  },
  help: {
    marginBottom: 5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: size,
    height: size,
    borderRadius: size / 2,
    marginLeft: 2,
    position: 'absolute',
  },
  btn: {
    bottom: 100,
    position: 'absolute',
    flexDirection: 'column',
    right: 15,
  },
});
interface Props {
  key: number;
  icon: string;
  options?: option[];
  style?: StyleProp<ViewStyle>;
}
type option = {
  icon: string,
  iconCtnStyles?: StyleProp<ViewStyle>,
};

function OptionsButton(props: Props) {
  const {icon, options, style} = props;
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(new Value(0));
  const onSpring = () => {
    if (!isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };
  const onClose = () => {
    Animated.spring(value, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
      bounciness: 8,
    }).start();
    setOpen(false);
  };
  const onOpen = () => {
    Animated.spring(value, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false,
      bounciness: 20,
      speed: 8,
    }).start();
    setOpen(true);
  };
  const rotateZ = value.interpolate({
    inputRange: [0, 100],
    outputRange: ['45deg', '0deg'],
  });
  const opacity = value.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
  });
  const marginBottom = value.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 80],
  });
  return (
    <View style={{flex: 1}}>
      {!isOpen && (
        <View style={[styles.ctn, {...style, bottom: 10}]}>
          <Animated.View
            style={[styles.floatButton, {transform: [{rotateZ: rotateZ}]}]}>
            <TouchableWithoutFeedback onPress={onSpring}>
              <View style={styles.iconView}>
                <FontAwesome
                  name={icon}
                  solid
                  size={size / 2}
                  color={'white'}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      )}
      <Modal
        animationType="none"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.42)'}}>
            <View style={[styles.ctn, {...style}]}>
              <View style={styles.help}>
                {(options || []).map((e) => (
                  <TouchOption
                    key={e.key}
                    icon={e?.icon}
                    iconCtnStyles={e?.iconCtnStyles}
                    onPress={() => {
                      if (typeof e?.onPress === 'function') {
                        e?.onPress();
                      }
                      onSpring();
                    }}
                    style={{opacity, marginBottom}}
                  />
                ))}
              </View>
              <Animated.View
                style={[styles.floatButton, {transform: [{rotateZ: rotateZ}]}]}>
                <TouchableWithoutFeedback onPress={onSpring}>
                  <View style={styles.iconView}>
                    <FontAwesome
                      name={icon}
                      solid
                      size={size / 2}
                      color={'white'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
function TouchOption({style, icon, onPress, iconStyle, iconCtnStyles}) {
  return (
    <Animated.View style={[styles.help, {...style}]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.icon, {...iconCtnStyles}]}>
        <FontAwesome
          name={icon}
          solid
          style={iconStyle}
          size={size / 2}
          color={'white'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default OptionsButton;
