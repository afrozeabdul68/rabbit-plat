import React, {Component} from 'react'
import {ActivityIndicator, View} from 'react-native'
import Toast from 'react-native-root-toast'
import {WebView} from 'react-native-webview'

import axios from 'axios'
import qs from 'qs'
import styles from './styles'

const authorization = 'Basic QVhTMDRrM3UtWG9fVWdtRE1UWnpGWi1PcFpWUWlXbTUwajd4TUZ4XzdDeEl2LWxIdWNoOGtPNWVCaG9qaWE4dzR3SDE1QjF6UXhhN1hMLTE6RUk2WDJGU3NHMHp4bDlmbERaR1oyVE5sN3BBUkllS3VKUFdTYTYzaWVCalR6eFBmSmpWUThlUEI1enhXTjlDWERvWG5HUnFZOG5LcEstRmQ=';

export interface Props {
    navigation: any
}

export interface State {
    accessToken: string
    approvalUrl: string
}

export default class Paypal extends Component<Props, State> {
    static navigationOptions = {
        title: 'Checkout',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            accessToken: '',
            approvalUrl: '',
        }
    }

    componentDidMount() {
        const dataDetail = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [{
                amount: {
                    total: 1,
                    currency: 'USD',
                    details: {
                        subtotal: 1,
                        tax: '0',
                        shipping: '0',
                        handling_fee: '0',
                        shipping_discount: '0',
                        insurance: '0',
                    },
                },
            }],
            redirect_urls: {
                return_url: 'https://example.com',
                cancel_url: 'https://example.com',
            },
        };

        axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', qs.stringify({grant_type: 'client_credentials'}),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: authorization,
                },
            }).then((response) => {
            this.setState({
                accessToken: response.data.access_token,
            });

            const {accessToken} = this.state;
            axios.post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then((response1) => {
                const {links} = response1.data;
                const approvalUrl = links.find((data: any) => data.rel === 'approval_url');

                this.setState({
                    approvalUrl: approvalUrl.href,
                })
            }).catch((err) => {
                console.warn('yyy', err.response)
            })
        }).catch((err) => {
            console.warn('xxx', err.response)
        })
    }

    onNavigationStateChange = (webViewState: any) => {
        const {accessToken} = this.state;
        const {navigation} = this.props;

        if (webViewState.url.includes('https://example.com/')) {
            this.setState({
                approvalUrl: '',
            });

            const {url} = webViewState;
            const paymentIdArray = /paymentId=([^&]+)/.exec(url);
            const PayerIDArray = /PayerID=([^&]+)/.exec(url);
            const paymentId = paymentIdArray ? paymentIdArray[1] : null;
            const PayerID = PayerIDArray ? PayerIDArray[1] : null;

            if (paymentId && PayerID) {
                axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {payer_id: PayerID},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }).then((response) => {
                    Toast.show(`Successfully Done! ${response.data.id}`, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        delay: 0,
                    });
                    navigation.pop()
                }).catch((err) => {
                    console.warn(err.response)
                })
            }
        }
    };

    render() {
        const {approvalUrl} = this.state;

        return (
            approvalUrl ? (
                <WebView
                    source={{uri: approvalUrl}}
                    onNavigationStateChange={this.onNavigationStateChange}
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState={false}
                />
            ) : (
                <View style={styles.viewContainer}>
                    <ActivityIndicator/>
                </View>
            )
        )
    }
}
