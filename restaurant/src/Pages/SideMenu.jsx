import { useState } from 'react';
import { Menu, Button } from 'antd';
import { BsFillCartCheckFill } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { BiSolidReport } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BiSolidDish } from "react-icons/bi";
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
        style={{ marginBottom: 13, backgroundColor: '#d49200',
          borderColor: '#d49200'}}
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
            icon: <BsFillCartCheckFill style={{fontSize: 17}} />,
            key: '/inventory'
          },
          {
            label: 'Report',
            icon: <BiSolidReport style={{fontSize: 17}} />,
            key: '/report'
          },
          {
            label: 'Employee Pay Sheet',
            icon: <GiWallet style={{fontSize: 17}} />,
            key: '/employee'
          },
          {
            label: 'Production',
            icon: <BiSolidDish style={{fontSize: 17 }}/>,
            key: '/production'
          },
          {
            label: 'Settings',
            icon: <FiSettings />,
            key: '/settings'
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