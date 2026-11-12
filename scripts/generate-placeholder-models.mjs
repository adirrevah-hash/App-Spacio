// Generates simple procedural GLB boxes used as placeholder 3D models
// until real product models (GLB/USDZ) are uploaded via the admin panel.
import { Document, NodeIO } from "@gltf-transform/core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "models", "placeholders");
fs.mkdirSync(outDir, { recursive: true });

// box dims in meters [width(x), height(y), depth(z)], color as [r,g,b,a] 0..1
const presets = {
  "pergola-frame": {
    color: [0.24, 0.22, 0.2, 1],
    parts: [
      // 4 posts
      ...[
        [-1.4, 1.1, -0.9],
        [1.4, 1.1, -0.9],
        [-1.4, 1.1, 0.9],
        [1.4, 1.1, 0.9],
      ].map((p) => ({ size: [0.1, 2.2, 0.1], pos: p })),
      // top beams (long, along x)
      { size: [3.0, 0.1, 0.12], pos: [0, 2.2, -0.9] },
      { size: [3.0, 0.1, 0.12], pos: [0, 2.2, 0.9] },
      // slats (along z) on top
      ...[-0.9, -0.3, 0.3, 0.9].map((z) => ({
        size: [3.1, 0.06, 0.1],
        pos: [0, 2.28, z],
        rotY: Math.PI / 2,
      })),
    ],
  },
  "kitchen-block": {
    color: [0.16, 0.16, 0.17, 1],
    parts: [
      { size: [2.6, 0.9, 0.65], pos: [0, 0.45, 0] }, // base cabinet
      { size: [2.7, 0.04, 0.7], pos: [0, 0.92, 0] }, // countertop
      { size: [0.5, 0.08, 0.08], pos: [-0.9, 1.05, 0.33] }, // faucet base
      { size: [0.08, 0.3, 0.08], pos: [-0.9, 1.2, 0.33] }, // faucet neck
    ],
  },
  "glass-panel": {
    color: [0.82, 0.88, 0.9, 0.35],
    parts: [{ size: [1.8, 2.1, 0.03], pos: [0, 1.05, 0] }],
    frame: { color: [0.1, 0.1, 0.1, 1] },
  },
  "furniture-chair": {
    color: [0.14, 0.14, 0.15, 1],
    parts: [
      { size: [0.5, 0.06, 0.5], pos: [0, 0.46, 0] }, // seat
      { size: [0.5, 0.5, 0.06], pos: [0, 0.75, -0.22] }, // backrest
      ...[
        [-0.2, -0.2],
        [0.2, -0.2],
        [-0.2, 0.2],
        [0.2, 0.2],
      ].map(([x, z]) => ({ size: [0.05, 0.46, 0.05], pos: [x, 0.23, z] })),
    ],
  },
  "generic-box": {
    color: [0.55, 0.54, 0.52, 1],
    parts: [{ size: [0.6, 0.6, 0.6], pos: [0, 0.3, 0] }],
  },
  "design-object": {
    color: [0.2, 0.19, 0.18, 1],
    parts: [
      { size: [0.3, 0.3, 0.3], pos: [0, 0.15, 0] },
      { size: [0.18, 0.5, 0.18], pos: [0, 0.55, 0] },
      { size: [0.3, 0.05, 0.3], pos: [0, 0.82, 0] },
    ],
  },
};

function addBox(doc, buffer, material, size, pos, rotY = 0) {
  const [sx, sy, sz] = size.map((v) => v / 2);
  // 24 unique vertices (4 per face) for flat-shaded box with correct normals
  const faces = [
    { n: [0, 0, 1], v: [[-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz]] }, // +z
    { n: [0, 0, -1], v: [[sx, -sy, -sz], [-sx, -sy, -sz], [-sx, sy, -sz], [sx, sy, -sz]] }, // -z
    { n: [1, 0, 0], v: [[sx, -sy, sz], [sx, -sy, -sz], [sx, sy, -sz], [sx, sy, sz]] }, // +x
    { n: [-1, 0, 0], v: [[-sx, -sy, -sz], [-sx, -sy, sz], [-sx, sy, sz], [-sx, sy, -sz]] }, // -x
    { n: [0, 1, 0], v: [[-sx, sy, sz], [sx, sy, sz], [sx, sy, -sz], [-sx, sy, -sz]] }, // +y
    { n: [0, -1, 0], v: [[-sx, -sy, -sz], [sx, -sy, -sz], [sx, -sy, sz], [-sx, -sy, sz]] }, // -y
  ];

  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const rotate = ([x, y, z]) => [x * cosY + z * sinY, y, -x * sinY + z * cosY];

  const positions = [];
  const normals = [];
  const indices = [];
  let vi = 0;
  for (const face of faces) {
    const n = rotate(face.n);
    for (const v of face.v) {
      const p = rotate(v);
      positions.push(p[0] + pos[0], p[1] + pos[1], p[2] + pos[2]);
      normals.push(n[0], n[1], n[2]);
    }
    indices.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
    vi += 4;
  }

  const posAccessor = doc
    .createAccessor()
    .setType("VEC3")
    .setArray(new Float32Array(positions))
    .setBuffer(buffer);
  const normAccessor = doc
    .createAccessor()
    .setType("VEC3")
    .setArray(new Float32Array(normals))
    .setBuffer(buffer);
  const idxAccessor = doc
    .createAccessor()
    .setType("SCALAR")
    .setArray(new Uint16Array(indices))
    .setBuffer(buffer);

  const prim = doc
    .createPrimitive()
    .setAttribute("POSITION", posAccessor)
    .setAttribute("NORMAL", normAccessor)
    .setIndices(idxAccessor)
    .setMaterial(material);

  return doc.createMesh().addPrimitive(prim);
}

async function build(name, preset) {
  const doc = new Document();
  const buffer = doc.createBuffer();
  const scene = doc.createScene();

  const material = doc
    .createMaterial(`${name}-material`)
    .setBaseColorFactor(preset.color)
    .setRoughnessFactor(0.75)
    .setMetallicFactor(0.05);
  if (preset.color[3] < 1) {
    material.setAlphaMode("BLEND");
  }

  const root = doc.createNode(name);
  scene.addChild(root);

  for (const part of preset.parts) {
    const mesh = addBox(doc, buffer, material, part.size, part.pos, part.rotY ?? 0);
    const node = doc.createNode().setMesh(mesh);
    root.addChild(node);
  }

  const io = new NodeIO();
  const outPath = path.join(outDir, `${name}.glb`);
  await io.write(outPath, doc);
  console.log("wrote", outPath);
}

for (const [name, preset] of Object.entries(presets)) {
  await build(name, preset);
}
