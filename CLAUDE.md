# AeonReact – Project Context

## What this is
A React SPA that replaces the physical turn-order deck in **Aeon's End** (cooperative board game).
No backend, no router, no server state. Everything is client-side.

**User goal**: polish and maintain this app. Do not add features or change game rules.

## Stack
Vite 8 · React 19 · MUI 9 · TypeScript 5 · Vitest 4 · use-long-press 3 · FontAwesome 7

`npm run dev` → http://localhost:5173

---

## Core state (DealerContext / Dealer.tsx)

| Field | Type | Meaning |
|---|---|---|
| `deck` | `CardValue[]` | Current card order |
| `deckIds` | `string[]` | Stable FLIP-animation keys — always parallel to `deck` |
| `deckIndex` | `number` | Index of the **last face-up card**. **Can be −1** (zero cards face-up). Cards 0..deckIndex are face-up. |
| `forcePeek` | `boolean[]` | Per-card "known face-down" flag — persists when a card moves from face-up to face-down |
| `editModeOn` | `boolean` | Reorder mode |
| `baseDeck` / `nemesisDeck` | enum types | Deck configuration |
| `hasFriend` / `hasFoe` | boolean | Optional extra cards |

All state lives in `Dealer.tsx`, provided via `DealerContext.ts`.

### Face-up rule
```
isUp = deckIndex >= currentIndex   // see CardRow.tsx
```
`deckIndex = −1` → all cards face-down. `deckIndex = 0` → only card 0 face-up.

---

## Card.tsx — the most complex component

### Normal mode (`useLongPress`, threshold 1000ms)
- **Tap** → `drawCard()` (increments deckIndex)
- **Long-press** face-down card → transient `peek` (card shows value briefly, resets on release)
- Spinner shows after 300ms delay, fills over ~700ms

### Edit/reorder mode (pointer handlers, `useLongPress` NOT mounted)
- **Face-up card, swipe up/down** → `sendToTop()` / `sendToBottom()`: moves card, decrements deckIndex (no floor — allows −1)
- **Face-down + forcePeek, swipe left/right** → `slide()`: shifts one position
- **Face-down (unknown), hold ≥500ms then release without swipe** → `forcePeekMe()` (permanent peek)
- `SWIPE_THRESHOLD = 45px`; direction locks after 12px of movement
- Chevrons are **decorative** (`pointerEvents: none`), driven by `swipeDir` state

### 3D flip DOM structure
```
Box (outer, zIndex: z.card)
  Box (handler target — useLongPress or pointer handlers spread here)
    Box (spinner overlay, zIndex: z.leftMenu)
    Box (aspect-ratio container, transparent, no overflow — hover lift)
      Box (perspective: 800px)
        Box (flip inner — transformStyle: preserve-3d, transition 0.55s)
          Box (BACK face — backfaceVisibility: hidden, rotateY(0deg))
            Box (card texture — filter: blur(1px), SEPARATE child so blur doesn't affect number)
            Box (gloss sheen)
          Box (FRONT face — backfaceVisibility: hidden, rotateY(180deg))
            Box (card texture with accent color)
            Box (Flames + number)
            Box (gloss sheen)
      Box (peek overlay — face color + number, no flames, shown when peek || forcePeek)
      chevrons (showUpDown / showLeftRight)
```

**Critical structural rules:**
- `boxShadow` lives on each face, NOT the aspect-ratio container — otherwise a ghost rectangle is visible at edge-on during the flip
- Card texture (`filter: blur`) must be a separate child Box from the number — blur on a container blurs children too
- Gloss sheen must be inside each face so it rotates with the card

---

## CardRow.tsx — FLIP slide animation

Each card is wrapped in a `<div data-card-id={deckIds[n] ?? String(n)}>`.

`useLayoutEffect` (no dep array — runs every render):
1. Reads `getBoundingClientRect()` for every child via its `data-card-id`
2. Compares to previous rects stored in `prevRectsRef`
3. If a card moved, applies the inverse transform (`translate(dx, dy)`) with `transition: none`
4. On `requestAnimationFrame`, removes the transform with `transition: 0.38s cubic-bezier`

**Requires stable keys** — `deckIds` ensures React moves DOM nodes on reorder instead of destroying/recreating them. The `?? String(n)` fallback covers the initial render before `deckIds` is populated.

---

## Reorder: keeping three arrays in sync

Every reorder operation (`sendToTop`, `sendToBottom`, `slide`) must update all three in one batch:
- `deck` (card values)
- `deckIds` (FLIP keys) — uses functional updater `setDeckIds(prev => ...)`
- `forcePeek` (known-card flags)

`deckIndex` is decremented (not clamped) when a face-up card moves to a face-down position.

---

## Theme files

| File | Purpose |
|---|---|
| `cardStyles.ts` | 5 patterns: `loops`, `cracks`, `scales`, `diamonds`, `shimmer`. Called as `cardStyles[style](accentColor?)`. Back face: no arg. Front face: `flameSets[cardValue][3]` as accent. |
| `flameSets.ts` | Maps `CardValue` → `[c1, c2, c3, c4]`. Index 3 = card-style accent color. |
| `z.ts` | z-index constants: card=1, editOverlay=101, leftMenu=100, scrim=99 |
| `colors.ts` | Shared color tokens |
| `backgroundStyle.ts` | Page background radial-gradient tile |
| `keyframes.css` | CSS keyframe animations (loopsDrift, cracksPulse, etc.) |

---

## CardValue type
Includes: `'N'` `'n'` `'X'` `'1'` `'2'` `'3'` `'4'` `'Wild'` `'1/2'` `'3/4'` `'Thief'` `'Myth'` `'Bone'` `'+'` `'-'` `'0'` `''`

---

## EditToggle.tsx

Bottom button area, absolutely positioned. In normal mode: single "Reorder Deck" button centered. In edit mode: two buttons side by side.

- **Shuffle Face-Down**: queues a `pendingShuffle` on context (shuffled arrays, not yet committed). CardRow `useEffect` runs a two-phase animation: (1) **gather** — face-down elements CSS-translate toward the center of the face-down area, z-index 10, 280ms ease-in; (2) **spread** — overrides `prevRectsRef` to the gathered center positions, clears transforms, commits the state update; the FLIP `useLayoutEffect` then spreads all cards from that shared origin to their new positions. Face-up cards untouched. Disabled when `faceDownCount <= 1`.
- **Return to Game**: toggles `editModeOn` off.

---

## Gotchas

- `deckIndex` can be **−1** — the only floor was removed intentionally so reordering the last face-up card face-down results in 0 face-up cards
- `useLongPress` is conditionally spread in normal mode; in edit mode a different set of pointer handlers is spread instead — they are never both active
- Reorder helpers (`doSendToTop`, `doShift`, `doSendToBottom`) read `deckIndex` from the render closure — be careful if chaining state updates
- `@fortawesome/react-fontawesome` is v3 (FA v7 compatible); v0.2.x was for FA v6 — they are not interchangeable
- Edit-mode peek uses `Date.now()` timestamps; no spinner feedback during the hold
