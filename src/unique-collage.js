export let config = {
    // Resolution in pixeles, so it fits instagram story size.
    resolution: {
        width: 1080,
        height: 1920
    }
}

const renderCanvas = () => {
    const canvas = document.getElementById('canvas')
    canvas.width = config.resolution.width;
    canvas.height = config.resolution.height;
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
}

export default {
    config
}