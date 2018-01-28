import React, { Component } from 'react';
import { FlexBox } from '../components/flex';

class Title extends Component {
    render() {
        return (
            <FlexBox style={{ background: 'linear-gradient(141deg,#23303e,#404040 51%,#23303e 75%)' }} flexWrap="wrap" flex="1" alignItems="center">
                <FlexBox style={{ marginLeft: 8 }} flex="0 1 auto">
                    <span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>Design Editor</span>
                </FlexBox>
            </FlexBox>
        );
    }
}

export default Title;
