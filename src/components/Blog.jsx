import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BlogOverlay from "./BlogOverlay";

const blogs = [ 
  {
    id: 1,
    title: "RAII in C++ and its adoption in Rust",
    description: "A deep dive into the RAII (Resource Acquisition Is Initialization) paradigm in C++ and how Rust has adopted and evolved this concept to ensure memory safety and efficient resource management.",
    date: "02-10-2025",
    tags: ["C++", "Rust", "RAII", "Memory Management"],
    markdownPath: "/arunit-portfolio-final/blogposts/raii-cpp-rust.md"
  },
];

function BlogCard({ blog, onClick }) {
  return (
    <motion.div 
      layoutId={`card-${blog.id}`}
      onClick={onClick}
      className="group relative h-full bg-[#0a0a0a] border border-white/10 rounded-xl p-6 cursor-pointer hover:border-white/30 transition-all duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          layoutId={`tags-${blog.id}`} 
          className="flex flex-wrap gap-2 mb-4"
        >
          {blog.tags.slice(0, 2).map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="border-white/20 text-xs text-gray-400 bg-white/5"
            >
              {tag}
            </Badge> 
          ))}
          {blog.tags.length > 2 && (
            <Badge 
              variant="outline" 
              className="border-white/20 text-xs text-gray-500 bg-white/5"
            >
              +{blog.tags.length - 2}
            </Badge>
          )}
        </motion.div>

        <motion.h3 
          layoutId={`title-${blog.id}`} 
          className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors"
        >
          {blog.title}
        </motion.h3>

        <p className="text-gray-400 text-sm line-clamp-3 mb-4 grow">
          {blog.description}
        </p>

        <div className="flex items-center justify-between text-gray-500 text-xs mt-auto pt-4 border-t border-white/5">
          <motion.div 
            layoutId={`date-${blog.id}`} 
            className="flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{blog.date}</span>
          </motion.div>
          <div className="flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400">
            <span className="text-xs font-medium">Read more</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="min-h-screen bg-black relative w-full text-white font-sans selection:bg-blue-500/30 antialiased">
        
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_50%,rgba(0,0,0,1)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-linear-to-b from-white via-white to-gray-500 bg-clip-text text-transparent p-4">
            Blogposts
          </h1>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <BlogCard 
                blog={blog} 
                onClick={() => setSelectedBlog(blog)} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedBlog && (
          <BlogOverlay 
            blog={selectedBlog} 
            onClose={() => setSelectedBlog(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Blog;