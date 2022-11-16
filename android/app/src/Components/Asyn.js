import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TextInput, TouchableOpacity, View ,Dimensions, Text, Alert} from "react-native";

const Asyn = () =>{
   

   const [text,setText]=useState([]);
   const [array,setArray]=useState([]);

   
   let something = [];

   const setValue = async()=>{
    console.log("added");
    try{
        const data = await AsyncStorage.getItem('Arraydata');
        const parseData = JSON.parse(data);

        if (parseData === null){
            something.push(text);
            console.log(something,"text");
        }else{
            console.log(something,"kai ghal")
            const temp = [...parseData];
            console.log(temp,"kai enai kheka ggf")
            temp.push(text);
            something = [...temp]
            console.log(something,"kai enai kheka")
        }
        await AsyncStorage.setItem('Arraydata',JSON.stringify(something));

    }catch(err){
        console.log(err)
    }
   }
   
   const getValue = async()=>{
    console.log("get")
     try{
        const value1 = [await AsyncStorage.getItem('Arraydata')];
        console.log(value1,"getvalue")
      const value2 = JSON.parse(value1);

      if (value2 !== ''){
        console.log(value2, "uygyg")
        setArray(value2);
      }
   }catch(err){
    console.log(err,"err");
   }
     
      
   }

   

  

   
    return(
        <View style={style.container}>
             <TextInput style={style.inputBox}  placeholder='enter the data' onChangeText={value => setText(value)}></TextInput>
             <TouchableOpacity style={style.AddButton} onPress={setValue}>
                <Text style={{color:"#fff"}}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.AddButton} onPress={getValue}>
                <Text style={{color:"#fff"}}>get</Text>
            </TouchableOpacity>

          
            <Text>your data is {array}</Text>
            
        </View>
    );
}
const {width} = Dimensions.get("screen");

const style = StyleSheet.create({
    container :{
       flex:1
    },inputBox:{
        borderWidth:2,
        borderColor:'black',
        marginHorizontal:8,
        marginVertical:10,
    },AddButton:{
        width:width-20,
        backgroundColor:'blue',
        padding:10,
        justifyContent:"center",
       
        alignItems:"center"

    },
})

export default Asyn;