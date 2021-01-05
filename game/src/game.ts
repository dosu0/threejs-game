import * as three from 'three';

function main() {
    const canvas = <HTMLCanvasElement>document.querySelector('#canvas');

    const renderer = new three.WebGLRenderer({ canvas });

    const fov = 270;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new three.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new three.Scene();
    scene.background = new three.Color(0xffffff);

    // Add a directional light
    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new three.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new three.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function newCube(geometry: three.Geometry, color: number, x: number) {
        const material = new three.MeshPhongMaterial({ color });

        const cube = new three.Mesh(geometry, material);
        cube.position.x = x;
        scene.add(cube);

        return cube;
    }

    const cubes = [
        newCube(geometry, 0x44aa88, 0),
        newCube(geometry, 0x8844aa, -2),
        newCube(geometry, 0xaa8844, 2),
    ];

    function resizeRendererToDisplaySize(renderer: three.WebGLRenderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = (canvas.clientWidth * pixelRatio) | 0;
        const height = (canvas.clientHeight * pixelRatio) | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time: number) {
        // convert time to seconds
        time *= 0.001;

        // Resize aspect ratio accordingly
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, i) => {
            const speed = 1 + i * 0.1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
