import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Color.BLACK,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 8,
        width: '100%',
        height: 60,
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 50,
    },
    rightArrowIcon: {
        width: 20,
        height: 12,
    },
});

export default styles
