import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import './Layout.css'

const { Header, Content } = Layout;

export default function PublicLayout() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={new Array(25).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
