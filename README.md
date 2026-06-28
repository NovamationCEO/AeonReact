# AeonReact

A digital card-deck manager for the cooperative board game [Aeon's End](https://boardgamegeek.com/boardgame/191189/aeons-end).

## What it does

Aeon's End uses a small shuffled deck of cards (typically 6–8) to control turn order each round. This app replaces the physical deck — players configure their setup once, then tap cards to reveal them in sequence. When the last card is revealed the deck automatically reshuffles and resets.

### Features

- **Player count** — 1, 2, 3, or 4 players (including two-team AB mode)
- **Nemesis deck variants** — Standard, Charged (N/X), Thief of Dreams, Paradox of Myth and Bone
- **Friend / Foe** — optional extra cards toggled per session
- **Peek** — long-press any face-down card to preview it without advancing the deck
- **Reorder mode** — rearrange the remaining draw order mid-round
- **Card back styles** — two CSS-texture options (Cracks and Loops)

### Interaction

| Action | Result |
|--------|--------|
| Tap a card | Reveal the next card in the deck |
| Long-press a face-down card | Peek at it (temporarily) |
| Gear icon (left edge) | Open settings menu |
| Reorder button (bottom) | Enter reorder mode |
| Reorder mode — arrows | Slide a card left or right in the remaining deck |
| Reorder mode — stack icon | Move a card to the next-to-draw position or bottom |

## Development

```bash
yarn start    # dev server at http://localhost:3000
yarn build    # production build
yarn test     # run tests
```

Built with React 18, TypeScript, MUI 5, and Create React App.
