import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { C } from '../lib/constants';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'> };

export default function LandingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Nav */}
        <View style={s.nav}>
          <View style={s.logo}>
            <View style={s.dot} />
            <Text style={s.logoText}>bioKids</Text>
          </View>
          <View style={s.navRight}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={s.loginLink}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.ctaBtn} onPress={() => navigation.navigate('Onboarding', {})}>
              <Text style={s.ctaBtnText}>Get Started — Free</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero */}
        <View style={s.hero}>
          <Text style={s.h1}>
            Help your child reach their{' '}
            <Text style={{ color: C.green }}>height potential.</Text>
          </Text>
          <Text style={s.subtitle}>
            The evidence-based system that supports healthy growth through nutrition, exercise, and sleep. No prescriptions. No supplements. Just the levers parents actually control.
          </Text>
          <Text style={s.subItalic}>
            Height isn't the only benefit — every growth signal simultaneously supports brain development.
          </Text>
          <TouchableOpacity style={s.heroCta} onPress={() => navigation.navigate('Onboarding', {})}>
            <Text style={s.heroCtaText}>Get Started — Free</Text>
          </TouchableOpacity>
        </View>

        {/* Sprint Stack Card */}
        <View style={s.card}>
          <Text style={s.cardLabel}>FEATURED PROTOCOL</Text>
          <Text style={s.cardTitle}>The Sprint Stack</Text>
          <Text style={s.cardDesc}>
            Your child already sprints at practice. What they eat before and after changes the growth response dramatically.
          </Text>
          <View style={s.stackRow}>
            {[
              { label: 'Before', main: 'Peanut butter + egg (niacin + choline), or just a liver meatball — it has both', sub: 'loads choline + niacin' },
              { label: 'Sprint', main: '6 × 30-sec all-out', sub: 'triggers lactate response' },
              { label: 'After', main: 'Cold A2 milk + raw honey', sub: 'converts signal to growth' },
            ].map((item, i) => (
              <View key={i} style={s.stackItem}>
                <Text style={s.stackLabel}>{item.label}</Text>
                <Text style={s.stackMain}>{item.main}</Text>
                <Text style={s.stackSub}>{item.sub}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials */}
        <View style={s.section}>
          {[
            { quote: 'My son just turned 13 and is thriving — growing strong and healthy. My husband and I are average height.', name: 'Maggie', loc: 'Mom of 3 · New York' },
            { quote: 'Both my kids are growing strong and healthy, 8 and 7 years old. We helped create the bioKids protocol.', name: 'Marko', loc: 'Dad of 2 · New York' },
            { quote: 'I\'ve trained top NBA talent all the way down to elementary school kids. The limiting factor is always height.', name: 'Thomas', loc: 'Athletic Trainer · Miami' },
          ].map((t, i) => (
            <View key={i} style={s.testimonial}>
              <Text style={s.quoteChar}>"</Text>
              <Text style={s.quoteText}>{t.quote}</Text>
              <Text style={s.quoteName}>{t.name}</Text>
              <Text style={s.quoteLoc}>{t.loc}</Text>
            </View>
          ))}
          <Text style={s.disclaimerText}>
            Individual results vary. bioKids provides educational information only and does not guarantee any health outcomes.
          </Text>
        </View>

        {/* 100% Free badge */}
        <View style={s.freeCard}>
          <Text style={s.freeTitle}>100% Free</Text>
          <Text style={s.freeDesc}>No ads. No in-app purchases. Every feature, forever.</Text>
          <TouchableOpacity style={s.heroCta} onPress={() => navigation.navigate('Onboarding', {})}>
            <Text style={s.heroCtaText}>Get Started — Free</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View style={s.disclaimerBox}>
          <Text style={s.disclaimerFull}>
            bioKids provides general wellness information based on published research. It is not a medical device and does not diagnose, treat, cure, or prevent any disease. Consult your child's pediatrician before making changes.
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <View style={s.logo}>
            <View style={s.dot} />
            <Text style={s.logoText}>bioKids</Text>
          </View>
          <Text style={s.footerText}>contact@biokids.me</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 40 },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.greenLight, borderWidth: 1, borderColor: C.green, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  logoText: { fontFamily: 'Courier', fontSize: 13, fontWeight: '700', color: C.green, letterSpacing: 0.5 },
  loginLink: { fontFamily: 'Courier', fontSize: 14, fontWeight: '500', color: C.text },
  ctaBtn: { backgroundColor: C.green, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  ctaBtnText: { fontFamily: 'Courier', fontSize: 14, fontWeight: '600', color: '#fff' },
  hero: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8, alignItems: 'center' },
  h1: { fontFamily: 'Courier', fontSize: 32, fontWeight: '800', color: C.text, textAlign: 'center', lineHeight: 38, marginBottom: 16 },
  subtitle: { fontFamily: 'Courier', fontSize: 15, color: C.textMuted, textAlign: 'center', lineHeight: 24, marginBottom: 12 },
  subItalic: { fontFamily: 'Courier', fontSize: 14, color: C.green, textAlign: 'center', lineHeight: 22, fontStyle: 'italic', marginBottom: 24 },
  heroCta: { backgroundColor: C.green, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  heroCtaText: { fontFamily: 'Courier', fontSize: 16, fontWeight: '600', color: '#fff' },
  card: { marginHorizontal: 20, marginTop: 32, backgroundColor: '#fff', borderRadius: 20, borderWidth: 2, borderColor: C.green, padding: 24 },
  cardLabel: { fontFamily: 'Courier', fontSize: 10, color: C.green, letterSpacing: 1.2, fontWeight: '700', marginBottom: 8 },
  cardTitle: { fontFamily: 'Courier', fontSize: 20, fontWeight: '800', color: C.text, marginBottom: 8 },
  cardDesc: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted, lineHeight: 22, marginBottom: 16 },
  stackRow: { gap: 10 },
  stackItem: { backgroundColor: C.greenLight, borderRadius: 12, padding: 14, alignItems: 'center' },
  stackLabel: { fontFamily: 'Courier', fontSize: 11, color: C.green, letterSpacing: 0.8, fontWeight: '700', marginBottom: 4 },
  stackMain: { fontFamily: 'Courier', fontSize: 13, fontWeight: '600', color: C.text, textAlign: 'center', lineHeight: 20 },
  stackSub: { fontFamily: 'Courier', fontSize: 11, color: C.textLight, marginTop: 4 },
  section: { paddingHorizontal: 20, marginTop: 32, gap: 12 },
  testimonial: { backgroundColor: '#fff', borderRadius: 14, padding: 20, borderWidth: 1, borderColor: C.border },
  quoteChar: { fontFamily: 'Georgia', fontSize: 28, color: '#d1fae5', lineHeight: 28 },
  quoteText: { fontFamily: 'Courier', fontSize: 13, color: C.text, lineHeight: 22, marginBottom: 10 },
  quoteName: { fontFamily: 'Courier', fontSize: 11, color: C.green, fontWeight: '700' },
  quoteLoc: { fontFamily: 'Courier', fontSize: 10, color: C.textLight },
  disclaimerText: { fontFamily: 'Courier', fontSize: 11, color: C.textLight, textAlign: 'center', lineHeight: 17, fontStyle: 'italic' },
  freeCard: { marginHorizontal: 20, marginTop: 32, backgroundColor: '#fff', borderRadius: 20, borderWidth: 2, borderColor: 'rgba(5,150,105,0.25)', padding: 28, alignItems: 'center' },
  freeTitle: { fontFamily: 'Georgia', fontSize: 32, color: C.green, marginBottom: 8 },
  freeDesc: { fontFamily: 'Courier', fontSize: 13, color: C.textLight, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  disclaimerBox: { marginHorizontal: 20, marginTop: 24, paddingHorizontal: 16 },
  disclaimerFull: { fontFamily: 'Courier', fontSize: 10, color: C.textLighter, textAlign: 'center', lineHeight: 15 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 40, paddingTop: 20, borderTopWidth: 1, borderTopColor: C.border },
  footerText: { fontFamily: 'Courier', fontSize: 12, color: C.text },
});
