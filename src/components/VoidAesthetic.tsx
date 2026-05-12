"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const PALETTES = [
  [new THREE.Color(0xff007a), new THREE.Color(0xff5e00), new THREE.Color(0xffd600)],
  [new THREE.Color(0x0f172a), new THREE.Color(0x06b6d4), new THREE.Color(0x8b5cf6)],
  [new THREE.Color(0x064e3b), new THREE.Color(0x10b981), new THREE.Color(0xa3e635)]
];

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  uniform float uTime;
  
  // Simplex 3D Noise 
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
              
      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
      vUv = uv;
      vNormal = normal;
      
      // Displace vertices based on noise to create organic shape
      float noise = snoise(vec3(position.x * 2.0, position.y * 2.0, position.z * 2.0 + uTime * 0.5));
      vec3 newPosition = position + normal * noise * 0.2;
      vPosition = newPosition;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uTime;

  void main() {
      // Create a flowing gradient based on position and time
      float n = sin(vPosition.x * 3.0 + uTime) * cos(vPosition.y * 3.0 - uTime);
      
      // Mix colors based on UV and normal to give a 3D, glossy feel
      float mixRatio1 = smoothstep(-1.0, 1.0, vPosition.y + n * 0.5);
      float mixRatio2 = smoothstep(-1.0, 1.0, vPosition.x + n * 0.5);
      
      vec3 colA = mix(uColor1, uColor2, mixRatio1);
      vec3 finalColor = mix(colA, uColor3, mixRatio2);
      
      // Add fake rim lighting/specular
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = dot(viewDirection, vNormal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);
      
      finalColor += fresnel * 0.3; // subtle white glow on edges

      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function VoidAesthetic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uColor1: { value: THREE.Color };
    uColor2: { value: THREE.Color };
    uColor3: { value: THREE.Color };
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uColor1: { value: PALETTES[0][0].clone() },
      uColor2: { value: PALETTES[0][1].clone() },
      uColor3: { value: PALETTES[0][2].clone() }
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false
    });

    const geometry = new THREE.SphereGeometry(1.2, 128, 128);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    // Mouse interaction state
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Set target rotation based on mouse position
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (uniformsRef.current) {
        uniformsRef.current.uTime.value = elapsedTime;
      }

      // Base rotation + interactive parallax rotation
      mesh.rotation.y += 0.05 * (targetRotationY - mesh.rotation.y) + 0.002;
      mesh.rotation.x += 0.05 * (targetRotationX - mesh.rotation.x) + 0.001;

      const scale = 1.0 + Math.sin(elapsedTime * 2.0) * 0.02;
      mesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (uniformsRef.current) {
      const targetColors = PALETTES[currentIndex];
      
      // Simple animation loop to lerp colors when index changes
      let frame: number;
      const lerpColors = () => {
        if (!uniformsRef.current) return;
        
        uniformsRef.current.uColor1.value.lerp(targetColors[0], 0.05);
        uniformsRef.current.uColor2.value.lerp(targetColors[1], 0.05);
        uniformsRef.current.uColor3.value.lerp(targetColors[2], 0.05);
        
        // Continue lerping until close enough
        frame = requestAnimationFrame(lerpColors);
      };
      
      lerpColors();
      
      // We don't strictly need to cancel this since it just approaches the target, 
      // but it's good practice. We'll let it run or be overridden by the next effect.
      return () => cancelAnimationFrame(frame);
    }
  }, [currentIndex]);

  // Automatically cycle through colors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === PALETTES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full bg-transparent overflow-hidden z-0 pointer-events-none"
    >
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
        style={{
          backgroundImage: 'url(\'data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E\')'
        }}
      />

      {/* Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
    </div>
  );
}
