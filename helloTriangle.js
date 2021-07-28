import Shader from "/readShader.js";
import Geometry from "./geometry.js";
import Matrix from "./matrix.js"


async function main () {
    var CANVAS=document.getElementById("your_canvas");
    CANVAS.width=window.innerWidth;
    CANVAS.height=window.innerHeight;
  
    /*========================= GET WEBGL CONTEXT ========================= */
    var GL;
    try {
      GL = CANVAS.getContext("webgl2", {antialias: false});
    } catch (e) {
      alert("You are not webgl compatible :(") ;
      return false;
    }
    Shader.GL = GL;
    const SHADER_PROGRAM = await Shader.compileAndLinkShaders();

    // look up where the vertex data needs to go.
    const attr_position = GL.getAttribLocation(SHADER_PROGRAM, "a_position");

    // look up uniform locations
    const u_resolution = GL.getUniformLocation(SHADER_PROGRAM, "u_resolution");
    const u_matrix = GL.getUniformLocation(SHADER_PROGRAM, "u_asdf");
    const u_color = GL.getUniformLocation(SHADER_PROGRAM, "u_color");

    GL.getProgramParameter(SHADER_PROGRAM, GL.GL_ACTIVE_ATTRIBUTE_MAX)
  
    GL.useProgram(SHADER_PROGRAM);

    const positionBuffer = GL.createBuffer();

    // vertex array object
    const vao = GL.createVertexArray();
    GL.bindVertexArray(vao);

    GL.enableVertexAttribArray(attr_position);
    GL.bindBuffer(GL.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2;          // 2 components per iteration
    const type = GL.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    GL.vertexAttribPointer(attr_position, size, type, normalize, stride, offset);
  
    /*========================= THE RECTANGLE ========================= */
    //POINTS :
    
    function setRectangle(gl) {
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          0, 150,
          150, 0,
          150,  150,
      ]), gl.STATIC_DRAW);
    }
    function setF(gl) {
      gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([
              // left column
              0, 0,
              30, 0,
              0, 150,
              0, 150,
              30, 0,
              30, 150,
    
              // top rung
              30, 0,
              100, 0,
              30, 30,
              30, 30,
              100, 0,
              100, 30,
    
              // middle rung
              30, 60,
              67, 60,
              30, 90,
              30, 90,
              67, 60,
              67, 90,
          ]),
          gl.STATIC_DRAW);
    }
  
    /*========================= DRAWING ========================= */
  
    const draw=function() {
    
        // Clear the canvas
      GL.clearColor(0, 0, 0, 0);
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

      // Bind the attribute/buffer set we want.
      GL.bindVertexArray(vao);

      // Pass in the canvas resolution so we can convert from
      // pixels to clipspace in the shader
      GL.uniform2f(u_resolution, CANVAS.width, CANVAS.height);

      // Update the position buffer with rectangle positions
      GL.bindBuffer(GL.ARRAY_BUFFER, positionBuffer);
      setF(GL);
      const color = [Math.random(), Math.random(), Math.random(), 1];
      var transformMatrix = Matrix.mat3.multiply(Matrix.mat3.translate(100, 100), Matrix.mat3.scale(1, 1));
      console.log();
      console.log(u_color);
      GL.uniformMatrix3fv(u_matrix, false, transformMatrix);
      // 1, 0, 0,
      // 0, 1, 0, 
      // 100, 100, 1
      //

      // Set a random color.
      GL.uniform4fv(u_color, color);

      // Draw the rectangle.
      GL.drawArrays(GL.TRIANGLES, 0, 18);
    };

    draw();
}
  main();