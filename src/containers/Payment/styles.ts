import {Dimensions, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    promoBonusContainer: {
        backgroundColor: Color.PROMO_BG_COLOR,
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    promoCodeContainer: {
        borderColor: Color.PROMO_COLOR,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: Color.TRANSPARENT,
        padding: 5,
        alignSelf: 'flex-start',
    },
    promoCode: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Color.PROMO_COLOR,
    },
    balancePlus: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    bonusIcon: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 16,
        right: 16,
    },
    balanceContainer: {
        width: '100%',
        height: 70,
        backgroundColor: Color.BLACK,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderColor: Color.GREY,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    rechargeIcon: {
        width: 17,
        height: 16,
        textAlign: 'center',
    },
    rechargeText: {
        color: Color.YELLOW,
        fontSize: 11,
        fontWeight: '600',
        marginTop: 5,
    },
    rechargeContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    balanceText: {
        color: Color.WHITE,
        fontSize: 16,
        fontWeight: '600',
    },
    addPaymentLabel: {
        fontSize: 14,
        color: Color.LIGHTGREY,
        fontWeight: '600',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 24,
    },
    icon: {
        width: 26,
        height: 17,
        resizeMode: 'contain',
    },
    rightArrowIcon: {
        width: 10,
        height: 19,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        width: 162,
        height: 60,
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.BLUE,
    },
    visaBg: {
        width: '100%',
        height: 180,
        marginTop: 16,
    },
    itemLabel: {
        fontSize: 12,
        color: Color.WHITE,
        opacity: 0.5,
    },
    itemContent: {
        color: Color.WHITE,
        fontSize: 20,
        fontWeight: '600',
    },
    topLeft: {
        position: 'absolute',
        top: 24,
        left: 24,
    },
    topRight: {
        position: 'absolute',
        top: 24,
        right: 24,
    },
    bottomLeft: {
        position: 'absolute',
        bottom: 24,
        left: 24,
    },
    bottomRight: {
        position: 'absolute',
        bottom: 24,
        right: 24,
    },
    visaLogo: {
        width: 60,
        height: 20,
        resizeMode: 'contain',
    },
    rechargeBtn: {
        // position: 'absolute',
        // bottom: 10,
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
});

export default styles
