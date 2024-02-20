<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import * as THREE from "three";
  // @ts-ignore
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  // @ts-ignore
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  /**@type {HTMLElement}*/
  let placeholder;

  onMount(() => {
    const scene = new THREE.Scene();
    const pointLight = new THREE.DirectionalLight(0xffffff, 1);
    // @ts-ignore
    pointLight.position.set(1, 1, 1);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    // @ts-ignore
    camera.position.z = 20;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    placeholder.replaceWith(renderer.domElement);
    camera.add(pointLight);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    const loader = new GLTFLoader();
    loader.load(
      "iphone15/iphone15.gltf",
      function (gltf) {
        scene.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);

      controls.update();

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    animate();
  });
</script>

<div class="renderer" bind:this={placeholder}></div>
