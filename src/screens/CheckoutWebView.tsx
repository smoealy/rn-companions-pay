import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';
import { WalletService } from '../services/WalletService';

type Props = NativeStackScreenProps<AppStackParamList, 'Checkout'>;

// Simple stub page; replace with your real hosted checkout URL when ready
const makeHtml = (tokens: number, price: number) => `
<!DOCTYPE html><html><body style="font-family:sans-serif">
  <h2>Checkout</h2>
  <p>Buying ${tokens} Ihram Points for $${price} (stub)</p>
  <button onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ ok: true }))">
    Pay Now
  </button>
</body></html>`;

const CheckoutWebView: React.FC<Props> = ({ route, navigation }) => {
  const { tokens, price, creditPkr } = route.params;
  const webref = useRef<WebView>(null);
  const [handled, setHandled] = useState(false); // prevent double handling

  const onMessage = async (e: any) => {
    if (handled) return;
    try {
      const data = JSON.parse(e?.nativeEvent?.data ?? '{}');

      if (data?.ok) {
        setHandled(true);
        // Success: credit PKR and add a small points reward
        await WalletService.topUpPKR(creditPkr);
        await WalletService.addPoints(Math.floor(price / 5));

        Alert.alert('Success', `Purchased ${tokens} Ihram Points`);
        navigation.replace('BuyTokens'); // back to buy screen
      }
    } catch (err) {
      console.warn('Checkout message parse failed:', err);
      Alert.alert('Oops', 'We could not complete the checkout.');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webref}
        originWhitelist={['*']}
        source={{ html: makeHtml(tokens, price) }}
        onMessage={onMessage}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ marginTop: 20 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default CheckoutWebView;
