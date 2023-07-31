//Bulb Animation on top of stages
import * as THREE from 'three'

const grey_color = new THREE.Color(0x57554f);
// //Bulb Animation on top of stages

const box1Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box1Material=new THREE.MeshStandardMaterial({ color: grey_color });

  const stage1Bulb = new THREE.Mesh(box1Geometry, box1Material);
  stage1Bulb.name='bulb1'
  stage1Bulb.position.set(-6.4,4.45,-1.9)


const box2Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box2Material=new THREE.MeshStandardMaterial({ color: grey_color });
const stage2Bulb = new THREE.Mesh(box2Geometry, box2Material);
  stage2Bulb.name='bulb2'
  stage2Bulb.position.set(-4.7,4.45,-1.9)


const box3Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box3Material=new THREE.MeshStandardMaterial({ color: grey_color });
const stage3Bulb = new THREE.Mesh(box3Geometry, box3Material);
  stage3Bulb.name='bulb3'
  stage3Bulb.position.set(-3.1,4.45,-1.9)


const box4Geometry = new THREE.BoxGeometry(.1,.1,.1);
const box4Material=new THREE.MeshStandardMaterial({ color: grey_color });
const stage4Bulb = new THREE.Mesh(box4Geometry, box4Material);
  stage4Bulb.name='bulb4'
  stage4Bulb.position.set(-1.2,4.45,-1.9)
  
export{stage1Bulb,stage2Bulb,stage3Bulb,stage4Bulb}

