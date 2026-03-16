import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert, ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { supabase } from '../lib/supabase';
import { C } from '../lib/constants';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Login'> };

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert('Login failed', error.message);
    }
    // Navigation happens automatically via auth state listener in AppNavigator
  };

  const handleAppleSignIn = async () => {
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
        if (error) Alert.alert('Apple Sign-In failed', error.message);
      }
    } catch (e: any) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Apple Sign-In failed', e.message);
      }
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.back}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={s.logo}>
          <View style={s.dot} />
          <Text style={s.logoText}>bioKids</Text>
        </View>

        <View style={s.card}>
          <Text style={s.title}>Welcome back</Text>
          <Text style={s.subtitle}>Continue your child's daily protocol.</Text>

          {/* Apple Sign In */}
          {Platform.OS === 'ios' && (
            <>
              <TouchableOpacity style={s.appleBtn} onPress={handleAppleSignIn}>
                <Text style={s.appleBtnText}> Sign in with Apple</Text>
              </TouchableOpacity>

              <View style={s.divider}>
                <View style={s.line} />
                <Text style={s.dividerText}>or</Text>
                <View style={s.line} />
              </View>
            </>
          )}

          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={C.textLighter}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            placeholderTextColor={C.textLighter}
            secureTextEntry
          />

          <TouchableOpacity style={s.loginBtn} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.loginBtnText}>Log in</Text>
            )}
          </TouchableOpacity>

          <View style={s.bottomRow}>
            <TouchableOpacity onPress={async () => {
              if (!email) {
                Alert.alert('Enter your email', 'Please enter your email address above, then tap "Forgot password?" again.');
                return;
              }
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'biokids://reset-password',
              });
              if (error) {
                Alert.alert('Error', error.message);
              } else {
                Alert.alert('Check your email', 'We sent a password reset link to ' + email);
              }
            }}>
              <Text style={s.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Onboarding', {})}>
              <Text style={s.createText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={s.privacy}>Your data stays private. We never sell or share your information.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 20, paddingTop: 12 },
  back: { marginBottom: 16 },
  backText: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted },
  logo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  logoText: { fontFamily: 'Courier', fontSize: 18, fontWeight: '700', color: C.green },
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 20 },
  title: { fontFamily: 'Courier', fontSize: 24, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 6 },
  subtitle: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  appleBtn: { backgroundColor: '#000', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginBottom: 16 },
  appleBtnText: { fontFamily: 'Courier', fontSize: 16, fontWeight: '600', color: '#fff' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: C.border },
  dividerText: { fontFamily: 'Courier', fontSize: 11, color: C.textLighter },
  label: { fontFamily: 'Courier', fontSize: 14, fontWeight: '500', color: C.textMuted, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontFamily: 'Courier', fontSize: 15, color: C.text, marginBottom: 16, backgroundColor: '#fff' },
  loginBtn: { backgroundColor: C.green, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  loginBtnText: { fontFamily: 'Courier', fontSize: 16, fontWeight: '600', color: '#fff' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  forgotText: { fontFamily: 'Courier', fontSize: 13, color: C.textLighter },
  createText: { fontFamily: 'Courier', fontSize: 13, color: C.green, fontWeight: '500' },
  privacy: { fontFamily: 'Courier', fontSize: 11, color: C.textLighter, textAlign: 'center', marginTop: 20 },
});
