import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/FontAwesome'
import Menu                     from './../../components/Menu'
import DemoScreen               from './../DemoScreen'
import colors                   from './../../resources/styles/colors'

const {width, height} = Dimensions.get('window');
const menuHeight = height;
const remainingHeight = height - menuHeight

export default class VerticalMenu extends Component {
    constructor(props) {
        super(props)
            this.state = {
            menuOpened: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sideMenuContainer} pointerEvents='box-none'>
                    <Interactable.View
                    ref='menuInstance'
                    verticalOnly={true}
                    snapPoints={[{y: -menuHeight, damping: 0.6}, {y: 0, damping: 0.6}]}
                    boundaries={{bottom: remainingHeight/2}}
                    initialPosition={{y: -menuHeight}}
                    onStop={ this.onStopInteraction.bind(this) }>
                        <Menu titleStyle={styles.titleStyle} style={ styles.sideMenu } />
                    </Interactable.View>
                </View>
                <DemoScreen navigation={this.props.navigation} onMenuPress={ this.onMenuPress } />
            </View>
        )
    }

    onStopInteraction(event, check) {
        let menuOpened = true
        if(event.nativeEvent.y == 0) {
            menuOpened = !menuOpened
        }
        this.setState((preState, props) => {
            return { menuOpened }
        })
    }

    onMenuPress = () => {
        const menuOpened = !this.state.menuOpened
        if(menuOpened) {
            this.refs['menuInstance'].snapTo({index: 1})
        } else {
            this.refs['menuInstance'].snapTo({index: 0})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    sideMenuContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        zIndex: 1
    },
    sideMenu: {
        width: width,
        backgroundColor: colors.bgMainRed,
        height: menuHeight,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    sideMenuTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    titleStyle: {
        marginLeft: -50
    }
});
