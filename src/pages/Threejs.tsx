import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { styled } from "styled-components";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

interface IGLTF extends GLTF {
	nodes: { [key: string]: THREE.Mesh };
	materials: { [key: string]: THREE.MeshStandardMaterial };
}

export const Threejs: React.FC = () => {
	const ContainRef = useRef<HTMLDivElement>(null);
	const ContainRef2 = useRef<HTMLDivElement>(null);
	const ContainRef3 = useRef<HTMLDivElement>(null);
	const { nodes, materials } = useGLTF("/models/typeone/scene.gltf") as IGLTF;
	const [spinning, setSpinning] = useState<boolean>(false);

	useEffect(() => {
		if (ContainRef.current) {
			ContainRef.current.style.height = `${window.innerHeight}px`;
		}
		if (ContainRef2.current) {
			ContainRef2.current.style.height = `${window.innerHeight}px`;
		}
		if (ContainRef3.current) {
			ContainRef3.current.style.height = `${window.innerHeight}px`;
		}
	}, [ContainRef, ContainRef3]);

	return (
		<>
			<Contain ref={ContainRef}>
				<TextBox>INNOCAM</TextBox>
				<Button
					onClick={() => {
						if (ContainRef2.current) {
							ContainRef2.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
					}}>
					섹션이동
				</Button>
				<Triangle />
				<Canvas
					shadows
					camera={{ position: [0, 0, 0], fov: 20 }}
					onDoubleClick={() => setSpinning((pre) => !pre)}
					style={{ width: "2500px", margin: "0 auto" }}>
					<Suspense fallback={null}>
						<directionalLight intensity={12} position={[0, 10, 5]} />
						<directionalLight intensity={12} position={[1, 10, 0]} />
						{/* <ambientLight intensity={10} /> */}
						<group dispose={null}>
							<group position={[-0.015, -0.009, 0.063]} rotation={[-Math.PI / 2, 0, 5.5]} scale={0.58}>
								<group position={[0, -0.003, 0.007]}>
									<mesh geometry={nodes.windshield_0.geometry} material={materials.window} />
									<mesh geometry={nodes.windshield_1.geometry} material={materials.plastic} />
								</group>
								<group position={[0, 0, 0.029]}>
									<mesh geometry={nodes.Cylinder000_0.geometry} material={materials.silver} />
									<mesh geometry={nodes.Cylinder000_1.geometry} material={materials.plastic} />
									<mesh geometry={nodes.Cylinder000_2.geometry} material={materials.rubber} />
									<mesh
										geometry={nodes.Cylinder000_3.geometry}
										material={materials["Material.001"]}
									/>
								</group>
								<group position={[0, 0, 0.029]}>
									<mesh geometry={nodes.Cylinder001_0.geometry} material={materials.silver} />
									<mesh geometry={nodes.Cylinder001_1.geometry} material={materials.plastic} />
									<mesh geometry={nodes.Cylinder001_2.geometry} material={materials.rubber} />
									<mesh
										geometry={nodes.Cylinder001_3.geometry}
										material={materials["Material.001"]}
									/>
								</group>
								<mesh geometry={nodes.window_rear_0.geometry} material={materials.window} />
								<mesh
									geometry={nodes.Plane002_0.geometry}
									material={materials.paint}
									position={[-1.053, 3.51, -0.126]}
									rotation={[-1.439, -0.62, 0.775]}
									scale={0.024}
								/>
								<mesh
									geometry={nodes.Plane003_0.geometry}
									material={materials.paint}
									position={[0.436, 3.723, -0.117]}
									rotation={[-1.483, 0.105, 0.803]}
									scale={0.024}
								/>
								<mesh
									geometry={nodes.Plane004_0.geometry}
									material={materials.paint}
									position={[-0.488, 3.684, -0.328]}
									rotation={[-1.415, -0.045, 0.802]}
									scale={0.059}
								/>
								<mesh geometry={nodes.boot_0.geometry} material={materials.full_black} />
								<mesh geometry={nodes.underbody_0.geometry} material={materials.full_black} />
								<mesh
									geometry={nodes.Plane_0.geometry}
									material={materials.Material}
									position={[0, 0, -1.054]}
									scale={[6.953, 9.785, 7.496]}
								/>
								<mesh
									geometry={nodes.Cube001_0.geometry}
									material={materials.plastic}
									position={[0.036, -1.56, 0.333]}
									rotation={[0.709, -0.071, -0.245]}
									scale={[0.014, 0.014, 0.012]}
								/>
								<mesh geometry={nodes.bumper_front004_0.geometry} material={materials.silver} />
								<mesh geometry={nodes.bumper_front004_1.geometry} material={materials.lights} />
								<mesh geometry={nodes.bumper_front004_2.geometry} material={materials.plastic} />
								<mesh
									geometry={nodes.bumper_front007_0.geometry}
									material={materials.glass}
									rotation={[-0.006, 0, 0]}
									scale={1.036}
								/>
								<mesh geometry={nodes.bumper_front009_0.geometry} material={materials.tex_shiny} />
								<mesh geometry={nodes.bumper_front001_0.geometry} material={materials.plastic} />
								<mesh geometry={nodes.bumper_front001_1.geometry} material={materials.silver} />
								<mesh geometry={nodes.bumper_front001_2.geometry} material={materials.lights} />
								<mesh geometry={nodes.bumper_front003_0.geometry} material={materials.plastic} />
								<mesh geometry={nodes.bumper_front003_1.geometry} material={materials.glass} />
								<mesh geometry={nodes.boot001_0.geometry} material={materials.paint} />
								<mesh geometry={nodes.boot002_0.geometry} material={materials.paint} />
								<mesh
									geometry={nodes.Plane001_0.geometry}
									material={materials.tex_shiny}
									position={[0.005, 3.581, 0.107]}
								/>
								<mesh
									geometry={nodes.boot003_0.geometry}
									material={materials.tex_shiny}
									position={[0, 0.003, 0]}
								/>
								<mesh geometry={nodes.boot004_0.geometry} material={materials.window} />
								<mesh geometry={nodes.boot005_0.geometry} material={materials.paint} />
								<mesh geometry={nodes.boot006_0.geometry} material={materials.full_black} />
								<mesh geometry={nodes.window_rear001_0.geometry} material={materials.full_black} />
								<mesh geometry={nodes.boot007_0.geometry} material={materials.logo} />
								<mesh
									geometry={nodes.Plane005_0.geometry}
									material={materials.license}
									position={[0, 3.704, -0.292]}
									rotation={[0.114, 0, 0]}
									scale={[0.393, 0.393, 0.356]}
								/>
								<mesh
									geometry={nodes.Plane006_0.geometry}
									material={materials.license}
									position={[0, -3.75, -0.432]}
									rotation={[0.082, 0, Math.PI]}
									scale={[0.395, 0.395, 0.357]}
								/>
								<mesh geometry={nodes.boot008_0.geometry} material={materials.paint} />
								<mesh geometry={nodes.boot009_0.geometry} material={materials.silver} />
								<mesh geometry={nodes.boot010_0.geometry} material={materials.plastic} />
								<mesh geometry={nodes.boot011_0.geometry} material={materials.coat} />
								<mesh geometry={nodes.boot011_0_1.geometry} material={materials.coat} />
								<mesh
									geometry={nodes.Cube002_0.geometry}
									material={materials.full_black}
									scale={[0.332, 0.318, 0.318]}
								/>
							</group>
						</group>
						<ContactShadows position={[0, 0, 0]} color='#ff5555' />
						<OrbitControls
							autoRotate={spinning}
							maxPolarAngle={Math.PI / 2}
							minPolarAngle={Math.PI / 2}
							minDistance={10}
							maxDistance={20}
							target={[0, 0, 0]}
						/>
					</Suspense>
				</Canvas>
			</Contain>
			<Contain2 ref={ContainRef2}>
				<Triangle2 />
			</Contain2>
			<Contain ref={ContainRef3} />
		</>
	);
};

const Contain = styled.div`
	position: relative;
	background-color: black;
`;

const Contain2 = styled(Contain)`
	background-color: white;
`;

const TextBox = styled.div`
	text-align: center;
	line-height: 350px;
	width: 100%;
	height: 350px;
	font-size: 150px;
	position: absolute;
	color: white;
`;

const Button = styled.button`
	position: absolute;
	color: white;
	background-color: transparent;
	border-radius: 50px;
	border: 1px solid white;
	height: 300px;
	width: 35px;
	text-align: center;
	top: 50%;
	right: 3%;
	transform: translateY(-50%);
	z-index: 10;
`;

const Triangle = styled.div`
	position: absolute;
	z-index: 10;
	bottom: 0;
	width: 0;
	height: 0;
	border-left: 100vw solid transparent; /* 왼쪽 변 */
	border-right: 0 solid transparent; /* 오른쪽 변 */
	border-bottom: 100px solid white; /* 밑변 */
`;

const Triangle2 = styled.div`
	position: absolute;
	bottom: 0;
	width: 0;
	height: 0;
	border-left: 100vw solid transparent; /* 왼쪽 변 */
	border-right: 0 solid transparent; /* 오른쪽 변 */
	border-bottom: 100px solid black; /* 밑변 */
`;

// https://velog.io/@iepppop/react-three.js-적용법
// https://solitary-choi.tistory.com/entry/【React-Three-Fiber】01-시작하기초기-설정-정육면체-렌더링
// https://sbcode.net/react-three-fiber/lights/
// https://velog.io/@9rganizedchaos/Three.js-journey-%EA%B0%95%EC%9D%98%EB%85%B8%ED%8A%B8-14

/*
  00 파일 풀기 : npx gltfjsx scene.gltf
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
    - position={[2, 3, -5]} [{1:앞, -1:뒤}, {1:위, -1:아래}, {1:왼쪽, -1:오른쪽}]
      - 내가보는 위치에서 가운데가 영이고, 양수 : 왼쪽으로 한칸씩, 음수는 오른쪽으로 한칸씩
    - 고정위치는 항사 위 이다. 그러나 position을 통해서 위치치를 조절해 줄 수 있다.

  ContactShadows : 대상에 대한 그림자를 생성한다.
    - position={[0, -0.3, 0]} : 3D를 조절하며 그림자위 위치를 조절할 수 있다.
    - color="#fff" : 기본 그림자 외의 영역에 대한 색상을 지정할 수 있다.

  04 OrbitControls
  - autoRotate : 자동으로 회전하는 속성
  - maxPolarAngle={Math.PI / 2} minPolarAngle={0} 좌우만 동작하도록

  05 Canvas colorManagement
    colorManagement : 렌더링된 장면에 대산 색상 관리를 활성화하기 위한 속성이다.
    다양한 장치 및 색상 공간에서 색상이 정확하고 일관되게 표시되도록 한다. 장면의 색 공간과 출력 장치의 색 공간 간에 색상이 적절하게 변환되도록하여 정확한 색상 표현이 되도록


[-5, 4, 10]
*/
