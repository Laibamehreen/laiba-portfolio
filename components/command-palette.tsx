"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  FileText,
  Mail,
  Copy,
  Check,
  Moon,
  Sun,
  Github,
  Linkedin,
  ExternalLink,
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { PROFILE_DATA } from "@/data/profile";
import { downloadResumeFile } from "@/lib/download-cv";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Actions" | "Social";
  icon: React.ElementType;
  action: () => void;
  badge?: string;
}

interface CommandPaletteProps {
  showTrigger?: boolean;
}

export default function CommandPalette({ showTrigger = false }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle theme helper
  const handleToggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsOpen(false);
  };

  // Copy email helper
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      setIsOpen(false);
    }, 1200);
  };

  // Scroll to section helper
  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard shortcut listener (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build command items list
  const baseItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      title: "About Me",
      subtitle: "Background, core pillars, and summary",
      category: "Navigation",
      icon: Sparkles,
      action: () => scrollTo("about"),
    },
    {
      id: "nav-skills",
      title: "Technical Skills",
      subtitle: "Java, Spring Boot, REST APIs, PostgreSQL, React",
      category: "Navigation",
      icon: Code2,
      action: () => scrollTo("skills"),
    },
    {
      id: "nav-experience",
      title: "Experience",
      subtitle: "Software engineering roles and internship history",
      category: "Navigation",
      icon: Briefcase,
      action: () => scrollTo("experience"),
    },
    {
      id: "nav-certificates",
      title: "Certifications",
      subtitle: "Verified internship & training credentials",
      category: "Navigation",
      icon: Award,
      action: () => scrollTo("certificates"),
    },
    {
      id: "nav-projects",
      title: "Engineering Projects",
      subtitle: "Backend systems, full stack apps, AI & mobile",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-education",
      title: "Education",
      subtitle: "BS Computer Science at COMSATS University",
      category: "Navigation",
      icon: GraduationCap,
      action: () => scrollTo("education"),
    },
    {
      id: "nav-contact",
      title: "Contact & Inquiries",
      subtitle: "Direct email form and contact details",
      category: "Navigation",
      icon: Mail,
      action: () => scrollTo("contact"),
    },

    // Actions
    {
      id: "action-resume",
      title: "Download Official Resume",
      subtitle: "Laiba_Mehreen_Resume.pdf",
      category: "Actions",
      icon: FileText,
      badge: "PDF",
      action: () => {
        setIsOpen(false);
        downloadResumeFile("Laiba_Mehreen_Resume.pdf");
      },
    },
    {
      id: "action-email",
      title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email Address",
      subtitle: PROFILE_DATA.email,
      category: "Actions",
      icon: copiedEmail ? Check : Copy,
      badge: "Clipboard",
      action: handleCopyEmail,
    },
    {
      id: "action-theme",
      title: "Toggle Theme",
      subtitle: "Switch between dark and light modes",
      category: "Actions",
      icon: Moon,
      badge: "Appearance",
      action: handleToggleTheme,
    },

    // Social Links
    {
      id: "social-github",
      title: "Visit GitHub Profile",
      subtitle: "github.com/Laibamehreen",
      category: "Social",
      icon: Github,
      action: () => {
        setIsOpen(false);
        window.open(PROFILE_DATA.github, "_blank");
      },
    },
    {
      id: "social-linkedin",
      title: "Visit LinkedIn Profile",
      subtitle: "linkedin.com/in/laiba-mehreen",
      category: "Social",
      icon: Linkedin,
      action: () => {
        setIsOpen(false);
        window.open(PROFILE_DATA.linkedin, "_blank");
      },
    },
    {
      id: "social-upwork",
      title: "Visit Upwork Freelance Profile",
      subtitle: "Top Rated Java & Full Stack Engineer",
      category: "Social",
      icon: ExternalLink,
      action: () => {
        setIsOpen(false);
        window.open("https://www.upwork.com/freelancers/~01649656063f558079", "_blank");
      },
    },
  ];

  // Append Projects as searchable items
  const projectItems: CommandItem[] = PROJECTS_DATA.map((p) => ({
    id: `project-${p.id}`,
    title: p.title,
    subtitle: `${p.category} • ${p.technologies.slice(0, 3).join(", ")}`,
    category: "Projects",
    icon: FolderGit2,
    badge: p.featured ? "Featured" : p.category,
    action: () => {
      setIsOpen(false);
      if (p.liveDemoUrl) {
        window.open(p.liveDemoUrl, "_blank");
      } else if (p.githubUrl) {
        window.open(p.githubUrl, "_blank");
      } else {
        scrollTo("projects");
      }
    },
  }));

  const allItems = [...baseItems, ...projectItems];

  const filteredItems = query.trim()
    ? allItems.filter((item) => {
        const text = `${item.title} ${item.subtitle || ""} ${item.category}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
    : allItems;

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Optional Trigger Button */}
      {showTrigger && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Command Palette (Ctrl+K)"
          title="Open Command Palette (Ctrl+K)"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium 
            bg-white/[0.05] hover:bg-lavender-400/15 border border-white/10 hover:border-lavender-400/40 
            text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-sm group"
        >
          <Search className="w-3.5 h-3.5 text-lavender-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-slate-400 group-hover:text-slate-200">Search commands</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-lavender-300 border border-white/10 font-bold">
            ⌘K
          </span>
        </button>
      )}

      {/* Glassmorphic Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy-950/70 dark:bg-black/75 backdrop-blur-xl transition-all"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl 
                bg-navy-900/95 dark:bg-[#0E1326]/95 backdrop-blur-2xl border border-lavender-400/25 
                text-slate-100 z-10 flex flex-col max-h-[80vh]"
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
                <Search className="w-5 h-5 text-lavender-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command, section, or project..."
                  className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="overflow-y-auto p-2 space-y-1 divide-y divide-white/[0.02] max-h-[55vh]"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    No results found for &ldquo;<span className="text-white font-medium">{query}</span>&rdquo;
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 group cursor-pointer ${
                          isSelected
                            ? "bg-lavender-400/20 text-white border border-lavender-400/30 shadow-sm"
                            : "text-slate-300 hover:bg-white/[0.04] border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-lavender-400 text-navy-950 font-bold"
                                : "bg-white/[0.06] text-lavender-300"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold truncate flex items-center gap-2">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                                    isSelected
                                      ? "bg-lavender-400/30 text-white"
                                      : "bg-white/[0.08] text-lavender-300"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                            )}
                          </div>
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected
                              ? "opacity-100 translate-x-0 text-lavender-300"
                              : "opacity-0 -translate-x-2"
                          }`}
                        />
                      </button>
                    );
                  })
                )}
              </div>

              {/* Command Palette Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-white/[0.02] text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] font-mono text-[10px]">
                      ↑
                    </kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] font-mono text-[10px]">
                      ↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] font-mono text-[10px]">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Command className="w-3 h-3" />
                  <span>Laiba Portfolio</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
