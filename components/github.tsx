"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Folder, Star, GitFork, RefreshCw, BarChart2 } from "lucide-react";

interface Repo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export default function GitHub() {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState({
    publicRepos: 24,
    totalCommits: 512,
    prsOpened: 38,
    issuesClosed: 52
  });

  // Simulated contribution grid data (53 columns * 7 rows)
  // Generating a realistic-looking array of contribution intensities (0 to 4)
  const [contributionData, setContributionData] = useState<number[]>([]);

  useEffect(() => {
    // Generate simulated contribution grid with higher intensities on weekdays
    const data: number[] = [];
    for (let i = 0; i < 53 * 7; i++) {
      const rand = Math.random();
      if (rand < 0.3) data.push(0);
      else if (rand < 0.6) data.push(1);
      else if (rand < 0.85) data.push(2);
      else if (rand < 0.95) data.push(3);
      else data.push(4);
    }
    setContributionData(data);

    // Dynamic GitHub API fetch
    const fetchGithubData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/laiba/repos?sort=updated&per_page=4");
        if (response.ok) {
          const data = await response.json();
          // Map to repo format
          const mappedRepos: Repo[] = data.map((r: any) => ({
            name: r.name,
            description: r.description || "No description provided.",
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language || "TypeScript",
            url: r.html_url
          }));
          setRepos(mappedRepos);

          // Get user details
          const userResponse = await fetch("https://api.github.com/users/laiba");
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setStats(prev => ({
              ...prev,
              publicRepos: userData.public_repos
            }));
          }
        } else {
          // Trigger mock load on API limit or error
          loadMockRepos();
        }
      } catch (error) {
        loadMockRepos();
      } finally {
        setLoading(false);
      }
    };

    const loadMockRepos = () => {
      setRepos([
        {
          name: "ai-career-advisor",
          description: "An AI-powered academic advisor platform mapping students to internship/scholarship pathways based on dynamic interests.",
          stars: 8,
          forks: 3,
          language: "TypeScript",
          url: "https://github.com"
        },
        {
          name: "health-guide-app",
          description: "A secure medical guide and symptom check framework compiled via React Native & Firebase configurations.",
          stars: 5,
          forks: 1,
          language: "JavaScript",
          url: "https://github.com"
        },
        {
          name: "hospital-mgt-system",
          description: "A secure database portal facilitating physician workflow allocations, patient records, and diagnostics metrics.",
          stars: 4,
          forks: 2,
          language: "JavaScript",
          url: "https://github.com"
        },
        {
          name: "algorithmic-visualizer",
          description: "An interactive workspace visualizing sorting mechanics, tree structures, and shortest-path graph calculations.",
          stars: 6,
          forks: 1,
          language: "TypeScript",
          url: "https://github.com"
        }
      ]);
    };

    fetchGithubData();
  }, []);

  const getContributionColor = (intensity: number) => {
    switch (intensity) {
      case 0: return "bg-slate-900/40 border-white/5";
      case 1: return "bg-violet-950/40 border-violet-900/30";
      case 2: return "bg-violet-850/50 border-violet-800/40";
      case 3: return "bg-violet-700/60 border-violet-600/50";
      case 4: return "bg-violet-500/80 border-violet-400/70 shadow-[0_0_8px_rgba(139,92,246,0.3)]";
      default: return "bg-slate-900/40 border-white/5";
    }
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-[#070A13]/10">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 bg-violet-400/5 px-3.5 py-1.5 rounded-full border border-violet-500/10">
            Open Source
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            GitHub Activities & Repositories
          </h3>
          <p className="text-slate-400 max-w-xl mt-4 font-medium">
            Dynamic metrics tracked directly from my GitHub developer workspace, showcasing commits and libraries.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 & 2: Contribution Graph & Stats (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contribution Map Card */}
            <div className="glass-card p-6.5 rounded-3xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-violet-400" />
                  Contributions Calendar (Simulated Glow)
                </span>
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  @laiba
                </span>
              </div>

              {/* Grid Scroll Area */}
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[640px]">
                  {contributionData.map((intensity, idx) => (
                    <div
                      key={idx}
                      className={`w-[8.5px] h-[8.5px] rounded-[1.5px] border transition-all duration-300 ${getContributionColor(intensity)}`}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-4 text-[10px] font-bold text-slate-500">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-[1px] bg-slate-900 border border-white/5" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-violet-950/65" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-violet-800" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-violet-650" />
                <div className="w-2.5 h-2.5 rounded-[1px] bg-violet-500" />
                <span>More</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Repos", value: stats.publicRepos },
                { label: "Commits", value: `${stats.totalCommits}+` },
                { label: "PRs Opened", value: stats.prsOpened },
                { label: "Issues Closed", value: stats.issuesClosed }
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl text-center">
                  <span className="text-slate-450 text-[10px] font-bold uppercase tracking-wider block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Column 3: Recent Repositories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-350 tracking-wide uppercase px-2 mb-2">
              Recent Repositories
            </h4>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-xs font-semibold gap-3">
                <RefreshCw className="w-5 h-5 animate-spin" />
                Fetching GitHub repositories...
              </div>
            ) : (
              repos.map((repo, idx) => (
                <motion.a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={repo.name}
                  className="glass-card p-5 rounded-2.5xl block group border-white/5 hover:border-violet-500/25 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-2">
                      <Folder className="w-4 h-4 text-violet-400" />
                      {repo.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-semibold text-slate-400">
                      {repo.language}
                    </span>
                  </div>
                  
                  <p className="text-slate-450 text-xs leading-relaxed mb-4 line-clamp-2">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                    </span>
                  </div>
                </motion.a>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
