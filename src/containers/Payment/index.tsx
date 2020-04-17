import React, {Component} from 'react'
import {Image, ImageBackground, Platform, Text, View,} from 'react-native'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {GooglePay} from 'react-native-google-pay'
import {PaymentRequest} from 'react-native-payments'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

const creditCardIcon = require('../../../resources/credit_card.png');
const rightArrowIcon = require('../../../resources/right_arrow_icon.png');
const couponIcon = require('../../../resources/coupon.png');
const paypalBtn = require('../../../resources/paypal_btn.png');
const applePayBtn = require('../../../resources/apple_pay_btn.png');
const googlePayBtn = require('../../../resources/google_pay_btn.png');
const visaBg = require('../../../resources/visa_bg.png');
const visaLogo = require('../../../resources/visa.png');
const rechargeIcon = require('../../../resources/recharge_icon.png');
const bonusIcon = require('../../../resources/bonus.png');

const PUBLISHABLE_KEY = 'pk_test_vRdesV1QP6lMeyYWLZqNr10Z00ZLNAKghi';

export interface Props {
    navigation: any
}

export default class Payment extends Component<Props> {
    static navigationOptions = {
        title: 'Payment',
    };

    onApplePay = () => {
        const METHOD_DATA = [{
            supportedMethods: ['apple-pay'],
            data: {
                merchantIdentifier: 'merchant.com.applepay.findarabbit',
                supportedNetworks: ['visa', 'mastercard', 'amex'],
                countryCode: 'US',
                currencyCode: 'USD',
            },
        }];

        const DETAILS = {
            id: 'rabbit-apple-pay',
            displayItems: [
                {
                    label: 'Charging Rabbit',
                    amount: {currency: 'USD', value: '1.00'},
                },
            ],
            total: {
                label: 'Charging Rabbit',
                amount: {currency: 'USD', value: '1.00'},
            },
        };

        const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
        paymentRequest.show()
            .then((paymentResponse: any) => {
                const {paymentToken} = paymentResponse.details;
                console.warn('token', paymentToken)
            })
    };

    onGooglePay = () => {
        const allowedCardNetworks: any[] = ['VISA', 'MASTERCARD'];
        const allowedCardAuthMethods: any[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

        const requestData = {
            cardPaymentMethod: {
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    gateway: 'stripe',
                    gatewayMerchantId: '',
                    stripe: {
                        publishableKey: PUBLISHABLE_KEY,
                        version: '2018-11-08',
                    },
                },
                allowedCardNetworks,
                allowedCardAuthMethods,
            },
            transaction: {
                totalPrice: '10',
                totalPriceStatus: 'FINAL',
                currencyCode: 'USD',
            },
            merchantName: 'Example Merchant',
        };

        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
        GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
            .then((ready) => {
                if (ready) {
                    GooglePay.requestPayment(requestData)
                        .then((token) => {
                            // Send a token to your payment gateway
                            console.warn('google pay token', token)
                        })
                        .catch(error => console.log(error.code, error.message))
                }
            })
    };

    render() {
        const {navigation} = this.props;

        return (
            <ScrollView>
                <View style={styles.viewContainer}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>Balance</Text>
                        <TouchableOpacity style={styles.rechargeContainer}
                                          onPress={() => navigation.navigate('Balance')}>
                            <Image style={styles.rechargeIcon} source={rechargeIcon}/>
                            <Text style={styles.rechargeText}>Recharge your balance</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 30, paddingTop: 30}}>
                        <Text style={styles.label}>Promo code bonus</Text>
                        <View style={styles.promoBonusContainer}>
                            <View style={styles.promoCodeContainer}>
                                <Text style={styles.promoCode}>PRTY234</Text>
                            </View>
                            <Text style={styles.balancePlus}>+$3.25</Text>
                            <Text style={{fontSize: 12}}>Your balance was an increase with promo code</Text>
                            <Image style={styles.bonusIcon} source={bonusIcon}/>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 30, paddingTop: 30}}>
                        <View style={{...styles.row, marginTop: 0}}>
                            <Text style={styles.label}>
                                My card
                                <Text style={styles.cardLabel}>&nbsp;(2 cards added)</Text>
                            </Text>
                            <TouchableOpacity onPress={() => console.warn('Change card')}>
                                <Text style={{...styles.addPaymentLabel, fontSize: 12}}>Change card</Text>
                            </TouchableOpacity>
                        </View>
                        <ImageBackground source={visaBg} style={styles.visaBg}>
                            <View style={styles.topLeft}>
                                <Text style={styles.itemLabel}>Debit</Text>
                                <Text style={styles.itemContent}>OnePay</Text>
                            </View>
                            <View style={styles.topRight}>
                                <Image source={visaLogo} style={styles.visaLogo}/>
                            </View>
                            <View style={styles.bottomLeft}>
                                <Text style={styles.itemLabel}>Card number</Text>
                                <Text style={styles.itemContent}>xxxx xxxx xxxx 3456</Text>
                            </View>
                            <View style={styles.bottomRight}>
                                <Text style={styles.itemLabel}>Expires</Text>
                                <Text style={styles.itemContent}>09 / 23</Text>
                            </View>
                        </ImageBackground>
                        <Text style={{...styles.addPaymentLabel, marginTop: 30}}>Add Payment Method</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddCard')}>
                            <View style={styles.row}>
                                <Text style={styles.label}>
                                    <Image style={styles.icon} source={creditCardIcon}/>
                                    &nbsp;
                                    Add credit card
                                </Text>
                                <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PromoCode')}>
                            <View style={styles.row}>
                                <Text style={styles.label}>
                                    <Image style={{...styles.icon, height: 14}} source={couponIcon}/>
                                    &nbsp;
                                    Enter code
                                </Text>
                                <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                            </View>
                        </TouchableOpacity>
                        <View style={{...styles.row, marginTop: 30}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Paypal')}>
                                <Image source={paypalBtn} style={styles.button}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (Platform.OS === 'ios') {
                                        this.onApplePay()
                                    } else {
                                        this.onGooglePay()
                                    }
                                }}
                            >
                                <Image source={Platform.OS === 'ios' ? applePayBtn : googlePayBtn}
                                       style={styles.button}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rechargeBtn}>
                        <RabbitButton
                            onPress={() => navigation.navigate('Balance')}
                            title='RECHARGE YOUR BALANCE'
                            color={Color.WHITE}
                            backgroundColor={Color.BLACK}
                            borderColor={Color.BLACK}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}
