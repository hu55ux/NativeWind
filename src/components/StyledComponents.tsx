import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

export const StyledText = ({ children, className = '', ...props }: any) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Text 
      className={`${isDark ? 'text-white' : 'text-black'} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export const StyledView = ({ children, className = '', ...props }: any) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View 
      className={`flex-1 ${isDark ? 'bg-[#0F0F12]' : 'bg-[#F5F6F8]'} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};
