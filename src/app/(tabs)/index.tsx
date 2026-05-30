import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48 - 12) / 2;
const FEATURED_WIDTH = SCREEN_WIDTH - 48;

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  images: string[];
  brand?: string;
}

const CATEGORY_ITEMS = [
  { icon: 'grid' as const,    label: 'Category',   bg: '#F1ECFF', iconColor: '#7B39FD' },
  { icon: 'sliders' as const, label: 'Compare',    bg: '#F1ECFF', iconColor: '#7B39FD' },
  { icon: 'tag' as const,     label: 'Sales',      bg: '#F1ECFF', iconColor: '#7B39FD' },
  { icon: 'star' as const,    label: 'Offers',     bg: '#FFF0EC', iconColor: '#FF6E54' },
];

export default function HomeScreen() {
  const [products,         setProducts]         = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading,          setLoading]          = useState(true);
  const [activeDot,        setActiveDot]        = useState(0);
  const [likedProducts,    setLikedProducts]    = useState<Set<number>>(new Set());

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res  = await fetch('https://dummyjson.com/products?limit=20');
      const data = await res.json();
      setFeaturedProducts(data.products.slice(0, 4));
      setProducts(data.products.slice(0, 12));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (id: number) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ─── Featured Card ─── */
  const renderFeaturedCard = ({ item }: { item: Product }) => (
    <View
      className="bg-white rounded-[22px] overflow-hidden min-h-[130px] relative"
      style={{ width: FEATURED_WIDTH, elevation: 6 }}
    >
      {/* Background image — absolute, right side */}
      <Image
        source={{ uri: item.thumbnail }}
        className="absolute right-[-10px] bottom-[-10px] w-40 h-36 opacity-95"
        resizeMode="contain"
      />
      {/* Text overlay */}
      <View className="p-5 pr-[140px]">
        <Text className="text-[#AAAAAA] text-xs mb-1 font-medium">Introducing</Text>
        <Text className="text-[#1A1A1A] text-[17px] font-extrabold mb-3" numberOfLines={2}>
          {item.title}
        </Text>
        <TouchableOpacity
          className="bg-[#1A1A1A] rounded-full px-[18px] py-[9px] self-start"
          activeOpacity={0.8}
        >
          <Text className="text-white text-xs font-bold tracking-wide">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  /* ─── Product Card ─── */
  const renderProductCard = ({ item }: { item: Product }) => {
    const isLiked    = likedProducts.has(item.id);
    const colorCount = (item.id % 5) + 2;
    return (
      <View
        className="bg-white rounded-[18px] p-3 relative"
        style={{ width: CARD_WIDTH, elevation: 3 }}
      >
        {/* Heart */}
        <TouchableOpacity
          className="absolute top-2.5 right-2.5 z-10 bg-[#F5F6F8] rounded-full p-1.5"
          onPress={() => toggleLike(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={17}
            color={isLiked ? '#FF6E54' : '#CCCCCC'}
          />
        </TouchableOpacity>

        {/* Image */}
        <Image
          source={{ uri: item.thumbnail }}
          className="w-full h-[95px] mt-1.5 mb-2.5"
          resizeMode="contain"
        />

        {/* Title */}
        <Text className="text-[13px] font-bold text-[#1A1A1A] mb-1.5" numberOfLines={2}>
          {item.title}
        </Text>

        {/* Colors badge */}
        <View className="bg-[#F5F6F8] self-start rounded-[10px] px-2 py-[3px] mb-2.5">
          <Text className="text-[10px] text-[#999] font-medium">{colorCount} Colors</Text>
        </View>

        {/* Price + Add */}
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-extrabold text-[#1A1A1A]">
            ${item.price.toFixed(0)}
          </Text>
          <TouchableOpacity
            className="bg-[#F1ECFF] rounded-[10px] p-1.5"
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={16} color="#7B39FD" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F5F6F8]">
      <StatusBar style="light" />

      {/* ─── Purple Header ─── */}
      <View className="bg-[#7B39FD] pt-[54px] pb-4 px-5 flex-row items-center justify-between">
        <Text className="text-white text-[22px] font-black tracking-[2px]">SHOPIN</Text>

        <View className="flex-row items-center gap-2">
          {/* Search bar */}
          <View className="bg-white rounded-full px-3 py-2 flex-row items-center gap-1.5 w-[130px]">
            <Ionicons name="search-outline" size={15} color="#AAAAAA" />
            <Text className="text-[#BBBBBB] text-[13px]">Search</Text>
          </View>

          {/* Camera button */}
          <TouchableOpacity className="bg-white rounded-xl p-2" activeOpacity={0.8}>
            <Ionicons name="camera-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* ─── Featured Slider (purple bg continues) ─── */}
        <View className="bg-[#7B39FD] px-6 pb-5 pt-2">
          {loading ? (
            <ActivityIndicator color="#fff" size="large" style={{ marginVertical: 30 }} />
          ) : (
            <FlatList
              data={featuredProducts}
              renderItem={renderFeaturedCard}
              keyExtractor={(item) => `feat-${item.id}`}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={FEATURED_WIDTH}
              decelerationRate="fast"
              onScroll={(e) => {
                const idx = Math.round(e.nativeEvent.contentOffset.x / FEATURED_WIDTH);
                setActiveDot(idx);
              }}
              scrollEventThrottle={16}
            />
          )}

          {/* Pagination dots */}
          <View className="flex-row justify-center mt-3.5 gap-1.5 items-center">
            {featuredProducts.map((_, i) => (
              <View
                key={i}
                className={`rounded-full h-[7px] ${
                  i === activeDot
                    ? 'bg-white w-[18px]'
                    : 'bg-white/40 w-[7px]'
                }`}
              />
            ))}
          </View>
        </View>

        {/* ─── Body ─── */}
        <View className="bg-[#F5F6F8] pt-1">

          {/* Category Row */}
          <View
            className="bg-white mx-4 mt-4 rounded-[20px] flex-row justify-between py-[18px] px-3"
            style={{ elevation: 2 }}
          >
            {CATEGORY_ITEMS.map((item, i) => (
              <TouchableOpacity key={i} className="items-center flex-1 gap-2" activeOpacity={0.7}>
                <View
                  className="w-[50px] h-[50px] rounded-[14px] items-center justify-center"
                  style={{ backgroundColor: item.bg }}
                >
                  <Feather name={item.icon} size={20} color={item.iconColor} />
                </View>
                <Text className="text-[11px] text-[#555] font-semibold text-center">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* New Arrivals header */}
          <View className="flex-row items-center justify-between mx-5 mt-6 mb-3.5">
            <Text className="text-[19px] font-extrabold text-[#1A1A1A]">New Arrivals</Text>
            <TouchableOpacity
              className="bg-[#7B39FD] rounded-full px-4 py-[7px]"
              activeOpacity={0.8}
            >
              <Text className="text-white text-xs font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          {/* Product cards */}
          {loading ? (
            <ActivityIndicator color="#7B39FD" size="large" style={{ marginVertical: 24 }} />
          ) : (
            <FlatList
              data={products}
              renderItem={renderProductCard}
              keyExtractor={(item) => `prod-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 4 }}
            />
          )}

          <View className="h-6" />
        </View>
      </ScrollView>
    </View>
  );
}
