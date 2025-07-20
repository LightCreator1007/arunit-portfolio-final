import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import DotGrid from "./Dot-grid/DotGrid";

const projects = [
  {
    title: "SimpliNotes",
    description: "A full-stack MERN notes application with secure authentication and state management.",
    tech: ["MongoDB", "Express", "React", "Node", "Zustand", "Tailwind"],
    github: "https://github.com/LightCreator1007/SimpliNotes",
    live: "https://simpli-notes-2.vercel.app/",
    category: "Full Stack",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "useFlow",
    description: "A Electron desktop app to manage and create custom workflows, complete with app blocking for the 'flow' state.",
    tech: ["Electron", "Javascript", "Node", "Tailwind"],
    github: "https://github.com/LightCreator1007/useFlow",
    live: null,
    category: "tool",
    color: "from-violet-500/20 to-indigo-500/20"
  },
  {
    title: "Gitatui",
    description: "A fast, terminal-based Git interface built in Rust for managing repositories efficiently.",
    tech: ["Rust", "Ratatui", "Libgit2"],
    github: "https://github.com/LightCreator1007/Gitatui",
    live: null,
    category: "CLI Tool",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Russee",
    description: "A Rust-based TUI search tool for quick file navigation and content discovery.",
    tech: ["Rust", "TUI"],
    github: "https://github.com/LightCreator1007/Russee",
    live: null,
    category: "CLI Tool",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "lstrous",
    description: "A high-performance reimplementation of the 'ls' command in Rust with color support.",
    tech: ["Rust", "Systems Programming"],
    github: "https://github.com/LightCreator1007/lstrous",
    live: null,
    category: "Systems",
    color: "from-purple-500/20 to-pink-500/20"
  },
];


function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: index * 0.1,
          },
        },
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <motion.div
        className={`absolute -inset-0.5 rounded-2xl bg-linear-to-r ${project.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
      />

      {/* Main card */}
      <div
        className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl"
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 transition-opacity duration-500`}
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col p-6">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Code2 className="h-6 w-6 text-white/80" />
            </motion.div>
            
            <div className="flex gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-white/5 p-2 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <Github className="h-4 w-4 text-white/70" />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-white/5 p-2 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4 text-white/70" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60 backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <h3 className="mb-3 bg-linear-to-br from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 grow text-sm leading-relaxed text-white/60">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <motion.div
          className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br ${project.color} blur-3xl`}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="mb-4 bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
              Featured Projects
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-white/50">
              A collection of my recent work spanning full-stack applications, CLI tools, and creative web experiences
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
          </motion.div>
        </div>
      </div>
    </div>
  );
}