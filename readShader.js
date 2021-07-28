export default {
    GL: null,
    getShaderFromScriptID: function (scriptId) {
        // look up the script tag by id.
        let shaderScript = document.getElementById(scriptId);
        if (!shaderScript) {
        throw("*** Error: unknown script element" + scriptId);
        }
        // extract the contents of the script tag.
        return shaderScript.text;
    },
    getShader: function(source, type, typeString) {
        var shader = this.GL.createShader(type);
        this.GL.shaderSource(shader, source);
        this.GL.compileShader(shader);
        if (!this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS)) {
          alert("ERROR IN "+typeString+ " SHADER : " + this.GL.getShaderInfoLog(shader));
          return false;
        }
        return shader;
      },
    compileAndLinkShaders: async function () {
        // let shader_vertex_source=this.getShaderFromScriptID("vertex");
        // let shader_fragment_source=this.getShaderFromScriptID("fragment");
        const shader_fragment_source = await (await fetch("./shader/fragment.glsl")).text();
        const shader_vertex_source = await (await fetch("./shader/vertex.glsl")).text();
        
        let shader_vertex=this.getShader(shader_vertex_source, this.GL.VERTEX_SHADER, "VERTEX");
        let shader_fragment=this.getShader(shader_fragment_source, this.GL.FRAGMENT_SHADER, "FRAGMENT");
    
        let SHADER_PROGRAM=this.GL.createProgram();
        this.GL.attachShader(SHADER_PROGRAM, shader_vertex);
        this.GL.attachShader(SHADER_PROGRAM, shader_fragment);
        this.GL.linkProgram(SHADER_PROGRAM);
        return SHADER_PROGRAM;
    }

}