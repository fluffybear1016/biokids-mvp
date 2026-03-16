import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { C } from '../lib/constants';
import { dayData, citeUrls } from '../lib/protocol-data';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ItemDetail'>;
  route: RouteProp<RootStackParamList, 'ItemDetail'>;
};

export default function ItemDetailScreen({ navigation, route }: Props) {
  const { itemId } = route.params;

  // Find the item across all periods
  const item = dayData.flatMap(p => p.items).find(i => i.id === itemId);
  if (!item) {
    return (
      <SafeAreaView style={s.safe}>
        <Text style={s.notFound}>Item not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.closeBtn}>
          <Text style={s.closeText}>✕ Close</Text>
        </TouchableOpacity>

        <Text style={s.title}>{item.t}</Text>
        <Text style={s.sub}>{item.sub}</Text>

        {item.gh && (
          <View style={s.ghBadge}>
            <Text style={s.ghText}>{item.gh}</Text>
          </View>
        )}

        <Text style={s.headline}>{item.headline}</Text>

        {item.why && (
          <View style={s.whyBox}>
            <Text style={s.whyText}>{item.why}</Text>
          </View>
        )}

        {item.tip && (
          <View style={s.tipBox}>
            <Text style={s.tipLabel}>TIP</Text>
            <Text style={s.tipText}>{item.tip}</Text>
          </View>
        )}

        {item.pumps && item.pumps.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>WHAT THE RESEARCH FOUND</Text>
            <Text style={s.researchNote}>All figures below are from published peer-reviewed studies. Individual results vary.</Text>
            {item.pumps.map((pump, i) => (
              <View key={i} style={s.pumpRow}>
                <View style={s.pumpHeader}>
                  <Text style={s.pumpName}>{pump.p}</Text>
                  <Text style={s.pumpNum}>{pump.n}</Text>
                </View>
                <Text style={s.pumpDesc}>{pump.d}</Text>
              </View>
            ))}
          </View>
        )}

        {item.foods && item.foods.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>FOODS</Text>
            {item.foods.map((food, i) => (
              <View key={i} style={s.foodRow}>
                <Text style={s.foodName}>{food.f}</Text>
                <Text style={s.foodDesc}>{food.d}</Text>
              </View>
            ))}
          </View>
        )}

        {item.cite && (
          <View style={s.citeSection}>
            <Text style={s.sectionTitle}>CITATIONS</Text>
            {item.cite.split(';').map((c, i) => {
              const cite = c.trim();
              const url = citeUrls[cite];
              return (
                <TouchableOpacity key={i} onPress={() => url && Linking.openURL(url)}>
                  <Text style={[s.citeText, url && s.citeLink]}>📄 {cite}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 20, paddingBottom: 60 },
  notFound: { fontFamily: 'Courier', fontSize: 16, color: C.textMuted, textAlign: 'center', marginTop: 60 },
  closeBtn: { marginBottom: 20 },
  closeText: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted },
  title: { fontFamily: 'Courier', fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 6 },
  sub: { fontFamily: 'Courier', fontSize: 14, color: C.textMuted, lineHeight: 22, marginBottom: 16 },
  ghBadge: { backgroundColor: C.greenLight, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 12 },
  ghText: { fontFamily: 'Courier', fontSize: 14, fontWeight: '700', color: C.green },
  headline: { fontFamily: 'Courier', fontSize: 16, fontWeight: '700', color: C.text, lineHeight: 24, marginBottom: 16 },
  whyBox: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: C.border, marginBottom: 16 },
  whyText: { fontFamily: 'Courier', fontSize: 13, color: C.text, lineHeight: 20 },
  tipBox: { backgroundColor: C.greenLight, borderRadius: 10, padding: 14, marginBottom: 16 },
  tipLabel: { fontFamily: 'Courier', fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1, marginBottom: 6 },
  tipText: { fontFamily: 'Courier', fontSize: 13, color: C.text, lineHeight: 20 },
  section: { marginBottom: 16 },
  sectionTitle: { fontFamily: 'Courier', fontSize: 10, fontWeight: '700', color: C.green, letterSpacing: 1.2, marginBottom: 4 },
  researchNote: { fontFamily: 'Courier', fontSize: 10, color: C.textLighter, lineHeight: 14, marginBottom: 10, fontStyle: 'italic' },
  pumpRow: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: C.border },
  pumpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  pumpName: { fontFamily: 'Courier', fontSize: 13, fontWeight: '700', color: C.text, flex: 1 },
  pumpNum: { fontFamily: 'Courier', fontSize: 15, fontWeight: '800', color: C.green },
  pumpDesc: { fontFamily: 'Courier', fontSize: 12, color: C.textMuted, lineHeight: 18 },
  foodRow: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: C.border },
  foodName: { fontFamily: 'Courier', fontSize: 13, fontWeight: '600', color: C.text, marginBottom: 2 },
  foodDesc: { fontFamily: 'Courier', fontSize: 12, color: C.textMuted, lineHeight: 18 },
  citeSection: { marginTop: 8 },
  citeText: { fontFamily: 'Courier', fontSize: 12, color: C.textLight, lineHeight: 20, marginBottom: 4 },
  citeLink: { color: C.green, textDecorationLine: 'underline' },
});
