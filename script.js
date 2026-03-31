// THIS FUNCTION DOES ALL OF THE INITIALIZING FOR THE GPU PROGRAM.

let start_gl = (canvas, meshData, vertexSize, vertexShader, fragmentShader) => {
  // GET THE 3D CONTEXT OF THE CANVAS

  let gl = canvas.getContext("webgl");

  // CREATE A PROGRAM THAT WILL RUN ON THE GPU

  let program = gl.createProgram();
  gl.program = program;

  // THIS IS HOW WE COMPILE AND ATTACH A SHADER TO THE GPU PROGRAM

  let addshader = (type, src) => {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw "Cannot compile shader:\n\n" + gl.getShaderInfoLog(shader);
    gl.attachShader(program, shader);
  };

  // ADD THE VERTEX AND FRAGMENT SHADERS

  addshader(gl.VERTEX_SHADER, vertexShader);
  addshader(gl.FRAGMENT_SHADER, fragmentShader);

  // LINK THE PROGRAM AND REPORT ANY ERRORS

  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw "Could not link the shader program!";
  gl.useProgram(program);

  // DECLARE A PLACE FOR MY VERTICES TO GO DOWN ON THE GPU

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  // PERMIT THE GPU TO RENDER NEARER THINGS IN FRONT OF FARTHER AWAY THINGS

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // SET ANY ONE ATTRIBUTE OF A VERTEX

  let vertexAttribute = (name, size, position) => {
    let attr = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(
      attr,
      size,
      gl.FLOAT,
      false,
      vertexSize * 4,
      position * 4,
    );
  };

  // SET THE POSITION ATTRIBUTE

  vertexAttribute("aPos", 3, 0);

  return gl;
};

// HERE WE ARE SETTING UP HOW THE CANVAS RESPONDS TO MOUSE EVENTS.

let r = canvas1.getBoundingClientRect(),
  cursor = [0, 0, 0];
var complex_number_mouse_loc;
let setCursor = (e, z) => {
  cursor = [
    ((e.clientX - r.left) / canvas1.width) * 2 - 1,
    1 - ((e.clientY - r.top) / canvas1.height) * 2,
    z !== undefined ? z : cursor[2],
  ];
  complex_number_mouse_loc =
    "mouse location: " +
    (cursor[0] * 2 + 0.5).toFixed(3) +
    " + " +
    (cursor[1] + 0.025).toFixed(3) +
    "i"; //add 0.025 to match with center of cursor
};
canvas1.onmousedown = (e) => setCursor(e, 1);
canvas1.onmousemove = (e) => setCursor(e);
canvas1.onmouseup = (e) => setCursor(e, 0);

window.addEventListener("mousemove", () => {
  document.getElementById("mouse_loc").innerHTML = complex_number_mouse_loc;
});

// ALL OF THE 3D MESH SHAPES THAT WE ARE RENDERING (FOR NOW IT'S JUST ONE SHAPE)

let meshData = [
  {
    type: 1,
    mesh: new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]),
  },
];
