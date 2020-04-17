/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import AsyncStorage from '@react-native-community/async-storage'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {setContext} from 'apollo-link-context'
import {createHttpLink} from 'apollo-link-http'
import React from 'react'
import {ApolloProvider} from 'react-apollo'
import {ApolloProvider as ApolloHooksProvider} from 'react-apollo-hooks'
import SplashScreen from 'react-native-splash-screen'
import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation'
import CustomNavigator from './components/Drawer'
import AddCard from './containers/AddCard'
import AllowLocation from './containers/AllowLocation'
import AllowNotification from './containers/AllowNotification'
import Balance from './containers/Balance'
import Confirmations from './containers/Confirmations'
import EnterCode from './containers/EnterCode'
import FreeCharging from './containers/FreeCharging'
import Help from './containers/Help'
import History from './containers/History'
import Home from './containers/Home'
import Info from './containers/Info'
import Payment from './containers/Payment'
import Paypal from './containers/Paypal'
import Profile from './containers/Profile'
import PromoCode from './containers/PromoCode'
import ScanQRCode from './containers/ScanQRCode'
import Settings from './containers/Settings'
import Summary from './containers/Summary'
import Welcome from './containers/Welcome'
import Color from './variables/colors'
// @ts-ignore
import { API_URL } from 'react-native-dotenv'

const httpLink = createHttpLink({
    uri: API_URL
});

const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const Drawer = createDrawerNavigator({
    Home,
}, {
    initialRouteName: 'Home',
    contentComponent: CustomNavigator,
    overlayColor: Color.DRAWER_OVERLAY_COLOR,
});

const AppNavigator = createStackNavigator({
    Welcome,
    EnterCode,
    Info,
    AllowLocation,
    AllowNotification,
    ScanQRCode,
    Confirmations,
    Home,
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        },
    },
    History,
    Summary,
    Payment,
    FreeCharging,
    Help,
    Profile,
    Settings,
    AddCard,
    Balance,
    Paypal,
    PromoCode,
}, {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Color.BLACK,
        },
        headerTintColor: Color.WHITE,
        headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
        },
    },
});

const AppContainer = createAppContainer(AppNavigator);

export interface Props {
}

export interface State {
}

class App extends React.Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                    <AppContainer/>
                </ApolloHooksProvider>
            </ApolloProvider>
        )
    }
}

export default App
