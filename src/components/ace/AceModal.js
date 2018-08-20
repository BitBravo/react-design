import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, notification } from 'antd';
import Icon from '../icon/Icon';
import AceEditor from './AceEditor';

notification.config({
    top: 80,
    duration: 1,
});

class AceModal extends Component {
    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func,
        form: PropTypes.any,
    }

    handlers = {
        onOk: () => {
            const { onChange } = this.props;
            const code = this.aceRef.handlers.getCodes();
            onChange(code);
            this.setState({
                visible: false,
                code,
            });
        },
        onCancel: () => {
            this.modalHandlers.onHide();
        },
        onClick: () => {
            this.modalHandlers.onShow();
        },
    }

    modalHandlers = {
        onShow: () => {
            this.setState({
                visible: true,
            });
        },
        onHide: () => {
            this.setState({
                visible: false,
            });
        },
    }

    state = {
        code: this.props.value || { html: '', css: '', js: '' },
        visible: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            code: nextProps.value || { html: '', css: '', js: '' },
        });
    }

    render() {
        const { onOk, onCancel, onClick } = this.handlers;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { code: { html, css, js }, visible } = this.state;
        const label = (
            <React.Fragment>
                <span style={{ marginRight: 8 }}>Code Editor</span>
                <Button onClick={onClick} shape="circle">
                    <Icon name="code" />
                </Button>
            </React.Fragment>
        );
        return (
            <React.Fragment>
                <Form.Item label={label} colon={false}>
                    {
                        getFieldDecorator('code', {
                            rules: [{
                                required: true,
                                message: 'Please input code',
                            }],
                            initialValue: '',
                        })(
                            <span />,
                        )
                    }
                </Form.Item>
                <Form.Item label="HTML" colon={false}>
                    {
                        getFieldDecorator('html', {
                            initialValue: html || '',
                        })(
                            <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>
                                {html}
                            </pre>,
                        )
                    }
                </Form.Item>
                <Form.Item label="CSS" colon={false}>
                    {
                        getFieldDecorator('css', {
                            initialValue: css || '',
                        })(
                            <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>
                                {css}
                            </pre>,
                        )
                    }
                </Form.Item>
                <Form.Item label="JS" colon={false}>
                    {
                        getFieldDecorator('js', {
                            initialValue: js || '',
                        })(
                            <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>
                                {js}
                            </pre>,
                        )
                    }
                </Form.Item>
                <Modal
                    onCancel={onCancel}
                    onOk={onOk}
                    visible={visible}
                    width="80%"
                >
                    <AceEditor ref={(c) => { this.aceRef = c; }} html={html} css={css} js={js} />
                </Modal>
            </React.Fragment>
        );
    }
}

export default AceModal;
