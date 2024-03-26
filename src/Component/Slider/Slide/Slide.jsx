import { Cylinder } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { BackSide, DoubleSide, FrontSide, TextureLoader } from "three";
import PropTypes from 'prop-types';

Slide.propTypes = {
    index: PropTypes.number,
    image: PropTypes.string,
    size: PropTypes.number
};

export default function Slide({ index, image, size }) {
    const texture = useLoader(TextureLoader, image);
    const borderHeight = 0.01;
    const borderColor = '#F8A86A'
    const args = [3, 3, 5, 60, 1, true, size * index + 2.5 * borderHeight, size - 6 * borderHeight];
    const borderTopArgs = [3, 3, borderHeight, 60, 1, true, size * index + 2 * borderHeight, size - 5 * borderHeight];
    const borderBottomArgs = [3, 3, borderHeight, 60, 1, true, size * index + 2 * borderHeight, size - 5 * borderHeight];
    const borderLeftArgs = [3, 3, 5, 60, 1, true, size * index + 2 * borderHeight, borderHeight / 2];
    const borderRightArgs = [3, 3, 5, 60, 1, true, size * index + size - 3.5 * borderHeight, borderHeight / 2];
    return (
        <>
            <Cylinder args={borderTopArgs} position={[0, (5 + borderHeight) / 2, 0]}>
                <meshBasicMaterial side={DoubleSide} color={borderColor} />
            </Cylinder>
            <Cylinder args={borderBottomArgs} position={[0, -(5 + borderHeight) / 2, 0]}>
                <meshBasicMaterial side={DoubleSide} color={borderColor} />
            </Cylinder>
            <Cylinder args={borderLeftArgs} position={[0, 0, 0]}>
                <meshBasicMaterial side={DoubleSide} color={borderColor} />
            </Cylinder>
            <Cylinder args={borderRightArgs}>
                <meshBasicMaterial side={DoubleSide} color={borderColor} />
            </Cylinder>
            <Cylinder args={args}>
                <meshBasicMaterial attach="material" side={BackSide} color={'#453C41'} />
            </Cylinder>
            <Cylinder args={args}>
                <meshBasicMaterial attach="material" side={FrontSide} map={texture} />
            </Cylinder>
        </>
    );
}
