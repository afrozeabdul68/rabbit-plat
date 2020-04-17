import React from 'react'
import {Text, TouchableHighlight} from 'react-native'
import styles from './styles'

interface Props {
    onPress: () => void
    title: string
    borderColor: string
    backgroundColor: string
    color: string
}

const RabbitButton = (props: Props) => {
    const {onPress, title, borderColor, backgroundColor, color} = props;

    return (
        <TouchableHighlight
            style={{
                ...styles.buttonContainer,
                borderColor,
                backgroundColor,
            }}
            onPress={onPress}
            {...props}
        >
            <Text style={{...styles.buttonText, color}}>{title}</Text>
        </TouchableHighlight>
    )
};

export default RabbitButton
