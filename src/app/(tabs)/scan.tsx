import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { StyledText, StyledView } from '../../components/StyledComponents';
import { useNotificationPermission } from '../../hooks/useNotificationPermission';
import { Ionicons } from '@expo/vector-icons';

const Scan = () => {
  useNotificationPermission();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState("");

  const handleScan = (scanResult: BarcodeScanningResult) => {
    if (scanned) return;

    setScanned(true);
    setResult(scanResult.data);
    console.log("Type: ", scanResult.type);
    console.log("Data: ", scanResult.data);
  };

  const hasRequestedCamera = useRef(false);

  useEffect(() => {
    if (hasRequestedCamera.current || !permission) return;
    if (!permission.granted && permission.canAskAgain) {
      hasRequestedCamera.current = true;
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F6F8] dark:bg-[#0F0F12]">
        <StyledText>Requesting for camera permission...</StyledText>
      </View>
    );
  }

  return (
    <StyledView>
      <View className="bg-[#7B39FD] dark:bg-[#6826E2] pt-[54px] pb-4 px-5 flex-row items-center shadow-lg">
        <StyledText className="text-white text-[20px] font-black tracking-[1px] flex-1">QR SCANNER</StyledText>
      </View>

      {!permission.granted ? (
        <View className='flex-1 justify-center items-center px-10'>
          <Ionicons name="camera-outline" size={80} color="#7B39FD" />
          <StyledText className='text-xl font-bold mt-5 text-center'>Camera access is required</StyledText>
          <StyledText className='text-[#888] text-center mt-2'>We need your permission to show the camera and scan QR codes.</StyledText>
          <TouchableOpacity 
            className='bg-[#7B39FD] px-8 py-4 rounded-2xl mt-8 shadow-md' 
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <StyledText className='text-white font-bold text-lg'>Grant Permission</StyledText>
          </TouchableOpacity>
        </View>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <StyledText className='text-lg font-semibold mb-6 text-center text-[#555] dark:text-[#AAA] px-10'>
            Align the QR code within the frame to scan
          </StyledText>
          
          <View className="relative">
            <CameraView
              className="w-80 h-80 rounded-3xl overflow-hidden"
              facing='back'
              barcodeScannerSettings={{
                barcodeTypes: ['qr']
              }}
              onBarcodeScanned={scanned ? undefined : handleScan}
            />
            <View className="absolute inset-0 justify-center items-center">
               <View className="flex-1 w-full bg-black/30" />
               <View className="flex-row h-[250px]">
                  <View className="flex-1 bg-black/30" />
                  <View className="w-[250px] bg-transparent relative">
                    {/* Corners */}
                    <View className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-[#7B39FD] rounded-tl-xl" />
                    <View className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-[#7B39FD] rounded-tr-xl" />
                    <View className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-[#7B39FD] rounded-bl-xl" />
                    <View className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-[#7B39FD] rounded-br-xl" />
                  </View>
                  <View className="flex-1 bg-black/30" />
               </View>
               <View className="flex-1 w-full bg-black/30" />
            </View>
          </View>

          {scanned && (
            <View className="absolute bottom-10 left-5 right-5 bg-white dark:bg-[#1E1E24] p-6 rounded-[24px] shadow-xl border border-gray-100 dark:border-white/10">
              <View className="flex-row items-center mb-3">
                <View className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                </View>
                <StyledText className="text-lg font-bold">Scan Result</StyledText>
              </View>
              
              <View className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl mb-6">
                <StyledText className='text-[15px] leading-6' numberOfLines={4}>{result}</StyledText>
              </View>

              <TouchableOpacity
                className='bg-[#7B39FD] py-4 rounded-2xl shadow-sm items-center'
                onPress={() => {
                  setScanned(false);
                  setResult("");
                }}
                activeOpacity={0.8}
              >
                <StyledText className='text-white font-bold text-lg'>Scan Another Code</StyledText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </StyledView>
  );
};

export default Scan;
