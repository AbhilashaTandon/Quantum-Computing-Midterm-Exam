// WAIT 100 MSECS BEFORE STARTING UP

setTimeout(() => {
  // INITIALIZE GPU GRAPHICS

  let gl = start_gl(
    canvas1,
    meshData,
    vertexSize,
    vertexShader,
    fragmentShader,
  );

  // PASS UNIFORM VARIABLES

  let uTime = gl.getUniformLocation(gl.program, "uTime");
  let uCursor = gl.getUniformLocation(gl.program, "uCursor");

  // WHEN DID WE START ANIMATING?

  let startTime = Date.now() / 1000;

  // START THE ANIMATION LOOP

  setInterval(() => {
    // PASS ELAPSED TIME DOWN TO THE GPU

    gl.uniform1f(uTime, Date.now() / 1000 - startTime);

    // PASS THE CURSOR STATE DOWN TO THE GPU

    gl.uniform3fv(uCursor, cursor);

    // LOOP THROUGH ALL OF MY SHAPES

    for (let n = 0; n < meshData.length; n++) {
      // PULL OUT THE ACTUAL MESH DATA

      let mesh = meshData[n].mesh;

      // LOAD THAT DATA DOWN INTO THE GPU

      gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);

      // RENDER THAT DATA ACCORDING TO WHAT TYPE IT IS

      gl.drawArrays(
        meshData[n].type ? gl.TRIANGLE_STRIP : gl.TRIANGLES,
        0,
        mesh.length / vertexSize,
      );
    }
  }, 30);
}, 100);
