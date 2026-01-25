import * as THREE from 'three';
import { gsap } from 'gsap';
import TouchTexture from './TouchTexture';
import InteractiveControls from './InteractiveControls';

// Import shaders as raw strings
const vertexShader = `
// @author brunoimbrizi / http://brunoimbrizi.com

precision highp float;

attribute float pindex;
attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute float angle;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;

varying vec2 vPUv;
varying vec2 vUv;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float random(float n) {
  return fract(sin(n) * 43758.5453123);
}

void main() {
  vUv = uv;

  vec2 puv = offset.xy / uTextureSize;
  vPUv = puv;

  vec4 colA = texture2D(uTexture, puv);
  float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;

  vec3 displaced = offset;
  displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
  float rndz = (random(pindex) + snoise(vec2(pindex * 0.1, uTime * 0.1)));
  displaced.z += rndz * (random(pindex) * 2.0 * uDepth);
  displaced.xy -= uTextureSize * 0.5;

  float t = texture2D(uTouch, puv).r;
  displaced.z += t * 20.0 * rndz;
  displaced.x += cos(angle) * t * 20.0 * rndz;
  displaced.y += sin(angle) * t * 20.0 * rndz;

  float psize = (snoise(vec2(uTime, pindex) * 0.5) + 2.0);
  psize *= max(grey, 0.2);
  psize *= uSize;

  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  mvPosition.xyz += position * psize;
  vec4 finalPosition = projectionMatrix * mvPosition;

  gl_Position = finalPosition;
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
  vec4 color = vec4(0.0);
  vec2 uv = vUv;
  vec2 puv = vPUv;

  vec4 colA = texture2D(uTexture, puv);

  float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
  
  // Dim the particles (reduce brightness)
  grey *= 0.5;
  
  vec4 colB = vec4(grey, grey, grey, 1.0);

  float border = 0.3;
  float radius = 0.5;
  float dist = radius - distance(uv, vec2(0.5));
  float t = smoothstep(0.0, border, dist);

  color = colB;
  color.a = t;

  gl_FragColor = color;
}
`;

export default class Particles {
    container: THREE.Object3D;
    texture: THREE.Texture | null = null;
    width: number = 0;
    height: number = 0;
    numPoints: number = 0;
    object3D: THREE.Mesh | null = null;
    hitArea: THREE.Mesh | null = null;
    touch: TouchTexture | null = null;
    interactive: InteractiveControls;
    fovHeight: number = 0;
    private handlerInteractiveMove: ((e: { intersectionData: THREE.Intersection }) => void) | null = null;

    constructor(interactive: InteractiveControls, fovHeight: number) {
        this.container = new THREE.Object3D();
        this.interactive = interactive;
        this.fovHeight = fovHeight;
    }

    init(src: string): Promise<void> {
        return new Promise((resolve) => {
            const loader = new THREE.TextureLoader();

            loader.load(src, (texture) => {
                this.texture = texture;
                this.texture.minFilter = THREE.LinearFilter;
                this.texture.magFilter = THREE.LinearFilter;

                this.width = texture.image.width;
                this.height = texture.image.height;

                this.initPoints(true);
                this.initHitArea();
                this.initTouch();
                this.resize();
                this.show();
                resolve();
            });
        });
    }

    initPoints(discard: boolean): void {
        this.numPoints = this.width * this.height;

        let numVisible = this.numPoints;
        let threshold = 0;
        let originalColors: Float32Array | null = null;

        if (discard) {
            numVisible = 0;
            threshold = 34;

            const img = this.texture!.image as HTMLImageElement;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            canvas.width = this.width;
            canvas.height = this.height;
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, 0, this.width, this.height * -1);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            originalColors = Float32Array.from(imgData.data);

            for (let i = 0; i < this.numPoints; i++) {
                if (originalColors[i * 4 + 0] > threshold) numVisible++;
            }
        }

        const uniforms = {
            uTime: { value: 0 },
            uRandom: { value: 1.0 },
            uDepth: { value: 2.0 },
            uSize: { value: 0.0 },
            uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
            uTexture: { value: this.texture },
            uTouch: { value: null as THREE.Texture | null },
        };

