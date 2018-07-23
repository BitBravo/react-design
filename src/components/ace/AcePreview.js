import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AcePreview extends Component {
    static propTypes = {
        html: PropTypes.string,
        css: PropTypes.string,
        js: PropTypes.string,
    }

    static defaultProps = {
        html: '',
        css: '',
        js: '',
    }

    componentDidUpdate(prevProps) {
        const { html, css, js } = this.props;
        if (this.container) {
            if (html !== prevProps.html
            || css !== prevProps.css
            || js !== prevProps.js) {
                while (this.container.hasChildNodes()) {
                    this.container.removeChild(this.container.firstChild);
                }
                const iframe = document.createElement('iframe');
                iframe.width = '100%';
                iframe.height = '200px';
                iframe.srcdoc = html + `<script type="text/javascript">'use strict';\n${js}</script>`;
                this.container.appendChild(iframe);
                const style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = css;
                iframe.contentDocument.head.appendChild(style);
            }
        }
    }

    render() {
        return (
            <div ref={(c) => { this.container = c; }} id="code-preview" style={{ width: '100%', height: 200 }} />
        );
    }
}

export default AcePreview;
