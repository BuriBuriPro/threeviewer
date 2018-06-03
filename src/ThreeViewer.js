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
    SkeletonHelper,
    HemisphereLight
} from 'three'; // AmbientLight, // HemisphereLight, // BoxHelper, // SkeletonHelper
import OrbitControls from 'three-orbitcontrols';
import Stats from 'stats.js';
import { ClipActionStatus } from './actions/actionTypes';

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
        this.orbitControls = new OrbitControls(this.camera, this.canvas);
        this.orbitControls.enableKeys = false;
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

        this.primaryLoadClipActions = props.primaryLoadClipActions;
        this.viewerRender = props.viewerRender;
        this.clock = new Clock();
        this.startRenderLoop();
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
        let delta = this.clock.getDelta();

        this.stopRenderLoop();
        if (this.statsEnabled) {
            this.stats.begin();
        }
        this.orbitControls.update(delta);
        this.render();
        this.renderAction(delta);
        if (this.statsEnabled) {
            this.stats.end();
        }
        this.framer = requestAnimationFrame(this.startRenderLoop);
    }

    stopRenderLoop() {
        cancelAnimationFrame(this.framer);
    }

    renderAction() {

    }

    toggleOrbitControls(key) {
        this.orbitControls.enabled = key;
    }

    toggleStats(key) {
        if (key) {
            this.statsEnabled = true;
            this.stats.domElement.style.display = '';
        } else {
            this.statsEnabled = false;
            this.stats.domElement.style.display = 'none';
        }
    }

    toggleAxes(key) {
        if (key) {
            this.axes.visible = true;
        } else {
            this.axes.visible = false;
        }
    }

    toggleBaseMatrix(key) {
        if (key) {
            this.baseMatrix.visible = true;
        } else {
            this.baseMatrix.visible = false;
        }
    }

    init() {
        // add light
        const light = new DirectionalLight(0xFFFFFF, 2.5);
        light.position.set(0, 140, 500);

        const hemispehreLight = new HemisphereLight(0xFFFFFF, 0x444444);
        this.scene.add(hemispehreLight);

        /* const ambientLight = new AmbientLight(0xFFFFFF);
        this.scene.add(ambientLight); */

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

        this.axes = axes;
        this.baseMatrix = baseMatrix;
        this.light = light;

        this.startRenderLoop();
    }

    handleLoadedGLTF(gltf) {
        let model = gltf.scene;
        let clips, mixer, actions, skeleton;

        // get animations
        if (gltf.animations) {
            clips = gltf.animations;
            mixer = new AnimationMixer(model);
            actions = clips.map(clip => mixer.clipAction(clip));
            this.renderAction = function (delta) {
                mixer.update(delta);
                this.viewerRender();
            };
            this.primaryLoadClipActions(actions);
        }
        skeleton = new SkeletonHelper(model);
        skeleton.visible = false;
        this.scene.add(skeleton);
        // modify 
        this.scene.add(model);
    }

    updateConfig(prev, next) {
        if (prev.orbitCtrlEnabled !== next.orbitCtrlEnabled) {
            this.toggleOrbitControls(next.orbitCtrlEnabled);
        }
        if (prev.statsEnabled !== next.statsEnabled) {
            this.toggleStats(next.statsEnabled);
        }
        if (prev.axesEnabled !== next.axesEnabled) {
            this.toggleAxes(next.axesEnabled);
        }
        if (prev.baseMatrixEnabled !== next.baseMatrixEnabled) {
            this.toggleBaseMatrix(next.baseMatrixEnabled);
        }
    }

    controlAction(prev, next, action) {
        if (prev.status !== next.status) {
            switch (next.status) {
                case ClipActionStatus.PLAY:
                    if (action.paused) {
                        action.paused = false;
                    }
                    action.play();
                    break;
                case ClipActionStatus.PAUSE:
                    action.paused = true;
                    break;
                case ClipActionStatus.STOP:
                    action.stop();
                    break;
                default:
                    break;
            }
        }
    }
}

export default ThreeViewer;