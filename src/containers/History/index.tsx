import React, {Component} from 'react'
import {Text, TouchableHighlight, View} from 'react-native'
import Color from '../../variables/colors'
import styles from './styles'

const data = [
    {
        date: 'Sep 21, 2019',
        time: '4.5 h',
        cost: '$4.00',
    },
    {
        date: 'Sep 21, 2019',
        time: '4.5 h',
        cost: '$4.00',
    },
    {
        date: 'Sep 21, 2019',
        time: '4.5 h',
        cost: '$4.00',
    },
];

export interface Props {
    navigation: any
}

export interface State {
    code: string
}

export default class History extends Component<Props> {
    static navigationOptions = {
        title: 'History',
    };

    renderRow = (item: any) => {
        const {navigation} = this.props;

        return (
            <TouchableHighlight
                onPress={() => navigation.navigate('Summary', {
                    item,
                })}
            >
                <View style={{...styles.header, backgroundColor: Color.WHITE}}>
                    <Text style={{...styles.headerLabel, color: Color.BLACK}}>{item.date}</Text>
                    <Text style={{...styles.headerLabel, color: Color.BLACK}}>{item.time}</Text>
                    <Text style={{...styles.headerLabel, color: Color.BLACK}}>{item.cost}</Text>
                </View>
            </TouchableHighlight>
        )
    };

    render() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerLabel}>Date</Text>
                    <Text style={styles.headerLabel}>Time</Text>
                    <Text style={styles.headerLabel}>Cost</Text>
                </View>
                {data.map(item => this.renderRow(item))}
            </View>
        )
    }
}
