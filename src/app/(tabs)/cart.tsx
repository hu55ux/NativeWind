import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  return (
    <View className="flex-1 bg-[#F5F6F8] items-center justify-center gap-4">
      <Ionicons name="bag-outline" size={64} color="#CCCCCC" />
      <Text className="text-[22px] font-bold text-[#1A1A1A]">Cart</Text>
      <Text className="text-sm text-[#999]">Your cart is empty</Text>
    </View>
  );
}
