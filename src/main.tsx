import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes.tsx'
import './index.css'
import { ConfigProvider, theme } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm
    }}>
      <AppRoutes />
    </ConfigProvider>
  </React.StrictMode>,
)
