import { useState } from 'react';
import { Menu, Button } from 'antd';
import { BsFillCartCheckFill } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function SideMenu() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
};

  return (
    <div className={`side-menu-container ${collapsed ? 'collapsed' : ''}`}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 13 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={(item)=>{
          if(item.key === 'logout') {
            handleLogout();
          } else {
          navigate(item.key)
          }
        }}
        defaultSelectedKeys={['Dashboard-Admin']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={[
          {
            label: 'Inventory',
            icon: <BsFillCartCheckFill />,
            key: '/inventory'
          },
          {
            label: 'Employee Pay Sheet',
            icon: <GiWallet style={{fontSize: 17}} />,
            key: '/employee'
          },
          {
            label: 'Logout',
            icon: <CiLogout style={{fontSize: 17 }} />,
            key: 'logout'
          }
        ]}
      />
    </div>
  );
}