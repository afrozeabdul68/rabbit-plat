import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: Color.BLACK,
        padding: 24,
    },
    logo: {
        width: 110,
        height: 40,
        resizeMode: 'contain',
        marginTop: 40,
        marginBottom: 80,
    },
    drawerIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    drawerLabel: {
        color: Color.WHITE,
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 10,
    },
    drawerItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
        paddingVertical: 12,
    },
    footer: {
        position: 'absolute',
        left: 24,
        bottom: 24,
        display: 'flex',
        flexDirection: 'row',
    },
    separator: {
        width: 1,
        height: 18,
        backgroundColor: Color.WHITE,
        opacity: 0.6,
        marginTop: 18,
        marginLeft: 10,
    },
});

export default styles
