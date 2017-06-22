import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {getStyleFromProps} from '../../utils/Style';

export default class TextFont extends Component {
    render() {
        const style = getStyleFromProps(['fontFamily','fontSize','fontWeight','color','marginTop'], this.props);
        return <Text {...this.props} style={style}>
            {this.props.children}
        </Text>
    }
}

TextFont.defaultProps = {
    fontWeight: '400',
    color: '#ffffff'
}

TextFont.propTypes = {
    fontFamily: PropTypes.string,
    fontWeight: PropTypes.string,
    fontSize: PropTypes.number,
    marginTop: PropTypes.number,
    color: PropTypes.string
}
