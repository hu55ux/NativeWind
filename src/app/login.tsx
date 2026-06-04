import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { login } from '../api/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Xəta', 'Zəhmət olmasa bütün sahələri doldurun');
      return;
    }

    setLoading(true);
    try {
      await login({ username, password });
      router.replace('/(tabs)');
    } catch (e) {
      console.error('Login error:', e);
      Alert.alert('Xəta', 'Giriş uğursuz oldu. İstifadəçi adı və ya şifrə səhvdir.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F5F6F8] dark:bg-[#0F0F12]">
      <StatusBar style="auto" />
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-8 py-10">
          <View className="items-center mb-10">
            <View className="bg-[#7B39FD] w-20 h-20 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-[#7B39FD]/40">
              <Ionicons name="log-in" size={40} color="white" />
            </View>
            <Text className="text-3xl font-black text-[#1A1A1A] dark:text-white tracking-wider">Xoş Gəldiniz!</Text>
            <Text className="text-[#AAAAAA] dark:text-[#666] mt-2 font-medium">Davam etmək üçün giriş edin</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-[#1A1A1A] dark:text-[#EEE] font-bold text-sm mb-2 ml-1">İstifadəçi adı</Text>
              <View className="bg-white dark:bg-[#1E1E24] rounded-2xl flex-row items-center px-4 py-4 border border-[#EEEEEE] dark:border-white/5">
                <Ionicons name="person-outline" size={20} color="#AAAAAA" />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="istifadəçi adı"
                  className="flex-1 text-[#1A1A1A] dark:text-white font-medium ml-3"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                />
              </View>
            </View>

            <View className="mt-4">
              <Text className="text-[#1A1A1A] font-bold text-sm mb-2 ml-1">Şifrə</Text>
              <View className="bg-white rounded-2xl flex-row items-center px-4 py-4 border border-[#EEEEEE]">
                <Ionicons name="lock-closed-outline" size={20} color="#AAAAAA" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                  className="flex-1 text-[#1A1A1A] dark:text-white font-medium ml-3"
                  placeholderTextColor="#888"
                />
              </View>
            </View>

            <TouchableOpacity className="mt-2 self-end">
              <Text className="text-[#7B39FD] font-bold text-xs">Şifrəni unutmusunuz?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="bg-[#7B39FD] rounded-2xl py-4 mt-6 items-center shadow-lg shadow-[#7B39FD]/30"
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-extrabold text-lg tracking-wide">Giriş Et</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-10">
            <Text className="text-[#AAAAAA] dark:text-[#666] font-medium">Hesabınız yoxdur? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text className="text-[#7B39FD] font-bold">Qeydiyyat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
