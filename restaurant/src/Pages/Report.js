import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";
import  { Button, Table, Input, Modal, Dropdown, Menu, Space } from 'antd';
import SideMenu from "./SideMenu";


export default function Report() {
    const navigate = useNavigate();
    const [filteredInfo, setFilteredInfo] = useState([]);

    const ReportDisplay = ({ report_items }) => {
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
    
        const dataSource = report_items.map((item, index) => ({
            ...item,
            key: index,
        }));
    
        return (
            <Table
                className='report-table'
                columns={columns}
                dataSource={dataSource}
                bordered
                title={() => <div className="table-header">Report</div>}
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />
        );
    };
    

    return (
        <div class="background-overlay">
            <Space className="Content">
                <SideMenu />
                <Space direction="horizontal" style={{ width: '100%', marginLeft: '40px', marginTop: '20px' }}>
                    <ReportDisplay report_items={filteredInfo}/>
                </Space>
            </Space>
        </div>
    )
}