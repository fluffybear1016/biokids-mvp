import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SectionList,
  SafeAreaView, Linking, Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { C } from '../lib/constants';
import { dayData, DayItem, DayPeriod, citeUrls } from '../lib/protocol-data';
import { supabase } from '../lib/supabase';
import { getItem, setItem, getChildren, getActiveChild } from '../lib/storage';
import { registerForPushNotifications, scheduleProtocolReminders } from '../lib/notifications';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> };

export default function HomeScreen({ navigation }: Props) {
  const [childName, setChildName] = useState('');
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [notificationsAsked, setNotificationsAsked] = useState(false);

  // Get today's key for checklist persistence
  const todayKey = `biokids_done_${new Date().toISOString().slice(0, 10)}`;

  useEffect(() => {
    loadData();
    setupNotifications();
  }, []);

  const loadData = async () => {
    const name = await getItem('childName');
    if (name) setChildName(name);

    // Load today's checked items
    const saved = await getItem(todayKey);
    if (saved) {
      setChecked(new Set(saved.split(',').filter(Boolean)));
    }
  };

  const setupNotifications = async () => {
    const asked = await getItem('biokids_notif_asked');
    if (!asked) {
      // Ask for notifications after a short delay
      setTimeout(async () => {
        const token = await registerForPushNotifications();
        if (token) {
          await scheduleProtocolReminders();
        }
        await setItem('biokids_notif_asked', 'true');
      }, 2000);
    }
  };

  const toggleItem = useCallback(async (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // Persist
      setItem(todayKey, Array.from(next).join(','));
      return next;
    });
  }, [todayKey]);

  const toggleExpand = useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Count progress
  const totalItems = dayData.reduce((acc, p) => acc + p.items.length, 0);
  const doneCount = checked.size;
  const pct = totalItems > 0 ? Math.round((doneCount / totalItems) * 100) : 0;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Section data for SectionList
  const sections = dayData.map(period => ({
    title: period.period,
    time: period.time,
    note: period.note,
    data: period.items,
  }));

  const renderItem = ({ item }: { item: DayItem }) => {
    const isDone = checked.has(item.id);
    const isExpanded = expanded.has(item.id);
    const isSig = item.sig;
    const isFeat = item.feat;

    return (
      <View style={[
        styles.itemCard,
        isSig && styles.itemCardSig,
        isFeat && styles.itemCardFeat,
        isDone && styles.itemCardDone,
      ]}>
        <TouchableOpacity
          style={styles.itemHeader}
          onPress={() => toggleItem(item.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkCircle, isDone && styles.checkCircleDone]}>
            {isDone && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <View style={styles.itemContent}>
            <Text style={[styles.itemTitle, isDone && styles.itemTitleDone]}>{item.t}</Text>
            <Text style={styles.itemSub}>{item.sub}</Text>
          </View>
        </TouchableOpacity>

        {/* Expand toggle for science details */}
        <TouchableOpacity style={styles.expandBtn} onPress={() => toggleExpand(item.id)}>
          <Text style={styles.expandText}>{isExpanded ? 'Hide science ▲' : 'Show science ▼'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            {item.gh && (
              <View style={styles.ghBadge}>
                <Text style={styles.ghText}>{item.gh}</Text>
              </View>
            )}
            <Text style={styles.headline}>{item.headline}</Text>

            {item.tip && (
              <View style={styles.tipBox}>
                <Text style={styles.tipLabel}>TIP</Text>
                <Text style={styles.tipText}>{item.tip}</Text>
              </View>
            )}

            {item.pumps && item.pumps.length > 0 && (
              <View style={styles.pumpsContainer}>
                <Text style={styles.pumpsTitle}>WHAT THE RESEARCH FOUND</Text>
                <Text style={styles.researchNote}>From published peer-reviewed studies. Individual results vary.</Text>
                {item.pumps.map((pump, i) => (
                  <View key={i} style={styles.pumpRow}>
                    <Text style={styles.pumpName}>{pump.p}</Text>
                    <Text style={styles.pumpNum}>{pump.n}</Text>
                    <Text style={styles.pumpDesc}>{pump.d}</Text>
                  </View>
                ))}
              </View>
            )}

            {item.foods && item.foods.length > 0 && (
              <View style={styles.foodsContainer}>
                <Text style={styles.pumpsTitle}>FOODS</Text>
                {item.foods.map((food, i) => (
                  <View key={i} style={styles.foodRow}>
                    <Text style={styles.foodName}>{food.f}</Text>
                    <Text style={styles.foodDesc}>{food.d}</Text>
                  </View>
                ))}
              </View>
            )}

            {item.cite && (
              <TouchableOpacity onPress={() => {
                const firstCite = item.cite.split(';')[0].trim();
                const url = citeUrls[firstCite];
                if (url) Linking.openURL(url);
              }}>
                <Text style={styles.citeText}>📄 {item.cite}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderSectionHeader = ({ section }: { section: { title: string; time: string; note?: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionTime}>{section.time}</Text>
      {section.note && <Text style={styles.sectionNote}>{section.note}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top nav */}
      <View style={styles.nav}>
        <View style={styles.logo}>
          <View style={styles.dot} />
          <Text style={styles.logoText}>bioKids</Text>
        </View>
        <View style={styles.navRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.navLink}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.navLink}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Medical disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          For educational purposes only. Not medical advice. Consult your pediatrician before making changes.
        </Text>
      </View>

      {/* Progress header */}
      <View style={styles.progressHeader}>
        <Text style={styles.greeting}>
          {childName ? `${childName}'s Protocol` : "Today's Protocol"}
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.progressText}>{doneCount}/{totalItems} complete · {pct}%</Text>
      </View>

      {/* Protocol list */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  nav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.06)' },
  navRight: { flexDirection: 'row', gap: 16 },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.greenLight, borderWidth: 1, borderColor: C.green, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green },
  logoText: { fontFamily: 'Courier', fontSize: 13, fontWeight: '700', color: C.green, letterSpacing: 0.5 },
  navLink: { fontFamily: 'Courier', fontSize: 12, fontWeight: '500', color: C.textLight },

  disclaimer: { backgroundColor: '#fef3c7', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#fbbf24' },
  disclaimerText: { fontFamily: 'Courier', fontSize: 10, color: '#92400e', textAlign: 'center', lineHeight: 14 },

  progressHeader: { paddingHorizontal: 20, paddingVertical: 16 },
  greeting: { fontFamily: 'Courier', fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 12 },
  progressBarContainer: { height: 6, backgroundColor: C.border, borderRadius: 3, marginBottom: 6 },
  progressBarFill: { height: 6, backgroundColor: C.green, borderRadius: 3 },
  progressText: { fontFamily: 'Courier', fontSize: 12, color: C.textLight },

  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionHeader: { paddingTop: 24, paddingBottom: 8 },
  sectionTitle: { fontFamily: 'Courier', fontSize: 18, fontWeight: '800', color: C.text, marginBottom: 2 },
  sectionTime: { fontFamily: 'Courier', fontSize: 12, color: C.textLight },
  sectionNote: { fontFamily: 'Courier', fontSize: 12, color: C.green, fontWeight: '600', marginTop: 4, lineHeight: 18 },

  itemCard: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: C.border, marginBottom: 10, overflow: 'hidden' },
  itemCardSig: { borderColor: C.green, borderWidth: 2 },
  itemCardFeat: { borderColor: C.green, backgroundColor: C.greenLight },
  itemCardDone: { opacity: 0.7 },

  itemHeader: { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: C.border, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkCircleDone: { backgroundColor: C.green, borderColor: C.green },
  checkMark: { color: '#fff', fontSize: 14, fontWeight: '700' },

  itemContent: { flex: 1 },
  itemTitle: { fontFamily: 'Courier', fontSize: 15, fontWeight: '700', color: C.text, lineHeight: 20 },
  itemTitleDone: { textDecorationLine: 'line-through', color: C.textLight },
  itemSub: { fontFamily: 'Courier', fontSize: 12, color: C.textMuted, lineHeight: 18, marginTop: 2 },

  expandBtn: { paddingHorizontal: 16, paddingBottom: 12 },
  expandText: { fontFamily: 'Courier', fontSize: 11, color: C.green, fontWeight: '600' },

  expandedContent: { paddingHorizontal: 16, paddingBottom: 16, borderTopWidth: 1, borderTopColor: C.border, paddingTop: 12 },
  ghBadge: { backgroundColor: C.greenLight, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  ghText: { fontFamily: 'Courier', fontSize: 12, fontWeight: '700', color: C.green },
  headline: { fontFamily: 'Courier', fontSize: 13, color: C.text, fontWeight: '600', lineHeight: 20, marginBottom: 10 },

  tipBox: { backgroundColor: C.greenLight, borderRadius: 10, padding: 12, marginBottom: 12 },
  tipLabel: { fontFamily: 'Courier', fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1, marginBottom: 4 },
  tipText: { fontFamily: 'Courier', fontSize: 12, color: C.text, lineHeight: 18 },

  pumpsContainer: { marginBottom: 12 },
  pumpsTitle: { fontFamily: 'Courier', fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1, marginBottom: 2 },
  researchNote: { fontFamily: 'Courier', fontSize: 9, color: C.textLighter, lineHeight: 13, marginBottom: 8, fontStyle: 'italic' },
  pumpRow: { flexDirection: 'column', marginBottom: 8, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: C.greenLight },
  pumpName: { fontFamily: 'Courier', fontSize: 12, fontWeight: '700', color: C.text },
  pumpNum: { fontFamily: 'Courier', fontSize: 14, fontWeight: '800', color: C.green },
  pumpDesc: { fontFamily: 'Courier', fontSize: 11, color: C.textMuted, lineHeight: 16 },

  foodsContainer: { marginBottom: 12 },
  foodRow: { marginBottom: 6, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: '#fef3c7' },
  foodName: { fontFamily: 'Courier', fontSize: 12, fontWeight: '600', color: C.text },
  foodDesc: { fontFamily: 'Courier', fontSize: 11, color: C.textMuted, lineHeight: 16 },

  citeText: { fontFamily: 'Courier', fontSize: 10, color: C.green, lineHeight: 16 },
});
