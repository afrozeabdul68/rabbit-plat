import {Platform, StyleSheet} from 'react-native'
import Color from '../../variables/colors'

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    text: {
        fontSize: 16,
    },
    label: {
        color: Color.LIGHTGREY,
        fontSize: 12,
        fontWeight: '600',
        marginTop: 30,
    },
    textInput: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: Platform.OS === 'ios' ? 10 : 0,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderBottomColor: Platform.OS === 'ios' ? Color.LIGHTGREY : Color.TRANSPARENT,
    },
    descText: {
        fontSize: 14,
        marginTop: 30,
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    icon: {
        width: 20,
        height: 12,
    },
});

export default styles
