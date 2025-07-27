const scrollTop = () => {
    const scrollStep = -window.scrollY / 20; // Adjust speed
    const smoothScroll = () => {
        if (window.scrollY > 0) {
            window.scrollBy(0, scrollStep);
            requestAnimationFrame(smoothScroll);
        }
    };
    smoothScroll();
}

export default scrollTop;