import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  Keyboard,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useColorScheme } from 'nativewind';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RegisterScreen() {
  const { colorScheme } = useColorScheme();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
  });

  const scrollX = useRef(new Animated.Value(0)).current;

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      Animated.timing(scrollX, {
        toValue: -SCREEN_WIDTH * step,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      handleRegister();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      Animated.timing(scrollX, {
        toValue: -SCREEN_WIDTH * (step - 2),
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      router.back();
    }
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Xəta', 'Şifrələr uyğun gəlmir');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.fullName.split(' ')[0],
          lastName: formData.fullName.split(' ')[1] || '',
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Register success:', data);
      Alert.alert('Uğurlu', 'Qeydiyyat tamamlandı!', [
        { text: 'Giriş et', onPress: () => router.replace('/login') }
      ]);
    } catch (e) {
      console.error('Register error:', e);
      Alert.alert('Xəta', 'Qeydiyyat zamanı xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, icon, placeholder, value, onChangeText, secureTextEntry = false, autoFocus = false }: any) => (
    <View className="mb-5">
      <Text className="text-[#1A1A1A] dark:text-[#EEE] font-bold text-sm mb-2 ml-1">{label}</Text>
      <View className="bg-white dark:bg-[#1E1E24] rounded-2xl flex-row items-center px-4 py-4 border border-[#EEEEEE] dark:border-white/5 shadow-sm shadow-black/5">
        <Ionicons name={icon} size={20} color="#7B39FD" className="mr-3" />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          className="flex-1 text-[#1A1A1A] dark:text-white font-medium"
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#F5F6F8] dark:bg-[#0F0F12]">
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="pt-[60px] pb-6 px-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={prevStep} className="bg-white dark:bg-[#1E1E24] p-2.5 rounded-xl border border-[#EEEEEE] dark:border-white/5">
          <Ionicons name="chevron-back" size={24} color={colorScheme === 'dark' ? '#EEE' : '#1A1A1A'} />
        </TouchableOpacity>
        
        <View className="items-center">
          <Text className="text-[#1A1A1A] dark:text-white text-lg font-black tracking-tight">Qeydiyyat</Text>
          <View className="flex-row mt-1.5 gap-1">
            {[1, 2, 3].map((s) => (
              <View 
                key={s} 
                className={`h-1 rounded-full ${s === step ? 'w-5 bg-[#7B39FD]' : 'w-2 bg-[#DDDDDD]'}`} 
              />
            ))}
          </View>
        </View>
        <View className="w-11" />
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          className="flex-row"
          style={{ transform: [{ translateX: scrollX }] }}
        >
          {/* Step 1: Account Info */}
          <View style={{ width: SCREEN_WIDTH }} className="px-8">
            <Text className="text-2xl font-black text-[#1A1A1A] dark:text-white mb-2">Başlayaq!</Text>
            <Text className="text-[#AAAAAA] dark:text-[#666] mb-8 font-medium">Hesab məlumatlarınızı daxil edin</Text>
            
            <InputField 
              label="İstifadəçi adı" 
              icon="person-outline" 
              placeholder="username" 
              value={formData.username}
              onChangeText={(t: string) => setFormData({...formData, username: t})}
              autoFocus={true}
            />
            <InputField 
              label="E-poçt" 
              icon="mail-outline" 
              placeholder="example@mail.com" 
              value={formData.email}
              onChangeText={(t: string) => setFormData({...formData, email: t})}
            />
          </View>

          {/* Step 2: Personal Info */}
          <View style={{ width: SCREEN_WIDTH }} className="px-8">
            <Text className="text-2xl font-black text-[#1A1A1A] dark:text-white mb-2">Şəxsi Məlumatlar</Text>
            <Text className="text-[#AAAAAA] dark:text-[#666] mb-8 font-medium">Sizi tanıya bilməyimiz üçün</Text>
            
            <InputField 
              label="Ad Soyad" 
              icon="card-outline" 
              placeholder="İlkin İbadov" 
              value={formData.fullName}
              onChangeText={(t: string) => setFormData({...formData, fullName: t})}
            />
            <InputField 
              label="Telefon" 
              icon="call-outline" 
              placeholder="+994 50 123 45 67" 
              value={formData.phoneNumber}
              onChangeText={(t: string) => setFormData({...formData, phoneNumber: t})}
            />
          </View>

          {/* Step 3: Security */}
          <View style={{ width: SCREEN_WIDTH }} className="px-8">
            <Text className="text-2xl font-black text-[#1A1A1A] dark:text-white mb-2">Təhlükəsizlik</Text>
            <Text className="text-[#AAAAAA] dark:text-[#666] mb-8 font-medium">Güclü bir şifrə təyin edin</Text>
            
            <InputField 
              label="Şifrə" 
              icon="lock-closed-outline" 
              placeholder="••••••••" 
              secureTextEntry 
              value={formData.password}
              onChangeText={(t: string) => setFormData({...formData, password: t})}
            />
            <InputField 
              label="Şifrənin təkrarı" 
              icon="shield-checkmark-outline" 
              placeholder="••••••••" 
              secureTextEntry 
              value={formData.confirmPassword}
              onChangeText={(t: string) => setFormData({...formData, confirmPassword: t})}
            />
          </View>
        </Animated.View>

        <View className="px-8 mt-auto pb-10">
          <TouchableOpacity
            onPress={nextStep}
            disabled={loading}
            className="bg-[#7B39FD] rounded-2xl py-4 items-center shadow-lg shadow-[#7B39FD]/30"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-extrabold text-lg tracking-wide">
                {step === 3 ? 'Tamamla' : 'Növbəti'}
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-[#AAAAAA] dark:text-[#666] font-medium">Artıq hesabınız var? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-[#7B39FD] font-bold">Giriş et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
