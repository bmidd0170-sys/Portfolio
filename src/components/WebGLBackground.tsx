"use client";

import { useEffect, useRef } from "react";
import { mat4, vec3 } from "gl-matrix";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const handleResize = () => {
      setCanvasSize();
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      isDirty = true;
    };

    window.addEventListener('resize', handleResize);

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Vertex Shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(
      vertexShader,
      `
precision mediump float;

uniform mat4 u_mvp;

attribute vec3 a_position;

varying float v_w;

void main(void) {

  vec4 finalPosition = u_mvp * vec4(a_position, 1.0);

  gl_Position = finalPosition;
  v_w = 1.0 / finalPosition.w;

  if (gl_Position.w > 0.0) {
    gl_PointSize = 4.0 / gl_Position.w;
  } else {
    gl_PointSize = 0.0;
  }
}`
    );
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(vertexShader));
    }

    // Fragment Shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(
      fragmentShader,
      `
precision highp float;

varying float v_w;

const vec4 begin = vec4(0.1, 0.75, 1.0, 1.0);
const vec4 end = vec4(1.0, 1.0, 1.0, 1.0);

vec4 interpolate4f(vec4 a,vec4 b, float p) {
  return p * b + (1.0 - p) * a;
}

void main(void) {

  vec2 pc = (gl_PointCoord - 0.5) * 2.0;

  float dist = (1.0 - sqrt(pc.x * pc.x + pc.y * pc.y));
  vec4 color = interpolate4f(begin, end, dist);

  gl_FragColor = vec4(dist, dist, dist, dist * dist * v_w) * color;

}`
    );
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(fragmentShader));
    }

    // Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const attributes = {
      position: gl.getAttribLocation(program, "a_position"),
    };
    const uniforms = {
      mvp: gl.getUniformLocation(program, "u_mvp"),
    };

    // Create points
    const NUM_POINTS = 100000;
    const points = [];
    for (let index = 0; index < NUM_POINTS; index++) {
      points.push((Math.random() - 0.5) * 8);
      points.push((Math.random() - 0.5) * 8);
      points.push((Math.random() - 0.5) * 8);
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(attributes.position);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    // Matrices
    const pMatrix = mat4.create();
    const vMatrix = mat4.create();
    const ivMatrix = mat4.create();
    const mMatrix = mat4.create();
    const mvMatrix = mat4.create();
    const mvpMatrix = mat4.create();
    const position = vec3.create();

    mat4.perspective(
      pMatrix,
      Math.PI * 0.35,
      canvas.width / canvas.height,
      0.01,
      100000.0
    );

    vec3.set(position, 0.0, 0.0, 0.0);

    let angle = 0.0;
    let isDirty = false;
    let frameID: number;


    function render(now: number) {
      if (canvas && (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight)) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        isDirty = true;
      }

      if (isDirty && gl) {
        gl.viewport(0, 0, canvas!.width, canvas!.height);
        mat4.perspective(
          pMatrix,
          Math.PI * 0.35,
          canvas!.width / canvas!.height,
          0.01,
          1000.0
        );
        isDirty = false;
      }

      angle += 0.0005;

      position[2] = Math.sin(now / 50000);

      mat4.identity(vMatrix);
      mat4.translate(vMatrix, vMatrix, position);
      mat4.rotateX(vMatrix, vMatrix, angle);
      mat4.rotateY(vMatrix, vMatrix, angle);
      mat4.rotateZ(vMatrix, vMatrix, angle);

      mat4.invert(ivMatrix, vMatrix);

      mat4.multiply(mvMatrix, ivMatrix, mMatrix);
      mat4.multiply(mvpMatrix, pMatrix, mvMatrix);

      if (gl) {
        gl.uniformMatrix4fv(uniforms.mvp, false, mvpMatrix);
        gl.drawArrays(gl.POINTS, 0, NUM_POINTS);
      }

      frameID = window.requestAnimationFrame(render);
    }

    frameID = window.requestAnimationFrame(render);


    return () => {
      if (frameID) {
        cancelAnimationFrame(frameID);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl-canvas" />;
}
