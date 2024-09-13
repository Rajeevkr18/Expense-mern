import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, Select, message, Table, DatePicker, Button } from 'antd';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';
import './HomePage.css';

const { RangePicker } = DatePicker;

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelecteddate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  // Function to fetch all transactions
  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      const res = await axios.post('/transections/get-transection', { userid: user._id, frequency, selectedDate, type });
      setAllTransaction(res.data);
    } catch (error) {
      message.error('Fetch issue with Transaction');
    } finally {
      setLoading(false);
    }
  };

  // Handle submit for adding or editing transactions
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);

      if (editable) {
        await axios.post('/transections/edit-transection', {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        message.success('Transaction Updated Successfully');
      } else {
        await axios.post('/transections/add-transection', {
          ...values,
          userid: user._id,
        });
        message.success('Transaction added successfully');
      }

      setShowModal(false);
      setEditable(null);
      fetchTransactions(); // Refetch transactions after edit or add
    } catch (error) {
      message.error('Failed to add or update transaction');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a transaction
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/transections/delete-transection', { transactionId: record._id });
      message.success('Transaction deleted successfully');
      fetchTransactions(); // Refetch transactions after delete
    } catch (error) {
      message.error('Failed to delete transaction');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all transactions on component mount and when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [frequency, selectedDate, type]);

  // Table columns
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Reference', dataIndex: 'reference' },
    {
      title: 'Actions',
      render: (text, record) => (
        <div className="actions">
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            className="action-icon"
          />
          <DeleteOutlined className="mx-2 action-icon" onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div className="filter-item">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)} className="filter-select">
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && (
            <RangePicker value={selectedDate} onChange={(values) => setSelecteddate(values)} className="date-picker" />
          )}
        </div>
        <div className="filter-item">
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)} className="filter-select">
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div className='view-toggle'>
          <UnorderedListOutlined
            className={`view-icon ${viewData === 'table' ? 'active' : ''}`}
            onClick={() => setViewData('table')}
          />
          <AreaChartOutlined
            className={`view-icon ${viewData === 'analytics' ? 'active' : ''}`}
            onClick={() => setViewData('analytics')}
          />
        </div>
        <div>
          <Button type="primary" onClick={() => setShowModal(true)} className="add-button">
            Add New
          </Button>
        </div>
      </div>
      <div className="content">
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction} rowKey="_id" /> : <Analytics allTransaction={allTransaction} />}
      </div>
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null); // Clear editable state when modal is closed
        }}
        footer={null}
        className="transaction-modal"
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable ? { ...editable, date: moment(editable.date) } : {}}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter amount' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select a type' }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter a description' }]}>
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit" className="save-button">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
}

export default HomePage;
