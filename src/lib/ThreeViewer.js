import { ClipActionStatus } from '../actions/actionTypes';
import { cloneGLTFScene } from './three-clone-gltf';
import createBackground from 'three-vignette-background';

const THREE = window.THREE = require('three');
const Stats = require('stats.js');

console.log(createBackground);

require('three-orbitcontrols');
require('three-gltf-loader');

const {
    WebGLRenderer,
    PerspectiveCamera,
    AxesHelper,
    Color,
    AnimationMixer,
    Clock,
    AmbientLight,
    OrbitControls,
    GridHelper,
    Box3,
    Vector3,
    Scene,
    MeshBasicMaterial,
    AnimationObjectGroup,
} = THREE;

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
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 3;

        this.adaptWindow();
        // listen resizing of window
        this.resizeListener = window.addEventListener('resize', this.adaptWindow);
        // need to remove left
        this.stats.domElement.style.left = '';
        this.stats.domElement.style.right = '0px';
        this.root.appendChild(this.stats.domElement);

        this.primaryLoadClipActions = props.primaryLoadClipActions;
        this.viewerRender = props.viewerRender;
        this.clock = new Clock();
        this.startRenderLoop();

        // add vignette background
        this.vignetteBg = createBackground({
            aspect: this.camera.aspect,
            grainScale: 0.001, // mattdesl/three-vignette-background#1
            colors: ['#ffffff', '#353535'],
        });
        this.scene.add(this.vignetteBg);
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

    toggleGrid(key) {
        if (key) {
            this.grid.visible = true;
        } else {
            this.grid.visible = false;
        }
    }

    init() {
        // add light
        /* const light = new DirectionalLight(0xFFFFFF, 2.5);
        light.position.set(0, 140, 500); */
        // light.visible = false;

        /* const hemispehreLight = new HemisphereLight(0xFFFFFF, 0x444444);
        this.scene.add(hemispehreLight); */

        const ambientLight = new AmbientLight(0x040404);
        this.scene.add(ambientLight);

        // grid
        const grid = new GridHelper(100, 20, 'black', 'skyblue');
        this.scene.add(grid);

        // more initialization
        // add axes to help observation
        const axes = new AxesHelper(10);
        this.scene.add(axes);

        this.axes = axes;
        this.grid = grid;
        // this.light = light;

        this.toggleStats(false);
        this.toggleGrid(false);
        this.toggleAxes(false);

        this.startRenderLoop();
    }

    handleLoadedGLTF(gltf) {
        let model = gltf.scene;
        let group, mirrorModel, clips, mixer, actions = [];

        // clone model
        mirrorModel = cloneGLTFScene(model);
        // adjust position and camera
        this.adjustView(model);
        mirrorModel.position.copy(model.position);

        group = new AnimationObjectGroup();
        group.add(model);
        group.add(mirrorModel);

        if (gltf.animations && gltf.animations.length > 0) {
            clips = gltf.animations;
            mixer = new AnimationMixer(group);
            actions = clips.map(clip => mixer.clipAction(clip));
            // actions
            this.renderAction = function (delta) {
                mixer.update(delta);
                this.viewerRender();
            }
            this.primaryLoadClipActions(actions);
        }
        mirrorModel.visible = true;
        model.visible = true;
        this.scene.add(model);
        this.scene.add(mirrorModel);
        this.currentModel = model;
        this.mirrorModel = mirrorModel;
    }

    adjustView(object) {
        object.updateMatrixWorld();
        const boundingBox = new Box3().setFromObject(object);
        const size = boundingBox.getSize(new Vector3()).length();
        const center = boundingBox.getCenter(new Vector3());

        // reset orbit
        object.position.x += object.position.x - center.x;
        object.position.y += object.position.y - center.y;
        object.position.z += object.position.z - center.z;
        this.orbitControls.maxDistance = size * 10;
        this.camera.position.copy(center);
        this.camera.position.x += size / 1.0;
        this.camera.position.y += size / 1.0;
        this.camera.position.z += size / 1.0;
        this.camera.near = size / 100;
        this.camera.far = size * 100;
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(center);
        object.updateMatrixWorld();
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
        if (prev.gridEnabled !== next.gridEnabled) {
            this.toggleGrid(next.gridEnabled);
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

    inspectorControl(prev, next) {
        if (prev.wireframe !== next.wireframe) {
            if (next.wireframe === 'none') {
                // this.currentModel.visible = true;
                this.mirrorModel.visible = false;
            } else {
                let color = new Color(next.wireframe);
                let mat = new MeshBasicMaterial({
                    wireframe: true,
                    skinning: true,
                    color: color,
                });

                // this.currentModel.visible = false;
                this.mirrorModel.visible = true;
                this.mirrorModel.traverse(child => {
                    if (child.isMesh) {
                        child.material = mat;
                    }
                });
            }
        }
    }

    showWireframe(color) {

    }
}

export default ThreeViewer;