import { PaperProvider } from 'react-native-paper';
import { SolicitudProvider } from './src/context/SolicitudContext';
import AppNavigator from './src/presentation/navigation/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <SolicitudProvider>
        <AppNavigator/>
      </SolicitudProvider>
    </PaperProvider>
  );
}
