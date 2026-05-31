import { useState, useRef } from 'react'
import { Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import Animated, { FadeIn, SlideInRight, SlideOutLeft, SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'


const Register = () => {
    const [step, setStep] = useState(1)
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        username: '',
        acceptTerms: false
    })
    const [errors, setErrors] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        username: '',
        acceptTerms: ''
    })

    const validate = (currentStep: number) => {
        let valid = true
        const newErrors = { ...errors }

        if (currentStep === 1) {
            if (!formData.name) {
                newErrors.name = 'Ad tələb olunur'
                valid = false
            } else newErrors.name = ''

            if (!formData.lastname) {
                newErrors.lastname = 'Soyad tələb olunur'
                valid = false
            } else newErrors.lastname = ''

            if (!formData.phone) {
                newErrors.phone = 'Nömrə tələb olunur'
                valid = false
            } else newErrors.phone = ''
        }

        if (currentStep === 2) {
            if (!formData.email) {
                newErrors.email = 'E-poçt tələb olunur'
                valid = false
            } else if (!formData.email.includes('@')) {
                newErrors.email = 'Yanlış e-poçt formatı'
                valid = false
            } else newErrors.email = ''

            if (formData.password.length < 8) {
                newErrors.password = 'Şifrə ən azı 8 simvol olmalıdır'
                valid = false
            } else newErrors.password = ''
        }

        if (currentStep === 3) {
            if (!formData.username) {
                newErrors.username = 'İstifadəçi adı tələb olunur'
                valid = false
            } else newErrors.username = ''

            if (!formData.acceptTerms) {
                newErrors.acceptTerms = 'Qaydalar qəbul edilməlidir'
                valid = false
            } else newErrors.acceptTerms = ''
        }

        setErrors(newErrors)
        return valid
    }

    const handleChange = (name: string, value: string | boolean) => {
        setFormData(prevState => ({ ...prevState, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const nextStep = () => {
        if (validate(step)) {
            if (step < 3) {
                setDirection('forward')
                setStep(prev => prev + 1)
            } else {
                console.log('Final Form Data:', formData)
                alert('Qeydiyyat tamamlandı!')
            }
        }
    }

    const prevStep = () => {
        setDirection('backward')
        setStep(prev => prev - 1)
    }

    const goToStep = (targetStep: number) => {
        if (targetStep === step) return
        if (targetStep < step) {
            setDirection('backward')
            setStep(targetStep)
        } else {
            // Validate all steps up to the target
            let canProceed = true
            for (let s = step; s < targetStep; s++) {
                if (!validate(s)) {
                    canProceed = false
                    break
                }
            }
            if (canProceed) {
                setDirection('forward')
                setStep(targetStep)
            }
        }
    }

    return (
        <View className="flex-1 bg-zinc-50">
            <KeyboardAwareScrollView
                bottomOffset={20}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-6 py-12">
                    <Animated.View 
                        entering={FadeIn.duration(800)}
                        className="bg-white p-8 rounded-[48px] shadow-2xl shadow-emerald-900/10 border border-zinc-100"
                    >
                        <View className="items-center mb-8">
                            <View className="bg-emerald-50 p-4 rounded-full mb-4">
                                <Ionicons name="person-add" size={32} color="#059669" />
                            </View>
                            <Text className="text-3xl font-black text-zinc-900 text-center tracking-tight">Hesab Yaradın</Text>
                            <Text className="text-zinc-500 text-center mt-1">Davam etmək üçün məlumatları doldurun</Text>
                        </View>

                        <ProgressIndicator step={step} onStepPress={goToStep} />

                        <Animated.View 
                            key={step}
                            entering={direction === 'forward' ? SlideInRight.duration(500) : SlideInLeft.duration(500)}
                            exiting={direction === 'forward' ? SlideOutLeft.duration(500) : SlideOutRight.duration(500)}
                            className="gap-1"
                        >
                            {step === 1 && (
                                <>
                                    <CustomInput
                                        label="Ad"
                                        value={formData.name}
                                        onChangeText={(t: string) => handleChange('name', t)}
                                        placeholder="Adınızı daxil edin"
                                        error={errors.name}
                                    />
                                    <CustomInput
                                        label="Soyad"
                                        value={formData.lastname}
                                        onChangeText={(t: string) => handleChange('lastname', t)}
                                        placeholder="Soyadınızı daxil edin"
                                        error={errors.lastname}
                                    />
                                    <CustomInput
                                        label="Telefon"
                                        value={formData.phone}
                                        onChangeText={(t: string) => handleChange('phone', t)}
                                        placeholder="050-000-00-00"
                                        keyboardType="phone-pad"
                                        error={errors.phone}
                                    />
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <CustomInput
                                        label="E-poçt Ünvanı"
                                        value={formData.email}
                                        onChangeText={(t: string) => handleChange('email', t)}
                                        placeholder="email@numunə.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        error={errors.email}
                                    />
                                    <CustomInput
                                        label="Şifrə"
                                        value={formData.password}
                                        onChangeText={(t: string) => handleChange('password', t)}
                                        placeholder="••••••••"
                                        secureTextEntry
                                        error={errors.password}
                                    />
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <CustomInput
                                        label="İstifadəçi Adı"
                                        value={formData.username}
                                        onChangeText={(t: string) => handleChange('username', t)}
                                        placeholder="İstifadəçi adı seçin"
                                        error={errors.username}
                                    />
                                    
                                    <Pressable 
                                        onPress={() => handleChange('acceptTerms', !formData.acceptTerms)}
                                        className="flex-row items-center mt-4 mb-8 bg-zinc-50 p-4 rounded-2xl border border-zinc-100"
                                    >
                                        <View className={`size-6 rounded-md items-center justify-center border-2 ${formData.acceptTerms ? 'bg-emerald-600 border-emerald-600' : 'border-zinc-300 bg-white'}`}>
                                            {formData.acceptTerms && <Ionicons name="checkmark" size={16} color="white" />}
                                        </View>
                                        <Text className="ml-3 text-zinc-600 text-sm flex-1 leading-5">
                                            İstifadə <Text className="text-emerald-600 font-bold">şərtlərini</Text> və məxfilik siyasətini qəbul edirəm
                                        </Text>
                                    </Pressable>
                                    {errors.acceptTerms ? <Text className="text-red-500 text-xs mt-[-24px] mb-6 ml-1 font-medium">{errors.acceptTerms}</Text> : null}
                                </>
                            )}
                        </Animated.View>

                        <View className={`flex-row gap-4 mt-4 ${step === 1 ? 'justify-end' : 'justify-between'}`}>
                            {step > 1 && (
                                <TouchableOpacity 
                                    onPress={prevStep}
                                    activeOpacity={0.7}
                                    className="flex-1 bg-zinc-100 py-5 rounded-3xl items-center border border-zinc-200"
                                >
                                    <Text className="text-zinc-500 font-bold text-lg">Geri</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity 
                                onPress={nextStep}
                                activeOpacity={0.8}
                                className={`${step > 1 ? 'flex-1' : 'w-full'} bg-emerald-600 py-5 rounded-3xl items-center shadow-lg shadow-emerald-600/30`}
                            >
                                <Text className="text-white font-black text-lg">
                                    {step === 3 ? 'Tamamla' : 'Növbəti'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Register

const ProgressIndicator = ({ step, onStepPress }: { step: number, onStepPress: (s: number) => void }) => (
    <View className="flex-row items-center justify-between mb-12 px-2 mt-4">
        {[1, 2, 3].map((i) => (
            <View key={i} className="flex-row items-center flex-1">
                <TouchableOpacity 
                    onPress={() => onStepPress(i)}
                    activeOpacity={0.7}
                    className="items-center"
                >
                    <View className={`size-11 rounded-2xl items-center justify-center border-2 ${step >= i ? 'bg-emerald-600 border-emerald-600 rotate-12' : 'border-zinc-200 bg-white'}`}>
                        <View className={step >= i ? '-rotate-12' : ''}>
                            {step > i ? (
                                <Ionicons name="checkmark-done" size={24} color="white" />
                            ) : (
                                <Text className={`${step >= i ? 'text-white' : 'text-zinc-400'} font-black text-lg`}>{i}</Text>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                {i < 3 && (
                    <View className="flex-1 h-[2px] mx-2 bg-zinc-100 overflow-hidden rounded-full">
                        <View 
                            className="h-full bg-emerald-600"
                            style={{ 
                                width: step > i ? '100%' : '0%'
                            }} 
                        />
                    </View>
                )}
            </View>
        ))}
    </View>
)

const CustomInput = ({ label, value, onChangeText, placeholder, error, secureTextEntry, keyboardType, autoCapitalize }: any) => {
    const [isFocused, setIsFocused] = useState(false)
    
    return (
        <View className="gap-2 mb-6">
            <View className="flex-row justify-between items-center ml-1">
                <Text className={`text-sm font-bold tracking-tight ${isFocused ? 'text-emerald-600' : 'text-zinc-500'}`}>{label.toUpperCase()}</Text>
                {error ? <Text className="text-red-500 text-[10px] uppercase font-bold">{error}</Text> : null}
            </View>
            <View className={`flex-row items-center bg-zinc-50 border-2 rounded-[22px] px-5 py-0.5 ${isFocused ? 'border-emerald-500 bg-white shadow-xl shadow-emerald-500/10' : error ? 'border-red-200 bg-red-50/10' : 'border-zinc-100'}`}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#A1A1AA"
                    className="flex-1 py-4 text-zinc-900 font-medium text-base"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {isFocused && !error && <Ionicons name="flash" size={18} color="#10B981" />}
                {error && <Ionicons name="alert-circle" size={20} color="#EF4444" />}
            </View>
        </View>
    )
}
