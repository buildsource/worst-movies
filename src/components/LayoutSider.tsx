import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, VideoCameraOutlined, HomeOutlined } from '@ant-design/icons';
import Dashboard from '../pages/Dashboard';
import WinnersList from './List/WinnersList';

const { Header, Sider, Content } = Layout;



const AppRoutes: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const getSiderStyle = () => {
    if (collapsed)
      return { marginLeft: -80 };

    return {};
  };


  const selectedKeys = [window.location.pathname === "/movies" ? '2' : '1'];

  return (
    <Router>
      <Layout className="h-screen flex flex-col w-full">
        <Sider trigger={null} collapsible collapsed={collapsed} className="h-full" style={getSiderStyle()}>
          <div className='text-white bg-[#141414] border-none' style={{ padding: 24, flex: 1 }}>{import.meta.env.VITE_NOME_APP}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedKeys} className="h-full bg-[#141414]">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/movies">List Movies</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="flex-grow">
          <Header style={{ padding: 0 }} className='bg-[#141414]'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
              className='text-white bg-[#141414] border-none'
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: isMobile ? 0 : 24, minHeight: 280, flex: 1 }}>
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/movies" element={<WinnersList />} />
            </Routes>

          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
