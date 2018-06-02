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
    // AmbientLight,
    // HemisphereLight,
    // BoxHelper,
    // SkeletonHelper
} from 'three';
import OrbitControls from 'three-orbitcontrols';
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
        this.orbitControls = new OrbitControls(this.camera, this.canvas);
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
        this.stopRenderLoop();
        if (this.statsEnabled) {
            this.stats.begin();
        }
        this.render();
        this.renderAction();
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
        switch (key) {
            case true:
                this.statsEnabled = true;
                this.stats.domElement.style.display = '';
                break;
            case false:
                this.statsEnabled = false;
                this.stats.domElement.style.display = 'none';
                break;
            default:
                break;
        }
    }

    init() {
        // add light
        const light = new DirectionalLight(0xFFFFFF, 1.5);
        light.position.set(0, 140, 500);
        this.scene.add(light);

        /* const hemispehreLight = new HemisphereLight(0xFFFFFF, 0x444444);
        this.scene.add(hemispehreLight); */

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

        this.startRenderLoop();
    }

    handleLoadedGLTF(gltf) {
        let model = gltf.scene;
        let clips, mixer, actions, clock;

        // get animations
        if (gltf.animations) {
            clips = gltf.animations;
            mixer = new AnimationMixer(model);
            actions = clips.map(clip => mixer.clipAction(clip));
            clock = new Clock();
            this.renderAction = function() {
                mixer.update(clock.getDelta());
                this.viewerRender();
            };
            this.primaryLoadClipActions(actions);
        }
        // modify 
        this.scene.add(model);
    }
}

export default ThreeViewer;