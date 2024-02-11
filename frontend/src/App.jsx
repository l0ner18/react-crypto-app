import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Components/Layout/AppHeader';
import AppSider from './Components/Layout/AppSider';
import AppContent from './Components/Layout/AppContent';
import { CryptoContextProvider } from './context/crypto-context';

const App = () => {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  )
}

export default App;
