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
        marginTop: 16,
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
    rightArrowIcon: {
        width: 15,
        height: 10,
    },
    separator: {
        backgroundColor: Color.LIGHTGREY,
        opacity: 0.3,
        width: '100%',
        height: 1,
        marginVertical: 15,
    },
    switch: {
        marginRight: -10,
    },
});

export default styles
