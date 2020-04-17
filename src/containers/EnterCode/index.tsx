import React, {Component, useState} from 'react'
import {Image, Text, TextInput, View, TouchableWithoutFeedback } from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'

import AsyncStorage from '@react-native-community/async-storage'
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo-hooks'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Toast from 'react-native-root-toast'
import Color from '../../variables/colors'
import styles from './styles'

const rightArrow = require('../../../resources/right_arrow.png');

const VALIDATE_AUTH_PHONE_QUERY = gql`
  mutation ValidateTotpAndAuthenticatePhoneInput($code: String!) {
    validateTotpAndAuthenticatePhone(input: {
      code: $code
    }) {
      codeStatus
      jwt
      user {
        email
        fullName
        phone {
          countryCode
          phoneNumber
        }
      }
    }
  }
`;

interface ValidateTotpAndAuthenticatePhoneInputProps {
    totpLength: number
    navigation: any
}

const ValidateTotpAndAuthPhone = (props: ValidateTotpAndAuthenticatePhoneInputProps) => {
    const input = React.createRef();
    const {totpLength, navigation} = props;
    const CODE_LENGTH = new Array(totpLength).fill(0);
    const validateAuthPhone = useMutation(VALIDATE_AUTH_PHONE_QUERY);
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [values, setValues] = useState(value.split(""));
    const [selectedIndex, setSelectedIndex] = useState(values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1);
    const [hideInput, setHideInput] = useState(!(values.length < CODE_LENGTH.length) );
    
    const watchValueChange = value => {
        setValues(values => value.split(""));
        const tempValues = value.split("");
        setSelectedIndex(selectedIndex => tempValues.length < CODE_LENGTH.length ? tempValues.length : CODE_LENGTH.length - 1);
        setHideInput(hideInput => !(tempValues.length < CODE_LENGTH.length));
    }
    
    const handleClick = () => {
        input.current.focus();
    };
    const handleFocus = () => {
        setFocused(focused =>  true);
    };
    const handleBlur = () => {
        setFocused(focused =>  false);
    };
    const handleKeyPress = e => {
        if (e.nativeEvent.key === "Backspace") {
            let tempValue = value.slice(0, value.length - 1);
            setValue(value => tempValue);
            watchValueChange(tempValue);
        }
    };
    const handleChange = newValue => {
        setValue(value => value.length >= CODE_LENGTH.length ? value : (value + newValue).slice(0, CODE_LENGTH.length) );
        if ( (value + newValue).length >= CODE_LENGTH.length) {
            const newCode = value + newValue;
            watchValueChange(newCode);
        
            validateAuthPhone({
                variables: {code: newCode},
            }).then(async (response: any) => {
                if (response.data && response.data.validateTotpAndAuthenticatePhone.codeStatus === 'valid') {
                    await AsyncStorage.setItem('token', response.data.validateTotpAndAuthenticatePhone.jwt);
                    if (totpLength === 4) {
                        navigation.navigate('Info', {
                            phoneNumber: navigation.getParam('phoneNumber', ''),
                        })
                    } else if (totpLength === 6) {
                        navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Drawer'}),
                            ],
                        }))
                    }
                } else if (response.data && response.data.validateTotpAndAuthenticatePhone.codeStatus === 'expired') {
                    showToast('This code is expired or invalid. Please try again.');
                    // navigation.pop()
                } else {
                    showToast('This code is invalid.')
                }
            }).catch(() => {
                showToast('This code is invalid.')
            })
        } else {
            watchValueChange(value + newValue);
        }   
    };
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={styles.wrap}>
                <TextInput
                    value=""
                    ref={input}
                    onChangeText={handleChange}
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={[
                        styles.input,
                        {
                        left: selectedIndex * 48,
                        opacity: hideInput ? 0 : 1,
                        },
                    ]}
                    autoFocus
                />
                {CODE_LENGTH.map((v, index) => {
                    const selected = values.length === index;
                    const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;
                    const removeBorder = !selected && !filled && index >= values.length ? styles.noBorder : undefined;

                    return (
                        <View style={[styles.display, removeBorder]} key={index}>
                            <Text style={styles.text32}>{values[index] || ""}</Text>
                        </View>
                    );
                })}
            </View>
        </TouchableWithoutFeedback>
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

export interface Props {
    navigation: any
}

export interface State {
    phoneNumber: string
    totpLength: number,
}


export default class EnterCode extends Component<Props, State> {
    static navigationOptions = {
        title: 'Enter Code',
    };

    constructor(props: Props) {
        super(props);

        const {navigation} = props;

        this.state = {
            phoneNumber: navigation.getParam('phoneNumber', ''),
            totpLength: navigation.getParam('totpLength', 6),
        }
    }

    onSubmitEditing = () => {
        const {navigation} = this.props;
        navigation.navigate('Info')
    };

    

    render() {
        const {navigation} = this.props;
        const {phoneNumber, totpLength} = this.state;

        return (
            <View style={styles.viewContainer}>
                <Text style={styles.text}>
                    Enter the 6-digit code. Sent to you at
                    {' '}
                    {phoneNumber}
                    {' '}
                    phone number.
                </Text>
                <View style={styles.flexContainer}>
                    <ValidateTotpAndAuthPhone
                        totpLength={totpLength}
                        navigation={navigation}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{...styles.flexContainer, justifyContent: 'space-between'}}>
                        <Text style={styles.text}>I didn&apos;t receive a code</Text>
                        <Image
                            source={rightArrow}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{...styles.flexContainer, justifyContent: 'space-between'}}>
                        <Text style={styles.text}>Edit my mobile number</Text>
                        <Image
                            source={rightArrow}
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}