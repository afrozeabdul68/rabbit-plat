import React, {Component} from 'react'
import {Text, TextInput, View} from 'react-native'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

export interface Props {
    navigation: any
}

export interface State {
    promoCode: string
    showError: boolean
}

export default class PromoCode extends Component<Props, State> {
    static navigationOptions = {
        title: 'Enter promo code',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            promoCode: '',
            showError: false,
        }
    }

    render() {
        const {promoCode, showError} = this.state;
        const {navigation} = this.props;

        return (
            <View style={styles.viewContainer}>
                <View style={styles.promoCodeContainer}>
                    <Text style={styles.label}>Enter promo code</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={val => this.setState({promoCode: val, showError: false})}
                            placeholder='Add a promo code here'
                            autoCapitalize='characters'
                        />
                    </View>
                    {showError && <Text style={styles.errorLabel}>Please enter a valid promo code.</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <RabbitButton
                        onPress={() => {
                            if (promoCode === '') {
                                this.setState({showError: true})
                            } else {
                                navigation.pop()
                            }
                        }}
                        title='ADD PROMO CODE'
                        color={Color.WHITE}
                        backgroundColor={Color.BLACK}
                        borderColor={Color.BLACK}
                    />
                </View>
            </View>
        )
    }
}
