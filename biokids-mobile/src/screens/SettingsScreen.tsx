import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert, Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { C } from '../lib/constants';
import { supabase } from '../lib/supabase';
import {
  getActiveChild, setItem, getItem,
  ChildProfile, createEmptyChild, getChildren, saveChildren, setActiveChildId,
} from '../lib/storage';
import { registerForPushNotifications, scheduleProtocolReminders } from '../lib/notifications';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'> };

type SectionId = 'child' | 'notifications' | 'account';

export default function SettingsScreen({ navigation }: Props) {
  const [openSection, setOpenSection] = useState<SectionId | null>('child');
  const [saved, setSaved] = useState<SectionId | null>(null);

  // Child fields
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');

  // Height fields
  const [motherFt, setMotherFt] = useState('');
  const [motherIn, setMotherIn] = useState('');
  const [fatherFt, setFatherFt] = useState('');
  const [fatherIn, setFatherIn] = useState('');

  // Notification state
  const [notifEnabled, setNotifEnabled] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const child = await getActiveChild();
    if (child) {
      setName(child.name);
      setBirthMonth(child.birthMonth);
      setBirthYear(child.birthYear);
      setChildGender(child.gender);
      setMotherFt(child.motherHeightFt);
      setMotherIn(child.motherHeightIn);
      setFatherFt(child.fatherHeightFt);
      setFatherIn(child.fatherHeightIn);
    } else {
      // Load from flat keys
      setName(await getItem('childName') || '');
    }
    const nAsked = await getItem('biokids_notif_asked');
    setNotifEnabled(!!nAsked);
  };

  const handleSaveChild = async () => {
    await setItem('childName', name);
    await setItem('childBirthMonth', birthMonth);
    await setItem('childBirthYear', birthYear);
    await setItem('childGender', childGender);
    await setItem('motherHeight', `${motherFt}'${motherIn}"`);
    await setItem('fatherHeight', `${fatherFt}'${fatherIn}"`);

    // Update in children array if exists
    const children = await getChildren();
    if (children.length > 0) {
      const child = children[0]; // Simple single-child for now
      child.name = name;
      child.birthMonth = birthMonth;
      child.birthYear = birthYear;
      child.gender = childGender;
      child.motherHeightFt = motherFt;
      child.motherHeightIn = motherIn;
      child.fatherHeightFt = fatherFt;
      child.fatherHeightIn = fatherIn;
      await saveChildren(children);
    }

    setSaved('child');
    setTimeout(() => setSaved(null), 2000);
  };

  const handleEnableNotifications = async () => {
    const token = await registerForPushNotifications();
    if (token) {
      await scheduleProtocolReminders();
      setNotifEnabled(true);
      Alert.alert('Notifications enabled', 'You\'ll get protocol reminders throughout the day.');
    } else {
      Alert.alert('Permission denied', 'Please enable notifications in your device Settings.');
    }
  };

  const handleLogout = async () => {
    Alert.alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out', style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
        },
      },
    ]);
  };

  const SectionHeader = ({ id, title }: { id: SectionId; title: string }) => (
    <TouchableOpacity
      style={[s.sectionHeader, openSection === id && s.sectionHeaderOpen]}
      onPress={() => setOpenSection(openSection === id ? null : id)}
    >
      <Text style={s.sectionTitle}>{title}</Text>
      <Text style={s.sectionArrow}>{openSection === id ? '▲' : '▼'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={s.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={s.title}>Settings</Text>
        </View>

        {/* Child Profile */}
        <SectionHeader id="child" title="Child Profile" />
        {openSection === 'child' && (
          <View style={s.sectionContent}>
            <Text style={s.label}>Name</Text>
            <TextInput style={s.input} value={name} onChangeText={setName} placeholder="Child's name" placeholderTextColor={C.textLighter} />

            <Text style={s.label}>Sex</Text>
            <View style={s.genderRow}>
              {(['boy', 'girl'] as const).map(g => (
                <TouchableOpacity key={g} style={[s.genderBtn, childGender === g && s.genderBtnActive]} onPress={() => setChildGender(g)}>
                  <Text style={[s.genderBtnText, childGender === g && s.genderBtnTextActive]}>{g === 'boy' ? 'Boy' : 'Girl'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.label}>Birth month</Text>
            <TextInput style={s.input} value={birthMonth} onChangeText={setBirthMonth} placeholder="e.g., March" placeholderTextColor={C.textLighter} />

            <Text style={s.label}>Birth year</Text>
            <TextInput style={s.input} value={birthYear} onChangeText={setBirthYear} placeholder="e.g., 2017" placeholderTextColor={C.textLighter} keyboardType="number-pad" />

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

            <TouchableOpacity style={s.saveBtn} onPress={handleSaveChild}>
              <Text style={s.saveBtnText}>{saved === 'child' ? '✓ Saved' : 'Save Changes'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notifications */}
        <SectionHeader id="notifications" title="Notifications" />
        {openSection === 'notifications' && (
          <View style={s.sectionContent}>
            <Text style={s.desc}>
              Get protocol reminders throughout the day — morning, lunch, exercise, dinner & bedtime.
            </Text>
            <TouchableOpacity
              style={[s.saveBtn, notifEnabled && s.btnSecondary]}
              onPress={handleEnableNotifications}
            >
              <Text style={[s.saveBtnText, notifEnabled && s.btnSecondaryText]}>
                {notifEnabled ? '✓ Notifications Enabled' : 'Enable Notifications'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Account */}
        <SectionHeader id="account" title="Account" />
        {openSection === 'account' && (
          <View style={s.sectionContent}>
            <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
              <Text style={s.logoutBtnText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Medical Disclaimer */}
        <View style={s.disclaimerBox}>
          <Text style={s.disclaimerTitle}>Disclaimer</Text>
          <Text style={s.disclaimerText}>
            bioKids provides general wellness information based on published nutrition and exercise research. It is not a medical device and does not diagnose, treat, cure, or prevent any disease. Always consult your child's pediatrician before making changes to their diet, exercise, or sleep routine.
          </Text>
        </View>

        {/* Legal Links */}
        <View style={s.legalLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.biokids.me/privacy')}>
            <Text style={s.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={s.legalDot}>·</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.biokids.me/terms')}>
            <Text style={s.legalLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.version}>bioKids v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  backText: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted },
  title: { fontFamily: 'Courier', fontSize: 22, fontWeight: '800', color: C.text },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  sectionHeaderOpen: { borderBottomColor: C.green },
  sectionTitle: { fontFamily: 'Courier', fontSize: 16, fontWeight: '700', color: C.text },
  sectionArrow: { fontFamily: 'Courier', fontSize: 12, color: C.textLight },

  sectionContent: { paddingVertical: 16 },
  label: { fontFamily: 'Courier', fontSize: 14, fontWeight: '500', color: C.textMuted, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontFamily: 'Courier', fontSize: 15, color: C.text, marginBottom: 16, backgroundColor: '#fff' },
  desc: { fontFamily: 'Courier', fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 16 },

  genderRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  genderBtn: { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 10, paddingVertical: 14, alignItems: 'center', backgroundColor: '#fff' },
  genderBtnActive: { borderColor: C.green, backgroundColor: C.greenLight },
  genderBtnText: { fontFamily: 'Courier', fontSize: 15, fontWeight: '600', color: C.textMuted },
  genderBtnTextActive: { color: C.green },
  heightRow: { flexDirection: 'row', gap: 12 },
  heightInput: { flex: 1 },

  saveBtn: { backgroundColor: C.green, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  saveBtnText: { fontFamily: 'Courier', fontSize: 15, fontWeight: '600', color: '#fff' },
  btnSecondary: { backgroundColor: C.greenLight, borderWidth: 1, borderColor: C.green },
  btnSecondaryText: { color: C.green },

  logoutBtn: { borderWidth: 1, borderColor: C.red, borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  logoutBtnText: { fontFamily: 'Courier', fontSize: 15, fontWeight: '600', color: C.red },

  disclaimerBox: { marginTop: 32, backgroundColor: '#fefce8', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#fde68a' },
  disclaimerTitle: { fontFamily: 'Courier', fontSize: 13, fontWeight: '700', color: '#92400e', marginBottom: 6 },
  disclaimerText: { fontFamily: 'Courier', fontSize: 11, color: '#78716c', lineHeight: 17 },

  legalLinks: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20 },
  legalLink: { fontFamily: 'Courier', fontSize: 12, color: C.green, textDecorationLine: 'underline' },
  legalDot: { fontFamily: 'Courier', fontSize: 12, color: C.textLighter },

  version: { fontFamily: 'Courier', fontSize: 11, color: C.textLighter, textAlign: 'center', marginTop: 16 },
});
