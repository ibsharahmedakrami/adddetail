import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import Back from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
const Details = ({navigation}) => {
  const [array, setArray] = useState([]);
  const route = useRoute();
  const isFocused = useIsFocused();
  const update = index => {
    navigation.navigate('Home', {
      index,
    });
  };

  const goback = () => {
    navigation.navigate('Home');
  };

  // const removeitem = (item) => {
  //     const newval = array.filter((p,i) =>i !== item);
  //     setArray(newval);
  //     console.log("press delete")

  // }

  const removeitem = async abc => {
    const newval = array.filter((item, index) => index !== abc);
    const add = setArray(newval);
    console.log('press delete');
    await AsyncStorage.setItem('Arraydata', JSON.stringify(newval));
  };

  const update1 = async index => {
    let numberArray = [];
    try {
      let storedNumbers = await AsyncStorage.getItem('Arraydata');
      if (storedNumbers !== null) {
        numberArray = JSON.parse(storedNumbers); // you could do some additional checks to make sure it is an array
      }
      numberArray.push(index);
      await AsyncStorage.setItem('Arraydata', JSON.stringify(numberArray));
      navigation.push('Home');
    } catch (error) {
      // Error saving data
    }
  };

  // const removeitem = (array,item)={
  //     for (let i = array.length; i--) {
  //         if (array[i] === item) arr.splice(i, 1);
  // }

  useEffect(() => {
    getValue();
  }, [isFocused]);

  // const del = async()=> {

  //     try {
  //         const deleteitem = await AsyncStorage.removeitem('Arraydata');
  //         const delete = JSON.parse(deleteitem);

  //     }

  // }

  // const removeData = async () => {
  //    const Remove = await AsyncStorage.removeItem('Arraydata');
  //    const val = Remove.filter((p,i) => i !== item);
  //    setArray(val);

  // }

  const delete1 = async () => {
    const result = await AsyncStorage.getItem('Arraydata');
    let array = [];
    if (result !== null) array = JSON.parse(result);
    const newArray = array.filter(item => item.id !== array.id);
    await AsyncStorage.setArray('Arraydata', Json.stringify(newArray));
  };

  const getValue = async () => {
    let value2 = [];
    console.log('get');
    try {
      const value1 = await AsyncStorage.getItem('Arraydata');
      console.log(value1, 'getvalue');
      console.log(value1, 'hhhhhhh');
      const value2 = JSON.parse(value1);

      if (value2) {
        console.log(value2, 'uygyg');
        setArray(value2);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const route = useRoute();

  // let store = (array|| []);
  return (
    // (array||[]).map(user=>{
    //     return(
    //             <View style={{}}>
    //              <Text style={{backgroundColor:"red"}}>{user.text}</Text>
    //         <Text style={{backgroundColor:"red"}}>{user.text1}</Text>
    //         <Text style={{backgroundColor:"red"}}>{user.text2}</Text>

    //         </View>

    //     )
    // })
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{height: hp('30%'), backgroundColor: 'white'}}>
        <ImageBackground
          source={require('../image/emp.jpg')}
          style={{width: wp('100%'), height: hp('30%')}}>
          <Pressable
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#9FC9F3',
              marginLeft: 10,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={goback}>
            <Back name="chevron-back" size={22} color="red" />
          </Pressable>
        </ImageBackground>
      </View>
       {isFocused ? (



       
      <FlatList
        data={array}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: '#6E85B7',
                alignSelf: 'center',
                width: wp('90%'),
                margin: 7,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 25,
                  padding: 5,
                  fontFamily: 'sans-serif-medium',
                  borderBottomWidth:1,
                  borderBottomColor:"white"
                }}>
                Employee Detail
              </Text>

              <View style={{height:hp('20%'),flexDirection:'row'}}>
              <View style={{width:wp('25%'),justifyContent:'center',alignItems:'center'}}>
              {item.detail?.photo ? (
                <Image
                  source={{uri: item.detail?.photo}}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    backgroundColor: 'red',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: 'white',
                    alignSelf: 'center',
                  }}
                />
              )}

              </View>
                <View style={{width:wp('61.1%'),justifyContent:'center'}}>

              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  fontSize: 15,
                  marginTop: 10,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Full Name  : {item?.detail?.text} {item?.detail?.text1} {item.detail?.text2}
              </Text>
              {/* <Text
                style={{
                  color: 'white',
                  marginLeft: 15,
                  fontSize: 17,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Middle Name : {item?.detail?.text1}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 15,
                  fontSize: 17,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Last Name : {item.detail?.text2}
              </Text> */}

              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  fontSize: 15,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Gender : {item.rad}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  fontSize: 15,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Address : {item?.detail?.text3}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  fontSize: 14,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Skill : {item.skills}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  fontSize: 15,
                  fontFamily: 'sans-serif-condensed',
                }}>
                Hobbies : {item.selectedItems}
              </Text>

              </View>
                </View>

             

              <FlatList
                data={item.qualifications}
                keyExtractor={item => item}
                renderItem={({item, index}) => {
                  console.log(item, 'mar re');
                  console.log(item.course, 'ahmed maeer ');
                  console.log(item.passout, 'ahmed maeer re ');
                  return (
                    <View
                      style={{
                        width: wp('85%'),
                        alignSelf: 'center',
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 5,
                        marginBottom: 5,
                        backgroundColor: '#D2DAFFaa',
                      }}>
                      <Text
                        style={{fontSize: 20, marginBottom: 5, color: 'white'}}>
                        Qualification
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          marginLeft: 15,
                          fontSize: 15,
                          fontFamily: 'sans-serif-condensed',
                        }}>
                        Course : {item.course.label}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          marginLeft: 15,
                          fontSize: 15,
                          fontFamily: 'sans-serif-condensed',
                        }}>
                        Passout : {item.passout?.label}
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          marginLeft: 15,
                          fontSize: 15,
                          fontFamily: 'sans-serif-condensed',
                        }}>
                        Percentage : {item.text4}%
                      </Text>
                      <Text
                        style={{
                          color: 'white',
                          marginLeft: 15,
                          fontSize: 15,
                          fontFamily: 'sans-serif-condensed',
                        }}>
                        Collage : {item.text5}
                      </Text>
                    </View>
                  );
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Pressable
                  style={{
                    backgroundColor: '#B2C8DF',
                    color: 'black',
                    width: 80,
                    height: 40,
                    alignSelf: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    margin: 3,
                  }}
                  onPress={() => removeitem(index)}>
                  <Text>delete</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: '#B2C8DF',
                    color: 'black',
                    width: 80,
                    height: 40,
                    alignSelf: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    margin: 3,
                  }}
                  onPress={() => update(index)}>
                  <Text>update</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />):
      (<Text> hello </Text>)}
    </View>
  );
};
export default Details;
