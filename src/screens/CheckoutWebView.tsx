import React, { useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types';
import { WalletService } from '../services/WalletService';

type Props = NativeStackScreenProps<AppStackParamList, 'Checkout'>;

// Very simple stub page hosted as a data URL; replace with your real checkout URL
const makeHtml = (tokens: number, price: number) => `
<!DOCTYPE html><html><body style="font-family:sans-serif">
  <h2>Checkout</h2>
  <p>Buying ${tokens} credits for $${price} (stub)</p>
  <button onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ ok: true }))">
    Pay Now
  </button>
</body></html>`;

const CheckoutWebView: React.FC<Props> = ({ route, navigation }) => {
  const { tokens, price, creditPkr } = route.params;
  const webref = useRef<WebView>(null);

  const onMessage = async (e: any) => {
    try {
      const data = JSON.parse(e.nativeEvent.data);
      if (data?.ok) {
        // Success: credit PKR and add small points reward
        await WalletService.topUpPKR(creditPkr);
        await WalletService.addPoints(Math.floor(price / 5));
        navigation.replace('BuyTokens'); // go back to buy screen
      }
    } catch {}
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
  container:{ flex:1 }
});

export default CheckoutWebView;
