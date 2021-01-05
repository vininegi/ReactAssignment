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
  Dimensions,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

type RootStackParamList = {
  login: undefined;
  otpScreen: {phoneNum: string};
};
var width = Dimensions.get('window').width;
type otpScreenRouteProp = RouteProp<RootStackParamList, 'login'>;
type otpNavigation = StackNavigationProp<RootStackParamList>;

export interface Props {
  phoneNumber?: number;
  route: otpScreenRouteProp;
  navigation: otpNavigation;
}

var rightOTP: string = '1111';
interface State {
  phoneNumber: number;
  isError: boolean;
  inputValue: string;
  errorMessage: string;
  firstNum: string;
  secondNum: string;
  thirdNum: string;
  fourthNum: string;
  isFirstActive: boolean;
  isSecondActive: boolean;
  isThirdActive: boolean;
  isFourthActive: boolean;
}

class OtpScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      phoneNumber: props.phoneNumber || 0,
      inputValue: '',
      isError: false,
      errorMessage: 'Invalid OTP. Please retry',
      firstNum: '',
      secondNum: '',
      thirdNum: '',
      fourthNum: '',
      isFirstActive: true,
      isSecondActive: false,
      isThirdActive: false,
      isFourthActive: false,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChangeText(text: string, tag: number) {
    switch (tag) {
      case 0:
        if (text.length >= 1) {
          const newText = text[text.length - 1];
          this.setState({
            firstNum: newText,
            isFirstActive: false,
            isSecondActive: true,
          });
          this.refs.Second.focus();
        } else {
          this.setState({
            firstNum: '',
          });
        }

        break;
      case 1:
        if (text.length >= 1) {
          const newText = text[text.length - 1];

          this.setState({
            secondNum: newText,
            isSecondActive: false,
            isThirdActive: true,
          });
          this.refs.Third.focus();
        } else {
          this.setState({
            isFirstActive: true,
            isSecondActive: false,
            secondNum: '',
          });
          this.refs.First.focus();
        }

        break;
      case 2:
        if (text.length >= 1) {
          const newText = text[text.length - 1];

          this.setState({
            thirdNum: newText,
            isThirdActive: false,
            isFourthActive: true,
          });
          this.refs.Fourth.focus();
        } else {
          this.setState({
            isThirdActive: false,
            isSecondActive: true,
            thirdNum: '',
          });
          this.refs.Second.focus();
        }

        break;
      case 3:
        if (text.length >= 1) {
          const newText = text[text.length - 1];
          this.setState({
            fourthNum: newText,
          });
        } else {
          this.setState({
            isThirdActive: true,
            isFourthActive: false,
            fourthNum: '',
          });
          this.refs.Third.focus();
        }

        break;
    }
  }

  onFocus(tag: number) {
    switch (tag) {
      case 0:
        this.setState({
          isError: false,
          isFirstActive: true,
          isSecondActive: false,
          isThirdActive: false,
          isFourthActive: false,
        });
        break;

      case 1:
        this.setState({
          isError: false,
          isFirstActive: false,
          isSecondActive: true,
          isThirdActive: false,
          isFourthActive: false,
        });
        break;
      case 2:
        this.setState({
          isError: false,
          isFirstActive: false,
          isSecondActive: false,
          isThirdActive: true,
          isFourthActive: false,
        });
        break;
      case 3:
        this.setState({
          isError: false,
          isFirstActive: false,
          isSecondActive: false,
          isThirdActive: false,
          isFourthActive: true,
        });
        break;
    }
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 10,
              padding: 10,
              backgroundColor: 'skyblue',
              marginRight: 10,
              marginTop: 50,
            }}>
            <Text style={{fontSize: 16, color: 'white', flex: 1}}>
              Verify phone number
            </Text>
            <TouchableOpacity
              style={{
                width: 40,
                marginLeft: 10,
                alignItems: 'center',
                alignSelf: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate('login');
              }}>
              <Image
                source={require('../Images/ic_cancel.png')}
                style={{
                  alignSelf: 'center',
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.labelStyle, {marginTop: 30, fontSize: 18}]}>
            Enter OTP
          </Text>
          <Text style={[styles.labelStyle, {marginTop: 10, fontSize: 14}]}>
            Please verify your number with 4 digit OTP code sent to ********
            {this.props.route.params.phoneNum.slice(-2)}
          </Text>
          <View
            style={{
              marginTop: 20,
              marginLeft: 30,
              marginRight: 30,
              flexDirection: 'row',
              height: (width - 60 - 18 * 3) / 4,
            }}>
            <TextInput
              value={this.state.firstNum}
              ref="First"
              placeholder="*"
              style={[
                styles.inputStyle,
                {
                  marginRight: 18,
                  borderColor: this.state.isFirstActive
                    ? 'skyblue'
                    : !this.state.isError
                    ? 'gray'
                    : 'red',
                },
              ]}
              autoFocus={this.state.isFirstActive}
              onChangeText={(text) => {
                this.onChangeText(text, 0);
              }}
              keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
              onFocus={() => this.onFocus(0)}></TextInput>
            <TextInput
              onKeyPress={(keyPress) => {
                if (
                  keyPress.nativeEvent.key == 'Backspace' &&
                  this.state.secondNum.length == 0
                ) {
                  this.refs.First.focus();
                }
              }}
              value={this.state.secondNum}
              ref="Second"
              placeholder="*"
              style={[
                styles.inputStyle,
                {
                  marginRight: 18,
                  borderColor: this.state.isSecondActive
                    ? 'skyblue'
                    : !this.state.isError
                    ? 'gray'
                    : 'red',
                },
              ]}
              autoFocus={this.state.isSecondActive}
              onChangeText={(text) => {
                this.onChangeText(text, 1);
              }}
              keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
              onFocus={() => this.onFocus(1)}></TextInput>
            <TextInput
              onKeyPress={(keyPress) => {
                if (
                  keyPress.nativeEvent.key == 'Backspace' &&
                  this.state.thirdNum.length == 0
                ) {
                  this.refs.Second.focus();
                }
              }}
              value={this.state.thirdNum}
              ref="Third"
              placeholder="*"
              style={[
                styles.inputStyle,
                {
                  marginRight: 18,
                  borderColor: this.state.isThirdActive
                    ? 'skyblue'
                    : !this.state.isError
                    ? 'gray'
                    : 'red',
                },
              ]}
              autoFocus={this.state.isThirdActive}
              onChangeText={(text) => {
                this.onChangeText(text, 2);
              }}
              keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
              onFocus={() => this.onFocus(2)}></TextInput>
            <TextInput
              onKeyPress={(keyPress) => {
                if (
                  keyPress.nativeEvent.key == 'Backspace' &&
                  this.state.fourthNum.length == 0
                ) {
                  this.refs.Third.focus();
                }
              }}
              value={this.state.fourthNum}
              ref="Fourth"
              placeholder="*"
              style={[
                styles.inputStyle,
                {
                  borderColor: this.state.isFourthActive
                    ? 'skyblue'
                    : !this.state.isError
                    ? 'gray'
                    : 'red',
                },
              ]}
              autoFocus={this.state.isFourthActive}
              onChangeText={(text) => {
                this.onChangeText(text, 3);
              }}
              keyboardType={Platform.OS == 'android' ? 'numeric' : 'number-pad'}
              onFocus={() => this.onFocus(3)}></TextInput>
          </View>
          {this.state.isError ? (
            <View style={{flexDirection: 'row', marginLeft: 30, marginTop: 6}}>
              <Image
                source={require('../Images/ic_alert.png')}
                style={{height: 12, width: 12}}
              />
              <Text style={{color: 'red', fontSize: 12, marginLeft: 6}}>
                {this.state.errorMessage}
              </Text>
            </View>
          ) : null}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.labelStyle,
                {fontSize: 14, color: 'black', marginTop: 20, marginRight: 4},
              ]}>
              Didn't receive code?
            </Text>
            <TouchableOpacity style={{justifyContent: 'flex-end'}}>
              <Text style={{color: 'orange', fontSize: 14}}>Resend</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              opacity: !this.state.isError ? 1 : 0.4,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                backgroundColor: 'orange',
                marginLeft: 30,
                marginTop: 40,
                alignItems: 'flex-start',
                borderRadius: 6,
              }}
              onPress={() => {
                //check otp and do the required
                const otp =
                  this.state.firstNum +
                  this.state.secondNum +
                  this.state.thirdNum +
                  this.state.fourthNum;

                if (otp != rightOTP) {
                  this.setState({
                    isError: true,
                    isFirstActive: false,
                    isSecondActive: false,
                    isThirdActive: false,
                    isFourthActive: false,
                  });
                } else {
                  //send to previous page
                  this.props.navigation.goBack();
                }
              }}>
              <Text style={{fontSize: 16, color: 'white', margin: 14}}>
                Verify OTP
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default OtpScreen;

const styles = StyleSheet.create({
  labelStyle: {
    marginLeft: 30,
    marginRight: 30,
  },
  inputStyle: {
    borderWidth: 2,
    padding: 10,
    flex: 2,
    borderRadius: 4,
    textAlign: 'center',
  },
  viewStyle: {
    borderWidth: 2,
    borderColor: 'blue',
    height: 70,
  },
});
