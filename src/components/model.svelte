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
		camera.position.set(10, 75, 10);

		// Load model
		const loader = new GLTFLoader();
		let gltfModel;
		loader.load('/SocketSens.glb', (gltf) => {
			gltfModel = gltf;
			gltf.scene.scale.set(10 * gltf.scene.scale.x, 10 * gltf.scene.scale.y, 10 * gltf.scene.scale.z);
			gltf.scene.position.set(-3 + gltf.scene.position.x, gltf.scene.position.y, 9.5 + gltf.scene.position.z);
			scene.add(gltf.scene);
		});

		// Load Lights
		const ambientLight = new AmbientLight();
		const directionalLight = new DirectionalLight();
		directionalLight.position.set(10, 10, 20).normalize();
		scene.add(ambientLight);
		scene.add(directionalLight);

		const renderer = new WebGLRenderer({ antialias: true, canvas: el, alpha: true });
		renderer.setSize(w, h);
		camera.position.z = 4;

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.minDistance = 2;
		controls.maxDistance = 10;
		controls.target.set(0, 1, 2.5);
		controls.update();

		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};

		const resize = () => {
			w = el.clientWidth;
			h = el.clientHeight;
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};

		window.addEventListener('resize', resize);
		resize();
		animate();
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
		position: relative;
	}
	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<canvas bind:this={el} />
</div>