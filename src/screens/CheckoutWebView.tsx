import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../types';
import { WalletService } from '../services/WalletService';

type Nav = StackNavigationProp<AppStackParamList, 'Checkout'>;
type Rt  = RouteProp<AppStackParamList, 'Checkout'>;

const makeHtml = (tokens: number, price: number) => `
<!DOCTYPE html><html><body style="font-family:sans-serif">
  <h2>Checkout</h2>
  <p>Buying ${tokens} Ihram Points for $${price} (stub)</p>
  <button onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ ok: true }))">
    Pay Now
  </button>
</body></html>`;

/**
 * Full-screen checkout overlay shown above Tabs
 */
const CheckoutWebView: React.FC<{ navigation: Nav; route: Rt }> = ({ route, navigation }) => {
  const { tokens, price, creditPkr } = route.params;
  const webref = useRef<WebView>(null);
  const [handled, setHandled] = useState(false); // guard against double-submit

  const onMessage = async (e: any) => {
    if (handled) return;
    try {
      const data = JSON.parse(e?.nativeEvent?.data ?? '{}');
      if (data?.ok) {
        setHandled(true);
        await WalletService.topUpPKR(creditPkr);
        await WalletService.addPoints(Math.floor(price / 5));
        Alert.alert('Success', `Purchased ${tokens} Ihram Points`);
        navigation.replace('BuyTokens');
      }
    } catch (err) {
      console.warn('Checkout message parse failed:', err);
      Alert.alert('Oops', 'We could not complete the checkout.');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.container}>
        <WebView
          ref={webref}
          originWhitelist={['*']}
          source={{ html: makeHtml(tokens, price) }}
          onMessage={onMessage}
          startInLoadingState
          renderLoading={() => <ActivityIndicator style={styles.spinner} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  spinner: { marginTop: 20 }
});

export default CheckoutWebView;
