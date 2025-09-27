// Vertex Shader
export const cosmicVertexShader = `
  uniform float uTime;
  uniform float uMouseX;
  uniform float uMouseY;
  uniform float uIntensity;
  
  attribute float aRandom;
  attribute vec3 aTarget;
  
  varying vec2 vUv;
  varying float vDistance;
  varying float vRandom;
  
  vec3 curl(vec3 p) {
    float e = 0.1;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);
    
    vec3 p_x0 = p - dx;
    vec3 p_x1 = p + dx;
    vec3 p_y0 = p - dy;
    vec3 p_y1 = p + dy;
    vec3 p_z0 = p - dz;
    vec3 p_z1 = p + dz;
    
    float x = sin(p_y1.z + uTime * 0.1) - sin(p_y0.z + uTime * 0.1) - sin(p_z1.y + uTime * 0.1) + sin(p_z0.y + uTime * 0.1);
    float y = sin(p_z1.x + uTime * 0.1) - sin(p_z0.x + uTime * 0.1) - sin(p_x1.z + uTime * 0.1) + sin(p_x0.z + uTime * 0.1);
    float z = sin(p_x1.y + uTime * 0.1) - sin(p_x0.y + uTime * 0.1) - sin(p_y1.x + uTime * 0.1) + sin(p_y0.x + uTime * 0.1);
    
    return normalize(vec3(x, y, z) / (2.0 * e));
  }
  
  void main() {
    vUv = uv;
    vRandom = aRandom;
    
    vec3 pos = position;
    
    // Curl noise for organic movement
    vec3 curlNoise = curl(pos * 0.5 + uTime * 0.05);
    pos += curlNoise * aRandom * uIntensity * 2.0;
    
    // Mouse gravitational effect
    vec2 mouse = vec2(uMouseX, uMouseY) * 2.0 - 1.0;
    vec3 mousePos = vec3(mouse * 10.0, 0.0);
    vec3 toMouse = mousePos - pos;
    float mouseDistance = length(toMouse);
    float mouseForce = 1.0 / (1.0 + mouseDistance * 0.1);
    pos += normalize(toMouse) * mouseForce * 0.5 * uIntensity;
    
    // Morph towards target formations
    pos = mix(pos, aTarget, sin(uTime * 0.2) * 0.5 + 0.5);
    
    // Wave distortion
    pos.z += sin(pos.x * 0.5 + uTime) * 0.2;
    pos.y += cos(pos.x * 0.3 + uTime * 0.5) * 0.1;
    
    vDistance = length(pos - cameraPosition);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (10.0 * aRandom + 5.0) * (300.0 / vDistance) * uIntensity;
  }
`;

// Fragment Shader
export const cosmicFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uOpacity;
  
  varying vec2 vUv;
  varying float vDistance;
  varying float vRandom;
  
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    if(dist > 0.5) discard;
    
    // Create gradient based on random value
    vec3 color = mix(uColor1, uColor2, vRandom);
    color = mix(color, uColor3, sin(uTime * 0.5 + vRandom * 10.0) * 0.5 + 0.5);
    
    // Glowing effect
    float strength = 1.0 - dist * 2.0;
    strength = pow(strength, 3.0);
    
    // Distance fade
    float distanceFade = 1.0 - smoothstep(10.0, 50.0, vDistance);
    
    gl_FragColor = vec4(color, strength * uOpacity * distanceFade);
  }
`;