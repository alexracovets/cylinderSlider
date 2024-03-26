import { Html, Plane } from "@react-three/drei";
import Slide from "./Slide/Slide";
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import PropTypes from 'prop-types';

Slider.propTypes = {
    setIsSlide: PropTypes.func,
};

import s from './Slider.module.scss';
import { useControls } from "leva";

export default function Slider({ setIsSlide }) {
    const targetRotation = useRef(0);
    const [startX, setStartX] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [animatedValue, setAnimatedValue] = useState(0);
    const [deviceWidth, setDeviceWidth] = useState(0)
    const slidesCount = 6;
    const size = Math.PI * 2 / slidesCount;

    const slides = [
        { image: './image/1.jpg' },
        { image: './image/2.jpg' },
        { image: './image/3.jpg' },
        { image: './image/4.jpg' },
        { image: './image/5.jpg' },
        { image: './image/6.jpg' }
    ];

    const updateActiveSlide = (rotation) => {
        const normalizedRotation = (rotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const slideIndex = slidesCount - Math.round(normalizedRotation / size);
        setActiveSlide(slideIndex % slidesCount);
    };

    const onPointerDown = (e) => {
        e.stopPropagation();
        setDragging(true);
        setStartX(e.clientX);
    };

    const onPointerMove = (e) => {
        e.stopPropagation();
        setIsSlide(true);
        if (!dragging) return;
        const x = e.clientX;
        const intesity = deviceWidth < 720 ? 20 : 100;
        console.log(intesity)
        const diff = (startX - x) / intesity;
        const newRotation = rotation - diff;
        setRotation(newRotation);
        targetRotation.current = newRotation;
        setStartX(x);
    };

    const onPointerUp = (e) => {
        e.stopPropagation();
        setDragging(false);
        setIsSlide(false);
        const finalRotation = Math.round(targetRotation.current / size) * size;
        targetRotation.current = finalRotation;
        updateActiveSlide(finalRotation);
    };

    const animateValue = (start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setAnimatedValue(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        setDeviceWidth(window.innerWidth)
    }, []);

    useEffect(() => {
        const newValue = 60 * (activeSlide + 1);
        animateValue(animatedValue, newValue, 500); // Animate over 500ms
    }, [activeSlide]);

    useFrame(() => {
        const newRotation = rotation + (targetRotation.current - rotation) * 0.1;
        setRotation(newRotation);
        if (!dragging) {
            updateActiveSlide(newRotation);
        }
    });

    const isPlaneVisible = useControls({
        isPlane: false
    })
    return (
        <mesh
            position={[1, 0, -2]}
        >
            <Plane
                args={[8, 9]}
                position={[-5.5, 0, -2]}
                visible={isPlaneVisible.isPlane}
                onPointerLeave={onPointerUp}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            />
            <mesh
                rotation={[0, rotation, 0]}
                position={[-5, 0, -2]}
            >
                {slides.map((item, index) => (
                    <Slide key={index} index={index} image={item.image} size={size} />
                ))}
            </mesh>
            <Html
                as='div'
                wrapperClass={s.count_360}
                position={[-5, -4, 0]}
            >
                <div className={s.wrapper}>
                    <div className={s.number_current}>{animatedValue}°</div>
                    <div className={s.dash_line}></div>
                    <div className={s.number_360}>360°</div>
                </div>
            </Html>
        </mesh>
    );
}
