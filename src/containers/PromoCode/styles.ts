import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    promoCodeContainer: {
        backgroundColor: Color.BLACK,
        padding: 30,
        height: 160,
    },
    label: {
        color: Color.WHITE,
        fontSize: 14,
        fontWeight: '600',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: Color.WHITE,
        marginTop: 10,
        borderRadius: 8,
        paddingLeft: 10,
    },
    textInput: {
        fontSize: 14,
        fontWeight: '600',
        height: 50,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        paddingHorizontal: 30,
        width: '100%',
    },
    errorLabel: {
        fontSize: 12,
        color: Color.ERROR_COLOR,
        marginTop: 5,
    },
});

export default styles
