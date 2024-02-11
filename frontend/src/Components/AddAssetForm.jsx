import { useRef, useState } from "react";
import { Select, Space, Typography, Flex, Divider, Form, InputNumber, Button, Result } from 'antd';
import { useCrypto } from "../context/crypto-context";

const AddAssetForm = ({ onClose }) => {
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const [form] = Form.useForm();
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();

    if (submitted) {
        return (
            <Result
                status="success"
                title="New asset added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
        )
    }

    if (!coin) return (
        <Select
            style={{ width: '100%' }}
            onSelect={(value) => setCoin(crypto.find(c => c.id === value))}
            placeholder="Select coin"
            options={crypto.map(coin => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon,
            }))}
            optionRender={(option) => (
                <Space>
                    <img src={option.data.icon} alt={option.data.label} style={{ width: 20 }} /> {option.data.label}
                </Space>
            )}
        />
    )

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price
        }
        assetRef.current = newAsset;
        addAsset(newAsset);
        setSubmitted(true);
    }

    const validateMessages = {
        required: "${label} is required",
        types: {
            number: '${label} in not valid number'
        },
        number: {
            range: "${label} must be between ${min} and ${max}"
        }
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    return (
        <>
            <Flex align="center" alt=" ">
                <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
                <Typography.Title level={3} style={{ margin: 0 }}> {coin.name} </Typography.Title>
            </Flex>

            <Divider />

            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    price: +coin.price.toFixed(2),
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item label="Amount" name="amount"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                        },
                    ]}
                >
                    <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Total" name="total">
                    <InputNumber disabled style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Form>


        </>
    )
}

export default AddAssetForm;