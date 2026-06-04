import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#7B39FD',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'radio' : 'radio-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              <Ionicons name={focused ? 'bag' : 'bag-outline'} size={size} color={color} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>3</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Message',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    height: 65,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#FF6E54',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
});
