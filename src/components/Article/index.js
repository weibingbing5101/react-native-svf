import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Dimensions} from 'react-native';
import ArticleNav from './ArticleNav'
import Theme from '../../utils/Theme'

export default class Article extends Component {

  render() {
    let {card} = this.props;
    let body = card.article.body;
    let darkTheme = '';
    if (card.theme == Theme.DARK)
      darkTheme = "<style>.main-wrap{background-color: #343434} .headline{border-color: #343434} .headline-title{color:#888} .question-title{color: #888} .meta .author{color: #888;} .content{color: #888} .view-more a{background-color: #292929</style>";
    let image = '<div class="img-place-holder" style="overflow: hidden;position: relative"><img src="'+card.article.image+'" style="margin-top:-80px">'
      +'<div style="position:absolute;bottom:5px;right: 10px;color: white">'
      +card.article.image_source
      +'</div><div style="position:absolute;bottom:0;color: white;background-color: rgba(0,0,0,0.3);padding: 10px 10px 25px;width: 100%;font-size: 22px;word-break:break-all;">'
      +card.article.title
      +'</div></div>';
    body = body.replace('<div class="img-place-holder"></div>',image);
    
    let html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
      + card.article.css[0]
      + '" />' +
      darkTheme + '</head><body>' + body
      + '</body></html>';
    return (
      <View style={{flex:1}}>
        <ArticleNav {...this.props}/>
        {/*
         <Image
         resizeMode="cover"
         source={{uri: card.article.image}}
         style={styles.headerImage} >
         <Text style={{color:'white',right:10,bottom:5,position:'absolute'}}>{card.article.image_source}</Text>
         <View style={styles.titleContainer}>
         <Text style={styles.title}>
         {card.article.title}
         </Text>
         </View>
         </Image>
         */}
        <WebView
          style={styles.content} source={{html:html}}/>
      </View>

    );
  }

}

const HEADER_SIZE = 215;
const styles = StyleSheet.create({
  headerImage: {
    height: HEADER_SIZE,
    flexDirection: 'row',
    backgroundColor: '#DDDDDD'
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '300',
    color: 'white'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:0
  }
});