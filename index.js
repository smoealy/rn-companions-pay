import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Register the main app component for Expo
registerRootComponent(App);

// Export default for Snack and other bundlers expecting a root component
export default App;
