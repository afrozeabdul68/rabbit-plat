import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 0,
        backgroundColor: Color.BLACK,
        borderWidth: 1,
        borderColor: Color.BLACK,
        borderRadius: 25,
        width: '100%',
        height: 50,
        marginTop: 30,
    },
    buttonText: {
        color: Color.WHITE,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles
