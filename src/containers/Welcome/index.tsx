import React, {Component} from 'react'
import {Image, Keyboard, StyleProp, Text, TouchableWithoutFeedback, View, ViewStyle,} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import gql from 'graphql-tag'
import { useMutation} from 'react-apollo-hooks'
import CountryPicker, {CCA2Code } from 'react-native-country-picker-modal'
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-root-toast'
import { NavigationActions, StackActions } from 'react-navigation'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'
import {InitializePhoneNumberInput} from "../../types";

const logo = require('../../../resources/logo.png');

const INIT_PHONE_NUMBER_QUERY = gql`
  mutation InitializePhoneNumberInput($countryCode: String!, $phoneNumber: String!) {
    initializePhoneNumber(
      input: {
        countryCode: $countryCode,
        phoneNumber: $phoneNumber
      }
    ) {
      errors
      success
      totpLength
    }
  }
`;

interface InitializePhoneNumberProps {
    countryCode: string
    phoneNumber: string
    navigation: any
}

const InitializePhoneNumber = (props: InitializePhoneNumberProps) => {
    const {countryCode, phoneNumber, navigation} = props;
    const initPhoneNumber = useMutation<InitializePhoneNumberInput.Mutation, InitializePhoneNumberInput.Variables>(INIT_PHONE_NUMBER_QUERY);

    return (
        <RabbitButton
            onPress={() => {
                if (phoneNumber !== '') {
                    initPhoneNumber({
                        variables: {countryCode, phoneNumber},
                    }).then((response: any) => {
                        if (response.data && response.data.initializePhoneNumber.success) {
                            navigation.navigate('EnterCode', {
                                phoneNumber,
                                totpLength: response.data.initializePhoneNumber.totpLength,
                            })
                        } else {
                            //Todo: This needs to actually show the error that is returned from the server.
                            showToast('Please enter a valid phone number.')
                        }
                    }).catch((e) => {
                        //Todo: This needs to change to a more 5xx related error message
                        showToast('Please enter a valid phone number.')
                    })
                } else {
                    showToast('Please enter your phone number.')
                }
            }}
            title='NEXT'
            color={Color.WHITE}
            backgroundColor={Color.TRANSPARENT}
            borderColor={Color.WHITE}
        />
    )
};

const showToast = (msg: string) => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        delay: 0,
    })
};

export interface DismissKeyboardProps {
    children: any
}

const DismissKeyboard = (props: DismissKeyboardProps) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {props.children}
    </TouchableWithoutFeedback>
);

export interface Props {
    navigation: any
}

export interface State {
    cca2: CCA2Code
    callingCode: string
    phoneNumber: string
}

export default class Welcome extends Component<Props, State> {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            cca2: 'US',
            callingCode: '1',
            phoneNumber: '',
        }
    }

    async componentDidMount() {
        const {navigation} = this.props;
        const token = await AsyncStorage.getItem('token');

        if (token !== null) {
            navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Drawer'}),
                ],
            }))
        }
    }

    render() {
        const {callingCode, phoneNumber, cca2} = this.state;
        const {navigation} = this.props;

        return (
            <DismissKeyboard>
                <View style={styles.viewContainer}>
                    <Text style={styles.welcomeText}>Welcome to</Text>
                    <Image
                        source={logo}
                        style={styles.logo}
                    />
                    <Text style={styles.confirmText}>
                        Please confirm your country code and enter your phone number.
                    </Text>
                    <Text style={styles.yourNumber}>Your Number</Text>
                    <View style={styles.phoneContainer}>
                        <CountryPicker
                            onChange={
                                value => this.setState({cca2: value.cca2, callingCode: value.callingCode})
                            }
                            cca2={cca2}
                            translation='common'
                            filterPlaceholderTextColor={Color.PLACEHOLDER_COLOR}
                            styles={styles as StyleProp<ViewStyle>}
                        />
                        {callingCode && (
                            <Text style={styles.callingCode}>
                                +
                                {callingCode}
                            </Text>
                        )}
                        <TextInputMask
                            type='custom'
                            options={{
                                mask: '(999) 999-9999',
                            }}
                            placeholder='Your phone number'
                            placeholderTextColor={Color.PLACEHOLDER_COLOR}
                            style={styles.textInput}
                            keyboardType='numeric'
                            value={phoneNumber}
                            // pattern='[0-9]*'
                            onChangeText={number => this.setState({phoneNumber: number})}
                            underlineColorAndroid={Color.TRANSPARENT}
                        />
                    </View>
                    <View style={styles.separator}/>
                    <InitializePhoneNumber
                        countryCode={`+${callingCode}`}
                        phoneNumber={phoneNumber}
                        navigation={navigation}
                    />
                </View>
            </DismissKeyboard>
        )
    }
}
