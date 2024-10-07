import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

type menu = {
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: string
}

const Stack = createStackNavigator();


const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [ dish, setDishes] = useState<menu[]>([]);
  return (
    
      <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>        
        <Text style={styles.Heading}>Menu</Text>
        <Text style={{borderWidth:1, fontSize:15, fontWeight:'bold',}}>Total Dishes: {dish.length}</Text>                      
        <View style={{ height: 300, }}>
          <ScrollView style={styles.scrollView}>                    
            {dish.map(dish=>{
              return(
                <View style={{flexDirection:'row',}}>                  
                  <Text style={styles.textdisplay}>{dish.name}</Text>               
                  <Text style={styles.textdisplay}>{dish.description}</Text>
                  <Text style={styles.textdisplay}>{dish.course}</Text>
                  <Text style={styles.textdisplay}>{dish.price}</Text>
                </View>
              )
            })}
          </ScrollView> 
        </View>
        <View style={{marginTop:5,}} ><Button title='Add Dish'  color={'blue'} onPress={() => navigation.navigate('Chef', { setDishes, dish })}/></View>
      </SafeAreaView>
   

  )

}




const chefScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { setDishes, dish } = route.params;
  const [DishName, setName] = useState('');
  const [Description, setDesctiption] = useState('');
  const [Course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [Price, setPrice] = useState('');

  const Filled = DishName && Description && Price;

  const addDish = () => {
    const newDish: menu= {
      name: DishName,
      description: Description,
      course: Course,
      price: Price,      
    };
    setDishes([...dish, newDish]);
    setName('');
    setDesctiption('');
    setCourse('Starter');
    setPrice('');

    Toast.show({
      text1:'Dish Added',
      visibilityTime: 5000,
    });
  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
      <View style={{ top: 0, right: 435 }}><Button title='Back' onPress={() => navigation.goBack()}/></View>
      <View style={{ top: -35, left: 430 }}><Button title='Delete'></Button></View>

      <TextInput style={styles.textInput} placeholder='Dish Name' onChangeText={name => setName(name)}></TextInput>

      <TextInput style={styles.textInput} placeholder='Description' onChangeText={describe => setDesctiption(describe)}></TextInput>

      <View style={{height:50, width:200, borderWidth:3, padding:3, marginBottom:5,}}>
        <Picker
        
          selectedValue={Course}
          onValueChange={itemValue => setCourse(itemValue as 'Starter' | 'Main' | 'Dessert')}>
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main" value="Main" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>
      </View>



      <TextInput style={styles.textInput} placeholder='Price' onChangeText={price => setPrice(price)}></TextInput>

      <Button title='Submit' onPress={addDish} disabled={!Filled}/>


    </SafeAreaView>
  )
}


const App= () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>       
        <Stack.Screen name="Home" component={HomeScreen}/>       
        <Stack.Screen name="Chef" component={chefScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;


const styles = StyleSheet.create({

  scrollView: {
    width: 550,
    borderWidth: 2,    
  },

  Heading: {
    fontSize: 30,
    fontWeight: 'bold'
  },


  textInput: {
    borderWidth: 3,
    width: 200,
    height: 50,
    marginBottom: 5,
    padding:2,
    paddingLeft:10,
  },

  textdisplay:{
    fontSize:15,
    margin:3,
    borderWidth:1,
    padding:5,  
    height:100,
    width:130,  
  }

})