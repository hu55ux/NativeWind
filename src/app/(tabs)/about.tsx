import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen() {
  return (
    <View className="flex-1 bg-[#F5F6F8] items-center justify-center gap-4">
      <Ionicons name="radio-outline" size={64} color="#CCCCCC" />
      <Text className="text-[22px] font-bold text-[#1A1A1A]">Feed</Text>
      <Text className="text-sm text-[#999]">Coming soon</Text>
    </View>
  );
}