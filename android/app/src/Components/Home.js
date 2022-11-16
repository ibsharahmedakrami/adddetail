import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
// import CheckBox from 'react-native-check-box';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import MultiSelect from 'react-native-multiple-select';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import Camera from 'react-native-vector-icons/MaterialCommunityIcons';
import Imageee from 'react-native-vector-icons/Ionicons';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import {CheckBox} from 'react-native-elements';
import Back from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Home = ({navigation}) => {
  const [detail, setDetail] = useState({
    text: '',
    text1: '',
    text2: '',
    text3: '',
    photo: '',
    isFocus1: false,
    isFocus: false,
  });
  const [auth, setAuth] = useState({
    first: '',
    last: '',
    mid: '',
    address: '',
    skilll: '',
    courseee: '',
  });
  // const [photo, setPhoto] = useState('');
  // const [text, setText] = useState();
  // const [text1, setText1] = useState();
  // const [text2, setText2] = useState();
  // const [text4, setText4] = useState('');
  // const [text5, setText5] = useState('');
  // const [text3, setText3] = useState('');

  const [state1, setState] = useState([]);
  const [error, setError] = useState();
  const [err, setErr] = useState();
  const [rad, setRad] = useState(0);
  const [ModalVisible, setModalVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [value1, setValue1] = useState(null);
  // const [isFocus1, setIsFocus1] = useState(false);
  const [value2, setValue] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);
  const [skills, setSkills] = useState({
    reactnative: false,
    Net: false,
    java: false,
    dart: false,
    javascript: false,
    flutter: false,
  });
  const route = useRoute();
  const [qualifications, setQualifications] = useState([
    {
      text4: '',
      text5: '',
      course: '',
      passout: '',
    },
  ]);

  const addNewForm = () => {
    console.log('addForm');
    setQualifications([
      {
        text4: '',
        text5: '',
        course: '',
        passout: '',
      },
      ...qualifications,
    ]);
  };

  const handleChange1 = (key, index, actualData) => {
    const tempQualifications = [...qualifications];
    tempQualifications[index] = {
      ...tempQualifications[index],
      [key]: actualData,
    };
    setQualifications([...tempQualifications]);
  };

  const handleChange = (key, index, actualData) => {
    const tempQualifications = [...qualifications];
    if (key === 'course') {
      const course = data1.find(item => item.value === actualData);
      tempQualifications[index] = {
        ...tempQualifications[index],
        [key]: course,
      };
    } else if (key === 'passout') {
      const passout = data.find(item => item.value === actualData);
      tempQualifications[index] = {
        ...tempQualifications[index],
        [key]: passout,
      };
    } else {
      tempQualifications[index] = {
        ...tempQualifications[index],
        [key]: actualData,
      };
    }
    setQualifications([...tempQualifications]);
  };

  const deleteForm = formIndex => {
    let tempQualifications = [...qualifications];
    tempQualifications = tempQualifications.filter(
      (qualifications, index) => index !== formIndex,
    );
    setQualifications([...tempQualifications]);
  };

  useEffect(() => {
    initializeForm();
  }, [route]);

  const initializeForm = async () => {
    const index = route?.params?.index;
    let savedata = await AsyncStorage.getItem('Arraydata');
    savedata = JSON.parse(savedata);
    if (index >= 0 && savedata?.length) {
      const item = savedata[index];
      setDetail(item.detail);
      // setText(item.text);
      // setText1(item.text1);
      // setText2(item.text2);
      // setText3(item.text3);
      // setPhoto(item.phot

      setRad(item.rad);
      // setSkills(item.skills);
      for (let [key, value] of Object.entries(skilllabel)) {
        const found = item.skills.find(el => el === value);
        if (found) {
          setSkills({
            ...skills,
            [key]: true,
          });
        }
      }
      setValue(item.value2);
      setValue1(item.value1);
      const Hobbies = [];
      item.selectedItems?.forEach(el => {
        const hobby = DATA.find(dataEl => dataEl.name === el);
        if (hobby) {
          Hobbies.push(hobby.id);
        }
      });
      setSelectedItems([...Hobbies]);
      // setText4(item.text4);
      setQualifications(item.qualifications);
    }
  };

  var radio_props = [
    {label: 'Male  ', value: 0},
    {label: 'Female ', value: 1},
    // {label: 'other', value: 2 }
  ];

  const skilllabel = {
    reactnative: 'React Native ',
    Net: '.Net ',
    java: 'Java ',
    dart: 'Dart ',
    javascript: 'JavaScript ',
    flutter: 'Flutter ',
  };

  const DATA = [
    {id: 1, name: 'reading books '},
    {id: 2, name: 'calligraphy '},
    {id: 3, name: 'circket '},
    {id: 4, name: 'C '},
  ];

  const data1 = [
    {label: 'Computer Science', value: '1'},
    {label: 'Electronic', value: '2'},
    {label: 'Civil', value: '3'},
    {label: 'Mechanical', value: '4'},
    {label: 'Electrical', value: '5'},
  ];

  const data = [
    {label: '2022', value: '1'},
    {label: '2021', value: '2'},
    {label: '2020', value: '3'},
    {label: '2019', value: '4'},
    {label: '2018', value: '5'},
    {label: '2017', value: '6'},
    {label: '2016', value: '7'},
    {label: '2015', value: '8'},
  ];

  const items = [
    {
      id: '1',
      name: 'Computer Science',
    },
    {
      id: '2',
      name: 'Electronic',
    },
    {
      id: '3',
      name: 'Civil',
    },
    {
      id: '4',
      name: 'Mechanical',
    },
    {
      id: '5',
      name: 'Electrical',
    },
  ];

  const skillss = [];
  const click = () => {
    if (check1 === true) {
      skillss.push('React Native');
    }
    if (check2 === true) {
      skillss.push('Java');
    }
    if (check === true) {
      skillss.push('Javascrpit');
    }
    if (check3 === true) {
      skillss.push('Dart');
    }
    if (check4 === true) {
      skillss.push('.Net');
    }
    if (check5 === true) {
      skillss.push('Flutter');
    }
    Alert.alert('your skill are' + skillss);
  };

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
    var tempItem = [];
    for (let i = 0; i < selectedItems.length; i++) {
      tempItem = DATA.find(item => item.id === selectedItems[i]);
    }
  };

  const setValuee = async () => {
    let something;
    const formObject = {
      // text: text,
      // text1: text1,
      // text2: text2,
      skills: [],
      // photo: photo,
      // text3: text3,
      detail: detail,

      // text4: text4,
      // text5: text5,

      qualifications: qualifications,
    };
    Object.keys(skills).forEach(key => {
      if (skills[key]) {
        formObject.skills.push(skilllabel[key]);
      }
    });
    const radValue = radio_props.find(item => item.value == rad);
    if (radValue) {
      formObject.rad = radValue.label;
    }

    const Course = data1.find(item => item.value == value1);
    if (Course) {
      formObject.value1 = Course.label;
    }

    const Passout = data.find(item => item.value == value2);
    if (Passout) {
      formObject.value2 = Passout.label;
    }

    // const skill1 = check.find(item => item)
    const Hobbies = [];
    (selectedItems || []).forEach(item => {
      const hobby = DATA.find(dataEl => dataEl.id === item);
      if (hobby) {
        Hobbies.push(hobby.name);
      }
    });
    if (Hobbies.length) {
      formObject.selectedItems = Hobbies;
    }
    // const Hobbies = DATA.find(item => item.id == selectedItems);
    // if (Hobbies) {
    //   formObject.selectedItems = Hobbies.name;
    // }

    try {
      const data = await AsyncStorage.getItem('Arraydata');
      const parseData = JSON.parse(data);
      if (parseData?.length) {
        const index = route?.params?.index;
        something = parseData;
        if (index >= 0) {
          something[index] = formObject;
        } else {
          something.push(formObject);
        }
      } else {
        something = [formObject];
      }

      await AsyncStorage.setItem('Arraydata', JSON.stringify(something));
      navigation.navigate('Details');
      // setText('');
      detail.text('');
      detail.text1('');
      detail.text2('');
      detail.photo('');
      detail.text3('');
      qualifications.course('');
      qualifications.passout('');
      qualifications.text4('');
      qualifications.text5('');
      setRad('');
      setSkills('');
      setSelectedItems('');
    } catch (err) {
      console.log(err);
    }
  };

  const submit = () => {
    

    if (!detail.text || detail.text === '') {
      setAuth({first: 'enter the first'});
      setError();
    } else if (!detail.text1 === '' || !detail.text1) {
      setAuth({mid: 'enter the mid'});
      setError();
    } else if (detail.text2 === '' || !detail.text2) {
      setAuth({last: 'enter the last'});
      setError();
    } else if (detail.text3 === '' || !detail.text3) {
      setAuth({address: 'enter the address'});
      setError();
    }
     else if (qualifications) {
      let breakFlag = false;
      for (let qualification of qualifications) {
        console.log(qualification, 'qqqqqqqq', 'course');
        for (let qualificationField in qualification) {
          console.log(qualification[qualificationField], 'dddddd');
          if (
            !qualification[qualificationField] ||
            qualification[qualificationField] === ''
          ) {
            setErr(`please enter ${qualificationField} in qualification`);
            console.log(`please enter ${qualificationField} in qualification`);
            breakFlag = true;
            break;
          }
        }
        if (breakFlag) {
          break;
        }
      }
      if (!breakFlag) {
        setValuee();
      }
    }
  };

  const submit1 = () => {
    if (qualifications) {
      let breakFlag = false;
      for (let qualification of qualifications) {
        console.log(qualification, 'qqqqqqqq', 'course');
        for (let qualificationField in qualification) {
          console.log(qualification[qualificationField], 'dddddd');
          if (
            !qualification[qualificationField] ||
            qualification[qualificationField] === ''
          ) {
            setErr(`please enter ${qualificationField} in qualification`);
            console.log(`please enter ${qualificationField} in qualification`);
            breakFlag = true;
            break;
          }
        }
        if (breakFlag) {
          break;
        }
      }
      if (!breakFlag) {
        addNewForm();
      }
    }
  };

  const onPressHandle = () => {
    setModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setDetail({...detail, photo: image.path});
    });
  };

  const onPressHandle1 = () => {
    setModalVisible(false);
    console.log('camera');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setDetail({...detail, photo: image.path});
    });
  };
  const goback = () => {
    navigation.navigate('Details');
  };

  const onSelectedItemsChange1 = selectedItems1 => {
    setState(selectedItems1);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
          <ImageBackground
            style={style.Header}
            source={require('../image/emp1.jpg')}
            resizeMode="contain">
            <View style={{flexDirection: 'row', marginTop: -142}}>
              <Text style={style.text}> Employee Form</Text>
              <Pressable
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#9FC9F3',
                  alignSelf: 'flex-end',
                  marginLeft: wp('13%'),
                  marginTop: hp('-66%'),

                  // marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={goback}>
                <Back name="chevron-back" size={22} color="red" />
              </Pressable>
            </View>
          </ImageBackground>
          <View style={style.Header1}>
            <Text style={style.text3}> Personal Details</Text>
            <View style={style.Profile}>
              {detail?.photo ? (
                <Pressable>
                  <Image
                    source={{uri: detail?.photo}}
                    style={{
                      width: 80,
                      height: 80,
                      margin: 10,
                      borderWidth: 1,
                      borderRadius: 100,
                      backgroundColor: 'red',
                    }}
                  />
                </Pressable>
              ) : (
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    margin: 10,
                    borderRadius: 100,
                    borderWidth: 1,

                    borderColor: 'white',
                  }}
                />
              )}

              <Pressable>
                <Camera
                  name="camera-plus"
                  size={20}
                  color="red"
                  style={{position: 'relative', top: -36, left: 30}}
                  onPress={() => setModalVisible(true)}
                />
              </Pressable>

              <View>
                <Modal visible={ModalVisible} transparent={true}>
                  <View style={style.Main}>
                    <View style={style.Modell}>
                      <Text style={style.textStyle1}>Add Profile!</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Pressable
                          style={{
                            justifyContent: 'center',
                            width: wp('20%'),
                            height: hp('10%'),
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: 15,
                            margin: wp('2%'),
                          }}
                          onPress={onPressHandle}>
                          <Imageee size={22} name="ios-images" color="black" />
                          <Text style={{color: 'black'}}>Gallery</Text>
                        </Pressable>
                        <Pressable
                          style={{
                            justifyContent: 'center',
                            width: wp('20%'),
                            height: hp('10%'),
                            backgroundColor: 'white',
                            alignItems: 'center',
                            borderRadius: 15,
                            margin: wp('2%'),
                          }}
                          onPress={onPressHandle1}>
                          <Imageee size={22} name="ios-camera" color="black" />
                          <Text style={{color: 'black'}}>Camera</Text>
                        </Pressable>
                        <Pressable
                          style={{
                            justifyContent: 'center',
                            width: wp('20%'),
                            height: hp('10%'),
                            backgroundColor: 'red',
                            alignItems: 'center',
                            borderRadius: 15,
                            margin: wp('2%'),
                          }}
                          onPress={() => setModalVisible(false)}>
                          <Cancel name="cancel" size={20} color="black" />
                          <Text style={{color: 'black'}}>Cancel</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>

            <Text style={style.text1}>First Name {auth.first}</Text>
            <TextInput
              style={[
                style.input,
                {borderColor: auth.first !== '' ? '#343434' : 'green'},
              ]}
              onChangeText={actualData => {
                setDetail({...detail, text: actualData}),
                  setError(''),
                  setAuth({first: ''});
              }}
              value={detail?.text}
              placeholderTextColor="#343434"
              placeholder="first name"
            />
            <Text style={style.text1}>Middle Name {auth.mid}</Text>
            <TextInput
              style={[
                style.input,
                {borderColor: auth.mid !== '' ? '#343434' : 'green'},
              ]}
              onChangeText={actualData => {
                setDetail({...detail, text1: actualData}),
                  setError(''),
                  setAuth({mid: ''});
              }}
              value={detail.text1}
              placeholderTextColor="#343434"
              placeholder="mid name"
            />
            <Text style={style.text1}>Last Name {auth.last}</Text>
            <TextInput
              style={[
                style.input,
                {borderColor: auth.last !== '' ? '#343434' : 'green'},
              ]}
              onChangeText={actualData => {
                setDetail({...detail, text2: actualData}),
                  setError(''),
                  setAuth({last: ''});
              }}
              value={detail.text2}
              placeholderTextColor="#343434"
              placeholder="last name"
            />
            <Text style={style.headertitle}>Gender</Text>

            <RadioForm
              radio_props={radio_props}
              isSelected
              initial={0}
              selectedButtonColor={'green'}
              formHorizontal={true}
              color="white"
              buttonColor="#343434"
              labelColor="#343434"
              onPress={value => {
                setRad(value);
              }}
              style={style.Radio}
            />

            <Text style={style.headertitle}>skills</Text>

            <View style={style.checkboxbg}>
              <View style={{width: '45%'}}>
                <CheckBox
                  title="React Native"
                  checked={skills.reactnative}
                  onPress={() =>
                    setSkills({...skills, reactnative: !skills.reactnative})
                  }
                />
                <CheckBox
                  title="Java"
                  checked={skills.java}
                  onPress={() => setSkills({...skills, java: !skills.java})}
                />
                <CheckBox
                  title="Dart"
                  checked={skills.dart}
                  onPress={() => setSkills({...skills, dart: !skills.dart})}
                />
              </View>
              <View style={{width: '45%'}}>
                <CheckBox
                  title=".Net"
                  checked={skills.Net}
                  onPress={() => setSkills({...skills, Net: !skills.Net})}
                />
                <CheckBox
                  title="Flutter"
                  checked={skills.flutter}
                  onPress={() =>
                    setSkills({...skills, flutter: !skills.flutter})
                  }
                />
                <CheckBox
                  title="Javascrpit"
                  checked={skills.javascript}
                  onPress={() =>
                    setSkills({...skills, javascript: !skills.javascript})
                  }
                />
              </View>
            </View>
            {/* <View style={{flex: 1}}>
              <Pressable onPress={click} style={style.button}>
                <Text
                  style={{
                    color: 'white',
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  Confirm
                </Text>
              </Pressable>
            </View> */}

            <Text style={style.headertitle}>Address{auth.address}</Text>
            <TextInput
              style={[
                style.input1,
                {borderColor: auth.address !== '' ? '#343434' : 'green'},
              ]}
              onChangeText={actualData => {
                setDetail({...detail, text3: actualData}),
                  setError(''),
                  setAuth({address: ''});
              }}
              value={detail.text3}
              placeholderTextColor="#343434"
              placeholder="Address"
              multiline
              numberOfLines={4}
              editable
            />
            <Text style={style.headertitle}>Hobbies</Text>

            <MultiSelect
              hideTags
              items={DATA}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="   Select Items"
              searchInputPlaceholderText="Search Items Here..."
              onChangeInput={text => {}}
              tagRemoveIconColor="#343434"
              tagBorderColor="#343434"
              tagTextColor="#343434"
              selectedItemTextColor="#343434"
              selectedItemIconColor="#343434"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#343434'}}
              submitButtonColor="#343434"
              submitButtonText="Submit"
              styleMainWrapper={{width: wp('90%'), alignSelf: 'center'}}
            />

            <View>
              <Text>{state1}</Text>
            </View>

            {/* using map */}

            {qualifications.map((qualifications, index) => {
              return (
                <View style={style.Qul}>
                  <Text style={style.headertitle1}>Qualification</Text>
                  <Text style={{color:"red"}}>Note: {err}</Text>

                  <Text style={style.headertitl}>Course</Text>

                  <Dropdown
                    style={[
                      style.dropdown,
                      detail.isFocus1 && {borderColor: 'blue'},
                    ]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={data1}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!detail.isFocus1 ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={qualifications.course}
                    onFocus={() => setDetail({...detail, isFocus1: true})}
                    onBlur={() => setDetail({...detail, isFocus1: false})}
                    onChange={item => {
                      handleChange('course', index, item.value);
                      // setValue1(item.value1);
                      setDetail({...detail, isFocus1: false});
                      setErr('');
                      // setAuth({coursee:''})
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={style.icon}
                        color={detail.isFocus1 ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                      />
                    )}
                  />
                 

                  <Text style={style.headertitl}>Passout year</Text>

                  <Dropdown
                    style={[
                      style.dropdown,
                      detail.isFocus && {borderColor: 'blue'},
                    ]}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!detail.isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={qualifications.passout}
                    onFocus={() => setDetail({...detail, isFocus: true})}
                    onBlur={() => setDetail({...detail, isFocus: false})}
                    onChange={item => {
                      handleChange('passout', index, item.value);
                      setDetail({...detail, isFocus: false});
                      setErr('');
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={style.icon}
                        color={detail.isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                      />
                    )}
                  />
                  

                  <Text style={style.headertitl}>Percentage</Text>
                  <TextInput
                    style={[
                      style.input2,
                      {borderColor: error !== '' ? '#343434' : 'green'},
                    ]}
                    onChangeText={e => {handleChange('text4', index, e),setErr('')}}
                    value={qualifications.text4}
                    placeholderTextColor="#343434"
                    placeholder="%"
                  />
                  

                  <Text style={style.headertitl}>Collage</Text>

                  <TextInput
                    style={[
                      style.input2,
                      {borderColor: error !== '' ? '#343434' : 'green'},
                    ]}
                    onChangeText={e => {handleChange('text5', index, e),setErr('')}}
                    value={qualifications.text5}
                    placeholderTextColor="#343434"
                    placeholder="Collage"
                  />
                  
                  <View style={{flexDirection: 'row'}}>
                    <Pressable style={style.button1} onPress={submit1}>
                      <Text style={{fontSize: 25}}>Add</Text>
                    </Pressable>
                    <Pressable
                      style={style.button1}
                      onPress={() => deleteForm(index)}>
                      <Text style={{fontSize: 25}}>delete</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}

            <Pressable style={style.button} onPress={submit}>
              <Text style={{fontSize: 25}}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    //  width : wp('100%'),
    //  height:hp('195%'),
    backgroundColor: '#B7D3DF',
    //  padding:wp('5%')
  },
  Header: {
    backgroundColor: 'white',
    flex: 1,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('25%'),
  },
  Header1: {
    backgroundColor: '#5F6F94',
    flex: 6,
  },
  Profile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  input: {
    height: 50,
    width: wp('80%'),
    backgroundColor: '#FCFAF1',
    color: 'grey',
    borderBottomWidth: 2,
    alignSelf: 'center',
    borderRadius: 5,
    placeholderTextColor: 'yellow',
  },
  input2: {
    height: 50,
    width: wp('80%'),
    backgroundColor: '#FCFAF1',
    color: 'grey',
    borderWidth: 0.5,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 5,
    placeholderTextColor: 'yellow',
  },
  input1: {
    width: wp('80%'),
    backgroundColor: '#FCFAF1',
    color: 'grey',
    borderBottomWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    placeholderTextColor: 'yellow',
  },
  text1: {
    marginLeft: wp('10%'),
    marginBottom: wp('1%'),

    color: 'white',
    marginTop: hp('1%'),
    fontSize: 16,
    fontFamily: 'serif',
  },
  camera: {
    backgroundColor: '#FCFAF1',
    width: wp('85%'),
    height: hp('15%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 27,
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'notoserif',
    marginLeft: wp('18%'),
    // marginTop: hp('-12%'),

    color: '#343434',
  },
  text3: {
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    alignSelf: 'center',
    // marginTop: hp('-12%'),

    color: 'white',
  },
  checkbox: {
    marginLeft: wp('10%'),
    marginRight: wp('9%'),
  },
  checkboxbg: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headertitle: {
    fontSize: 18,
    fontFamily: 'serif',

    marginLeft: wp('12%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    color: 'white',
  },
  headertitl: {
    fontSize: 18,
    fontWeight: '300',
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  Radio: {
    marginLeft: wp('12%'),
  },
  multti: {
    width: wp('80%'),
    height: hp('5%'),

    alignSelf: 'center',
  },
  Qul: {
    backgroundColor: '#FCFAF1',
    marginTop: hp('2%'),
    width: wp('90%'),
    borderRadius: 5,
    padding: 5,

    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: wp('80%'),
    alignSelf: 'center',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    width: wp('90%'),
    height: 40,
    backgroundColor: '#B2C8DF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 5,
  },
  button1: {
    width: wp('40%'),
    height: 40,
    backgroundColor: '#3434',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    margin: wp('2%'),
    borderRadius: 12,
  },

  headertitle1: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  Modell: {
    backgroundColor: '#343434',
    color: 'white',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    width: 300,
    height: 400,
  },
  Main: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  textStyle1: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
export default Home;
