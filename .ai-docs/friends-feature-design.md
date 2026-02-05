# Friends Feature - Design Document

## System Design Analysis

### User Code vs Account Name

**Recommendation: Use User Code**

**Rationale:**
1. **Uniqueness**: User code is unique per user profile, eliminating ambiguity
2. **Already in System**: User codes are already implemented and used for compatibility sharing (`/compat/[code]`)
3. **Multi-Profile Support**: Accounts can have multiple profiles - account name would be ambiguous
4. **Consistency**: Aligns with existing sharing patterns (compatibility links use user codes)
5. **Future-Proof**: Works regardless of whether account usernames are implemented

**Alternative Consideration:**
- If account usernames are added later, they could be used for **discovery/search**, but the underlying friend relationship should still reference user codes for precision

---

## Feature Requirements

### 1. Friend Limit
- Maximum **10 friends** per user
- Validation on both frontend and backend

### 2. Relationship Types
**Simplified - Most Common Use Cases:**

1. `romantic` - Romantic partner, spouse, or significant other
2. `family` - Family member (parent, sibling, child, etc.)
3. `friend` - Friend
4. `colleague` - Work colleague or professional relationship
5. `other` - Other relationship (with optional custom label)

**Total: 5 relationship types**

**Rationale:**
- Covers 90% of use cases without overwhelming users
- Broad enough to be useful, specific enough for focused analysis
- "Family" and "Romantic" are the most important for compatibility insights
- "Other" provides flexibility for edge cases

---

## Data Structure

### Friend Entity

```typescript
interface Friend {
    id: string;
    userId: string; // The user who added this friend
    friendUserId: string; // The friend's user ID (can be ghost user)
    relationshipType: RelationshipType;
    customLabel?: string; // Optional label for "other" relationship
    createdAt: Date;
    updatedAt: Date;
    
    // Populated friend data (from friendUserId)
    friend?: {
        id: string;
        code: string;
        fullName: string;
        identity: {
            code: string;
            title: string;
            element: string;
        };
        rarity?: {
            oneIn: number;
        };
        birthDate: string;
        gender?: "male" | "female";
        isGhostUser?: boolean; // True if created from birthdate only
    };
}

type RelationshipType = 
    | "romantic" 
    | "family" 
    | "friend" 
    | "colleague" 
    | "other";
```

### API Endpoints (Backend to implement)

```
GET    /users/me/friends          - Get all friends for current user
POST   /users/me/friends           - Add a friend
PATCH  /users/me/friends/:id      - Update relationship type
DELETE /users/me/friends/:id      - Remove a friend

POST   /users/me/friends/by-code  - Add friend by user code
POST   /users/me/friends/by-birthdate - Add friend by birthdate (creates ghost user, unique to creator)
GET    /users/me/friends/:id/compatibility - Get today's compatibility score for a friend
```

---

## User Flow

### Adding a Friend

