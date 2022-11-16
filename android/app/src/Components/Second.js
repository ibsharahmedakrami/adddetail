import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from "react";
import { Text, View ,SafeAreaView,FlatList, ScrollView} from "react-native";



const Second =()=>{
    const [array,setArray]=useState([]);

    useEffect(()=>{
        getValue(); 
    },[])

    const getValue = async()=>{
        console.log("get")
         try{
            const value1 = await AsyncStorage.getItem('Arraydata');
            console.log(value1,"getvalue")
            console.log(value1,"hhhhhhh")
          const value2 = JSON.parse(value1);
    
          if (value2){
            console.log(value2, "uygyg")
            setArray(value2);
          }
       }catch(err){
        console.log(err);
       }
         
          
       }

    //    const delete = async()=>{
    //     const result = await AsyncStorage.getItem('Arraydata')
    //     let array = []
    //     if (result !== null) array = JSON.parse(result)
    //     const newArray = array.filter(item => item.id == array.id)
    //     await AsyncStorage.setArray('Arraydata',Json.stringify(newArray))
    //    }
    // const route = useRoute();
    return(
        <ScrollView>

{/*    
       
        (array||[]).map(user=>{
            return(
                
                <View style={{backgroundColor:"black",padding:5,borderRadius:10}}>
                     <Text style={{backgroundColor:"red"}}>{user.name}</Text>
                <Text style={{backgroundColor:"red"}}>{user.name1}</Text>
                <Text style={{backgroundColor:"red"}}>{user.name2}</Text>
                <Text style={{backgroundColor:"red"}}>{user.rad}</Text>
                <Pressable style={{backgroundColor:"white",color:"black",width:80,height:40,alignSelf:"center",textAlign:"center",justifyContent:"center",alignItems:"center",borderRadius:5,margin:3}} >
                <Text>delete</Text>
                </Pressable>

                </View>
               
               
            )
        ) */}

        <FlatList 
        data={array}
        renderItem={({item}) => {
            <Text>{item.name1}</Text>
        }}>

        </FlatList>
    
        </ScrollView>
      
       );



}
export default Second;