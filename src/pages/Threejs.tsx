
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { styled } from "styled-components";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface IGLTF extends GLTF {
  nodes: { [key: string]: THREE.Mesh }
  materials: { [key: string]: THREE.MeshStandardMaterial }
}

export const Threejs: React.FC = () => {
  const { nodes, materials } = useGLTF("/scene.gltf") as IGLTF;

  return (
    <Contain>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Canvas shadows camera={{ position: [-5, 4, 10], fov: 20 }} >
        <Suspense fallback={null}>
          <directionalLight intensity={1} position={[1, 1, -1]} /> {/* [{1:앞, -1:뒤}, {1:위, -1:아래}, {1:왼쪽, -1:오른쪽}] */}
          <ambientLight intensity={1} />
          <group dispose={null}>
            <group scale={0.01}>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.headlight_headlight_signal_lights_0.geometry} material={materials.headlight_signal_lights} />
                <mesh geometry={nodes.headlight_headlight_0.geometry} material={materials.headlight} />
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.body_body_paint_0.geometry} material={materials.body_paint} />
                <mesh geometry={nodes.body_body_plastic_0.geometry} material={materials.body_plastic} />
                <mesh geometry={nodes.body_body_focus_0.geometry} material={materials.body_focus} />
                <mesh geometry={nodes.body_win_0.geometry} material={materials.material} />
                <mesh geometry={nodes.body_win_frame_0.geometry} material={materials.win_frame} />
                <mesh geometry={nodes.body_body_chrome_0.geometry} material={materials.body_chrome} />
                <mesh geometry={nodes.body_mirror_0.geometry} material={materials.mirror} />
                <mesh geometry={nodes.body_body_print_0.geometry} material={materials.body_print} />
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.focus_int_mirror_int_focus_0.geometry} material={materials['mirror_int._focus']} />
                <mesh geometry={nodes.focus_int_tree_0.geometry} material={materials.tree} />
                <mesh geometry={nodes.focus_int_tree_rope_0.geometry} material={materials.tree_rope} />
                <mesh geometry={nodes.focus_int_mirror_int_0.geometry} material={materials['mirror_int.']} />
              </group>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.front_lights_Material001_0.geometry} material={materials['Material.001']} />
                <mesh geometry={nodes.front_lights_alum_0.geometry} material={materials.alum} />
                <mesh geometry={nodes.front_lights_Material013_0.geometry} material={materials['Material.013']} />
                <mesh geometry={nodes.front_lights_Material003_0.geometry} material={materials['Material.003']} />
              </group>
              <group position={[75.477, 33.808, 138.656]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.wheel_FL_tire004_0.geometry} material={materials['tire.004']} />
                <mesh geometry={nodes.wheel_FL_blt004_0.geometry} material={materials['blt.004']} />
                <mesh geometry={nodes.wheel_FL_disk004_0.geometry} material={materials['disk.004']} />
                <mesh geometry={nodes.wheel_FL_disk_paint004_0.geometry} material={materials['disk_paint.004']} />
                <mesh geometry={nodes.wheel_FL_bbs_tex004_0.geometry} material={materials['bbs_tex.004']} />
              </group>
              <group position={[-75.477, 33.808, 138.656]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.wheel_FR_tire002_0.geometry} material={materials['tire.002']} />
                <mesh geometry={nodes.wheel_FR_blt002_0.geometry} material={materials['blt.002']} />
                <mesh geometry={nodes.wheel_FR_disk002_0.geometry} material={materials['disk.002']} />
                <mesh geometry={nodes.wheel_FR_disk_paint002_0.geometry} material={materials['disk_paint.002']} />
                <mesh geometry={nodes.wheel_FR_bbs_tex002_0.geometry} material={materials['bbs_tex.002']} />
              </group>
              <group position={[75.477, 33.808, -141.389]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.wheel_RL_tire003_0.geometry} material={materials['tire.003']} />
                <mesh geometry={nodes.wheel_RL_blt003_0.geometry} material={materials['blt.003']} />
                <mesh geometry={nodes.wheel_RL_disk003_0.geometry} material={materials['disk.003']} />
                <mesh geometry={nodes.wheel_RL_disk_paint003_0.geometry} material={materials['disk_paint.003']} />
                <mesh geometry={nodes.wheel_RL_bbs_tex003_0.geometry} material={materials['bbs_tex.003']} />
              </group>
              <group position={[-76.425, 33.808, -141.389]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.wheel_RR_tire_0.geometry} material={materials.tire} />
                <mesh geometry={nodes.wheel_RR_blt_0.geometry} material={materials.material_35} />
                <mesh geometry={nodes.wheel_RR_disk_0.geometry} material={materials.disk} />
                <mesh geometry={nodes.wheel_RR_disk_paint_0.geometry} material={materials.disk_paint} />
                <mesh geometry={nodes.wheel_RR_bbs_tex_0.geometry} material={materials.bbs_tex} />
              </group>
              <group position={[75.477, 34.287, 139.504]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.brake_RR_disk_brake_tr004_0.geometry} material={materials['disk_brake_tr.004']} />
                <mesh geometry={nodes.brake_RR_disk_brake004_0.geometry} material={materials['disk_brake.004']} />
              </group>
              <group position={[-75.477, 34.287, 139.504]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.brake_RL_disk_brake_tr005_0.geometry} material={materials['disk_brake_tr.005']} />
                <mesh geometry={nodes.brake_RL_disk_brake005_0.geometry} material={materials['disk_brake.005']} />
              </group>
              <group position={[75.477, 34.296, -140.571]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.brake_FR_disk_brake_tr006_0.geometry} material={materials['disk_brake_tr.006']} />
                <mesh geometry={nodes.brake_FR_disk_brake006_0.geometry} material={materials['disk_brake.006']} />
              </group>
              <group position={[-75.477, 34.296, -140.571]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.brake_FL_disk_brake_tr007_0.geometry} material={materials['disk_brake_tr.007']} />
                <mesh geometry={nodes.brake_FL_disk_brake007_0.geometry} material={materials['disk_brake.007']} />
              </group>
              <group position={[0, 37.685, -221.456]} rotation={[2.799, 0, -Math.PI]} scale={[26, 5.6, 5.826]}>
                <mesh geometry={nodes['������������������_����������������_0'].geometry} material={materials.material_47} />
                <mesh geometry={nodes['������������������_number_texture_0'].geometry} material={materials.number_texture} />
              </group>
              <group position={[0, 74.149, 237.505]} rotation={[-0.169, 0, 0]} scale={[26, 5.6, 5.826]}>
                <mesh geometry={nodes['������������������001_����������������001_0'].geometry} material={materials['.001']} />
                <mesh geometry={nodes['������������������001_number_texture001_0'].geometry} material={materials['number_texture.001']} />
              </group>
              <mesh geometry={nodes.logo_bmw_logo_0.geometry} material={materials.bmw_logo} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
              <mesh geometry={nodes['��������������_����������������002_0'].geometry} material={materials['.002']} scale={[0.329, 0.329, 1.228]} />
            </group>
          </group>
          <ContactShadows position={[0, 0, 0]} color="#ff5555" />
          <OrbitControls autoRotate/> 
        </Suspense>
      </Canvas>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Contain>
  );
}


