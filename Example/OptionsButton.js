import React from 'react';

import {OptionsButton} from 'react-native-popular';

function Example(props) {
  const {navigation} = props;
  const onPressNav = () => {
  };
  return (
    <OptionsButton
      icon="plus"
      options={[
        {
          icon: 'camera',
          key: 0,
          iconCtnStyles: {backgroundColor: 'red'},
          onPress: onPressNav,
        },
        {
          key: 1,
          icon: 'airbnb',
          iconCtnStyles: {backgroundColor: '#5FB49C'},
        },
        {
          key: 2,
          icon: 'arrows-alt',
          iconCtnStyles: {backgroundColor: '#E7A977'},
        },
      ]}
    />
  );
}
export default Example;
