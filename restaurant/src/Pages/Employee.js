import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";
import  { Button, Table, Input, Modal, Dropdown, Menu, Space } from 'antd';
import SideMenu from "./SideMenu";


export default function Employee() {
    const navigate = useNavigate();
    const [filteredInfo, setFilteredInfo] = useState([]);

    const PaySheetDisplay = ({ inventory_items }) => {
        const columns = [
            {
                title: '#',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
            },
            {
                title: 'Employee Name',
                dataIndex: 'employee_name',
                key: 'employee_name',
            },
            {
                title: 'Payment Type',
                dataIndex: 'payment_type',
                key: 'payment_type',
            },
            {
                title: 'Amount Paid',
                dataIndex: 'amount_paid',
                key: 'amount_paid',
            },
            {
                title: 'Payment Date',
                dataIndex: 'payment_date',
                key: 'payment_date',
            },
        ];
    
        const dataSource = inventory_items.map((item, index) => ({
            ...item,
            key: index,
        }));
    
        return (
            <Table
                className='employee-table'
                columns={columns}
                dataSource={dataSource}
                bordered
                title={() => <div className="table-header">Employee Payment Sheet</div>}
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />
        );
    };
    

    return (
        <div class="background-overlay">
            <Space className="Content">
                <SideMenu />
                <Space direction="horizontal" style={{ width: '100%', marginLeft: '40px', marginTop: '20px' }}>
                    <PaySheetDisplay inventory_items={filteredInfo}/>
                </Space>
            </Space>
        </div>
    )
}