**Option 1: By User Code**
1. User clicks "Add Friend"
2. Modal opens with two tabs: "By Code" and "By Birthdate"
3. **By Code tab:**
   - Input field for user code
   - Search/validate code (optional: show preview of friend's identity)
   - Relationship dropdown
   - Submit → Creates friend relationship

**Option 2: By Birthdate**
1. User clicks "Add Friend" → "By Birthdate" tab
2. Form similar to signup (date, time, gender, cities)
3. Relationship dropdown
4. Submit → 
   - Creates ghost user (orphaned, no account)
   - Creates friend relationship
   - Shows success message

### Managing Friends

**Friends List View:**
- Display up to 10 friends
- Show: Name, Identity card, Relationship type, Actions (Edit/Delete)
- Group by relationship type (optional)
- Quick compatibility check button

**Edit Friend:**
- Change relationship type
- Update ghost user details (if applicable)

**Delete Friend:**
- Confirmation modal
- Deletes the friend relationship only
- Ghost users are unique to creator, so deletion is straightforward

---

## UI/UX Design

### Location
- **Primary**: `/me` page - New section "My Friends" (after Compatibility Share, before Life Questions)
- **Secondary**: Dedicated `/friends` page (future enhancement)

### Components Needed

1. **`MeFriendsSection.tsx`**
   - Displays list of friends
   - "Add Friend" button
   - Friend cards with identity preview

2. **`AddFriendModal.tsx`**
   - Tabs: "By Code" | "By Birthdate"
   - Relationship selector
   - Form validation

3. **`FriendCard.tsx`**
   - Friend's identity card
   - Relationship badge
   - **"?" icon** - Click to show today's compatibility score (tooltip/modal)
   - Quick actions (View Full Compatibility, Edit, Delete)

4. **`EditFriendModal.tsx`**
   - Update relationship type
   - Update ghost user info (if applicable)

---

## Edge Cases & Considerations

### 1. Ghost User Management
- **Ghost users are create-only**: Each ghost user is unique to the creator - multiple users cannot add the same ghost user
- **Invitation**: For MVP, invitation link is simply a signup link (no special claiming flow)
- **Future**: Ghost user claiming/linking can be added post-MVP

### 2. Friend Limit
- Show warning when approaching limit (e.g., 8/10 friends)
- Disable "Add Friend" button at limit
- Show upgrade prompt for premium users (future: increase limit)

### 3. Duplicate Prevention
- Prevent adding the same user code twice
- Prevent adding yourself as a friend
- Prevent creating duplicate ghost users (same birthdate + same creator)
- Show error message if friend already exists

### 4. Privacy
- Friend relationships are private (not visible to others)
- Ghost users created by birthdate are not discoverable by code
- User codes are required for adding existing users

### 5. Compatibility Integration
- Each friend card displays a **"?" (question mark) icon** that can be clicked
- Clicking the question mark shows **today's compatibility score** (daily compatibility insight)
- Full compatibility report available via "Check Compatibility" button → `/compat/[friendCode]`
- Compatibility scores are calculated daily and cached
- Privacy: Adding by code is safe because birthdate isn't revealed to the person being added

---

## Implementation Phases

### Phase 1: Core Functionality (MVP)
- [ ] Backend: Friend CRUD endpoints
- [ ] Backend: Daily compatibility score calculation endpoint
- [ ] Frontend: `MeFriendsSection` component
- [ ] Frontend: `AddFriendModal` (both tabs: By Code, By Birthdate)
- [ ] Frontend: `FriendCard` component with "?" compatibility score display
- [ ] Frontend: Friend list display
- [ ] Frontend: Delete friend functionality
- [ ] Frontend: Friend limit validation (max 10)

### Phase 2: Enhanced UX
- [ ] Frontend: `EditFriendModal` (update relationship type)
- [ ] Frontend: Relationship grouping/filtering
- [ ] Frontend: Full compatibility report link from friend card
- [ ] Frontend: Friend limit warnings (8/10, 9/10)

### Phase 3: Advanced Features (Post-MVP)
- [ ] Ghost user claiming/linking (when person signs up)
- [ ] Friend search/discovery (if usernames implemented)
- [ ] Compatibility history per friend (historical scores)
- [ ] Friend sharing/export

---

## Questions for Discussion

1. **Ghost User Naming**: Should ghost users default to "Anonymous" or allow custom names?
   - **Proposal**: Allow custom name during creation, default to "Anonymous" if not provided

2. **Relationship Customization**: For "other" relationship type, should we allow free-text label?
   - **Proposal**: Yes, with character limit (e.g., 50 chars)

3. **Friend Visibility**: Should friends be visible in profile switcher or separate section?
   - **Proposal**: Separate section on `/me` page, not in profile switcher (friends are per-user, not per-account)

4. **Daily Compatibility Score**: What format should the "?" tooltip/modal show?
   - **Proposal**: Simple score (e.g., "85% compatible today") with brief explanation, link to full report
   - **Implementation**: Backend calculates daily compatibility score, cached per day

5. **Ghost User Updates**: Can users update ghost user details after creation?
   - **Proposal**: Yes, via EditFriendModal if they created the ghost user

## Clarifications (Confirmed)

1. **Ghost User Claiming**: Not needed for MVP - invitation link is just a signup link
2. **Ghost User Uniqueness**: Each ghost user is unique to the creator (not shared between users)
3. **Privacy**: Friend relationships are private. Adding by code is safe because birthdate isn't revealed
4. **Compatibility Score**: Each friend card shows a "?" icon that displays today's compatibility score when clicked

---

## Next Steps

1. **Review & Approve Design**: Confirm relationship types, data structure, and user flow
2. **Backend Implementation**: Design and implement API endpoints
3. **Frontend Implementation**: Build components following existing design patterns
4. **Testing**: Test edge cases, especially ghost user creation and duplicate prevention
5. **Iteration**: Gather user feedback and refine UX
