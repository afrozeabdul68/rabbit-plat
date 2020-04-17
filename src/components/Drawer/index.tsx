import React from 'react'
import {Image, Text, TouchableHighlight, View,} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import {NavigationActions, StackActions} from 'react-navigation'
import styles from './styles'

const logoIcon = require('../../../resources/logo.png');
const paymentIcon = require('../../../resources/menu_payment.png');
const historyIcon = require('../../../resources/menu_history.png');
const freeChargingIcon = require('../../../resources/menu_free_charging.png');
const helpIcon = require('../../../resources/menu_help.png');
const profileIcon = require('../../../resources/menu_profile.png');
const settingsIcon = require('../../../resources/menu_settings.png');

interface Props {
    navigation: any
}

const CustomNavigator = (props: Props) => (
    <View style={styles.drawerContainer}>
        <Image
            source={logoIcon}
            style={styles.logo}
        />
        {/* <DrawerItems {...props} /> */}
        <TouchableHighlight
            onPress={() => {
                // setTimeout(() => {
                //   props.navigation.closeDrawer()
                // }, 100)
                props.navigation.navigate('Payment')
            }}
        >
            <View style={styles.drawerItem}>
                <Image
                    source={paymentIcon}
                    style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Payment</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => {
                // setTimeout(() => {
                //   props.navigation.closeDrawer()
                // }, 100)
                props.navigation.navigate('History')
            }}
        >
            <View style={styles.drawerItem}>
                <Image
                    source={historyIcon}
                    style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>History</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => {
                // setTimeout(() => {
                //   props.navigation.closeDrawer()
                // }, 100)
                props.navigation.navigate('FreeCharging')
            }}
        >
            <View style={styles.drawerItem}>
                <Image
                    source={freeChargingIcon}
                    style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Free Charging</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => {
                // setTimeout(() => {
                //   props.navigation.closeDrawer()
                // }, 100)
                props.navigation.navigate('Help')
            }}
        >
            <View style={styles.drawerItem}>
                <Image
                    source={helpIcon}
                    style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Help</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => {
                // setTimeout(() => {
                //   props.navigation.closeDrawer()
                // }, 100)
                props.navigation.navigate('Profile')
            }}
        >
            <View style={styles.drawerItem}>
                <Image
                    source={profileIcon}
                    style={styles.drawerIcon}
                />
                <Text style={styles.drawerLabel}>Profile</Text>
            </View>
        </TouchableHighlight>
        <View style={styles.footer}>
            <TouchableHighlight
                onPress={() => {
                    // setTimeout(() => {
                    //   props.navigation.closeDrawer()
                    // }, 100)
                    props.navigation.navigate('Settings')
                }}
            >
                <View style={styles.drawerItem}>
                    <Image
                        source={settingsIcon}
                        style={styles.drawerIcon}
                    />
                    <Text style={styles.drawerLabel}>Settings</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.separator}/>
            <TouchableHighlight
                onPress={async () => {
                    await AsyncStorage.clear();
                    props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'Welcome'}),
                        ],
                    }))
                }
                }
            >
                <View style={styles.drawerItem}>
                    <Text style={styles.drawerLabel}>Log Out</Text>
                </View>
            </TouchableHighlight>
        </View>
    </View>
);

export default CustomNavigator
