import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MessagesScreen() {
  return (
    <View className="flex-1 bg-[#F5F6F8] items-center justify-center gap-4">
      <Ionicons name="chatbubble-ellipses-outline" size={64} color="#CCCCCC" />
      <Text className="text-[22px] font-bold text-[#1A1A1A]">Messages</Text>
      <Text className="text-sm text-[#999]">No messages yet</Text>
    </View>
  );
}