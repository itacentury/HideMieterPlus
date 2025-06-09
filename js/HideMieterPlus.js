/**
 * Main class for managing card elements and their filtering functionality
 */
class CardManager {
  constructor() {
    // Cache for tab data to avoid repeated DOM queries
    this.tabsCache = null;

    // Initialize the class when it's created
    this.init();
  }

  /**
   * Initializes the CardManager and executes the main logic
   */
  init() {
    try {
      this.hideCards();
    } catch (error) {
      console.error("Error initializing CardManager:", error);
    }
  }

  /**
   * Checks if a parent element contains a child with a specific class
   * @param {Element} parentElement - The parent element to search within
   * @param {string} className - The name of the class to search for
   * @returns {boolean} True if a child with the class was found
   */
  hasChildWithClass(parentElement, className) {
    if (!parentElement || typeof className !== "string") {
      return false;
    }

    const childWithClass = parentElement.querySelector(`.${className}`);
    return childWithClass !== null;
  }

  /**
   * Collects all map toggle tabs and caches the result for better performance
   * @returns {Array} Array of tab objects with element, mode, and selection status
   */
  getAllMapToggleTabs() {
    // If already cached, return cached version
    if (this.tabsCache) {
      return this.tabsCache;
    }

    const testIds = [
      "mapToggleListMode",
      "mapToggleHybridViewMode",
      "mapToggleClassicMapMode",
    ];

    this.tabsCache = testIds
      .map((testId) => {
        const tab = document.querySelector(`[data-testid="${testId}"]`);

        if (!tab) {
          console.warn(`Tab with testId "${testId}" not found`);
          return null;
        }

        return {
          element: tab,
          mode: testId.replace(/^mapToggle/, "").replace(/Mode$/, ""),
          isSelected: tab.getAttribute("aria-selected") === "true",
        };
      })
      .filter((tab) => tab !== null); // Remove null values from missing tabs

    return this.tabsCache;
  }

  /**
   * Finds a tab based on its mode
   * @param {string} mode - The mode to search for (e.g., "List", "HybridView")
   * @returns {Object|null} The tab object or null if not found
   */
  findTabByMode(mode) {
    const allTabs = this.getAllMapToggleTabs();
    const foundTab = allTabs.find((tab) => tab.mode === mode);

    if (!foundTab) {
      console.warn(`Tab with mode "${mode}" not found`);
    }

    return foundTab || null;
  }

  /**
   * Determines all relevant card elements that should be considered for filtering
   * This includes both content cards and sponsored/touchpoint cards
   * @returns {Array} Array of all card elements to be processed
   */
  getCards() {
    const listModeTab = this.findTabByMode("List");
    const isListModeActive = listModeTab && listModeTab.isSelected;

    let contentCards;
    if (isListModeActive) {
      contentCards = document.getElementsByClassName("result-list__listing");
    } else {
      contentCards = document.getElementsByClassName("listing-card");
    }

    // Always include touchpoint cards regardless of the current mode
    // These are sponsored content that should be filtered out
    const touchpointCards = document.getElementsByClassName("touchpoint-card");

    // Convert HTMLCollections to arrays and combine them
    const allContentCards = Array.from(contentCards);
    const allTouchpointCards = Array.from(touchpointCards);

    // Combine both types of cards into a single array
    const allCards = [...allContentCards, ...allTouchpointCards];

    console.log(
      `Found ${allContentCards.length} content cards and ${allTouchpointCards.length} touchpoint cards`
    );

    return allCards;
  }

  /**
   * Hides all cards that contain paywall or sponsored content
   * This is the main function that orchestrates the entire filtering logic
   */
  hideCards() {
    const cards = this.getCards();

    if (!cards || cards.length === 0) {
      console.log("No cards found to filter");
      return;
    }

    let hiddenCount = 0;

    // Iterate over all cards and hide paywall and sponsored cards
    for (const card of cards) {
      const hasPaywallClass =
        this.hasChildWithClass(card, "paywall-label") ||
        this.hasChildWithClass(card, "plusBooking");

      const hasSponsoredClass = card.classList.contains("touchpoint-card");

      if (hasPaywallClass || hasSponsoredClass) {
        card.style.display = "none";
        hiddenCount++;

        card.classList.add("hidden-card");
      }
    }

    console.log(
      `${hiddenCount} cards hidden out of ${cards.length} total cards`
    );
  }

  /**
   * Reset the tabs cache
   */
  refreshTabsCache() {
    this.tabsCache = null;
  }

  /**
   * Public method to re-execute card filtering
   * Useful when tab status changes
   */
  reapplyFilters() {
    this.refreshTabsCache();
    this.hideCards();
  }
}

const cardManager = new CardManager();

document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (clickedElement.matches('[data-testid^="mapToggle"]')) {
    setTimeout(() => {
      cardManager.reapplyFilters();
    }, 500);
  }
});

document
  .querySelector('nav[aria-label="pagination"]')
  .addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) return;

    setTimeout(() => {
      cardManager.reapplyFilters();
    }, 500);
  });
