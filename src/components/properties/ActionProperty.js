import React from 'react';
import { Form, Radio, Select, Switch, Input } from 'antd';

export default {
    render(form, data) {
        const { getFieldDecorator } = form;
        const actionType = data.actionType || 'map';
        return (
            <React.Fragment>
                <Form.Item label="Action Enabled" colon={false}>
                    {
                        getFieldDecorator('enabled', {
                            rules: [{
                                required: true,
                                message: 'Please select enabled',
                            }],
                        })(
                            <Switch defaultChecked />,
                        )
                    }
                </Form.Item>
                <Form.Item label="Action Type" colon={false}>
                    {
                        getFieldDecorator('actionType', {
                            rules: [{
                                // required: true,
                                // message: 'Please select icon',
                            }],
                            initialValue: actionType,
                        })(
                            <Radio.Group size="large">
                                <Radio.Button value="map">MAP</Radio.Button>
                                <Radio.Button value="url">URL</Radio.Button>
                            </Radio.Group>,
                        )
                    }
                </Form.Item>
                {
                    actionType === 'map' ? (
                        <Form.Item label="Map Select" colon={false}>
                            {
                                getFieldDecorator('map', {
                                    rules: [{
                                        required: true,
                                        message: 'Please select map',
                                    }],
                                    initialValue: data.map || '1',
                                })(
                                    <Select>
                                        <Select.Option value="1">Map#1</Select.Option>
                                        <Select.Option value="2">Map#2</Select.Option>
                                    </Select>,
                                )
                            }
                        </Form.Item>
                    ) : (
                        <Form.Item label="URL" colon={false}>
                            {
                                getFieldDecorator('url', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input url',
                                    }],
                                    initialValue: data.url || '',
                                })(
                                    <Input />,
                                )
                            }
                        </Form.Item>
                    )
                }
            </React.Fragment>
        );
    },
};
