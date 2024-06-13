import React, { useState, useEffect } from "react";
import "./Slider.css";

function Slider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);

        return () => clearInterval(slideInterval);
    }, [currentIndex]);

    const previousSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const renderSlide = (slide) => {
        if (slide.type === "image") {
            return <img  className={"slider-img"} src={slide.url} title={slide.title} alt={slide.title} />;
        } else if (slide.type === "html") {
            return slide.content;
        }
        return null;
    };

    return (
        <div className="slider">
            <button onClick={previousSlide} className="slide-btn prev-btn">
                &#10094;
            </button>
            {renderSlide(slides[currentIndex])}
            <button onClick={nextSlide} className="slide-btn next-btn">
                &#10095;
            </button>
        </div>
    );
}

export default Slider;
