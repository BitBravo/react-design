import { fabric } from 'fabric';
import uuidv4 from 'uuid/v4';

import { OUT_PORT_TYPE, NODE_COLORS } from '../constant/constants';
import { getEllipsis } from '../configuration/NodeConfiguration';

const Node = fabric.util.createClass(fabric.Group, {
    type: 'node',
    superType: 'node',
    initialize(options) {
        options = options || {};
        const icon = new fabric.IText(options.icon || '\uE174', {
            fontFamily: 'Font Awesome 5 Free',
            fontWeight: 900,
            fontSize: 20,
            fill: 'rgba(255, 255, 255, 0.8)',
        });
        let name = 'Default Node';
        if (options.name) {
            name = getEllipsis(options.name, 18);
        }
        this.label = new fabric.Text(name || 'Default Node', {
            fontSize: 16,
            fontFamily: 'polestar',
            fontWeight: 500,
            fill: 'rgba(255, 255, 255, 0.8)',
        });
        const rect = new fabric.Rect({
            rx: 10,
            ry: 10,
            width: 200,
            height: 40,
            fill: options.fill || 'rgba(0, 0, 0, 0.3)',
            stroke: options.stroke || 'rgba(0, 0, 0, 0)',
            strokeWidth: 2,
        });
        this.errorFlag = new fabric.IText('\uf071', {
            fontFamily: 'Font Awesome 5 Free',
            fontWeight: 900,
            fontSize: 14,
            fill: 'rgba(255, 0, 0, 0.8)',
            visible: options.errors,
        });
        const node = [rect, icon, this.label, this.errorFlag];
        const option = Object.assign({}, options, {
            id: options.id || uuidv4(),
            width: 200,
            height: 40,
            originX: 'left',
            originY: 'top',
            hasRotatingPoint: false,
            hasControls: false,
        });
        this.callSuper('initialize', node, option);
        icon.set({
            top: icon.top + 10,
            left: icon.left + 10,
        });
        this.label.set({
            top: this.label.top + (this.label.height / 2) + 4,
            left: this.label.left + 35,
        });
        this.errorFlag.set({
            left: rect.left,
            top: rect.top,
            visible: options.errors,
        });
    },
    toObject() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            id: this.get('id'),
            name: this.get('name'),
            icon: this.get('icon'),
            description: this.get('description'),
            superType: this.get('superType'),
            configuration: this.get('configuration'),
            nodeClazz: this.get('nodeClazz'),
            descriptor: this.get('descriptor'),
            borderColor: this.get('borderColor'),
            borderScaleFactor: this.get('borderScaleFactor'),
        });
    },
    defaultPortOption() {
        return {
            nodeId: this.id,
            hasBorders: false,
            hasControls: false,
            hasRotatingPoint: false,
            selectable: false,
            originX: 'center',
            originY: 'center',
            lockScalingX: true,
            lockScalingY: true,
            superType: 'port',
            originFill: 'rgba(0, 0, 0, 0.1)',
            hoverFill: 'green',
            errorFill: 'red',
            fill: 'rgba(0, 0, 0, 0.1)',
            hoverCursor: 'pointer',
            strokeWidth: 2,
            stroke: this.descriptor ? NODE_COLORS[this.descriptor.type].border : 'rgba(0, 0, 0, 1)',
            width: 10,
            height: 10,
            links: [],
            enabled: true,
        };
    },
    toPortOption() {
        return {
            ...this.defaultPortOption(),
        };
    },
    fromPortOption() {
        return {
            ...this.defaultPortOption(),
            angle: 45,
        };
    },
    createToPort(left, top) {
        if (this.descriptor.inEnabled) {
            this.toPort = new fabric.Rect({
                id: 'defaultInPort',
                type: 'toPort',
                ...this.toPortOption(),
                left,
                top,
            });
        }
        return this.toPort;
    },
    createFromPort(left, top) {
        if (this.descriptor.outPortType === OUT_PORT_TYPE.BROADCAST) {
            this.fromPort = this.broadcastPort({ ...this.fromPortOption(), left, top });
        } else if (this.descriptor.outPortType === OUT_PORT_TYPE.STATIC) {
            this.fromPort = this.staticPort({ ...this.fromPortOption(), left, top });
        } else if (this.descriptor.outPortType === OUT_PORT_TYPE.DYNAMIC) {
            this.fromPort = this.dynamicPort({ ...this.fromPortOption(), left, top });
        } else {
            this.fromPort = this.singlePort({ ...this.fromPortOption(), left, top });
        }
        return this.fromPort;
    },
    singlePort(portOption) {
        const fromPort = new fabric.Rect({
            id: 'defaultFromPort',
            type: 'fromPort',
            ...portOption,
        });
        return [fromPort];
    },
    staticPort(portOption) {
        return this.descriptor.outPorts.map((outPort, i) => {
            return new fabric.Rect({
                id: outPort,
                type: 'fromPort',
                ...portOption,
                left: portOption.left + (i * 20),
            });
        });
    },
    dynamicPort(portOption) {
        
    },
    broadcastPort(portOption) {
        const fromPort = new fabric.Rect({
            id: 'broadcastFromPort',
            type: 'fromPort',
            ...portOption,
        });
        return [fromPort];
    },
    setErrors(errors) {
        if (errors) {
            this.errorFlag.set({
                visible: true,
            });
        } else {
            this.errorFlag.set({
                visible: false,
            });
        }
    },
    _render(ctx) {
        this.callSuper('_render', ctx);
    },
});

Node.fromObject = function (options, callback) {
    return callback(new Node(options));
};

export default Node;
