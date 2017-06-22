import React, {Component} from 'react';
import ThemeDailyNav from './ThemeDailyNav'
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  ListView,
  RefreshControl,
  Platform
} from 'react-native';
import SliderBar from '../SliderBar'
import DrawerLayout from 'react-native-drawer-layout';
import {Grid,Col,Row} from 'react-native-easy-grid';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ThemeDaily extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  closeDrawer = () => {
    this._drawer.closeDrawer()
  };

  openDrawer = () => {
    this._drawer.openDrawer();
  };

  _renderRow = row => {
    let theme = new Theme(this.props.card.theme);
    let multipicShadow = null;
    let item = null;
    if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    if (row.images)
      item = (
        <Grid>
          <Col size={7}><Text style={{color:theme.colors.listColor,fontSize:18}}>{row.title}</Text></Col>
          <Col size={3} style={{justifyContent:'center'}}>
            <Image style={{left:15,right:10,flex:1,width:85,height:85}} source={{uri:row.images[0]}}>
              {multipicShadow}
            </Image>
          </Col>
        </Grid>
      );
    else item = <Grid><Col size={1}><Text style={{color:theme.colors.listColor,fontSize:18}}>{row.title}</Text></Col></Grid>;
    return(
      <Touch onPress={() => {this.props.fetchArticleContentAndExtra(row.id)}}>
        <View style={[styles.article,{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          {item}
        </View>
      </Touch>
    )
  };

  _onScroll(e,props){
    // console.warn(e.nativeEvent.contentOffset.y);
  }

  render() {

    let theme = new Theme(this.props.card.theme);
    let {card,refreshThemeArticles} = this.props;
    let img = require('../Splash/image/bg.png');
    //if (Platform.OS==='ios') { img = {uri:card.themeDaily.background}; }
    
    //文章列表
    let list = null;
    if (card.themeDaily&&card.themeDaily.stories) {
      img = {uri:card.themeDaily.background};
      this.ds = this.ds.cloneWithRows(card.themeDaily.stories);
      list = (
        <ListView
          dataSource={this.ds}
          renderRow={this._renderRow}
          style={{marginBottom:6}}
        />
      )
    } else{
      card.themeDaily = {};
      card.themeDaily.editors = [];
    }

    return (
      <DrawerLayout
        ref={(ref) => this._drawer = ref}
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={()=><SliderBar {...this.props} closeDrawer={this.closeDrawer}/>}>
        <ThemeDailyNav openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} {...this.props}/>
        <ScrollView
          style={{backgroundColor:theme.colors.background}}
          onScroll = {(e)=>{this._onScroll(e,this.props)}}
          refreshControl={
            <RefreshControl
              refreshing={card.refreshing}
              onRefresh={refreshThemeArticles}
              tintColor="grey"
              title="Loading..."
              colors={['#00a2ed', '#a200ed', '#a2ed00']}
              progressBackgroundColor="#fff"
            />
          }>
          <Image source={img} style={{height:240,backgroundColor:'#343434'}} resizeMode="cover">
            <Text style={styles.title}>{card.themeDaily.description}</Text>
          </Image>
          <Touch onPress={()=>{this.props.onNavigate({type:'push',key:'editors'})}}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.subtitle}>主编</Text>
              {card.themeDaily.editors.map(function (i) {
                return <Image key={i.id} style={styles.editor} source={{uri:i.avatar}}/>
              })}
            </View>
          </Touch>
          {list}
        </ScrollView>
      </DrawerLayout>
    );
  }

}

const styles = StyleSheet.create({
  shadow: {
    opacity:0.5,
    backgroundColor:'#000',
    top:25,
    left:0,
    width,
    height,
    position:'absolute'
  },
  subtitle:{margin:12,marginRight:15,color:'grey'},
  article:{
    height:100,
    margin:6,
    marginBottom:0,
    padding:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'white',
    borderRadius:5,
    borderColor:'#e3e3e3',
    borderTopWidth:1,
    borderBottomWidth:2,
    flexDirection:'row'
  },
  title:{
    top:180,
    marginLeft:20,
    marginRight:20,
    color:'white',
    fontSize:18
  },
  editor:{
    borderRadius:12,
    width:24,
    height:24,
    marginTop:9,
    marginRight:10
  }
});
