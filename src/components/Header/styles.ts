import {Dimensions, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        height: 60,
        backgroundColor: Color.BLACK,
        shadowColor: Color.BLACK,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    title: {
        color: Color.WHITE,
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 50,
    },
    leftIcon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
    rightIcon: {
        width: 24,
        height: 24,
        marginRight: 16,
    },
    buttonContainer: {
        width: Dimensions.get('window').width,
        height: 60,
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Color.TRANSPARENT,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default styles
