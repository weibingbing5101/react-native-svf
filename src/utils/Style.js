import {Platform, Dimensions} from 'react-native';

/**
 * Combine style from props like: marginTop, left, right
 * @param propStyleKeys
 * @param props
 * @returns {{}}
 */
export function getStyleFromProps(propStyleKeys = [], props = {}){
    let style = {};
    propStyleKeys.map((propStyleKey) => {
        const propStyleValue = props[propStyleKey];
        if(propStyleValue !== undefined && propStyleValue !== null && propStyleValue !== false){
            style = {
                ...style,
                [propStyleKey]: propStyleValue
            }
        }
        return propStyleKey;
    });
    if(props.style){
        style = {
            ...style,
            ...props.style
        }
    }
    return style;
}

export function getPlatformValue(os, value, valueDefault){
    if(Platform.OS === os) return value;
    return valueDefault
}


const betweenCenter = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
}

const leftCenter = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
}

const allCenter = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
}

const allCenterVer = {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
}
const colCenter = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}

const primaryFontSize = 12;

const winWidth = Dimensions.get('window').width;

const winHeight = Dimensions.get('window').height;


export {betweenCenter}
export {leftCenter}
export {allCenter}
export {colCenter}
export {allCenterVer}
export {primaryFontSize}
export {winWidth}
export {winHeight}

