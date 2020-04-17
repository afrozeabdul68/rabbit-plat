import React, {Component} from 'react'
import {Image, Share, Text, View,} from 'react-native'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

const emailImg = require('../../../resources/email.png');

export default class FreeCharging extends Component {
    static navigationOptions = {
        title: 'Free Charging',
    };

    onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Use code FGH45678 to get a free charging!',
                title: 'Invite friends',
                url: 'https://userabbit.com/fgh45678',
            });

            if (result.action === Share.sharedAction) {
                console.warn('result.action', result.action);

                if (result.activityType) {
                    console.warn('actionType', result.activityType)
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                console.warn('dismissed')
            }
        } catch (err) {
            console.warn('err', err.message)
        }
    };

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.emailContainer}>
                    <Image source={emailImg} style={styles.emailImg}/>
                    <Text style={styles.referText}>Refer friends for free charge</Text>
                    <Text style={styles.getText}>
                        Get 1hr of FREE charging when you refer a friend to try Rabbit
                    </Text>
                </View>
                <View style={styles.invitesContainer}>
                    <Text style={styles.shareText}>Share your invitation code:</Text>
                    <Text style={styles.shareCode}>FGH45678</Text>
                    <RabbitButton
                        onPress={this.onShare}
                        title='INVITE FRIENDS'
                        color={Color.WHITE}
                        backgroundColor={Color.BLACK}
                        borderColor={Color.BLACK}
                    />
                </View>
            </View>
        )
    }
}
