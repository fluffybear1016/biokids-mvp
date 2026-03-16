import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert, ActivityIndicator, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';
import { C, API_BASE } from '../lib/constants';
import { setItem } from '../lib/storage';
import * as AppleAuthentication from 'expo-apple-authentication';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
  route: RouteProp<RootStackParamList, 'Onboarding'>;
};

export default function OnboardingScreen({ navigation, route }: Props) {
  const [step, setStep] = useState(route.params?.step || 1);
  const [loading, setLoading] = useState(false);

  // Step 1 — Account
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step 2 — Child Info
  const [childName, setChildName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // Step 3 — Height Prediction
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');
  const [motherFt, setMotherFt] = useState('');
  const [motherIn, setMotherIn] = useState('');
  const [fatherFt, setFatherFt] = useState('');
  const [fatherIn, setFatherIn] = useState('');

  const totalSteps = 3;

  // Check if already logged in (e.g., Apple Sign-In auto-advances past step 1)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && step === 1) {
        setEmail(session.user.email || '');
        setStep(2);
      }
    });
  }, []);


  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    if (!agreedToTerms) {
      Alert.alert('Terms required', 'Please agree to the terms to continue.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Signup failed', error.message);
      return;
    }
    setStep(2);
  };

  const handleAppleSignUp = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });
        if (error) {
          Alert.alert('Apple Sign-In failed', error.message);
          return;
        }
        setStep(2);
      }
    } catch (e: any) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Error', e.message);
      }
    }
  };

  const handleSaveChild = async () => {
    if (!childName.trim()) {
      Alert.alert('Name required', 'Please enter your child\'s name.');
      return;
    }
    await setItem('childName', childName);
    await setItem('childBirthMonth', birthMonth);
    await setItem('childBirthYear', birthYear);

    // Save to Supabase
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await fetch(`${API_BASE}/api/auth/save-child`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          name: childName,
          birthMonth,
          birthYear,
        }),
      });
    }
    setStep(3);
  };

  const handleFinish = async () => {
    await setItem('childGender', childGender);
    await setItem('motherHeight', `${motherFt}'${motherIn}"`);
    await setItem('fatherHeight', `${fatherFt}'${fatherIn}"`);
    // Auth state listener in AppNavigator will redirect to Home
  };

  const renderProgressBar = () => (
    <View style={s.progressBar}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View key={i} style={[s.progressDot, i < step && s.progressDotActive]} />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        {renderProgressBar()}

        {step === 1 && (
          <View style={s.stepContainer}>
            <Text style={s.stepTitle}>Create your account</Text>
            <Text style={s.stepSub}>Create your free account</Text>

            {Platform.OS === 'ios' && (
              <>
                <TouchableOpacity style={s.appleBtn} onPress={handleAppleSignUp}>
                  <Text style={s.appleBtnText}> Sign up with Apple</Text>
                </TouchableOpacity>
                <View style={s.divider}>
                  <View style={s.divLine} /><Text style={s.divText}>or</Text><View style={s.divLine} />
                </View>
              </>
            )}

            <Text style={s.label}>Email</Text>
            <TextInput style={s.input} value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={C.textLighter} keyboardType="email-address" autoCapitalize="none" />

            <Text style={s.label}>Password</Text>
            <TextInput style={s.input} value={password} onChangeText={setPassword} placeholder="Create a password" placeholderTextColor={C.textLighter} secureTextEntry />

            <TouchableOpacity style={s.checkRow} onPress={() => setAgreedToTerms(!agreedToTerms)}>
              <View style={[s.checkbox, agreedToTerms && s.checkboxChecked]}>
                {agreedToTerms && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={s.checkLabel}>I agree to the Terms of Service and Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.primaryBtn, !agreedToTerms && s.btnDisabled]} onPress={handleSignup} disabled={loading || !agreedToTerms}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.primaryBtnText}>Create Account</Text>}
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={s.stepContainer}>
            <Text style={s.stepTitle}>Tell us about your child</Text>
            <Text style={s.stepSub}>We'll personalize the protocol for them.</Text>

            <Text style={s.label}>Child's name</Text>
            <TextInput style={s.input} value={childName} onChangeText={setChildName} placeholder="First name" placeholderTextColor={C.textLighter} />

            <Text style={s.label}>Birth month</Text>
            <TextInput style={s.input} value={birthMonth} onChangeText={setBirthMonth} placeholder="e.g., March" placeholderTextColor={C.textLighter} />

            <Text style={s.label}>Birth year</Text>
            <TextInput style={s.input} value={birthYear} onChangeText={setBirthYear} placeholder="e.g., 2017" placeholderTextColor={C.textLighter} keyboardType="number-pad" />

            <TouchableOpacity style={s.primaryBtn} onPress={handleSaveChild}>
              <Text style={s.primaryBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 3 && (
          <View style={s.stepContainer}>
            <Text style={s.stepTitle}>Height potential</Text>
            <Text style={s.stepSub}>We'll calculate their genetic height range.</Text>

            <Text style={s.label}>Child's sex</Text>
            <View style={s.genderRow}>
              {(['boy', 'girl'] as const).map(g => (
                <TouchableOpacity key={g} style={[s.genderBtn, childGender === g && s.genderBtnActive]} onPress={() => setChildGender(g)}>
                  <Text style={[s.genderBtnText, childGender === g && s.genderBtnTextActive]}>{g === 'boy' ? 'Boy' : 'Girl'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.label}>Mother's height</Text>
            <View style={s.heightRow}>
              <TextInput style={[s.input, s.heightInput]} value={motherFt} onChangeText={setMotherFt} placeholder="ft" placeholderTextColor={C.textLighter} keyboardType="number-pad" />
              <TextInput style={[s.input, s.heightInput]} value={motherIn} onChangeText={setMotherIn} placeholder="in" placeholderTextColor={C.textLighter} keyboardType="number-pad" />
            </View>

            <Text style={s.label}>Father's height</Text>
            <View style={s.heightRow}>
              <TextInput style={[s.input, s.heightInput]} value={fatherFt} onChangeText={setFatherFt} placeholder="ft" placeholderTextColor={C.textLighter} keyboardType="number-pad" />
              <TextInput style={[s.input, s.heightInput]} value={fatherIn} onChangeText={setFatherIn} placeholder="in" placeholderTextColor={C.textLighter} keyboardType="number-pad" />
            </View>

            <TouchableOpacity style={s.primaryBtn} onPress={handleFinish}>
              <Text style={s.primaryBtnText}>See My Protocol →</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 20 },
  progressBar: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 32, marginTop: 8 },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.border },
  progressDotActive: { backgroundColor: C.green, width: 24 },
  stepContainer: { paddingBottom: 40 },
  stepTitle: { fontFamily: 'Courier', fontSize: 24, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 8 },
  stepSub: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  label: { fontFamily: 'Courier', fontSize: 14, fontWeight: '500', color: C.textMuted, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontFamily: 'Courier', fontSize: 15, color: C.text, marginBottom: 16, backgroundColor: '#fff' },
  appleBtn: { backgroundColor: '#000', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginBottom: 16 },
  appleBtnText: { fontFamily: 'Courier', fontSize: 16, fontWeight: '600', color: '#fff' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  divLine: { flex: 1, height: 1, backgroundColor: C.border },
  divText: { fontFamily: 'Courier', fontSize: 11, color: C.textLighter },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: C.border, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: C.green, borderColor: C.green },
  checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
  checkLabel: { fontFamily: 'Courier', fontSize: 12, color: C.textMuted, flex: 1 },
  primaryBtn: { backgroundColor: C.green, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  primaryBtnText: { fontFamily: 'Courier', fontSize: 16, fontWeight: '600', color: '#fff' },
  btnDisabled: { opacity: 0.5 },
  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  genderBtn: { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingVertical: 14, alignItems: 'center', backgroundColor: '#fff' },
  genderBtnActive: { borderColor: C.green, backgroundColor: C.greenLight },
  genderBtnText: { fontFamily: 'Courier', fontSize: 15, fontWeight: '600', color: C.textMuted },
  genderBtnTextActive: { color: C.green },
  heightRow: { flexDirection: 'row', gap: 12 },
  heightInput: { flex: 1 },
});
