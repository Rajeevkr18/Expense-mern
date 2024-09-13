import { Progress, Card, Row, Col, Typography, Divider } from 'antd';
import React from 'react';
import './Analytics.css';

const { Title, Text } = Typography;

function Analytics({ allTransaction }) {
    // Categories
    const categories = ['salary', 'tip', 'project', 'food', 'movie', 'bills', 'medical', 'fee', 'tax'];

    // Total transactions
    const totalTransaction = allTransaction.length;
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === 'income');
    const totalExpenseTransaction = allTransaction.filter(transaction => transaction.type === 'expense');

    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100;

    // Total turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnover = allTransaction
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenseTurnover = allTransaction
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

    return (
        <div className="analytics-container">
            {/* Total Transactions and Turnover Section */}
            <Row gutter={[16, 16]} className="section">
                {/* Total Transactions */}
                <Col xs={24} md={12}>
                    <Card bordered={false} className="shadow card">
                        <Title level={4}>Total Transactions</Title>
                        <Text className="total-value">{totalTransaction}</Text>
                        <Divider />
                        <Row justify="center" align="middle" gutter={[16, 16]}>
                            <Col>
                                <Text className="text-success">Income: {totalIncomeTransaction.length}</Text>
                                <Progress
                                    type="circle"
                                    strokeColor="#52c41a"
                                    percent={totalIncomePercent.toFixed(0)}
                                    width={80}
                                />
                            </Col>
                            <Col>
                                <Text className="text-danger">Expense: {totalExpenseTransaction.length}</Text>
                                <Progress
                                    type="circle"
                                    strokeColor="#ff4d4f"
                                    percent={totalExpensePercent.toFixed(0)}
                                    width={80}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Total Turnover */}
                <Col xs={24} md={12}>
                    <Card bordered={false} className="shadow card">
                        <Title level={4}>Total Turnover</Title>
                        <Text className="total-value">Rs{totalTurnover.toLocaleString()}</Text>
                        <Divider />
                        <Row justify="center" align="middle" gutter={[16, 16]}>
                            <Col>
                                <Text className="text-success">Income: Rs{totalIncomeTurnover.toLocaleString()}</Text>
                                <Progress
                                    type="circle"
                                    strokeColor="#52c41a"
                                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                                    width={80}
                                />
                            </Col>
                            <Col>
                                <Text className="text-danger">Expense: Rs{totalExpenseTurnover.toLocaleString()}</Text>
                                <Progress
                                    type="circle"
                                    strokeColor="#ff4d4f"
                                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                                    width={80}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {/* Categorywise Income and Expense Section */}
            <Row gutter={[16, 16]} className="section">
                {/* Categorywise Income */}
                <Col xs={24} md={12}>
                    <Card bordered={false} className="shadow card">
                        <Title level={4}>Categorywise Income</Title>
                        <div className="scrollable-content">
                            {
                                categories.map(category => {
                                    const amount = allTransaction.filter(transaction => transaction.type === 'income' && transaction.category === category)
                                        .reduce((acc, transaction) => acc + transaction.amount, 0);

                                    return (
                                        amount > 0 && (
                                            <Card key={category} className="category-card">
                                                <Text>{category}</Text>
                                                <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                            </Card>
                                        )
                                    );
                                })
                            }
                        </div>
                    </Card>
                </Col>

                {/* Categorywise Expense */}
                <Col xs={24} md={12}>
                    <Card bordered={false} className="shadow card">
                        <Title level={4}>Categorywise Expense</Title>
                        <div className="scrollable-content">
                            {
                                categories.map(category => {
                                    const amount = allTransaction.filter(transaction => transaction.type === 'expense' && transaction.category === category)
                                        .reduce((acc, transaction) => acc + transaction.amount, 0);

                                    return (
                                        amount > 0 && (
                                            <Card key={category} className="category-card">
                                                <Text>{category}</Text>
                                                <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                                            </Card>
                                        )
                                    );
                                })
                            }
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Analytics;
