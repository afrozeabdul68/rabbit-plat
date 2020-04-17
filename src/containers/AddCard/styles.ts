import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    blackBg: {
        width: '100%',
        height: 315,
        backgroundColor: Color.BLACK,
        padding: 30,
    },
    cardContainer: {
        position: 'absolute',
        top: 20,
        width: '100%',
        padding: 30,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.WHITE,
    },
    subTitle: {
        color: Color.WHITE,
        fontSize: 12,
        marginTop: 16,
    },
    addCardContainer: {
        backgroundColor: Color.TRANSPARENT,
        top: 80,
        position: 'absolute',
        width: '100%',
    },
    cardNumberContainer: {
        borderRadius: 8,
    },
    cardNumberInput: {
        borderRadius: 8,
    },
    cardNumberLabel: {
        fontSize: 14,
        color: Color.LIGHTGREY,
        fontWeight: '600',
        marginTop: 20,
    },
    monthYearCvcContainer: {
        marginTop: 50,
    },
    expiryCvvLabel: {
        marginTop: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    cvcContainer: {
        marginLeft: 20,
        borderRadius: 8,
    },
    monthYearContainer: {
        marginRight: 20,
        borderRadius: 8,
    },
    cvcInput: {
        borderRadius: 8,
    },
    monthYearTextInput: {
        borderRadius: 8,
    },
    invalid: {
        borderWidth: 0,
        borderColor: Color.TRANSPARENT,
    },
    errorTextContainer: {
        display: 'none',
    },
    scanCardButton: {
        borderRadius: 8,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        shadowColor: Color.BLACK,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    scanCardButtonText: {
        color: Color.BLACK,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'left',
        marginLeft: 20,
        marginVertical: 5,
    },
    addButton: {
        backgroundColor: Color.BLACK,
        borderRadius: 24,
        paddingVertical: 4,
    },
    addButtonText: {
        color: Color.WHITE,
        fontSize: 14,
        fontWeight: '600',
    },
    activityIndicatorContainer: {
        // backgroundColor: Color.WHITE,
    },
});

export default styles
