import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ConfigProvider, theme } from 'antd';
import LayoutSider from './components/LayoutSider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm
    }}>
      <LayoutSider />
    </ConfigProvider>
  </React.StrictMode>,
)
