import React, {Component} from 'react'
import {Image, Text, TextInput, View,} from 'react-native'

import gql from 'graphql-tag'
import {useMutation} from 'react-apollo-hooks'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Toast from 'react-native-root-toast'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

const rightArrowIcon = require('../../../resources/right_arrow.png');

const UPDATE_PROFILE_QUERY = gql`
  mutation($input: UpdateProfileInput!) {
    updateProfile(
      input: $input
    ) {
      user {
        id
        email
        fullName
        firstName
        lastName
        phone {
          countryCode
          phoneNumber
        }
      }
    }
  }
`;

interface UpdateProfileProps {
    navigation: any
    name: string
    email: string
}

const UpdateProfileInfo = (props: UpdateProfileProps) => {
    const {navigation, name, email} = props;
    const updateProfileInfo = useMutation(UPDATE_PROFILE_QUERY);

    return (
        <RabbitButton
            onPress={() => {
                if (name === '' || email === '') {
                    showToast('You should enter your full name and email address.')
                } else if (!validateEmail(email)) {
                    showToast('You should enter the valid email address.')
                } else {
                    updateProfileInfo({
                        variables: {
                            input: {
                                userProfileAttributes: {
                                    phoneNumber: navigation.getParam('phoneNumber', ''),
                                    email,
                                    fullName: name,
                                },
                            },
                        },
                    }).then((response: any) => {
                        if (response.data) {
                            showToast('User info has been saved successfully!');
                            // navigation.dispatch(StackActions.reset({
                            //   index: 0,
                            //   actions: [
                            //     NavigationActions.navigate({ routeName: 'AllowLocation' }),
                            //   ],
                            // }))
                            navigation.navigate('AllowLocation')
                        } else {
                            showToast('Failed to update the profile info. Please try again.')
                        }
                    }).catch(() => {
                        showToast('Failed to update the profile info. Please try again.')
                    })
                }
            }}
            title='FIND A RABBIT'
            color={Color.WHITE}
            backgroundColor={Color.BLACK}
            borderColor={Color.BLACK}
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

const validateEmail = (email: string) => {
    /* eslint-disable no-useless-escape */
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    /* eslint-enable no-useless-escape */
    return reg.test(email)
};

export interface Props {
    navigation: any
}

export interface State {
    name: string
    email: string
}

export default class Info extends Component<Props, State> {
    static navigationOptions = {
        title: 'Info',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            name: '',
            email: '',
        }
    }

    render() {
        const {name, email} = this.state;
        const {navigation} = this.props;

        return (
            <View style={styles.viewContainer}>
                <Text style={styles.text}>
                    Last step!
                </Text>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={val => this.setState({name: val})}
                    underlineColorAndroid={Color.LIGHTGREY}
                    textContentType='name'
                    autoCompleteType='name'
                    autoCorrect={false}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={val => this.setState({email: val})}
                    underlineColorAndroid={Color.LIGHTGREY}
                    textContentType='emailAddress'
                    autoCompleteType='email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    autoCorrect={false}
                />
                <Text style={styles.descText}>
                    By tapping the button below, you agree to Rabbit Terms of Use
                    and acknowledge that you have read Privacy Policy.
                </Text>
                <View style={styles.flexContainer}>
                    <Text style={styles.text}>Terms of Use</Text>
                    <TouchableOpacity onPress={() => console.warn('Terms of Use')}>
                        <Image
                            source={rightArrowIcon}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.flexContainer}>
                    <Text style={styles.text}>Privacy Policy</Text>
                    <TouchableOpacity onPress={() => console.warn('Privacy Policy')}>
                        <Image
                            source={rightArrowIcon}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <UpdateProfileInfo
                    navigation={navigation}
                    name={name}
                    email={email}
                />
            </View>
        )
    }
}
