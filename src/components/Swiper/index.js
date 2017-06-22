import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class MySwiper extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let topArticles = this.props.card.latest.top_stories;
    let slides = [];
    // console.warn(JSON.stringify(topArticles));
    if (topArticles) {
      topArticles.forEach(function (v, k) {
        slides.push(
          <TouchableHighlight key={k} style={styles.slide} onPress={() => {return false;this.props.fetchArticleContentAndExtra(v.id)}}>
            <Image source={{uri:v.image}} style={styles.slide} resizeMode="cover">
              <View style={styles.shadow}/>
              <Text style={styles.title}>{v.title}</Text>
            </Image>
          </TouchableHighlight>
        )
      }.bind(this));
      return(
        <Swiper style={styles.wrapper}
                dot={<View style={{backgroundColor:'rgba(150,150,150,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, opacity: 0}} />}
                activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, opacity: 0}} />}
                paginationStyle={{bottom:5}}
                height={240}
                autoplay={false}
                loop={true}
                showsPagination={true}
                autoplayTimeout={5}>
          {slides}
        </Swiper>
      )
    }
    return null;
  }

}

const styles = StyleSheet.create({
  wrapper: {
  },
  shadow:{
    backgroundColor:'#333',opacity:0,top:170,height:70
  },
  title:{
    top:50,
    marginLeft:10,
    color:'white',
    fontSize:30
  },
  slide: {
    flex:1,
    backgroundColor:'transparent',
    padding: 15
  }
});