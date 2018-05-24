// import * as THREE from 'three';
import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AxesHelper,
    PlaneGeometry,
    Mesh,
    MeshBasicMaterial,
    Color,
    DirectionalLight,
    AnimationMixer,
    Clock,
    HemisphereLight,
    AmbientLight,
    BoxHelper,
    Box3,
    Object3D,
    SkeletonHelper
} from 'three';
import OrbitControls from 'three-orbitcontrols';
import GLTFLoader from 'three-gltf-loader';
import FBXLoader from 'three-fbx-loader';
import Stats from 'stats.js';

const DEG = Math.PI / 180;

class ThreeViewer {
    constructor(props) {
        // initialization
        this.root = props.root;
        this.canvas = props.canvas;
        this.emitter = props.emitter;
        this.renderer = new WebGLRenderer({
            canvas: props.canvas,
            antialias: true,
        });
        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene = new Scene();
        this.framer = null;
        this.orbitControls = new OrbitControls(this.camera);
        this.loader = new GLTFLoader();
        this.loaderOfFBX = new FBXLoader();
        this.stats = new Stats();
        this.state = {};
        this.statsEnabled = true;

        this.camera.position.set(30, 30, 30);
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(0xFFFFFF);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.adaptWindow();
        // listen resizing of window
        this.resizeListener = window.addEventListener('resize', this.adaptWindow);
        this.root.appendChild(this.stats.domElement);
        this.startRenderLoop();

        // add light
        const light = new DirectionalLight(0xFFFFFF, 1.5);
        light.position.set(0, 140, 500);
        this.scene.add(light);

        /* const hemispehreLight = new HemisphereLight(0xFFFFFF, 0x444444);
        this.scene.add(hemispehreLight); */

        const ambientLight = new AmbientLight(0xFFFFFF);
        this.scene.add(ambientLight);

        // base matrix
        const baseMatrix = new Mesh(new PlaneGeometry(100, 100, 20, 20), new MeshBasicMaterial({
            color: new Color('skyblue'),
            wireframe: true,
        }));
        baseMatrix.rotateX(90 * DEG);
        this.scene.add(baseMatrix);

        // more initialization
        // add axes to help observation
        const axes = new AxesHelper(10);
        this.scene.add(axes);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    adaptWindow = () => {
        const { innerWidth, innerHeight } = window;

        this.renderer.setSize(innerWidth, innerHeight);
        this.canvas.style.height = '75vh';
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    startRenderLoop = () => {
        this.stopRenderLoop();
        if (this.statsEnabled) {
            this.stats.begin();
        }
        this.emitter.emit('viewerRendering');
        this.render();
        if (this.statsEnabled) {
            this.stats.end();
        }
        this.framer = requestAnimationFrame(this.startRenderLoop);
    }

    stopRenderLoop() {
        cancelAnimationFrame(this.framer);
    }

    initScene() {
        this.loader.load('./mae/scene.gltf', (gltf) => {
            this.doneLoading(gltf);
        }, (progress) => { }, (err) => { });
    }

    doneLoading(gltf) {
        // clear previous state
        if (this.state.callback) {
            this.emitter.removeListener('viewerRendering', this.state.callback);
            this.state = null;
        }
        let model = gltf.scene;
        let clips = gltf.animations;
        let mixer = new AnimationMixer(model);
        let actions = clips.map((clip) => {
            return mixer.clipAction(clip);
        });
        let clock = new Clock();
        let callback = () => {
            mixer.update(clock.getDelta());
        };
        this.emitter.addListener('viewerRendering', callback);
        this.scene.add(model);
        this.state = { model, clips, mixer, clock, callback };
        // actions are managed by React Component to keep the only source of truth
        this.emitter.emit('viewerPrepared', {
            actions: actions,
        });
    }

    toggleOrbitControls(key) {
        if (key === 'on') {
            this.orbitControls.enabled = true;
        } else if (key === 'off') {
            this.orbitControls.enabled = false;
        }
    }

    toggleStats(key) {
        switch (key) {
            case 'on':
                this.statsEnabled = true;
                this.stats.domElement.style.display = '';
                break;
            case 'off':
                this.statsEnabled = false;
                this.stats.domElement.style.display = 'none';
                break;
        }
    }
}

export default ThreeViewer;