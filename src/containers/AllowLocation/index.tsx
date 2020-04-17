import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

const allowLocationLogo = require('../../../resources/allow_location.png');

export interface Props {
    navigation: any
}

export interface State {
}

export default class AllowLocation extends Component<Props, State> {
    static navigationOptions = {
        title: 'Allow your location',
    };

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.viewContainer}>
                <Image source={allowLocationLogo} style={styles.logo}/>
                <Text style={styles.title}>Allow Your Location</Text>
                <Text style={styles.subtitle}>We will need your location to help you find the closest Rabbit™.</Text>
                <View style={styles.btnContainer}>
                    <RabbitButton
                        onPress={() => navigation.navigate('AllowNotification')}
                        title='ALLOW LOCATION'
                        color={Color.WHITE}
                        backgroundColor={Color.YELLOW}
                        borderColor={Color.YELLOW}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AllowNotification')}
                    >
                        <Text style={styles.notNowBtn}>Not now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}