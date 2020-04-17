import {Dimensions, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    mapView: {
        width: '100%',
        height: 300,
    },
    summaryContainer: {
        width: '100%',
        padding: 30,
        height: Dimensions.get('window').height - 80,
    },
    paymentMethod: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    amexIcon: {
        width: 32,
        height: 20,
    },
    cardNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.LIGHTGREY,
    },
    cardHiddenNumber: {
        width: 115,
        height: 6,
        marginHorizontal: 6,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default styles
