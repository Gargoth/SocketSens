<script lang="ts">
	import { onMount } from 'svelte';
	import {
		AmbientLight,
		BoxGeometry,
		DirectionalLight,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera,
		Scene,
		WebGLRenderer
	} from 'three';
	import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

	let w, h;
	let el;

	onMount(() => {
		const scene = new Scene();
		const camera = new PerspectiveCamera(75, w / h, 0.1, 1000);
		const geometry = new BoxGeometry();

		// Load model
		const loader = new GLTFLoader();
		let gltfModel: GLTF;
		loader.load('/145-draft3.glb', (gltf) => {
			gltfModel = gltf;
			scene.add(gltf.scene);
		});
		console.log(loader);

		// Load Lights
		const ambientLight = new AmbientLight();
		const directionalLight = new DirectionalLight();
		directionalLight.position.set(10, 10, 20).normalize();
		scene.add(ambientLight);
		scene.add(directionalLight);

		let renderer = new WebGLRenderer({ antialias: true, canvas: el, alpha: true });
		camera.position.z = 4;

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.minDistance = 2;
		controls.maxDistance = 10;
		controls.target.set(0, 0, -0.2);
		controls.update();

		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};

		const resize = () => {
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};

		window.addEventListener('resize', resize);
		resize();
		animate();
	});
</script>

<div bind:clientWidth={w} bind:clientHeight={h}>
  <canvas bind:this={el} parentWidth={w} parentHeight={h} />
</div>
