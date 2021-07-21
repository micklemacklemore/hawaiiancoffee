export default {
    GL: null,
    getShaderText: function (scriptId) {
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
    compileAndLinkShaders: function () {
        let shader_vertex_source=this.getShaderText("vertex");
        let shader_fragment_source=this.getShaderText("fragment");
        
        let shader_vertex=this.getShader(shader_vertex_source, this.GL.VERTEX_SHADER, "VERTEX");
        let shader_fragment=this.getShader(shader_fragment_source, this.GL.FRAGMENT_SHADER, "FRAGMENT");
    
        let SHADER_PROGRAM=this.GL.createProgram();
        this.GL.attachShader(SHADER_PROGRAM, shader_vertex);
        this.GL.attachShader(SHADER_PROGRAM, shader_fragment);
        this.GL.linkProgram(SHADER_PROGRAM);
        return SHADER_PROGRAM;
    }

}