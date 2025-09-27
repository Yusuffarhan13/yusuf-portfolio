// Holographic Crystal Shader
export const holographicVertexShader = `
  uniform float uTime;
  uniform float uDistortion;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    vec3 pos = position;
    
    // Vertex distortion for organic feel
    float distortion = sin(position.x * 10.0 + uTime) * 0.01;
    distortion += sin(position.y * 10.0 + uTime * 1.3) * 0.01;
    distortion += sin(position.z * 10.0 + uTime * 0.7) * 0.01;
    
    pos += normal * distortion * uDistortion;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const holographicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uFresnelPower;
  uniform float uHologramStrength;
  uniform sampler2D uMatcap;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  vec3 rainbowGradient(float t) {
    vec3 c = vec3(0.0);
    c.r = sin(t * 6.28318 + 0.0) * 0.5 + 0.5;
    c.g = sin(t * 6.28318 + 2.094) * 0.5 + 0.5;
    c.b = sin(t * 6.28318 + 4.188) * 0.5 + 0.5;
    return c;
  }
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel effect
    float fresnel = 1.0 - dot(viewDir, normal);
    fresnel = pow(fresnel, uFresnelPower);
    
    // Animated rainbow effect
    float rainbowOffset = vPosition.y * 0.5 + uTime * 0.2;
    vec3 rainbow = rainbowGradient(fract(rainbowOffset));
    
    // Base color with gradient
    vec3 color = mix(uColor1, uColor2, fresnel);
    
    // Holographic lines
    float lines = sin(vPosition.y * 100.0 + uTime * 2.0) * 0.5 + 0.5;
    lines = pow(lines, 10.0) * uHologramStrength;
    
    // Scanline effect
    float scanline = sin(vPosition.y * 50.0 - uTime * 5.0) * 0.05 + 0.95;
    
    // Mix everything
    color = mix(color, rainbow, fresnel * 0.7);
    color += vec3(lines) * vec3(0.0, 1.0, 1.0);
    color *= scanline;
    
    // Add glow
    color += fresnel * vec3(0.2, 0.5, 1.0) * 0.5;
    
    float alpha = mix(0.8, 1.0, fresnel);
    
    gl_FragColor = vec4(color, alpha);
  }
`;