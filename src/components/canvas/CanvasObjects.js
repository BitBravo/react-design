import { fabric } from 'fabric';
export default (mergeObjects) => {
    const defaultOptions = {
        action: {},
        tooltip: {
            enabled: true,
        },
        animation: {},
    };
    const fabricObjects = {
        'i-text': {
            create: ({ text, ...option }) => new fabric.IText(text, {
                ...defaultOptions,
                ...option,
            }),
        },
        textbox: {
            create: ({ text, ...option }) => new fabric.Textbox(text, {
                ...defaultOptions,
                ...option,
            }),
        },
        triangle: {
            create: option => new fabric.Triangle({
                ...defaultOptions,
                ...option,
            }),
        },
        circle: {
            create: option => new fabric.Circle({
                ...defaultOptions,
                ...option,
            }),
        },
        rect: {
            create: option => new fabric.Rect({
                ...defaultOptions,
                ...option,
            }),
        },
        image: {
            create: ({ imgElement, ...option }) => new fabric.Image(imgElement, {
                ...defaultOptions,
                ...option,
            }),
        },
        video: {
            create: ({ videoElement, ...option }) => new fabric.Image(videoElement, {
                ...defaultOptions,
                ...option,
            }),
        },
        polygon: {
            create: ({ points, ...option }) => new fabric.Polygon(points, {
                ...defaultOptions,
                ...option,
            }),
        },
        line: {
            create: ({ points, ...option }) => new fabric.Line(points, {
                ...defaultOptions,
                ...option,
            }),
        },
    };
    if (mergeObjects) {
        Object.assign(fabricObjects, defaultOptions, mergeObjects);
    }
    return fabricObjects;
};
