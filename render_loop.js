setTimeout(() => {
  // INITIALIZE GPU GRAPHICS

  let gl = start_gl(
    canvas1,
    meshData,
    vertexSize,
    vertexShader,
    fragmentShader,
  );

  // PASS UNIFORM letIABLES

  let uTime = gl.getUniformLocation(gl.program, "uTime");
  let uDeltaT = gl.getUniformLocation(gl.program, "uDeltaT");

  //   let uOldTopColor = gl.getUniformLocation(gl.program, "uOldTopColor");
  //   let uOldBottomColor = gl.getUniformLocation(gl.program, "uOldBottomColor");
  //   let uOldLeftColor = gl.getUniformLocation(gl.program, "uOldLeftColor");
  //   let uOldRightColor = gl.getUniformLocation(gl.program, "uOldRightColor");

  let uTopColor = gl.getUniformLocation(gl.program, "uTopColor");
  let uBottomColor = gl.getUniformLocation(gl.program, "uBottomColor");
  let uLeftColor = gl.getUniformLocation(gl.program, "uLeftColor");
  let uRightColor = gl.getUniformLocation(gl.program, "uRightColor");

  // WHEN DID WE START ANIMATING?

  let startTime = Date.now() / 1000;

  // START THE ANIMATION LOOP

  //EVENT HANDLERS

  sync();

  setInterval(() => {
    let current_time = Date.now() / 1000 - startTime;

    // PASS ELAPSED TIME DOWN TO THE GPU

    gl.uniform1f(uTime, current_time);

    // PASS THE CURSOR STATE DOWN TO THE GPU

    // gl.uniform3fv(uCursor, cursor);

    // gl.uniform3fv(uOldTopColor, base_colors[old_qubit_state[0]]);
    // gl.uniform3fv(uOldRightColor, base_colors[old_qubit_state[1]]);
    // gl.uniform3fv(uOldBottomColor, base_colors[old_qubit_state[2]]);
    // gl.uniform3fv(uOldLeftColor, base_colors[old_qubit_state[3]]);

    gl.uniform3fv(uTopColor, base_colors[qubit_state[0]]);
    gl.uniform3fv(uBottomColor, base_colors[qubit_state[1]]);
    gl.uniform3fv(uRightColor, base_colors[qubit_state[2]]);
    gl.uniform3fv(uLeftColor, base_colors[qubit_state[3]]);

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
