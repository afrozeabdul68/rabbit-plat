import React, {Component} from 'react'
import {Switch, Text, View,} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import RabbitButton from '../../components/RabbitButton'
import Color from '../../variables/colors'
import styles from './styles'

export interface Props {
}

export interface State {
    autoReload: boolean
    amount: number
}

export default class Balance extends Component<Props, State> {
    static navigationOptions = {
        title: 'Balance',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            autoReload: true,
            amount: 10,
        }
    }

    onSwitchValueChanged = () => {
        const {autoReload} = this.state;
        this.setState({autoReload: !autoReload})
    };

    render() {
        const {amount, autoReload} = this.state;

        return (
            <View style={styles.viewContainer}>
                <Text style={styles.balanceText}>$10.78</Text>
                <Text style={styles.chooseLabel}>Choose amount</Text>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.setState({amount: 5})}>
                        <View
                            style={{
                                ...styles.amountContainer,
                                borderColor: amount === 5 ? Color.YELLOW : Color.TRANSPARENT,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.amount,
                                    color: amount === 5 ? Color.YELLOW : Color.BLACK,
                                }}
                            >
                                $5
                            </Text>
                            <Text style={styles.bonus}>No bonus</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({amount: 10})}>
                        <View
                            style={{
                                ...styles.amountContainer,
                                borderColor: amount === 10 ? Color.YELLOW : Color.TRANSPARENT,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.amount,
                                    color: amount === 10 ? Color.YELLOW : Color.BLACK,
                                }}
                            >
                                $10
                            </Text>
                            <Text style={styles.bonus}>No bonus</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({amount: 15})}>
                        <View
                            style={{
                                ...styles.amountContainer,
                                borderColor: amount === 15 ? Color.YELLOW : Color.TRANSPARENT,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.amount,
                                    color: amount === 15 ? Color.YELLOW : Color.BLACK,
                                }}
                            >
                                $15
                            </Text>
                            <Text style={styles.bonus}>$1 coupon</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{...styles.row, justifyContent: 'space-between', marginTop: 50}}>
                    <Text style={{...styles.chooseLabel, marginTop: 0}}>Auto-reload</Text>
                    <Switch
                        value={autoReload}
                        onValueChange={this.onSwitchValueChanged}
                    />
                </View>
                <Text style={styles.desc}>
                    With auto-reload, your balance will be automatically reloaded
                    when it reaches $0, hassle-free. Want to manually add balance?
                    Simply turn auto-reload off.
                </Text>
                <RabbitButton
                    onPress={() => console.warn('Confirm!')}
                    title='CONFIRM'
                    color={Color.WHITE}
                    backgroundColor={Color.BLACK}
                    borderColor={Color.BLACK}
                />
            </View>
        )
    }
}
