import Shader from "/readShader.js"
import Geometry from "./geometry.js";

var main = function() {
    var CANVAS=document.getElementById("your_canvas");
    CANVAS.width=window.innerWidth;
    CANVAS.height=window.innerHeight;
  
    /*========================= GET WEBGL CONTEXT ========================= */
    var GL;
    try {
      GL = CANVAS.getContext("experimental-webgl", {antialias: true});
    } catch (e) {
      alert("You are not webgl compatible :(") ;
      return false;
    }
    Shader.GL = GL;
    const SHADER_PROGRAM = Shader.compileAndLinkShaders();
  
    const _color = GL.getAttribLocation(SHADER_PROGRAM, "color");
    const _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
  
    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);
  
    GL.useProgram(SHADER_PROGRAM);
  
    /*========================= THE TRIANGLE ========================= */
    //POINTS :
    const triangle_vertex=[
      -1,-1, //first corner: -> bottom left of the viewport
      0,0,1.1, // color
      1,-1, //bottom right of the viewport
      1.1,1.1,0, // color
      0,1,  //top right of the viewport
      1.1,0,0 // color
    ];
  
    const TRIANGLE_VERTEX= GL.createBuffer ();
    GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertex), GL.STATIC_DRAW);
  
    //FACES :
    const triangle_faces = [0,1,2];
    const TRIANGLE_FACES= GL.createBuffer ();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces), GL.STATIC_DRAW);
  
    /*========================= DRAWING ========================= */
    GL.clearColor(0.0, 0.0, 0.0, 0.0);
  
    const draw=function() {
  
      GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
      GL.clear(GL.COLOR_BUFFER_BIT);
  
      GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
  
      GL.vertexAttribPointer(_position, 2, GL.FLOAT, false,4*(2+3),0) ;
      GL.vertexAttribPointer(_color, 3, GL.FLOAT, false,4*(2+3),2*4) ;
  
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
      GL.drawElements(GL.TRIANGLES, 3, GL.UNSIGNED_SHORT, 0);
      GL.flush();
      window.requestAnimationFrame(draw);
    };
  
    draw();
  };

  main();