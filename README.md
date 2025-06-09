# HideMieterPlus

A browser extension to automatically hide MieterPlus exclusive and sponsored listings on ImmoScout24.

## Overview

This extension identifies and hides unwanted content cards on ImmoScout24 search pages, specifically targeting:

- **MieterPlus exclusive listings** (cards with `paywall-label` or `plusBooking` classes)
- **Sponsored content** (cards with `touchpoint-card` class)

The filter works across different view modes (List, Hybrid View, Classic Map) and automatically reapplies when users switch between these modes.

## Features

- **Smart Card Detection**: Automatically identifies content cards based on the current view mode
- **Multi-Type Filtering**: Hides both MieterPlus exclusive and sponsored content
- **View Mode Awareness**: Adapts to List mode vs. Map mode card structures
- **Performance Optimized**: Uses caching to avoid repeated DOM queries
- **Auto-Refresh**: Reapplies filters when view modes change
- **Error Handling**: Includes comprehensive error handling and logging
- **ImmoScout24 Specific**: Designed specifically for ImmoScout24 search pages

## Installation

### Firefox

#### Option 1: Firefox Add-on Store (Recommended)

1. Visit the [HideMieterPlus add-on page](https://addons.mozilla.org/en-US/firefox/addon/hidemieterplus/) on Mozilla Add-ons
2. Click "**Add to firefox**"
3. Confirm the installation when prompted
4. The extension will automatically activate on ImmoScout24 search pages

#### Option 2: Manual Installation (Developer Mode)

1. Download newest release
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension folder
5. The extension will automatically activate on ImmoScout24 search pages

> Note: Manual installations are temporary and will be removed when Firefox restarts. For permanent installation, use the Firefox Add-on Store or sign the extension for development.

### Chrome/Chromium-based browsers

_Comming soon_

## How It Works

1. **Initialization**: The CardManager class initializes automatically when you visit ImmoScout24 search pages
2. **Card Detection**: Identifies cards based on current view mode:

   - **List Mode**: Targets elements with class `result-list__listing`
   - **Map Modes**: Targets elements with class `listing-card`
   - **Sponsored Content**: Always targets `touchpoint-card` elements

3. **Filtering Logic**: Hides cards that contain:

   - Elements with class `paywall-label`
   - Elements with class `plusBooking`
   - Parent elements with class `touchpoint-card`

4. **Dynamic Updates**: Listens for tab clicks and reapplies filters automatically

## Supported Pages

The extension works on all ImmoScout24 search pages:

- `https://www.immobilienscout24.de/Suche/*`
- `https://immobilienscout24.de/Suche/*`

## Technical Details

### Browser Compatibility

- ~~Chrome 88+ / Chromium-based browsers~~
- Firefox 78+
- Uses modern JavaScript (ES6+) features
- Manifest V2 format

### Performance Considerations

- **Caching**: Tab data is cached to avoid repeated DOM queries
- **Event Debouncing**: Uses 100ms timeout for tab click events
- **Efficient Selectors**: Uses class-based selection for optimal performance
- **Minimal Impact**: Only loads on ImmoScout24 search pages

### DOM Elements Targeted

| Element Type         | Class Name                     | Purpose                     |
| -------------------- | ------------------------------ | --------------------------- |
| Content Cards (List) | `result-list__listing`         | Main content in list view   |
| Content Cards (Map)  | `listing-card`                 | Main content in map view    |
| Paywall Indicators   | `paywall-label`, `plusBooking` | Identifies paid content     |
| Sponsored Content    | `touchpoint-card`              | Sponsored/promoted listings |

## Troubleshooting

- **Extension not working**: Make sure you're on an ImmoScout24 search page (`/Suche/` URL)
- **Cards still visible**: Try refreshing the page or switching between view modes
- **Performance issues**: Check browser console for any error messages

## Privacy

This extension:

- Only runs on ImmoScout24 search pages
- Does not collect or transmit any data
- Works entirely locally in your browser
- Does not modify ImmoScout24's servers or data

## License

This project is licensed under the GNU General Public License v3.0 - see the `LICENSE` file for details.

Not affiliated with ImmoScout24.
