import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

// Specify the type of data being used
type menu = {
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: string
}

const Stack = createStackNavigator();


//The homescreen
const HomeScreen = ({ navigation }: { navigation: any }) => {
  // The array for the data to be stored
  const [ dish, setDishes] = useState<menu[]>([]);

  let starterTotal = 0
  let mainTotal = 0
  let dessertTotal = 0

  const [starterAvrg, setStarterAvrg] = useState(0);
  const [mainAvrg, setMainAvrg] = useState(0);
  const [dessertAvrg, setDessertAvrg] = useState(0);
  
  const calculateAvrg = () => {
    let starterTotal = 0;
    let mainTotal = 0;
    let dessertTotal = 0;

    dish.forEach((item) => {
      const price = parseFloat(item.price) || 0;
      if (item.course === 'Starter') starterTotal += price;
      else if (item.course === 'Main') mainTotal += price;
      else if (item.course === 'Dessert') dessertTotal += price;
    });

    const starterCount = dish.filter((dish) => dish.course === 'Starter').length;
    const mainCount = dish.filter((dish) => dish.course === 'Main').length;
    const dessertCount = dish.filter((dish) => dish.course === 'Dessert').length;

    setStarterAvrg(starterCount > 0 ? starterTotal / starterCount : 0);
    setMainAvrg(mainCount > 0 ? mainTotal / mainCount : 0);
    setDessertAvrg(dessertCount > 0 ? dessertTotal / dessertCount : 0);
  }; 

  useEffect(() => {
    calculateAvrg();
  }, [dish]);


  

  
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
                  <Text style={styles.textdisplay}>R{dish.price}</Text>
                </View>
              )
            })}
          </ScrollView> 
          
        </View>
        <View style={{marginTop:5,}} ><Button title='Add Dish'  color={'blue'} onPress={() => navigation.navigate('Chef', { setDishes, dish })}/></View>

        <View style={{flexDirection:'row', height:200, width:200, justifyContent:'center', margin:20,}}>
          <View style={styles.avrgBox}>
            <Text style={styles.Heading}>Starters Avrg</Text>
            <Text>R{starterAvrg}</Text>
          </View>

          <View style={styles.avrgBox}>
            <Text style={styles.Heading}>Main Avrg</Text>
            <Text>R{mainAvrg}</Text>
          </View>

          <View style={styles.avrgBox}>
            <Text style={styles.Heading}>Dessert Avrg</Text>
            <Text>R{dessertAvrg}</Text>
          </View>
        </View>

        <View>
          <Button title='Filter'/>
        </View>

      </SafeAreaView>
   

  )

}



//The screen for the chef to add dishes
const chefScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { setDishes, dish } = route.params;
  const [DishName, setName] = useState('');
  const [Description, setDesctiption] = useState('');
  const [Course, setCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [Price, setPrice] = useState('');
  
  //Check if there is a value in the variables
  const Filled = DishName && Description && Price;

  //Function to add a dish to the array
  const addDish = () => {
    const newDish: menu= {
      name: DishName,
      description: Description,
      course: Course,
      price: Price,      
    };
    //Removes the dish from the text inputs
    setDishes([...dish, newDish]);
    setName('');
    setDesctiption('');
    setCourse('Starter');
    setPrice(''); 
       
  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
      <View style={{ top: 0, right: 435 }}><Button title='Back' onPress={() => navigation.goBack()}/></View>
      <View style={{ top: -35, left: 430 }}><Button title='Delete' onPress={() => navigation.navigate('Delete',{ setDishes, dish })}/></View>

      <TextInput style={styles.textInput} placeholder='Dish Name' keyboardType='name-phone-pad' onChangeText={name => setName(name)}></TextInput>

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



      <TextInput style={styles.textInput} placeholder='Price' keyboardType='numeric' onChangeText={price => setPrice(price)}></TextInput>

      <Button title='Submit' onPress={addDish} disabled={!Filled}/>


    </SafeAreaView>
  )
}


const deleteItemsScreen = ({ route }: { route: any }) => {
  const { setDishes, dish } = route.params;
  const [Number, setNumber] = useState(0);

  
  
  return(
    <SafeAreaView style={{flex:1, alignItems:'center'}}>
      <Text style={styles.Heading}>Delete Dishes</Text>
      <View>
        <TextInput placeholder='Enter Dish Number'  onChangeText={number => setNumber(Number)} ></TextInput>
        <Button title='Delete' />
      </View>
      <ScrollView style={styles.scrollView}>
                {dish.map((dish: menu,) => (
                    <View style={{ flexDirection: 'row' }} key={dish.name}>
                        <Text style={styles.textdisplay}>{dish.name}</Text>
                        <Text style={styles.textdisplay}>{dish.description}</Text>
                        <Text style={styles.textdisplay}>{dish.course}</Text>
                        <Text style={styles.textdisplay}>R{dish.price}</Text>
                    </View>
                ))}
            </ScrollView>
    </SafeAreaView>
  )
}


const App= () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>       
        <Stack.Screen name="Home" component={HomeScreen}/>       
        <Stack.Screen name="Chef" component={chefScreen}/>
        <Stack.Screen name='Delete' component={deleteItemsScreen}/>
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
  },

  avrgBox:{
    borderWidth:3,
    height:100,
    width:200,
    marginLeft:10,
    alignItems:'center'
    
  },

})