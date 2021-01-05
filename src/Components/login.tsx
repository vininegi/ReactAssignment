import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
type RootStackParamList = {
  login: undefined;
  otpScreen: {phoneNum: string};
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}
interface State {
  isValid: boolean;
  inputValue: string;
  validationMessage: string;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      isValid: true,
      validationMessage: 'Please enter 10 digit number',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.checkPhoneNum = this.checkPhoneNum.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChangeText(text: string) {
    this.setState({
      inputValue: text,
    });
  }

  onFocus() {
    this.setState({
      isValid: true,
    });
  }

  checkPhoneNum() {
    if (this.state.inputValue.length != 10) {
      this.setState({
        isValid: false,
        validationMessage: 'Please enter 10 digit number',
      });
    } else {
      this.props.navigation.navigate('otpScreen', {
        phoneNum: this.state.inputValue,
      });
    }
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <Image
            source={require('../Images/logo.png')}
            style={[styles.ImageStyle, {marginTop: 120}]}
          />
          <View
            style={[
              styles.viewStyle,
              {
                marginTop: 60,
                marginLeft: 30,
                marginRight: 30,
                padding: 10,
                flexDirection: 'row',
                borderRadius: 8,
              },
            ]}>
            <Image
              source={require('../Images/ic_call_icon.png')}
              style={{
                height: 20,
                width: 20,
                alignSelf: 'center',
                tintColor: this.state.isValid ? 'skyblue' : 'red',
              }}
            />
            <TextInput
              style={{
                marginLeft: 10,
                marginRight: 10,
                flex: 1,
                color: !this.state.isValid ? 'red' : 'black',
                fontSize: 16,
              }}
              onChangeText={(text) => this.onChangeText(text)}
              value={this.state.inputValue}
              placeholder="Enter mobile number"
              keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
              onFocus={this.onFocus}></TextInput>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                //send to otp page
                this.checkPhoneNum();
              }}>
              <Image
                source={require('../Images/ic_right_arrow.png')}
                style={{
                  tintColor: 'skyblue',
                  height: this.state.isValid ? 34 : 24,
                  width: this.state.isValid ? 34 : 24,
                  opacity: this.state.isValid ? 1 : 0.4,
                }}
              />
            </TouchableOpacity>
          </View>
          {!this.state.isValid ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 4,
                marginLeft: 30,
              }}>
              <Image
                source={require('../Images/ic_alert.png')}
                style={{height: 14, width: 14}}
              />
              <Text style={{color: 'red', marginLeft: 4}}>
                {this.state.validationMessage}
              </Text>
            </View>
          ) : null}
        </SafeAreaView>
        <Text
          style={{color: 'gray', fontSize: 12, marginLeft: 30, marginTop: 10}}>
          OTP code will be sent to this number
        </Text>
      </ScrollView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageStyle: {
    flex: 1,
    //width: null,
    height: 140,
    alignSelf: 'center',
    //resizeMode: 'stretch'
  },
  inputStyle: {
    borderWidth: 2, // size/width of the border
    borderColor: 'lightgrey', // color of the border
    paddingLeft: 10,
    height: 60,
  },
  viewStyle: {
    borderWidth: 2,
    borderColor: 'skyblue',
    height: 64,
  },
});
