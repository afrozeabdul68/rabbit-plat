import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: Color.BLACK,
        alignItems: 'center',
    },
    logo: {
        width: 326,
        height: 215,
        resizeMode: 'contain',
        marginTop: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: Color.WHITE,
        marginTop: 45,
    },
    subtitle: {
        fontSize: 16,
        color: Color.WHITE,
        marginTop: 30,
        width: '80%',
        textAlign: 'center',
    },
    btnContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 30,
    },
    notNowBtn: {
        fontSize: 16,
        color: Color.WHITE,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
});

export default styles
