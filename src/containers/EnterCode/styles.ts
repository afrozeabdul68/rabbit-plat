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
    flexContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    icon: {
        width: 20,
        height: 12,
    },
    wrap: {
        position: "relative",
        flexDirection: "row",
      },
    
      input: {
        position: "absolute",
        fontSize: 32,
        textAlign: "center",
        backgroundColor: "transparent",
        width: 32,
        top: 0,
        bottom: 0,
      },
      display: {
        borderBottomWidth: 1,
        borderBottomColor: Color.GREEN_UNDERLINE,
        borderColor: "rgba(0, 0, 0, 0.2)",
        width: 32,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        marginRight: 16,
      },
      text32: {
        fontSize: 32,
        fontWeight: '600',
      },
      noBorder: {
        borderBottomWidth: 0,
      },
});

export default styles