import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import csColor from '../../utils/csColor';
const dateDefault = new Date(2000, 1, 1);
const minimumDate = new Date(1900, 1, 1);
const maximumDate = new Date();

type Props = {
  label?: string,
  title?: string,
  textDefault?: string,
  onPress?: () => void,
  icon?: string,
  minimumDate?: Date | null,
  maximumDate?: Date | null,
};
const formatDefault = 'DD/MM/YYYY';
function DateTimeField(props: Props) {
  const {label, value, icon, textDefault, onPress} = props;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState();
  const onChange = (event, date) => {
    const {type} = event;
    if (type === 'dismissed' && Platform.OS === 'android') {
      setShow(false);
    } else {
      setShow(false);
      setDate(date);
      if (typeof onPress === 'function') {
        onPress(moment(date).format(formatDefault));
      }
    }
  };
  const onPressChoose = () => {
    setShow(true);
  };
  const onDismissModal = () => {
    setShow(false);
  };
  return (
    <View>
      <View style={styles.dobContainer}>
        {label && (
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
        <Text style={styles.txtDob}>
          <Text style={styles.txtDate}>
            {date
              ? moment(date).format('DD/MM/YYYY')
              : value
              ? `${value}`
              : `${textDefault || formatDefault}`}
          </Text>
        </Text>
        <TouchableOpacity onPress={onPressChoose} style={styles.icon}>
          <FontIcon name={icon ? icon : 'calendar-alt'} size={25} style={{}} />
        </TouchableOpacity>
      </View>
      <ModalDisplay
        open={show}
        date={date}
        value={value}
        onChange={onChange}
        onDismissModal={onDismissModal}
      />
    </View>
  );
}

const ModalDisplay = ({open, date, onChange, onDismissModal, value}) => {
  const valueDate = date ? new Date(date) : new Date(dateDefault);

  if (Platform.OS === 'android') {
    if (!open) {
      return null;
    }
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={valueDate}
        mode={'date'}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        is24Hour={true}
        display="default"
        style={styles.picker}
        onChange={onChange}
      />
    );
  } else {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {}}>
        <View style={styles.modelContainer}>
          {open && (
            <DateTimeOutput
              date={date}
              value={value}
              onChange={onChange}
              onDismissModal={onDismissModal}
            />
          )}
        </View>
      </Modal>
    );
  }
};
const DateTimeOutput = ({date, onChange, onDismissModal, value}) => {
  const [dateTime, setDateTime] = useState();
  useEffect(() => {
    setDateTime(date);
  }, [date]);
  const onChangeDateTime = (event, value) => {
    setDateTime(value);
  };

  return (
    <TouchableWithoutFeedback onPress={onDismissModal}>
      <View style={styles.pickerContainer}>
        <View style={styles.ctn}>
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTime || dateDefault}
            mode={'date'}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            is24Hour={true}
            display="default"
            style={styles.picker}
            onChange={onChangeDateTime}
          />
          <TouchableWithoutFeedback>
            <View style={styles.close}>
              <TouchableOpacity onPress={() => onChange({}, dateTime)}>
                <FontIcon name="check-circle" solid size={35} color="#4AAD52" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 10,
  },
  txtDob: {
    paddingVertical: 10,
    paddingLeft: 10,
    flex: 1,
  },
  icon: {
    borderRadius: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  dobContainer: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  picker: {},
  ctn: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 50,
    position: 'relative',
  },
  close: {
    alignItems: 'center',
    marginVertical: 10,
  },
  labelContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -3,
    left: 10,
  },
  label: {
    bottom: 5,
    color: csColor.vars.dimgray,
    fontSize: 12,
    paddingHorizontal: 3,
    fontWeight: '300',
  },
  txtDate: {
    color: csColor.vars.csDodgerblue,
  },
  modelContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(1, 4, 1, 0.48)',
  },
});

export default DateTimeField;
