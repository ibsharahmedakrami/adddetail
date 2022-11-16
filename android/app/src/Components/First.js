import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const First =({navigation})=>{
    const [name ,setName] = useState("");
    const [name1 ,setName1] = useState("");
    const [name2 ,setName2] = useState("");
    const [text,setText]=useState([]);
    
    var initialElements = [
        { id : "0", text : "Object 1"},
        { id : "1", text : "Object 2"},
      ]
    
      const [exampleState, setExampleState] = useState(initialElements)
    
      const addElement = () => {
        var newArray = [...initialElements , {id : "2", text: "Object 3"},{id : "2", text: "Object 3"}];
        setExampleState(newArray);
      }
    
    // let something = [name,name1,name2];
 
    const setValue = async()=>{

        let something;
        const formObject = {
            name : name,
            name1: name1,
            name2: name2
        }
        console.log("added");
        try{
            await AsyncStorage.clear();
            const data = await AsyncStorage.getItem('Arraydata');
            const parseData = JSON.parse(data);
            console.log(parseData,"hello")
            if (parseData?.length){
                something = parseData;
              something.push(formObject)
              console.log("nothing")
            }else{
                console.log("something")
                something = [formObject];
                console.log(something,"text");
             }
             console.log("yari ko kai yenai")
    
            await AsyncStorage.setItem('Arraydata',JSON.stringify(something));
            navigation.navigate('Second');
    
        }catch(err){
            console.log(err)
        }
       }
    









    // const navigation = useNavigation();
    // const register = () =>{
    //     navigation.navigate("Second",{
    //         name : name,
    //         name1 :name1
    //     })

    // }

    return(

        <View>
            <TextInput placeholder="name" value={name} onChangeText={text => setName(text)}/>
            <TextInput placeholder="name" value={name1} onChangeText={text => setName1(text)}/>
            <TextInput placeholder="name" value={name2} onChangeText={text => setName2(text)}/>
            {/* <Pressable onPress={register} >
                <Text>submit</Text>
            </Pressable> */}
            <FlatList
            keyExtractor = {item => item.id}  
            data={exampleState}
            renderItem = {item => (<Text>{item.item.text}</Text>)} />
        <Pressable
          title="Add element"
          onPress={addElement} />
            <Pressable  onPress={addElement} >
                <Text style={{color:"#fff"}}>ADD</Text>
            </Pressable>
        </View>
    )

}

export default First;