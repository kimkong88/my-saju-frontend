# Friends Feature - Visual Mockup & Section Design

## Section Overview

The Friends feature will be integrated into the `/me` page as a new section positioned **after "Compatibility Share" and before "Life Questions"**.

---

## Main Section: "My Friends"

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  My Friends                                    [+ Add]  │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Friend Card  │  │ Friend Card  │  │ Friend Card  │ │
│  │              │  │              │  │              │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ Friend Card  │  │ Friend Card  │                    │
│  │              │  │              │                    │
│  └──────────────┘  └──────────────┘                    │
│                                                          │
│  [Empty State: "Add your first friend to see..."]       │
└─────────────────────────────────────────────────────────┘
```

### Section Header

**Title**: "My Friends"  
**Subtitle**: "Track compatibility with people in your life" (optional, can be hidden if too verbose)  
**Action Button**: "+ Add Friend" (top right, matches existing design patterns)

**Visual Style**:
- Matches `MeCompatibilityShare` and `MeUserInfo` section styling
- Border-top and border-bottom for separation
- Padding: `py-12 md:py-16 px-6 xl:px-0`
- Max width: `max-w-7xl mx-auto`

---

## Friend Card Component

### Card Layout (Desktop)

```
┌──────────────────────────────────────────────────────────┐
│  ┌──────────┐                                            │
│  │ Identity │  [Name]                    [Relationship]  │
│  │   Card   │  Fire-I • 1 in 1.3M        [romantic]     │
│  │          ─────────────────────────────────────────────  │
│  └──────────┘                                            │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Today's Compatibility: [ ? ] 85%                  │  │
│  │  "Great harmony in communication today"            │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  [Check Full Compatibility]  [Edit]  [Delete]           │
└──────────────────────────────────────────────────────────┘
```

### Card Layout (Mobile - Stacked)

```
┌─────────────────────────────┐
│  ┌──────────┐               │
│  │ Identity │  [Name]       │
│  │   Card   │  Fire-I       │
│  └──────────┘               │
│                             │
│  [Relationship Badge]       │
│                             │
│  ┌───────────────────────┐ │
│  │ [ ? ] 85% Compatible  │ │
│  └───────────────────────┘ │
│                             │
│  [Check Full] [Edit] [Del]  │
└─────────────────────────────┘
```

### Card Features

1. **Identity Card Preview** (Top)
   - Mini version of identity card (similar to `MeCompatibilityShare`)
   - Shows: Element emoji, Identity code, Rarity
   - Clickable → Links to friend's full profile/compatibility

2. **Friend Info**
   - **Name**: Full name (or "Anonymous" for ghost users)
   - **Identity**: Identity code + rarity (e.g., "Fire-I • 1 in 1.3M")
   - **Relationship Badge**: Colored badge showing relationship type
     - `romantic`: Pink/Red
     - `family`: Blue
     - `friend`: Green
     - `colleague`: Purple
     - `other`: Gray

3. **Daily Compatibility Score** (Creative Feature)
   - **"?" Icon**: Question mark button (prominent, clickable)
   - **Score Display**: Shows percentage when clicked
   - **Insight Text**: Brief daily insight (e.g., "Great harmony in communication today")
   - **Visual Indicator**: Color-coded (green = high, yellow = medium, red = low)
   - **Expandable**: Click to see more details or link to full report

4. **Quick Actions**
   - **"Check Full Compatibility"**: Button → `/compat/[friendCode]`
   - **Edit**: Opens `EditFriendModal`
   - **Delete**: Opens confirmation modal

---

## Add Friend Modal

### Modal Structure

```
┌─────────────────────────────────────────────────────────┐
│  [X]                                                     │
│                                                          │
│  Add a Friend                                            │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  [By Code]  [By Birthdate]  ← Tabs                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Tab Content Area                                  │ │
│  │                                                     │ │
│  │  [Form Fields]                                     │ │
│  │                                                     │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  [Cancel]  [Add Friend]                                 │
└─────────────────────────────────────────────────────────┘
```

### Tab 1: "By Code"

**Form Fields**:
1. **User Code Input**
   - Placeholder: "Enter friend's user code"
   - Validation: Check if code exists
   - Optional: Show preview of friend's identity when code is valid

2. **Relationship Selector**
   - Dropdown with 5 options:
     - Romantic
     - Family
     - Friend
     - Colleague
     - Other (shows text input for custom label)

3. **Preview Section** (if code is valid)
   - Shows friend's identity card preview
   - Name and identity code

### Tab 2: "By Birthdate"

**Form Fields** (Similar to SignUpForm):
1. **Name** (Optional, defaults to "Anonymous")
2. **Date of Birth** (DateField)
3. **Time of Birth** (TimeField, optional)
4. **Gender** (Select: Male/Female)
5. **City of Birth** (ComboBox with autocomplete)
6. **Current City** (ComboBox with autocomplete)
7. **Relationship Selector** (same as Tab 1)

**Note**: Creates a ghost user (orphaned, no account)

---

## Creative Features

### 1. Daily Compatibility Score Display

**Visual Design**:
- **"?" Icon**: Large, prominent, circular button with question mark
- **Color States**:
  - Default: Gray border, white background
  - Hover: Slight scale, shadow
  - Active: Shows score with animation

**Interaction Flow**:
1. User clicks "?" icon
2. Tooltip/Modal appears showing:
   - **Score**: "85% Compatible Today"
   - **Insight**: Brief text (e.g., "Great harmony in communication today")
   - **Element Match**: Visual indicator of element compatibility
   - **Link**: "View Full Compatibility Report"

**Backend Data**:
- Daily calculated score (0-100%)
- Brief insight text (generated by backend)
- Element compatibility indicators

### 2. Relationship Insights (Future Enhancement)

- Show relationship-specific insights
- E.g., "Romantic relationships with Fire-I tend to..."
- Could be a small info icon next to relationship badge

### 3. Quick Add from Compatibility

- If user recently checked compatibility with someone
- Show "Add as Friend" button on compatibility result page
- Pre-fills user code and relationship type

### 4. Friend Limit Indicator

- Show "8/10 friends" counter in section header
- Warning when approaching limit (8/10, 9/10)
- Disable "Add Friend" button at limit (10/10)

### 5. Empty State

**When no friends**:
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│              [Illustration/Icon]                         │
│                                                          │
│         Start Building Your Circle                       │
│                                                          │
│  Add friends to track daily compatibility and discover  │
│  insights about your relationships.                      │
│                                                          │
│              [+ Add Your First Friend]                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 6. Relationship Grouping (Optional)

- Group friends by relationship type
- Collapsible sections: "Romantic (2)", "Family (3)", "Friends (4)"
- Can be toggled on/off

### 7. Compatibility Trends (Future)

- Show compatibility score over time (if tracked)
- Mini chart showing daily/weekly trends
- "Your compatibility has been improving this week"

---

## Edit Friend Modal

### Modal Structure

```
┌─────────────────────────────────────────────────────────┐
│  [X]                                                     │
│                                                          │
│  Edit Friend                                             │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  [Friend's Identity Card Preview]                       │
│                                                          │
│  Relationship: [Dropdown]                                │
│                                                          │
│  [If ghost user]                                         │
│  Name: [Input]                                           │
│  Birth Date: [DateField]                                 │
│  ... (other editable fields)                            │
│                                                          │
│  [Cancel]  [Save Changes]                               │
└─────────────────────────────────────────────────────────┘
```

---

## Delete Friend Confirmation

### Modal Structure

```
┌─────────────────────────────────────────────────────────┐
│  [X]                                                     │
│                                                          │
│  ⚠️  Remove Friend?                                      │
│                                                          │
│  Are you sure you want to remove [Friend Name] from     │
│  your friends list?                                      │
│                                                          │
│  This will remove the relationship but won't delete     │
│  their profile data.                                     │
│                                                          │
│  [Cancel]  [Remove Friend]                              │
└─────────────────────────────────────────────────────────┘
```

---

## Responsive Design

### Desktop (xl breakpoint)
- **Grid Layout**: 2-3 columns of friend cards
- **Card Size**: Larger, more horizontal layout
- **Actions**: All visible inline

### Tablet (md breakpoint)
- **Grid Layout**: 2 columns
- **Card Size**: Medium
- **Actions**: Stacked or inline depending on space

### Mobile (< md)
- **Grid Layout**: 1 column (stacked)
- **Card Size**: Full width, vertical layout
- **Actions**: Stacked buttons

---

## Visual Design System

### Colors (Relationship Badges)
- `romantic`: `bg-pink-100 text-pink-700 border-pink-200`
- `family`: `bg-blue-100 text-blue-700 border-blue-200`
- `friend`: `bg-green-100 text-green-700 border-green-200`
- `colleague`: `bg-purple-100 text-purple-700 border-purple-200`
- `other`: `bg-slate-100 text-slate-700 border-slate-200`

### Typography
- Section Title: `text-2xl md:text-3xl font-medium tracking-tighter`
- Friend Name: `text-base md:text-lg font-medium`
- Relationship Badge: `text-xs font-medium uppercase tracking-wider`
- Compatibility Score: `text-xl md:text-2xl font-bold`

### Spacing
- Section Padding: `py-12 md:py-16 px-6 xl:px-0`
- Card Gap: `gap-4 md:gap-6`
- Card Padding: `p-6 md:p-8`

---

## Interaction States

### Friend Card
- **Hover**: Slight elevation, border highlight
- **Click Identity Card**: Navigate to friend's compatibility
- **Click "?" Icon**: Show compatibility score tooltip/modal
- **Click Actions**: Open respective modals

### Add Friend Button
- **Default**: Primary button style
- **Disabled**: Gray, when at friend limit (10/10)
- **Hover**: Scale slightly, shadow

---

## Loading States

### Initial Load
- Skeleton cards while fetching friends list
- 3-4 skeleton cards in grid layout

### Adding Friend
- Loading spinner in modal submit button
- Disable form inputs during submission

### Fetching Compatibility Score
- Loading spinner in "?" icon
- Show "Calculating..." text

---

## Error States

### Invalid User Code
- Red border on input
- Error message: "User code not found"
- Disable submit button

### Duplicate Friend
- Toast notification: "This friend is already in your list"
- Highlight existing friend card

### Friend Limit Reached
- Disable "Add Friend" button
- Show toast: "You've reached the maximum of 10 friends"

---

## Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation support
- Focus states visible
- Screen reader friendly relationship badges
- Alt text for identity card images

---

## Next Steps for Implementation

1. **Create Type Definitions** (`types/friend.ts`)
2. **Create API Actions** (`app/actions/friendAction.ts`)
3. **Create FriendCard Component** (`components/me-page/FriendCard.tsx`)
4. **Create MeFriendsSection Component** (`components/me-page/MeFriendsSection.tsx`)
5. **Create AddFriendModal Component** (`components/modals/AddFriendModal.tsx`)
6. **Create EditFriendModal Component** (`components/modals/EditFriendModal.tsx`)
7. **Create DeleteFriendModal Component** (`components/modals/DeleteFriendModal.tsx`)
8. **Integrate into /me page** (`app/(app)/me/page.tsx`)
