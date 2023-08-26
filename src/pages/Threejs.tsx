import React, { Suspense, useState, useRef, useEffect, MouseEvent } from "react";
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
	const { nodes, materials } = useGLTF("/models/typeone/scene.gltf") as IGLTF;
	const [spinning, setSpinning] = useState<boolean>(true);

	const onDoubleToggle = (e:MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setSpinning((pre) => !pre)
	}

	useEffect(() => {
		if (ContainRef.current) {
			ContainRef.current.style.height = `${window.innerHeight}px`;
		}
	}, [ContainRef]);

	console.log(!nodes, !materials, nodes, materials)
	if (!nodes && !materials) {
		return <div>로딩 중...</div>
	} else {
		return (
			<>
				<Contain ref={ContainRef}>
					<CustomCanvas
						shadows
						camera={{ position: [0, 0, 0], fov: 6.58 }}
						onDoubleClick={onDoubleToggle}>
						<Suspense fallback={null}>
							<directionalLight intensity={5} position={[0, 10, 5]} />
							<directionalLight intensity={5} position={[1, 5, 0]} />
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
								minDistance={13}
								maxDistance={20}
								target={[0, 0, 0]}
							/>
						</Suspense>
					</CustomCanvas>
				</Contain>
			</>
		);
	}

	
};

const Contain = styled.div`
	position: absolute;
	max-width: 926px;
	width: 64.305%;
	max-height: 300px;
`;

const CustomCanvas = styled(Canvas)`
	width: 100%;
`