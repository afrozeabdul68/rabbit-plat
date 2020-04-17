import React, {Component} from 'react'
import {Image, Switch, Text, TouchableOpacity, View,} from 'react-native'
import styles from './styles'

const rightArrowIcon = require('../../../resources/right_arrow.png');

export interface Props {

}

export interface State {
    switchValue: boolean
}

export default class Settings extends Component<Props, State> {
    static navigationOptions = {
        title: 'Settings',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            switchValue: true,
        }
    }

    onSwitchValueChanged = () => {
        const {switchValue} = this.state;
        this.setState({switchValue: !switchValue})
    };

    render() {
        const {switchValue} = this.state;

        return (
            <View style={styles.viewContainer}>
                <Text style={styles.label}>Account</Text>
                <View style={styles.separator}/>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.text}>Edit profile</Text>
                        <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.text}>Change password</Text>
                        <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.label}>Notifications</Text>
                <View style={styles.separator}/>
                <TouchableOpacity onPress={this.onSwitchValueChanged}>
                    <View style={styles.row}>
                        <Text style={styles.text}>App notifications</Text>
                        <Switch
                            style={styles.switch}
                            value={switchValue}
                            onValueChange={this.onSwitchValueChanged}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.label}>Payments</Text>
                <View style={styles.separator}/>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.text}>My cards</Text>
                        <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.text}>Transactions</Text>
                        <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.label}>Conditions</Text>
                <View style={styles.separator}/>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.text}>Terms of use</Text>
                        <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Text style={styles.text}>Privacy policy</Text>
                        <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
