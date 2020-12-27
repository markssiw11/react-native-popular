import React from 'react';
import {View, Text} from 'react-native';

const Button =({title})=> {
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{title}</Text>
        </View>
    )
}
export default Button;