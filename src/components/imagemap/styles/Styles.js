import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';

import { FlexBox } from '../../flex';
import StyleList from './StyleList';
import StyleModal from './StyleModal';
import Icon from '../../icon/Icon';

class Styles extends Component {
    handlers = {
        onOk: () => {
            if (this.state.validateTitle.validateStatus === 'error') {
                return;
            }
            if (!this.state.style.title) {
                this.setState({
                    validateTitle: this.handlers.onValid(),
                });
                return;
            }
            if (this.state.current === 'add') {
                if (Object.keys(this.state.style).length === 1) {
                    this.modalRef.validateFields((err, values) => {
                        Object.assign(this.state.style, values);
                    });
                }
                this.props.styles.push(this.state.style);
            } else {
                this.props.styles.splice(this.state.index, 1, this.state.style);
            }
            this.setState({
                visible: false,
                style: {},
            }, () => {
                this.props.onChangeStyles(this.props.styles);
            });
        },
        onCancel: () => {
            this.setState({
                visible: false,
                style: {},
                validateTitle: {
                    validateStatus: '',
                    help: '',
                },
            });
        },
        onAdd: () => {
            this.setState({
                visible: true,
                style: {},
                validateTitle: {
                    validateStatus: '',
                    help: '',
                },
                current: 'add',
            });
        },
        onEdit: (style, index) => {
            this.setState({
                visible: true,
                style,
                validateTitle: {
                    validateStatus: '',
                    help: '',
                },
                current: 'modify',
                index,
            });
        },
        onDelete: (index) => {
            this.props.styles.splice(index, 1);
            this.props.onChangeStyles(this.props.styles);
        },
        onClear: () => {
            this.props.onChangeStyles([]);
        },
        onChange: (props, changedValues, allValues) => {
            const field = Object.keys(changedValues)[0];
            const isTitle = field === 'title';
            if (isTitle) {
                this.setState({
                    validateTitle: this.handlers.onValid(changedValues[field]),
                });
            }
            this.setState({
                style: { title: this.state.style.title, ...allValues },
            });
        },
        onValid: (value) => {
            if (!value || !value.length) {
                return {
                    validateStatus: 'error',
                    help: 'Please input title.',
                };
            }
            const exist = this.props.styles.some(style => style.title === value);
            if (!exist) {
                return {
                    validateStatus: 'success',
                    help: '',
                };
            }
            return {
                validateStatus: 'error',
                help: 'Already exist title.',
            };
        },
    }

    static propTypes = {
        styles: PropTypes.array,
    }

    static defaultProps = {
        styles: [],
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    state = {
        style: {},
        visible: false,
        validateTitle: {
            validateStatus: '',
            help: '',
        },
        current: 'add',
    }

    render() {
        const { styles } = this.props;
        const { visible, style, validateTitle } = this.state;
        const { onOk, onCancel, onAdd, onEdit, onDelete, onClear, onChange, onValid } = this.handlers;
        return (
            <Form>
                <FlexBox flexDirection="column">
                    <FlexBox justifyContent="flex-end" style={{ padding: 8 }}>
                        <Button className="rde-action-btn" shape="circle" onClick={onAdd}>
                            <Icon name="plus" />
                        </Button>
                        <Button className="rde-action-btn" shape="circle" onClick={onClear}>
                            <Icon name="times" />
                        </Button>
                        <StyleModal ref={(c) => { this.modalRef = c; }} validateTitle={validateTitle} visible={visible} onOk={onOk} style={style} onCancel={onCancel} onChange={onChange} onValid={onValid} />
                    </FlexBox>
                    <StyleList styles={styles} onEdit={onEdit} onDelete={onDelete} />
                </FlexBox>
            </Form>
        );
    }
}

export default Styles;
