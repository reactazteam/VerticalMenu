'use strict'
import React, { Component } from 'react'
import {
    AppRegistry
} from 'react-native'

import VerticalMenu                    from './screens/drawers/VerticalMenu'

class App extends Component {
    render() {
        return <VerticalMenu />
    }
}

AppRegistry.registerComponent('VerticalMenu', () => App);
