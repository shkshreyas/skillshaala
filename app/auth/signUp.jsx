import React, { useState } from 'react';
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
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Use this if Firebase v10+
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig'; // adjust path as needed

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createNewAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log('User created:', resp);
        await SaveUser(user);
        // Navigate to home page after successful account creation
        router.push('/home');
      })
      .catch((e) => {
        console.log('Error creating account:', e.message);
      });
  };

  const SaveUser = async (user) => {
    try {
      await setDoc(doc(db, 'users', email), {
        email: email,
        name: fullName,
        member: false,
        uid: user.uid,
      });
    } catch (error) {
      console.log('Error saving user:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Create New Account</Text>
      <TextInput 
        placeholder="Full Name" 
        onChangeText={setFullName}
        value={fullName}
        style={styles.textInput} 
      />
      <TextInput 
        placeholder="Email" 
        onChangeText={setEmail}
        value={email}
        style={styles.textInput} 
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Password" 
        onChangeText={setPassword}
        value={password}
        secureTextEntry 
        style={styles.textInput} 
      />
      <TouchableOpacity 
        onPress={createNewAccount}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      
      <View style={styles.signInContainer}>
        <Text>Already have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{ color: Colors.PRIMARY }}>Sign In Here</Text>
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
  signInContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
});
