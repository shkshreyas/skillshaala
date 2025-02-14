import React from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constant/Colors';

export default function SignIn() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Welcome Back</Text>
      
      <TextInput 
        placeholder="Email" 
        style={styles.textInput} 
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry 
        style={styles.textInput} 
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginTop: 20,
      }}>
        <Text>
            Don't have an account?
        </Text>
        <Pressable
        onPress={() => router.push('/auth/signUp')}>
            <Text style={{color: Colors.PRIMARY}}>Create New Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    backgroundColor: Colors.WHITE,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    marginTop: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
    textAlign: 'center',
  },
});
