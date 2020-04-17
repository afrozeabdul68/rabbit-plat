import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 30,
    },
    nameText: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 12,
    },
    nameDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationText: {
        fontWeight: '600',
        fontSize: 14,
        color: Color.GREY,
    },
    openBtnContainer: {
        backgroundColor: Color.WHITE,
        borderWidth: 1,
        borderColor: Color.GREEN,
        borderRadius: 5,
    },
    openText: {
        color: Color.GREEN,
        paddingVertical: 3,
        paddingHorizontal: 7,
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addressText: {
        fontSize: 12,
    },
    mapContainer: {
        marginTop: 12,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: Color.LIGHTGREYBORDER,
        overflow: 'hidden',
    },
    mapView: {
        width: '100%',
        height: 165,
        borderRadius: 12,
    },
    featureLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    buttonContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderColor: Color.YELLOW,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    minusText: {
        fontSize: 24,
    },
    plusText: {
        fontSize: 20,
    },
    count: {
        fontSize: 14,
        fontWeight: '600',
        marginHorizontal: 16,
    },
    unitText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 48,
        fontWeight: 'bold',
        lineHeight: 48,
        marginLeft: 5,
    },
    perHourText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.GREY,
        marginLeft: 5,
    },
    priceDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        alignItems: 'flex-start',
    },
    cancelBtn: {
        color: Color.LIGHTGREY,
    },
    hourglass: {
        width: 60,
        height: 50,
        marginTop: 16,
    },
    dialogContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles
