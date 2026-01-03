export const luxuryEasing = {

    power4: [0.22, 1, 0.36, 1] as const,


    expo: [0.87, 0, 0.13, 1] as const,


    bounce: [0.68, -0.55, 0.27, 1.55] as const,


    smooth: [0.25, 0.1, 0.25, 1] as const,


    spring: [0.43, 0.13, 0.23, 0.96] as const,
};


export const transitions = {

    pageEntry: {
        duration: 0.8,
        ease: luxuryEasing.power4,
    },


    hover: {
        duration: 0.5,
        ease: luxuryEasing.expo,
    },


    micro: {
        duration: 0.3,
        ease: luxuryEasing.smooth,
    },


    spring: {
        type: "spring" as const,
        stiffness: 150,
        damping: 15,
    },


    tilt: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
    },
};

export const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 0.98,
    },
};


export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

export const staggerChild = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: luxuryEasing.power4
        }
    }
};


export const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: luxuryEasing.power4 }
};

export const hoverLift = {
    y: -4,
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    filter: "brightness(1.1)",
};

export const hoverGlow = {
    boxShadow: "0 0 60px hsla(38, 92%, 50%, 0.25)",
};


export const shimmerAnimation = {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
    }
};


export const getMotionPreference = () => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