        const material = new THREE.RawShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            depthTest: false,
            transparent: true,
        });

        const geometry = new THREE.InstancedBufferGeometry();

        const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
        positions.setXYZ(0, -0.5, 0.5, 0.0);
        positions.setXYZ(1, 0.5, 0.5, 0.0);
        positions.setXYZ(2, -0.5, -0.5, 0.0);
        positions.setXYZ(3, 0.5, -0.5, 0.0);
        geometry.setAttribute('position', positions);

        const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
        uvs.setXY(0, 0.0, 0.0);
        uvs.setXY(1, 1.0, 0.0);
        uvs.setXY(2, 0.0, 1.0);
        uvs.setXY(3, 1.0, 1.0);
        geometry.setAttribute('uv', uvs);

        geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

        const indices = new Uint16Array(numVisible);
        const offsets = new Float32Array(numVisible * 3);
        const angles = new Float32Array(numVisible);

        for (let i = 0, j = 0; i < this.numPoints; i++) {
            if (discard && originalColors && originalColors[i * 4 + 0] <= threshold) continue;

            offsets[j * 3 + 0] = i % this.width;
            offsets[j * 3 + 1] = Math.floor(i / this.width);

            indices[j] = i;
            angles[j] = Math.random() * Math.PI;

            j++;
        }

        geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1));
        geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3));
        geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1));

        this.object3D = new THREE.Mesh(geometry, material);
        this.container.add(this.object3D);
    }

    initTouch(): void {
        if (!this.touch) this.touch = new TouchTexture();
        (this.object3D!.material as THREE.RawShaderMaterial).uniforms.uTouch.value = this.touch.texture;
    }

    initHitArea(): void {
        const geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            depthTest: false,
        });
        material.visible = false;
        this.hitArea = new THREE.Mesh(geometry, material);
        this.container.add(this.hitArea);
    }

    addListeners(): void {
        this.handlerInteractiveMove = this.onInteractiveMove.bind(this);
        this.interactive.addListener('interactive-move', this.handlerInteractiveMove);
        this.interactive.objects.push(this.hitArea!);
        this.interactive.enable();
    }

    removeListeners(): void {
        if (this.handlerInteractiveMove) {
            this.interactive.removeListener('interactive-move', this.handlerInteractiveMove);
        }
        const index = this.interactive.objects.findIndex((obj) => obj === this.hitArea);
        if (index > -1) this.interactive.objects.splice(index, 1);
    }

    update(delta: number): void {
        if (!this.object3D) return;
        if (this.touch) this.touch.update();

        (this.object3D.material as THREE.RawShaderMaterial).uniforms.uTime.value += delta;
    }

    show(time: number = 1.0): void {
        const material = this.object3D!.material as THREE.RawShaderMaterial;
        gsap.fromTo(material.uniforms.uSize, { value: 0.5 }, { value: 1.5, duration: time });
        gsap.to(material.uniforms.uRandom, { value: 2.0, duration: time });
        gsap.fromTo(material.uniforms.uDepth, { value: 40.0 }, { value: 4.0, duration: time * 1.5 });

        this.addListeners();
    }

    hide(destroy: boolean, time: number = 0.8): Promise<void> {
        return new Promise((resolve) => {
            const material = this.object3D!.material as THREE.RawShaderMaterial;
            gsap.to(material.uniforms.uRandom, {
                value: 5.0,
                duration: time,
                onComplete: () => {
                    if (destroy) this.destroy();
                    resolve();
                },
            });
            gsap.to(material.uniforms.uDepth, { value: -20.0, duration: time, ease: 'power2.in' });
            gsap.to(material.uniforms.uSize, { value: 0.0, duration: time * 0.8 });

            this.removeListeners();
        });
    }

    destroy(): void {
        if (this.object3D) {
            this.object3D.parent?.remove(this.object3D);
            (this.object3D.geometry as THREE.BufferGeometry).dispose();
            (this.object3D.material as THREE.Material).dispose();
            this.object3D = null;
        }

        if (this.hitArea) {
            this.hitArea.parent?.remove(this.hitArea);
            (this.hitArea.geometry as THREE.BufferGeometry).dispose();
            (this.hitArea.material as THREE.Material).dispose();
            this.hitArea = null;
        }
    }

    resize(): void {
        if (!this.object3D) return;

        const scale = this.fovHeight / this.height;
        this.object3D.scale.set(scale, scale, 1);
        this.hitArea?.scale.set(scale, scale, 1);
    }

    setFovHeight(fovHeight: number): void {
        this.fovHeight = fovHeight;
        this.resize();
    }

    onInteractiveMove(e: { intersectionData: THREE.Intersection }): void {
        const uv = e.intersectionData.uv;
        if (this.touch && uv) this.touch.addTouch(uv);
    }
}
