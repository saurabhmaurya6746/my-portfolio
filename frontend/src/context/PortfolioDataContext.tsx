import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  fetchPortfolioData,
  type DbCodingProfile,
  type DbAchievement,
  type DbProfileStats,
} from "@/api/portfolio";

export interface UiCodingProfile {
  name: string;
  handle: string;
  url: string;
  detail: string;
}

export interface UiAchievement {
  year: string;
  title: string;
  detail: string;
}

export interface UiHeroStat {
  label: string;
  value: string;
}

export interface UiMetric {
  label: string;
  value: number;
  suffix: string;
}

export interface PortfolioDataContextType {
  profiles: UiCodingProfile[];
  achievements: UiAchievement[];
  stats: DbProfileStats;
  heroStats: UiHeroStat[];
  metrics: UiMetric[];
  highlights: string[];
  cgpa: string;
  dsaSolved: number;
  codingStreak: number;
  linkedInFollowers: number;
  starRating: string;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const defaultStats: DbProfileStats = {
  gate_air: "7409",
  gate_score: "503",
  gate_qualifications_count: 2,
  projects_built_count: 10,
  internships_completed_count: 1,
  off_campus_offers_count: 1,
  cgpa: "8.46",
};

const defaultRawProfiles: DbCodingProfile[] = [
  {
    id: 1,
    platform: "GitHub",
    username: "saurabhmaurya6746",
    profile_url: "https://github.com/saurabhmaurya6746",
    description: "Open-source projects & contributions",
    problems_solved: null,
    star_rating: null,
    coding_streak_days: null,
    followers_count: null,
    display_order: 1,
    is_active: true,
  },
  {
    id: 2,
    platform: "GeeksforGeeks",
    username: "saurabhmaurpx2",
    profile_url: "https://www.geeksforgeeks.org/profile/saurabhmaurpx2",
    description: null,
    problems_solved: 400,
    star_rating: "4-Star",
    coding_streak_days: 185,
    followers_count: null,
    display_order: 2,
    is_active: true,
  },
  {
    id: 3,
    platform: "LeetCode",
    username: "Saurabh_Maurya_67",
    profile_url: "https://leetcode.com/u/Saurabh_Maurya_67/",
    description: "Algorithmic problem solving",
    problems_solved: null,
    star_rating: null,
    coding_streak_days: null,
    followers_count: null,
    display_order: 3,
    is_active: true,
  },
  {
    id: 4,
    platform: "LinkedIn",
    username: "saurabh-maurya-2805m",
    profile_url: "https://www.linkedin.com/in/saurabh-maurya-2805m/",
    description: "Growing Network of",
    problems_solved: null,
    star_rating: null,
    coding_streak_days: null,
    followers_count: 6700,
    display_order: 4,
    is_active: true,
  },
];

const defaultRawAchievements: DbAchievement[] = [
  { id: 1, year_label: "2026", title: "GATE 2026 Qualified", subtitle: "AIR 7409 · Score 503", description: null, category: "general", key_identifier: null, display_order: 1, is_active: true },
  { id: 2, year_label: "2025", title: "GATE 2025 Qualified", subtitle: "Computer Science & IT", description: null, category: "general", key_identifier: null, display_order: 2, is_active: true },
  { id: 3, year_label: "2025", title: "TCS Off-Campus Offer", subtitle: "Selected via off-campus drive", description: null, category: "general", key_identifier: null, display_order: 3, is_active: true },
  { id: 4, year_label: "2024", title: "ISTE × ANDROMEDA Hackathon", subtitle: "Winner · NIT Hamirpur", description: null, category: "general", key_identifier: null, display_order: 4, is_active: true },
  { id: 5, year_label: "2024", title: "Star Performer Award", subtitle: "Softpro India — Python with DS & ML", description: null, category: "general", key_identifier: null, display_order: 5, is_active: true },
  { id: 6, year_label: "Ongoing", title: "400+ DSA Problems", subtitle: "4-Star on GeeksforGeeks", description: null, category: "general", key_identifier: "dsa_solved", display_order: 6, is_active: true },
  { id: 7, year_label: "2024", title: "185-Day Coding Streak", subtitle: "Highest personal streak", description: null, category: "general", key_identifier: "coding_streak", display_order: 7, is_active: true },
  { id: 8, year_label: "2023–24", title: "3× PPT Competition Winner", subtitle: "Technical & business presentations", description: null, category: "general", key_identifier: null, display_order: 8, is_active: true },
];

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export function PortfolioDataProvider({ children }: { children: React.ReactNode }) {
  const [rawProfiles, setRawProfiles] = useState<DbCodingProfile[]>(defaultRawProfiles);
  const [rawAchievements, setRawAchievements] = useState<DbAchievement[]>(defaultRawAchievements);
  const [rawStats, setRawStats] = useState<DbProfileStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchPortfolioData();
      if (data && data.success) {
        if (data.profiles && data.profiles.length > 0) setRawProfiles(data.profiles);
        if (data.achievements && data.achievements.length > 0) setRawAchievements(data.achievements);
        if (data.stats) setRawStats(data.stats);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute single source of truth references
  const gfgProfile = useMemo(() => rawProfiles.find((p) => p.platform === "GeeksforGeeks"), [rawProfiles]);
  const linkedInProfile = useMemo(() => rawProfiles.find((p) => p.platform === "LinkedIn"), [rawProfiles]);

  const dsaSolved = gfgProfile?.problems_solved ?? 400;
  const starRating = gfgProfile?.star_rating ?? "4-Star";
  const codingStreak = gfgProfile?.coding_streak_days ?? 185;
  const linkedInFollowers = linkedInProfile?.followers_count ?? 6700;

  // Format Coding Profiles UI objects
  const profiles: UiCodingProfile[] = useMemo(() => {
    return rawProfiles
      .filter((p) => p.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map((p) => {
        let handle = p.username;
        if (!handle.startsWith("@")) {
          handle = `@${handle}`;
        }

        let detail = p.description || "";
        if (p.platform === "GeeksforGeeks") {
          const parts: string[] = [];
          if (p.problems_solved !== null && p.problems_solved !== undefined) {
            parts.push(`${p.problems_solved}+ problems`);
          }
          if (p.star_rating) {
            parts.push(p.star_rating);
          }
          if (p.coding_streak_days !== null && p.coding_streak_days !== undefined) {
            parts.push(`${p.coding_streak_days}-day streak`);
          }
          detail = parts.join(" · ");
        } else if (p.platform === "LinkedIn") {
          if (p.followers_count !== null && p.followers_count !== undefined) {
            const prefix = p.description ? `${p.description.trim()} ` : "Growing Network of ";
            detail = `${prefix}${p.followers_count}+ LinkedIn Followers`;
          }
        }

        return {
          name: p.platform,
          handle,
          url: p.profile_url,
          detail,
        };
      });
  }, [rawProfiles]);

  // Format Achievements UI objects
  const achievements: UiAchievement[] = useMemo(() => {
    return rawAchievements
      .filter((a) => a.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map((a) => {
        let title = a.title;
        let detail = a.subtitle || a.description || "";

        if (a.key_identifier === "dsa_solved" || a.title.includes("DSA Problems")) {
          title = `${dsaSolved}+ DSA Problems`;
          detail = `${starRating} on GeeksforGeeks`;
        } else if (a.key_identifier === "coding_streak" || a.title.includes("Coding Streak")) {
          title = `${codingStreak}-Day Coding Streak`;
          detail = a.subtitle || "Highest personal streak";
        }

        return {
          year: a.year_label,
          title,
          detail,
        };
      });
  }, [rawAchievements, dsaSolved, starRating, codingStreak]);

  // Format Hero stats
  const heroStats: UiHeroStat[] = useMemo(() => {
    return [
      { label: "GATE 2026 AIR", value: rawStats.gate_air },
      { label: "GATE Score", value: rawStats.gate_score },
      { label: "Projects Built", value: `${rawStats.projects_built_count}+` },
      { label: "DSA Solved", value: `${dsaSolved}+` },
    ];
  }, [rawStats, dsaSolved]);

  // Format Metrics
  const metrics: UiMetric[] = useMemo(() => {
    return [
      { label: "Projects Built", value: rawStats.projects_built_count, suffix: "+" },
      { label: "DSA Problems Solved", value: dsaSolved, suffix: "+" },
      { label: "Day Coding Streak", value: codingStreak, suffix: "" },
      { label: "GATE Qualifications", value: rawStats.gate_qualifications_count, suffix: "" },
      { label: "Internship Completed", value: rawStats.internships_completed_count, suffix: "" },
      { label: "Off-Campus Offer", value: rawStats.off_campus_offers_count, suffix: "" },
    ];
  }, [rawStats, dsaSolved, codingStreak]);

  // Format Highlights
  const highlights: string[] = useMemo(() => {
    return [
      "GATE 2025 & 2026 Qualified",
      `AIR ${rawStats.gate_air} · Score ${rawStats.gate_score}`,
      "TCS Off-Campus Selection",
      "Data Science Intern @ Softpro India",
      `${rawStats.projects_built_count}+ Real-World Projects`,
      "Hackathon Winner",
    ];
  }, [rawStats]);

  const value: PortfolioDataContextType = {
    profiles,
    achievements,
    stats: rawStats,
    heroStats,
    metrics,
    highlights,
    cgpa: rawStats.cgpa,
    dsaSolved,
    codingStreak,
    linkedInFollowers,
    starRating,
    isLoading,
    refetch: loadData,
  };

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }
  return context;
}