const Contain = styled.div`
    width:100%;
    height:500px;
`


// https://velog.io/@iepppop/react-three.js-적용법
// https://solitary-choi.tistory.com/entry/【React-Three-Fiber】01-시작하기초기-설정-정육면체-렌더링
// https://sbcode.net/react-three-fiber/lights/
// https://velog.io/@9rganizedchaos/Three.js-journey-%EA%B0%95%EC%9D%98%EB%85%B8%ED%8A%B8-14

/*
  01 라이브러리 설치
  yarn add three @react-three/fiber @react-three/drei
  yarn add --dev @types/three 
  @react-spring/three // 애니메이션을 위해서  

  02 useGLTF 타입관련
  https://codesandbox.io/s/react-three-fiber-boilerplate-gltfjsx-typescript-gyn9mg?file=/src/Shoe.tsx:215-345

  03 조명 관련

  ambientLight : 모든 개체들에게 전체적으로 빛을 분다. 빛의 방향이 없기 때문에 그림자도 없다. 
    - intensity={0}
    - 0.1 : 주변광이 상대적으로 적은 양의 빛을 발산하여 전체 조면이 더  어두워진다는 것을 의미한다. 
    - 1 : 중립 강도로 간주되며, 1.0 보다 큰 값은 밝기를 증가시키고, 0.0 ~ 1.0 사이의 값은 밝기를 감소시킨다. 

  directionalLight : 태양광이라고 생각하면 된다. 
    - 그림자를 넣을 수 있는 속성이다.   
    - position={[2, 3, -5]}
      - 내가보는 위치에서 가운데가 영이고, 양수 : 왼쪽으로 한칸씩, 음수는 오른쪽으로 한칸씩
    - 고정위치는 항사 위 이다. 그러나 position을 통해서 위치치를 조절해 줄 수 있다. 
    
  ContactShadows : 대상에 대한 그림자를 생성한다. 
    - position={[0, -0.3, 0]} : 3D를 조절하며 그림자위 위치를 조절할 수 있다. 
    - color="#fff" : 기본 그림자 외의 영역에 대한 색상을 지정할 수 있다.   

  04 OrbitControls 
  - autoRotate : 자동으로 회전하는 속성

  05 Canvas colorManagement
    colorManagement : 렌더링된 장면에 대산 색상 관리를 활성화하기 위한 속성이다.
    다양한 장치 및 색상 공간에서 색상이 정확하고 일관되게 표시되도록 한다. 장면의 색 공간과 출력 장치의 색 공간 간에 색상이 적절하게 변환되도록하여 정확한 색상 표현이 되도록 



*/