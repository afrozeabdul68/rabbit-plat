import {Platform, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: Color.BLACK,
        paddingHorizontal: 30,
    },
    welcomeText: {
        fontSize: 18,
        color: Color.WHITE,
        fontWeight: '800',
    },
    logo: {
        width: 180,
        height: 60,
        resizeMode: 'contain',
        marginTop: 20,
    },
    confirmText: {
        color: Color.WHITE,
        fontSize: 14,
        marginTop: 40,
    },
    yourNumber: {
        color: Color.WHITE,
        fontSize: 17,
        fontWeight: '600',
        marginTop: 40,
    },
    modalContainer: {
        backgroundColor: Color.DARK_COLOR,
    },
    contentContainer: {
        backgroundColor: Color.DARK_COLOR,
    },
    header: {
        backgroundColor: Color.DARK_COLOR,
    },
    itemCountryName: {
        borderBottomWidth: 0,
    },
    countryName: {
        color: Color.WHITE,
    },
    letterText: {
        color: Color.WHITE,
    },
    input: {
        color: Color.WHITE,
        borderBottomWidth: 1,
        borderColor: Color.WHITE,
    },
    callingCode: {
        color: Color.WHITE,
        marginLeft: 10,
    },
    phoneContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textInput: {
        color: Color.WHITE,
        marginLeft: 10,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: Color.GREY,
        marginTop: Platform.OS === 'ios' ? 10 : 0,
    },
});

export default styles
