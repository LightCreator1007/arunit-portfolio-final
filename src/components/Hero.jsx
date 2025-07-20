import Beams from "./Beams/Beams.jsx";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
      delayChildren: 0.2,   
    },
  },
};

const childVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  },
};

function Hero() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <div className="absolute inset-0">
                <Beams 
                    beamWidth={3}
                    beamHeight={40}
                    beamNumber={100}
                    lightColor="#ffffff"
                    speed={2}
                    noiseIntensity={1.75}
                    scale={0.2}
                    rotation={40}
                /  >
            </div>
            
            <motion.div 
                className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible">

                <motion.div 
                    variants={childVariants} 
                    className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-center"
                >
                    <h1 className="mb-4 bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">Hello!</h1>
                    <h3 className="mt-6 font-light text-4xl max-sm:text-2xl">This is my personal portfolio website!!</h3>
                </motion.div>

                <motion.div 
                    variants={childVariants}
                    className="relative z-10 flex flex-row justify-center gap-10 mt-10 font-[geist] cursor-pointer"
                >
                    <a href="/arunit-project-final/projects_page">
                        <Button>Projects</Button>
                    </a>
                    
                    <a href="/arunit-project-final/blogs">
                        <Button variant="secondary">Blogs</Button>
                    </a>
                </motion.div>

                <motion.div 
                    variants={childVariants}
                    className="flex flex-row gap-6 p-2 mt-12"
                >
                    <a 
                        href="https://github.com/LightCreator1007/" 
                        className="p-2 transition-transform bg-white rounded-full hover:scale-110" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src="img/github.svg" alt="github profile" className="w-6 h-6" />
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/arunit-chakraborty/" 
                        className="p-2 transition-transform bg-white rounded-full hover:scale-110" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src="img/linkedin.svg" alt="linkedin profile" className="w-6 h-6" />
                    </a>

                    <a 
                        href="mailto:arunitchakraborty2006@gmail.com" 
                        className="p-2 transition-transform bg-white rounded-full hover:scale-110" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src="img/mail.svg" alt="email profile" className="w-6 h-6" />
                    </a>
                </motion.div>
            </motion.div>

        </div>
    )
}

export default Hero;