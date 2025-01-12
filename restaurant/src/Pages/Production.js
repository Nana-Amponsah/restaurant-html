import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Space, Popconfirm, message } from 'antd';
import SideMenu from './SideMenu';
import axios from 'axios';

export default function Production() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchProductionData();
    }, []);

    const fetchProductionData = async () => {
        try {
            // const response = await axios.get('http://localhost:5000/get_production');
            const response = await axios.get('https://tasty-budz-t3xi.onrender.com/get_production');
            const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setData(sortedData);
        } catch (error) {
            message.error('Error fetching data: ' + error.message);
        }
    };

    const handleAddRow = () => {
        const newRow = {
            dish: '',
            ingredients: '',
            portions: '',
            portions_served: '',
            leftovers: '',
            createdAt: new Date().toISOString(),
            editable: true,
        };
        setData([...data, newRow]);
    };

    const handleSaveRow = async (rowIndex) => {
        try {
            const updatedData = data.map((item, index) => {
                if (index === rowIndex) {
                    return { ...item, editable: false };
                }
                return item;
            });
            setData(updatedData);

            // await axios.post('http://localhost:5000/save_production', {
                await axios.post('https://tasty-budz-t3xi.onrender.com/save_production', {
                data: updatedData,
            });

            message.success('Row saved successfully!');
        } catch (error) {
            message.error('Error saving row: ' + error.message);
        }
    };

    const handleRemoveRow = async (rowIndex) => {
        const updatedData = data.filter((_, index) => index !== rowIndex);
        setData(updatedData);
        try {
            // await axios.post('http://localhost:5000/save_production', {
            await axios.post('https://tasty-budz-t3xi.onrender.com/save_production', {
                data: updatedData,
            });
            message.success('Row removed successfully!');
        } catch (error) {
            message.error('Error removing row: ' + error.message);
        }
    };

    const handleInputChange = (value, key, rowIndex) => {
        const updatedData = data.map((item, index) => {
            if (index === rowIndex) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setData(updatedData);
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Dish',
            dataIndex: 'dish',
            key: 'dish',
            render: (text, record, index) =>
                record.editable ? (
                    <Input
                        value={text}
                        onChange={(e) => handleInputChange(e.target.value, 'dish', index)}
                    />
                ) : (
                    text
                ),
        },
        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            key: 'ingredients',
            render: (text, record, index) =>
                record.editable ? (
                    <Input
                        value={text}
                        onChange={(e) => handleInputChange(e.target.value, 'ingredients', index)}
                    />
                ) : (
                    text
                ),
        },
        {
            title: 'Portions',
            dataIndex: 'portions',
            key: 'portions',
            render: (text, record, index) =>
                record.editable ? (
                    <Input
                        value={text}
                        onChange={(e) => handleInputChange(e.target.value, 'portions', index)}
                    />
                ) : (
                    text
                ),
        },
        {
            title: 'Portions Served',
            dataIndex: 'portions_served',
            key: 'portions_served',
            render: (text, record, index) =>
                record.editable ? (
                    <Input
                        value={text}
                        onChange={(e) =>
                            handleInputChange(e.target.value, 'portions_served', index)
                        }
                    />
                ) : (
                    text
                ),
        },
        {
            title: 'Leftovers',
            dataIndex: 'leftovers',
            key: 'leftovers',
            render: (text, record, index) =>
                record.editable ? (
                    <Input
                        value={text}
                        onChange={(e) => handleInputChange(e.target.value, 'leftovers', index)}
                    />
                ) : (
                    text
                ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index) =>
                record.editable ? (
                    <Button
                        style={{ backgroundColor: 'white', borderColor: 'green' }}
                        onClick={() => handleSaveRow(index)}
                    >
                        Save
                    </Button>
                ) : (
                    <Popconfirm
                        title="Are you sure you want to delete this row?"
                        onConfirm={() => handleRemoveRow(index)}
                    >
                        <Button danger>
                            Remove
                        </Button>
                    </Popconfirm>
                ),
        },
    ];

    return (
        <div className="background-overlay">
            <Space className="Content">
                <SideMenu />
                <div style={{ marginLeft: 200, padding: 20 }}>
                    <Table
                        columns={columns}
                        dataSource={data.map((item, index) => ({ ...item, key: index }))}
                        bordered
                        title={() => <div className="table-header">Production Table</div>}
                        pagination={{ pageSize: 10 }}
                    />
                    <Button
                        type="primary"
                        style={{ marginTop: 20 }}
                        onClick={handleAddRow}
                    >
                        Add Row
                    </Button>
                </div>
            </Space>
        </div>
    );
}
