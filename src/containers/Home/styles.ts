import {Dimensions, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        position: 'relative',
    },
    mapView: {
        width: '100%',
        height: '100%',
    },
    helpIcon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    menuIcon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
    bottomIcon: {
        position: 'absolute',
        bottom: 100,
    },
    image: {
        width: 56,
        height: 56,
    },
    buttonContainer: {
        backgroundColor: Color.BLACK,
        borderWidth: 1,
        borderColor: Color.BLACK,
        borderRadius: 25,
        height: 50,
        position: 'absolute',
        bottom: 30,
        marginHorizontal: 16,
        width: Dimensions.get('window').width - 32,
    },
    buttonText: {
        color: Color.WHITE,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mapInfoContainer: {
        width: 300,
        backgroundColor: Color.WHITE,
        borderRadius: 8,
        padding: 16,
    },
    nameText: {
        fontWeight: '600',
        fontSize: 14,
        width: 200,
    },
    nameDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addressText: {
        fontSize: 12,
        color: Color.LIGHTGREY,
    },
    featureDiv: {
        borderWidth: 1,
        borderColor: Color.LIGHTGREY,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4,
        width: 70,
        display: 'flex',
        alignItems: 'center',
    },
    featureImg: {
        width: 18,
        height: 12,
        marginBottom: 5,
    },
    featureText: {
        fontSize: 10,
        fontWeight: '600',
        color: Color.LIGHTGREY,
        marginTop: 6,
    },
    priceText: {
        fontSize: 12,
    },
    drawerLabel: {
        color: Color.WHITE,
        fontSize: 18,
        fontWeight: '600',
    },
    drawerIcon: {
        width: 60,
        height: 60,
    },
});

export default styles
