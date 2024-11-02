import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./inventory.css";
import  { Button, Table, Input, Modal, Dropdown, Menu, Space } from 'antd';
import SideMenu from "./SideMenu";


export default function Inventory() {
    const navigate = useNavigate();
    const [filteredInfo, setFilteredInfo] = useState([]);

    const InventoryDisplay = ({ inventory_items }) => {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Item Name',
                dataIndex: 'item_name',
                key: 'item_name',
            },
            {
                title: 'Quantity Purchased',
                dataIndex: 'quantity_purchased',
                key: 'quantity_purchased',
            },
            {
                title: 'Total Price',
                dataIndex: 'total_price',
                key: 'total_price',
            },
            {
                title: 'Purchase Date',
                dataIndex: 'purchase_date',
                key: 'purchase_date',
            },
        ];
    
        const dataSource = inventory_items.map((item, index) => ({
            ...item,
            key: index,
        }));
    
        return (
            <Table
                className='inventory-table'
                columns={columns}
                dataSource={dataSource}
                bordered
                title={() => <div className="table-header">Inventory</div>}
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />
        );
    };
    

    return (
        <div class="background-overlay">
            <Space className="Content">
                <SideMenu />
                <Space direction="horizontal" style={{ width: '100%', marginLeft: '40px', marginTop: '20px' }}>
                    <InventoryDisplay inventory_items={filteredInfo}/>
                </Space>
            </Space>
        </div>
    )
}