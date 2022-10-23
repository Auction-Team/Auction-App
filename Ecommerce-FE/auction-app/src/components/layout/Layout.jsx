import React from 'react';
import { Layout } from 'antd';

const { Header ,Content } = Layout;

function PublicLayout(props) {
  return (
    <Layout className="public-layout">
      <Header className="app-header">
        <div className="container">
          <div className="app-logo">
            {/* app-logo */}
          </div>
        </div>
      </Header>
      <Content className="app-content">
        <div className="container">{props.children}</div>
      </Content>
    </Layout>
  );
}

export default PublicLayout;
