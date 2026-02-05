# Forecast Page Design

## Overview
The Forecast page provides users with insights into their future timing across multiple timeframes: Tomorrow, Monthly, Yearly, and 10-Year Cycles.

## Page Structure

### Hero Section
- Title: "Your Future Timeline"
- Subtitle: "Plan ahead with precision—see your energy cycles, optimal timing, and major transitions"
- Visual: Subtle gradient or element-based background

### Tab Navigation
Four tabs for different timeframes (all forward-looking):
1. **Tomorrow** - Free
2. **Next 30 Days** - Free (basic), Premium (detailed) - Rolling 30-day window
3. **Next 12 Months** - Free (overview), Premium (detailed) - Rolling 12-month window
4. **10-Year Cycle** - Premium - Always valuable (long-term)

---

## Tab 1: Tomorrow (Free)

### Structure
Similar to Today page but for tomorrow's date.

### Content
- **Hero Section**: Tomorrow's theme, date, dominant element
- **Scorecard**: Tomorrow's Fortune Pulse (overall score + categories)
- **Peak Energy Windows**: Optimal timing windows
- **Special Events**: Rare alignments or patterns
- **Timing Warnings**: Times to avoid

### Data Structure
```typescript
interface TomorrowForecast {
  date: string; // ISO date for tomorrow
  theme: {
    title: string;
    description: string;
    trend: "rising" | "falling" | "stable";
    dominantElement: "fire" | "earth" | "metal" | "water" | "wood";
  };
  energy: {
    overallScore: number; // 1-10
    categories: Array<{
      name: string;
      score: number;
      overview: string;
    }>;
  };
  peakWindows: Array<{
    activity: string;
    timeWindow: string;
    description: string;
    emoji?: string;
  }>;
  specialEvents: Array<{
    name: string;
    emoji: string;
    description: string;
    rarity: string;
    timeWindow?: string;
  }>;
  warnings: Array<{
    activity: string;
    timeWindow: string;
    reason: string;
    severity: "low" | "medium" | "high";
  }>;
}
```

---

## Tab 2: Next 30 Days (Free + Premium)

### Free Tier
- 30-day theme overview
- Best/worst weeks highlighted
- Key dates (3-5 most important) in next 30 days
- Overall energy score for the period

### Premium Tier
- Full calendar heatmap (daily energy scores for all 30 days)
- Detailed weekly breakdowns
- All special dates and transitions
- Element distribution throughout period
- Actionable recommendations per week

### Visual: Calendar Heatmap
- Grid of next 30 days (not tied to calendar month)
- Color-coded by energy score (green = high, yellow = medium, red = low)
- Hover shows date and score
- Clickable for daily details
- Always shows forward-looking dates

### Data Structure
```typescript
interface MonthlyForecast {
    period: string; // "Next 30 Days" or "Jan 15 - Feb 14, 2025"
    startDate: string; // ISO date
    endDate: string; // ISO date
  theme: {
    title: string;
    description: string;
    overallEnergy: number; // 1-10
  };
  weeks: Array<{
    weekNumber: number;
    startDate: string;
    endDate: string;
    energy: number;
    theme: string;
    keyEvents: string[];
  }>;
  keyDates: Array<{
    date: string;
    title: string;
    type: "peak" | "transition" | "warning";
    description: string;
  }>;
  dailyScores: Array<{
    date: string;
    score: number; // 1-10
    element: string;
  }>; // Premium only
}
```

---

## Tab 3: Next 12 Months (Free + Premium)

### Free Tier
- Next 12 months overview theme
- Best/worst months in next 12 months
- Major transitions (3-5 key dates) in next 12 months
- Overall energy score for the period

### Premium Tier
- Monthly heatmap (next 12 months from today)
- Detailed monthly breakdowns
- All transition dates
- Element cycles throughout period
- Career, wealth, relationship forecasts per month
- Quarterly summaries (next 4 quarters)

### Visual: 12-Month Heatmap
- Grid of next 12 months (not tied to calendar year)
- Color-coded by monthly energy
- Hover shows month and score
- Clickable for monthly details
- Always shows forward-looking months

### Data Structure
```typescript
interface YearlyForecast {
    period: string; // "Next 12 Months" or "Jan 2025 - Jan 2026"
    startDate: string; // ISO date
    endDate: string; // ISO date
  theme: {
    title: string;
    description: string;
    overallEnergy: number;
    dominantElement: string;
  };
  months: Array<{
    month: string; // "January"
    energy: number;
    theme: string;
    bestFor: string[];
    avoid: string[];
    keyDates: string[];
  }>;
  majorTransitions: Array<{
    date: string;
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
  }>;
  quarterlySummary: Array<{
    quarter: number; // 1-4
    theme: string;
    energy: number;
    focus: string;
  }>;
}
```

---

## Tab 4: 10-Year Cycle (Premium)

