import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const Dashboard = () => {
  const { t, locale, changeLanguage } = useTranslation();

  const toggleLanguage = () => {
    changeLanguage(locale === 'en' ? 'az' : 'en');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0e122b]">
      <ScrollView className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-400 text-lg font-medium">{t('welcome')}</Text>
            <Text className="text-white text-3xl font-bold">Hira R.</Text>
          </View>
          <TouchableOpacity onPress={toggleLanguage} className="bg-white/10 p-2 rounded-full px-4 border border-white/20">
             <Text className="text-white font-bold">{locale.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="mb-8">
          <Text className="text-gray-400 text-sm mb-1">{t('available_balance')}</Text>
          <Text className="text-white text-4xl font-bold">$4,763.40</Text>
        </View>

        {/* Activities Grid */}
        <View className="flex-row flex-wrap justify-between">
          {/* Loan Pending - Swiped Style Implementation */}
          <View className="w-full h-24 bg-white rounded-3xl mb-4 flex-row overflow-hidden">
            <View className="flex-1 bg-white justify-center px-6">
                <Text className="text-[#0e122b] text-xs font-bold uppercase">{t('loan_pending')}</Text>
                <Text className="text-[#0e122b] text-xl font-bold">{t('loan')}</Text>
            </View>
            <View className="bg-orange-500 w-[40%] justify-center items-center px-4">
                <FontAwesome5 name="piggy-bank" size={24} color="white" />
                <Text className="text-white text-xs mt-1">{t('details')}</Text>
                <Text className="text-white font-bold">$2,839.2</Text>
            </View>
          </View>

          {/* Bottom Grid */}
          <View className="flex-row justify-between w-full h-48">
             {/* Topup Card */}
             <TouchableOpacity className="w-[48%] bg-white/10 border border-white/10 rounded-3xl justify-center items-center">
                <View className="bg-white/20 p-4 rounded-full mb-2">
                    <Ionicons name="phone-portrait-outline" size={32} color="white" />
                </View>
                <Text className="text-white font-bold text-lg">{t('topup')}</Text>
             </TouchableOpacity>

             {/* Monthly Report Card */}
             <View className="w-[48%] bg-white rounded-3xl p-6 relative">
                 <View className="bg-blue-100 p-2 rounded-xl mb-4 w-12 items-center">
                    <MaterialIcons name="forum" size={24} color="#0e122b" />
                 </View>
                 <Text className="text-[#0e122b] text-lg font-bold leading-tight">{t('monthly_report')}</Text>
                 <View className="flex-row items-center mt-4">
                    <View className="flex-row -space-x-2">
                        <View className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                             <Image source={{ uri: 'https://i.pravatar.cc/100?u=1' }} className="w-full h-full" />
                        </View>
                        <View className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                             <Image source={{ uri: 'https://i.pravatar.cc/100?u=2' }} className="w-full h-full" />
                        </View>
                    </View>
                    <View className="ml-4 bg-orange-500 rounded-full px-2 py-1">
                        <Text className="text-white text-[10px] font-bold">+14</Text>
                    </View>
                 </View>
                 <View className="mt-auto">
                    <Text className="text-[#0e122b] text-sm font-bold">18 {t('requests')}</Text>
                 </View>
             </View>
          </View>
        </View>

        {/* Transactions Button Placeholder */}
        <TouchableOpacity className="mt-10 bg-white/10 border border-white/20 p-4 rounded-2xl items-center">
            <Text className="text-white font-bold">{t('see_all')}</Text>
        </TouchableOpacity>

        <View className="h-40" />
      </ScrollView>

      {/* Bottom Nav */}
      <View className="absolute bottom-10 left-6 right-6 h-20 bg-white rounded-full flex-row justify-around items-center px-4 shadow-2xl">
         <TouchableOpacity>
            <Ionicons name="person-outline" size={28} color="#0e122b" />
         </TouchableOpacity>
         <TouchableOpacity>
            <Ionicons name="card-outline" size={28} color="#9ca3af" />
         </TouchableOpacity>
         <TouchableOpacity className="bg-[#0e122b] w-12 h-12 rounded-2xl justify-center items-center">
            <Ionicons name="add" size={32} color="white" />
         </TouchableOpacity>
         <TouchableOpacity>
            <Ionicons name="stats-chart-outline" size={28} color="#9ca3af" />
         </TouchableOpacity>
         <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="#9ca3af" />
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
