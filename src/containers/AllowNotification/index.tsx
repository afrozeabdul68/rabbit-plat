import React, {Component} from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {NavigationActions, StackActions} from 'react-navigation'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

const allowNotificationLogo = require('../../../resources/allow_notification.png');

export interface Props {
    navigation: any
}

export interface State {
}

export default class AllowNotification extends Component<Props, State> {
    static navigationOptions = {
        title: 'Allow your notification',
    };

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.viewContainer}>
                <Image source={allowNotificationLogo} style={styles.logo}/>
                <Text style={styles.title}>Low Battery Notification</Text>
                <Text style={styles.subtitle}>Notify me when the battery is low and a Rabbit™ is nearby.</Text>
                <View style={styles.btnContainer}>
                    <RabbitButton
                        onPress={async () => {
                            await AsyncStorage.setItem('isNotification', 'true');
                            navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName: 'Drawer'}),
                                ],
                            }))
                        }}
                        title="SURE, I'D LIKE THAT"
                        color={Color.WHITE}
                        backgroundColor={Color.YELLOW}
                        borderColor={Color.YELLOW}
                    />
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.setItem('isNotification', 'false');
                            navigation.dispatch(StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({routeName: 'Drawer'}),
                                ],
                            }))
                        }}
                    >
                        <Text style={styles.notNowBtn}>Not now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
