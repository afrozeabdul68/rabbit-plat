import React, {Component} from 'react'
import {Alert} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'

export interface Props {
    navigation: any
}

export default class ScanQRCode extends Component<Props> {
    static navigationOptions = {
        title: 'Scan QR Code',
    };

    onSuccess = (e: any) => {
        const {navigation} = this.props;

        if (e) {
            const sid = e.data.match(/sid=([^&]+)/)[1];

            Alert.alert(
                'Found a Rabbit',
                `Station ID: ${sid}`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => navigation.navigate('Confirmations')},
                ],
            )
        }
    };

    render() {
        return (
            <QRCodeScanner
                onRead={this.onSuccess}
                showMarker
            />
        )
    }
}
