import {StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 30,
    },
    label: {
        fontSize: 12,
        color: Color.LIGHTGREY,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 30,
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    rightArrowIcon: {
        width: 15,
        height: 10,
    },
});

export default styles
