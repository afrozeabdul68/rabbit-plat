import React from 'react'
import {Image, Text, TouchableOpacity, View,} from 'react-native'
import styles from './styles'

interface Props {
    title: string
    onLeftBtnPress: () => void
    onRightBtnPress: () => void
    leftIcon?: any
    rightIcon?: any
}

const Header = (props: Props) => {
    const {title, onLeftBtnPress, onRightBtnPress, leftIcon, rightIcon} = props;

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonContainer}>
                {onLeftBtnPress && (
                    <TouchableOpacity onPress={onLeftBtnPress}>
                        <Image
                            source={leftIcon}
                            style={styles.leftIcon}
                        />
                    </TouchableOpacity>
                )}
                {onRightBtnPress && (
                    <TouchableOpacity onPress={onRightBtnPress}>
                        <Image
                            source={rightIcon}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
};

export default Header
