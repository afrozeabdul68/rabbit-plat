import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View,} from 'react-native'
import Search from 'react-native-search-box'
import Color from '../../variables/colors'
import styles from './styles'

const rightArrowIcon = require('../../../resources/right_arrow.png');
const userGuideIcon = require('../../../resources/search_user_guide.png');
const lowBatteryIcon = require('../../../resources/search_low_battery.png');
const helpIcon = require('../../../resources/search_help.png');
const faqIcon = require('../../../resources/search_faq.png');
const chatIcon = require('../../../resources/search_chat.png');
const feedbackIcon = require('../../../resources/search_feedback.png');

export default class Help extends Component {
    static navigationOptions = {
        title: 'Help',
    };

    searchBox: any;

    onSearch = (searchText: string) => new Promise((resolve, reject) => {
        console.warn(searchText, resolve, reject)
    });

    render() {
        return (
            <View style={styles.viewContainer}>
                <Search
                    ref={(ref: any) => {
                        this.searchBox = ref
                    }}
                    onSearch={this.onSearch}
                    backgroundColor={Color.BLACK}
                    inputBorderRadius={8}
                    placeholderCollapsedMargin={10}
                    placeholderExpandedMargin={30}
                    shadowVisible
                />
                <View style={{padding: 16}}>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Text style={styles.text}>
                                <Image style={{width: 17, height: 21}} source={userGuideIcon}/>
                                &nbsp;
                                User Guide
                            </Text>
                            <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Text style={styles.text}>
                                <Image style={{width: 22, height: 19}} source={lowBatteryIcon}/>
                                &nbsp;
                                Report a problem with battery
                            </Text>
                            <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Text style={styles.text}>
                                <Image style={{width: 19, height: 19}} source={helpIcon}/>
                                &nbsp;
                                Help charging
                            </Text>
                            <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Text style={styles.text}>
                                <Image style={{width: 19, height: 19}} source={faqIcon}/>
                                &nbsp;
                                FAQ
                            </Text>
                            <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Text style={styles.text}>
                                <Image style={{width: 20, height: 19}} source={chatIcon}/>
                                &nbsp;
                                Chat with us
                            </Text>
                            <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Text style={styles.text}>
                                <Image style={{width: 19, height: 17}} source={feedbackIcon}/>
                                &nbsp;
                                Feedback
                            </Text>
                            <Image style={styles.rightArrowIcon} source={rightArrowIcon}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
