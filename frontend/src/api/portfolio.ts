import { API_BASE_URL } from "./client";

export interface DbCodingProfile {
  id: number;
  platform: string;
  username: string;
  profile_url: string;
  description: string | null;
  problems_solved: number | null;
  star_rating: string | null;
  coding_streak_days: number | null;
  followers_count: number | null;
  display_order: number;
  is_active: boolean;
}

export interface DbAchievement {
  id: number;
  year_label: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: string;
  key_identifier: string | null;
  display_order: number;
  is_active: boolean;
}

export interface DbProfileStats {
  gate_air: string;
  gate_score: string;
  gate_qualifications_count: number;
  projects_built_count: number;
  internships_completed_count: number;
  off_campus_offers_count: number;
  cgpa: string;
}

export interface PortfolioDataResponse {
  success: boolean;
  profiles: DbCodingProfile[];
  achievements: DbAchievement[];
  stats: DbProfileStats;
}

export async function fetchPortfolioData(): Promise<PortfolioDataResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/portfolio-data/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const data: PortfolioDataResponse = await res.json();
    return data;
  } catch {
    return null;
  }
}
