import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constant/Colors';

export default function Header() {
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{ 
            color: Colors.WHITE,
            opacity: 0.8,
            fontSize: 16 
          }}>
            Welcome back
          </Text>
          <Text style={{ 
            color: Colors.WHITE,
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 5
          }}>
            Shreyas Kumar
          </Text>
        </View>
        
        <TouchableOpacity>
          <Image 
            source={require('../../assets/images/logo.png')}
            style={{
              width: 45,
              height: 45,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: Colors.WHITE
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={{
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 99,
        marginTop: 20
      }}>
        <Ionicons name="search" size={20} color={Colors.GRAY} />
        <Text style={{ 
          color: Colors.GRAY,
          marginLeft: 10,
          fontSize: 16
        }}>
          Search courses...
        </Text>
      </TouchableOpacity>
    </View>
  );
}
