import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 30,
    },
    balanceText: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    chooseLabel: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 36,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountContainer: {
        marginHorizontal: 10,
        marginTop: 20,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    amount: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    bonus: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Color.LIGHTGREY,
    },
    desc: {
        fontSize: 14,
        color: Color.LIGHTGREY,
        marginTop: 50,
    },
});

export default styles
