/**
 * @format
 */
import React from "react";
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/components/context/AuthContext';

const MainApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

AppRegistry.registerComponent(appName, () => MainApp);
