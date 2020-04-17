import React, {Component} from 'react'
import {Image, Text, View,} from 'react-native'
import {StripeAddCard} from 'react-native-checkout'
import styles from './styles'

const scan = require('../../../resources/scan.png');

const PUBLISHABLE_KEY = 'pk_test_vRdesV1QP6lMeyYWLZqNr10Z00ZLNAKghi';

export interface Props {
    navigation: any
}

export default class AddCard extends Component<Props> {
    static navigationOptions = {
        title: 'Add a card',
    };

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.viewContainer}>
                <View style={styles.blackBg}>
                    <Text style={styles.title}>Add your card</Text>
                    <Text style={styles.subTitle}>Fill out fields below or use your camera</Text>
                    <Text style={styles.cardNumberLabel}>Your Card Number</Text>
                    <View style={styles.expiryCvvLabel}>
                        <Text style={{...styles.cardNumberLabel, flex: 1}}>Expiry Date</Text>
                        <Text style={{...styles.cardNumberLabel, flex: 1, marginLeft: 40}}>CVV</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <StripeAddCard
                        publicStripeKey={PUBLISHABLE_KEY}
                        addCardTokenHandler={(token: string) => {
                            console.warn(token);
                            navigation.pop()
                        }}
                        styles={{
                            addCardContainer: styles.addCardContainer,
                            cardNumberContainer: styles.cardNumberContainer,
                            cardNumberInput: styles.cardNumberInput,
                            monthYearCvcContainer: styles.monthYearCvcContainer,
                            cvcContainer: styles.cvcContainer,
                            monthYearContainer: styles.monthYearContainer,
                            cvcInput: styles.cvcInput,
                            monthYearTextInput: styles.monthYearTextInput,
                            invalid: styles.invalid,
                            errorTextContainer: styles.errorTextContainer,
                            scanCardButton: styles.scanCardButton,
                            scanCardButtonText: styles.scanCardButtonText,
                            addButton: styles.addButton,
                            addButtonText: styles.addButtonText,
                            activityIndicatorContainer: styles.activityIndicatorContainer,
                        }}
                        addCardButtonText='Confirm'
                        scanCardButtonText={(
                            <Text>
                                <Image source={scan} style={{width: 18, height: 16}}/>
                                &nbsp;&nbsp;Scan Card
                            </Text>
                        )}
                        scanCardAfterScanButtonText={(
                            <Text>
                                <Image source={scan} style={{width: 18, height: 16}}/>
                                &nbsp;&nbsp;Scan Card Again
                            </Text>
                        )}
                        onScanCardClose={() => console.warn('scan card closed')}
                        onScanCardOpen={() => console.warn('scan card opened')}
                        scanCardVisible={true}
                        placeholderTextColor='lightgray'
                        cardNumberPlaceholderText='0000 0000 0000 0000'
                    />
                </View>
            </View>
        )
    }
}