### Structure
- Current cycle phase indicator
- Timeline visualization
- Multiple luck pillars (if overlap)
- Cycle descriptions
- Upcoming transitions

### Visual: Timeline
- Horizontal timeline showing 10-year periods
- Current position highlighted
- Past cycles (if applicable)
- Future cycles
- Transition markers
- Multiple pillar indicators where cycles overlap

### Content Sections
1. **Current Cycle Overview**
   - Which cycle you're in
   - Years covered (e.g., "2020-2030")
   - Overall theme
   - Current phase within cycle

2. **Luck Pillars**
   - Primary pillar (if single cycle)
   - Multiple pillars (if cycles overlap)
   - Each pillar shows:
     - Element
     - Years active
     - Influence description
     - Areas affected (career, wealth, relationships, health)

3. **Cycle Timeline**
   - Visual timeline with markers
   - Past transitions
   - Current position
   - Upcoming transitions
   - Cycle boundaries

4. **Cycle Phases**
   - Breakdown of phases within current cycle
   - What to expect in each phase
   - Optimal timing for major decisions

5. **Upcoming Transitions**
   - Next major transition date
   - What changes
   - How to prepare

### Data Structure
```typescript
interface TenYearCycle {
  currentCycle: {
    startYear: number;
    endYear: number;
    currentYear: number;
    phase: string; // "early" | "mid" | "late"
    theme: string;
    overallEnergy: number;
  };
  luckPillars: Array<{
    pillar: {
      element: string;
      stem: string;
      branch: string;
    };
    startYear: number;
    endYear: number;
    influence: {
      career: string;
      wealth: string;
      relationships: string;
      health: string;
    };
    description: string;
  }>;
  transitions: Array<{
    year: number;
    month?: number;
    type: "cycle_start" | "cycle_end" | "pillar_change" | "major_shift";
    description: string;
    impact: "high" | "medium" | "low";
  }>;
  phases: Array<{
    years: string; // "2020-2023"
    phase: string;
    theme: string;
    focus: string[];
    energy: number;
  }>;
  upcomingTransition: {
    date: string;
    type: string;
    description: string;
    preparation: string[];
  };
}
```

---

## Premium Indicators

### Visual Indicators
- Lock icon (🔒) on premium sections
- Blur overlay on premium content (subtle)
- "Premium" badge on tabs
- Upgrade CTA buttons

### Premium Gating
- **Tomorrow**: Fully free
- **This Month**: Basic free, detailed calendar premium
- **This Year**: Overview free, detailed breakdown premium
- **10-Year Cycle**: Fully premium

---

## Implementation Phases

### Phase 1: Structure + Tomorrow Tab
- Page layout with tabs
- Tomorrow tab fully implemented (free)
- Mock data for tomorrow

### Phase 2: Monthly Tab (Free Tier)
- Monthly tab structure
- Basic monthly overview
- Key dates display
- Mock data for monthly

### Phase 3: Yearly Tab (Free Tier)
- Yearly tab structure
- Year overview
- Best/worst months
- Mock data for yearly

### Phase 4: Premium Features
- Premium indicators
- Locked content overlays
- Upgrade CTAs
- Premium sections for Monthly/Yearly

### Phase 5: 10-Year Cycle
- Timeline visualization
- Cycle descriptions
- Multiple pillar support
- Mock data for 10-year cycle

### Phase 6: Heatmaps
- Monthly calendar heatmap
- Yearly heatmap
- Interactive hover/click states

---

## Mock Data Strategy

### Tomorrow
- Generate based on current date + 1 day
- Use element-based themes
- Vary scores and windows

### Monthly
- Generate for current month
- Include 4-5 weeks
- 3-5 key dates
- Daily scores array (for premium)

### Yearly
- Generate for current year
- 12 months with varying energy
- 3-5 major transitions
- Quarterly summaries

### 10-Year Cycle
- Calculate based on birth year
- Determine current cycle
- Generate 2-3 luck pillars (with potential overlap)
- Create transition timeline
- Phase breakdowns

---

## UX Considerations

1. **Tab Switching**: Smooth transitions, maintain scroll position
2. **Loading States**: Show skeleton loaders while data loads
3. **Empty States**: Handle cases with no data gracefully
4. **Mobile**: Responsive tabs, scrollable heatmaps
5. **Accessibility**: Keyboard navigation, screen reader support
6. **Performance**: Lazy load tab content, optimize heatmap rendering

---

## Visual Design Notes

- **Heatmap Colors**: 
  - High energy (8-10): Green shades
  - Medium energy (5-7): Yellow/Amber shades
  - Low energy (1-4): Red/Orange shades
- **Timeline**: Clean, minimal design with clear markers
- **Premium Overlays**: Subtle blur, not too aggressive
- **Consistency**: Match Today page styling where applicable
