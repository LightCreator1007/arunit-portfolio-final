import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogOverlay({ blog, onClose }) {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch markdown content
    const fetchMarkdown = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(blog.markdownPath);
        
        if (!response.ok) {
          throw new Error("Failed to load blog post");
        }
        
        const text = await response.text();
        setMarkdownContent(text);
      } catch (err) {
        setError(err.message);
        // Fallback to description if markdown fails to load
        setMarkdownContent(`# ${blog.title}\n\n${blog.description}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [blog]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
      />

      {/* Content Card */}
      <motion.div 
        layoutId={`card-${blog.id}`} 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-4xl h-full max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm flex-shrink-0">
          <div className="flex justify-between items-start gap-4 mb-6">
            <motion.div 
              layoutId={`tags-${blog.id}`} 
              className="flex flex-wrap gap-2"
            >
              {blog.tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-white/10 text-white/90 hover:bg-white/20 border border-white/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="rounded-full hover:bg-white/10 flex-shrink-0 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <motion.h2 
            layoutId={`title-${blog.id}`} 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            {blog.title}
          </motion.h2>
          
          <motion.div 
            layoutId={`date-${blog.id}`} 
            className="flex items-center gap-4 text-gray-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blog.date}</span>
            </div>
          </motion.div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 sm:p-8 lg:p-12">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-400 mb-2">Failed to load blog post</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="prose prose-invert prose-lg max-w-none"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 mt-8 tracking-tight" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-4 mt-8 tracking-tight" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-3 mt-6 tracking-tight" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-xl font-bold mb-2 mt-4" {...props} />,
                    h5: ({node, ...props}) => <h5 className="text-lg font-bold mb-2 mt-4" {...props} />,
                    h6: ({node, ...props}) => <h6 className="text-base font-bold mb-2 mt-4" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 no-underline hover:underline transition-colors" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                    em: ({node, ...props}) => <em className="text-gray-200 italic" {...props} />,
                    code: ({node, inline, ...props}) => 
                      inline 
                        ? <code className="text-blue-300 bg-white/5 px-1.5 py-0.5 rounded text-sm" {...props} />
                        : <code className="block text-sm" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-4" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500/50 pl-4 italic text-gray-400 my-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                    img: ({node, ...props}) => <img className="rounded-lg border border-white/10 my-4 w-full" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-white/10 my-8" {...props} />,
                    table: ({node, ...props}) => (
                      <div className="overflow-x-auto my-4">
                        <table className="border-collapse border border-white/10 w-full" {...props} />
                      </div>
                    ),
                    thead: ({node, ...props}) => <thead className="bg-white/5" {...props} />,
                    th: ({node, ...props}) => <th className="border border-white/10 p-3 text-left font-semibold" {...props} />,
                    td: ({node, ...props}) => <td className="border border-white/10 p-3" {...props} />,
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}