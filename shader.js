// THE VERTEX SHADER, FOLLOWED BY THE FRAGMENT SHADER

let vertexSize = 3;
let vertexShader = `
           attribute vec3 aPos;
           varying   vec3 vPos;
           void main() {
              gl_Position = vec4(aPos, 1.0);
              vPos = aPos;
           }
        `;
let fragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec3 uCursor;
varying vec3 vPos;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
} 

float gain( float x, float k ) 
{
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x), k);
    return (x<0.5)?a:1.0-a;
}


void main(void) {
float x = sin(uTime) * .5 + .5;
    vec3 color = vec3(0.88); //background color

    float magnitude = sqrt(vPos.x * vPos.x + vPos.y * vPos.y);
    float manhattan = abs(vPos.x) + abs(vPos.y); //l1 distance

    if(magnitude < 1.){
          color = vec3(.0);
          color += vec3(1., 0., 1.) * clamp(vPos.y, 0., 1.);
          color += vec3(0., 1., 0.) * -clamp(vPos.y, -1., 0.);
          color += vec3(1., 1., 0.) * clamp(vPos.x, 0., 1.);
          color += vec3(0., 0., .9) * -clamp(vPos.x, -1., 0.);

          vec3 hsv = rgb2hsv(color);
          hsv.y += .2 * magnitude;
          hsv.z /= manhattan;

          
          hsv.y *= sqrt(magnitude);
          
          color = hsv2rgb(hsv);

          color = mix(color, vec3(x * 1.5), 1. - pow(magnitude, 1.5 - x * 1.2));


          // color +=  * vec3(.5);
    }



    gl_FragColor = vec4(sqrt(color), 1.);
}`;
