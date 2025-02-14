import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constant/Colors';
import { useRouter } from 'expo-router';
export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:Colors.WHITE
      }}
    >
      <Image source ={require('../assets/images/landing.png')}
      style={{width: '100%', height: 300, marginTop:70}}/>
      <View style={{padding: 25, backgroundColor: Colors.PRIMARY,height: '100%',borderTopLeftRadius:35,borderTopRightRadius:35}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: Colors.WHITE}}>Welcome to Skill Shaala</Text>
        <Text style={{fontSize: 20, color: Colors.WHITE, marginTop: 20, textAlign: 'center'}}>
          Transform Ideas into Reality with Skill Shaala.
        </Text >
        <TouchableOpacity style={styles.button}
        onPress={() => router.push('/auth/signUp')}>
          <Text style={[styles.buttonText,{color: Colors.PRIMARY}]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor: Colors.PRIMARY,
          borderWidth:1,
          borderColor: Colors.WHITE
        }]}
        onPress={() => router.push('/auth/signIn')}>
          <Text style={[styles.buttonText,{color: Colors.WHITE}]}>
            Already Have an Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});