import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator,SafeAreaView, Alert } from 'react-native';
import { NavigationContainer , navigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      counter:1,
      TotalAmount:14.2,
      foodItems :[
        {
          id: '1',
          title: 'Grilled Sandwich',
          qty:'1',
          price:'10'
        },
        {
          id: '2',
          title: 'Salad',
          qty:'1',
          price:'3.0'
        },
        // {
        //   id: '3',
        //   title: 'Coke',
        //   qty:'1', 
        //   price:'$1.0'
        // },
      ]
    };
    
  }


  delete=(id)=>{
    Alert.alert(
      'Alert',
          'Do you want to delete item?',
          [
            { text: 'OK',onPress:()=> this._deleteService(id)},
          ],
          { cancelable: true }
        );
    }

  _deleteService(id){
    let foodItems = this.state.foodItems;
      for(var i=0;i<foodItems.length;i++){
          if(foodItems[i].id===id){
            this.setState({TotalAmount:this.state.TotalAmount-(this.state.foodItems[i].qty*this.state.foodItems[i].price)})
            foodItems.splice(i, 1);
            break;
          }
      }
      this.setState({foodItems:foodItems});
  }

  addTableMember = () => {
    this.state.counter = this.state.counter + 1; 
    this.setState({
      isLoading: true
    })
    if(this.state.foodItems != ""){
      for(var i = 0; i<this.state.foodItems.length; i++){
           this.state.TotalAmount = this.state.TotalAmount + (this.state.foodItems[i].price * this.state.foodItems[i].id )
           console.log("each item value ----: " + this.state.TotalAmount)
       }
       this.setState({TotalAmount:this.state.TotalAmount})
       console.log("each item value after----: " + this.state.TotalAmount)
    }else{

       console.log("Empty Response")
    }
   
    console.log(this.state.counter)
    this.setState({
      isLoading: false
    })
  }


  render(){
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent:'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <View style={styles.mainItemCon1}>
            <View style={styles.tableHeadingContainer}>
                <View style={{flex:1}}>
                <Text style={styles.tableHead}>Table No. 22-{this.state.counter}</Text>
                </View>
            
                <View style={styles.addButton}>
                    <TouchableOpacity onPress={()=> this.addTableMember()}>
                    <Text style={styles.addBtn}> + </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tableHeadingContainer}>
                <View style={{flex:1}}>
                    <Text style={styles.tableHead}> Billing </Text>
                </View>
            
                <View style={{alignSelf:'flex-end'}}>
                    <Text style={styles.closeBtn}> x </Text>
                </View>
            </View>

            <View style={styles.itemContainer}>
            
            <View style={{flexDirection:'row', paddingVertical:15}}>

                <View style={{flex:1}}>
                    <Text style={styles.itemTitleText}>Item</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.itemTitleText}>Qty</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.itemTitleText}>Price</Text>
                </View>
                <View style={{flex:1}}></View>
            </View>

            <FlatList
                data={this.state.foodItems}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.itemTitleText}>{item.title}</Text>
                            </View>
                            <View style={{flex:1,alignItems:'center', alignContent:'center'}}>
                            <View style={styles.shadowButton,styles.qtyBtn}>
                                 <Text style={styles.itemTitleText,{textAlign:'center', fontSize:18}}>{item.qty}</Text>
                            </View>
                            </View>
                            <View style={{flex:1}}>
                                 <Text style={styles.itemTitleText}>${item.price}</Text>
                            </View>
                            
                            <View style={{flex:1}}>
                                <TouchableOpacity onPress={() => this.delete(item.id)}>
                                  <Text>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
        </View>
        
        <View style={{flex:1, backgroundColor:'white', padding:8}}>
            <View style={{padding:2}}>
                <View style={{flexDirection:'row',padding:0,}}>
                    <View style={{flex:4,padding:8, }}>
                        <Text style={styles.fontS_15}>Sub</Text>
                        
                    </View>
                    <View style={{flex:1,padding:8, }}>
                        <Text style={styles.fontS_15}>$0.2</Text>
                    </View>  
                </View>

                <View style={{flexDirection:'row',padding:0,}}>
                    <View style={{flex:4,padding:8, }}>
                        <Text style={styles.fontS_15}>Discount</Text>
                        
                    </View>
                    <View style={{flex:1,padding:8, }}>
                        <Text style={styles.fontS_15}>$0.0</Text>
                    </View>  
                </View>

                <View style={{flexDirection:'row',padding:0,}}>
                    <View style={{flex:4,padding:8, }}>
                        <Text style={styles.fontS_15}>Tax</Text>
                        
                    </View>
                    <View style={{flex:1,padding:8, }}>
                        <Text style={styles.fontS_15}>$1.0</Text>
                    </View>  
                </View>

                <View style={styles.payBtnContainer}>
                    <View style={styles.headingtext,{flex:4,padding:8, }}>
                        <Text style={styles.headingtext,{fontSize:16,color:'white'}}>Pay</Text>
                    </View>
                    <View style={{flex:1,padding:8, }}>
                        <Text style={styles.headingtext,{fontSize:16,color:'white'}}>$ {this.state.TotalAmount}</Text>
                    </View>                                        
                </View>
            </View>
            

            <View style={{paddingTop:2}}>
                <View style={{flexDirection:'row', padding:2}}>
                    <View style={{flex:1,flexDirection:'row', padding:2,}}>
                        <View style={{backgroundColor:'#2d99de',flex:1,padding:8, }}>
                            <Image style={{ width:30, height:30}} source={require('./images/order.png')}/>
                        </View>
                        <View style={{backgroundColor:'#83c0e6',flex:4,padding:8, }}>
                            <Text style={{fontSize:16, color:'white'}}>Order</Text>
                        </View>                                        
                    </View>
                    
                    <View style={{flex:1,flexDirection:'row',flex:1, padding:2,}}>
                        <View style={{backgroundColor:'#2d99de',flex:1,padding:8, }}>
                            <Image style={{ width:35, height:35}} source={require('./images/discount_white.png')}/>
                        </View>
                        <View style={{backgroundColor:'#83c0e6',flex:4,padding:8, }}>
                            <Text style={{fontSize:16, color:'white'}}>Discount</Text>
                        </View>                                        
                    </View>
                </View>
               
                <View style={{flexDirection:'row', padding:2}}>
                        <View style={{flex:1,flexDirection:'row',flex:1, padding:2,}}>
                            <View style={{backgroundColor:'#f67044',flex:1,padding:8, }}>
                                <Image style={{ width:30, height:30}} source={require('./images/cancel.png')}/>
                            </View>
                            <View style={{backgroundColor:'#f09273',flex:4,padding:8, }}>
                                <Text style={{fontSize:16, color:'white'}}>Cancel</Text>
                            </View>                                        
                        </View>
                        
                        <View style={{flex:1,flexDirection:'row',flex:1, padding:2,}}>
                            <View style={{backgroundColor:'#2d99de',flex:1,padding:8, }}>
                                <Image style={{ width:30, height:30}} source={require('./images/pay1.png')}/>
                            </View>
                            <View style={{backgroundColor:'#83c0e6',flex:4,padding:8, }}>
                                <Text style={{fontSize:16, color:'white'}}>Pay</Text>
                            </View>                                        
                        </View>
                </View>
          
            </View>

        </View>    
      
      </View>
    
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d6d6',
    paddingTop:25,
  },
  mainItemCon1:{
    flex:1.3
  },
  tableHeadingContainer:{
    flexDirection:'row', 
    padding:3, 
    backgroundColor:'#faae95', 
    marginVertical:5
  },
  tableHead:{
    fontSize:16,
    fontWeight:'bold',
    padding:10
  },
  addButton:{
    alignSelf:'flex-end', 
    backgroundColor:'#626262'
  },
  addBtn:{
    fontSize:16,
    fontWeight:'bold',
    padding:8, 
    color:'white'
  },
  closeBtn:{
    fontSize:16, 
    fontWeight:'bold',
    padding:8, 
    color:'#626262'
  },
  qtyBtn:{
    textAlign:'center',
    paddingHorizontal:10, 
    backgroundColor:'white'
  },
  payBtnContainer:{
    flexDirection:'row', 
    padding:5, 
    margin:3,
    backgroundColor:'#2d99de'
  },
  itemTitleText:{
    fontSize:18,
    fontWeight:'600',
    padding:5,
    textAlign:'center'
  },
  shadowButton:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginBottom: 10,
    elevation: 2,
    position: 'relative'
  },
  headingtext:{
    fontSize:18,
    fontWeight:'600',
  },
  fontS_15:{
    fontSize:15
  },
  subText:{
    fontSize:14,
    fontWeight:'600',
  }

});
