#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;
uniform mat3 u_asdf;

// all shaders have a main function
    void main() {

    vec2 pos = (u_asdf * vec3(a_position, 1)).xy;
    //vec2 pos = (mat3(1, 0, 0, 0, 1, 0, 100, 100, 1) * vec3(a_position, 1)).xy;

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = pos / u_resolution;

    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    //gl_Position = vec4(a_position, 0, 1);
}