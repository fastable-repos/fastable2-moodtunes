import { test, expect, type Page } from '@playwright/test';
import { captureScreenshot } from './helpers';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Clear MoodTunes localStorage keys so each test starts fresh */
async function clearStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.removeItem('moodtunes_sessions');
    localStorage.removeItem('moodtunes_current_draft');
  });
}

/**
 * Complete the mood questionnaire and land on the Results screen.
 * @param energy     1-5
 * @param positivity 1-5
 * @param emoji      optional emoji character from the grid (e.g. '😊')
 */
async function completeQuestionnaire(
  page: Page,
  energy: number,
  positivity: number,
  emoji?: string,
): Promise<void> {
  await page.click(`[data-testid="energy-${energy}"]`);
  await page.click(`[data-testid="positivity-${positivity}"]`);
  if (emoji) {
    await page.click(`[data-testid="emoji-${emoji}"]`);
  }
  await page.click('[data-testid="analyze-button"]');
  await expect(page.locator('[data-testid="mood-result-card"]')).toBeVisible({ timeout: 8000 });
}

// ─── Suite ───────────────────────────────────────────────────────────────────

test.describe('MoodTunes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear any leftover data from a previous test run then reload so the
    // React app boots with a completely clean slate.
    await clearStorage(page);
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  // ── Screenshot: Questionnaire Screen ──────────────────────────────────────

  test('screenshot – questionnaire screen', async ({ page }) => {
    // App starts on the questionnaire screen by default
    await expect(page.locator('[data-testid="analyze-button"]')).toBeVisible();
    await captureScreenshot(page, 'questionnaire-screen');
  });

  // ── 1. Happy path – Complete questionnaire and view results ───────────────

  test('1. happy path – complete questionnaire and view Euphoric results', async ({ page }) => {
    // Energy 5 (⚡) + Positivity 5 (😄) → Euphoric
    await page.click('[data-testid="energy-5"]');
    await page.click('[data-testid="positivity-5"]');
    // Pick optional 😊 emoji from the grid
    await page.click('[data-testid="emoji-😊"]');
    await page.click('[data-testid="analyze-button"]');

    // Mood result card with 'Euphoric' label
    await expect(page.locator('[data-testid="mood-result-card"]')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('[data-testid="mood-label"]')).toContainText('Euphoric');

    // 5+ playlist suggestion cards
    const playlists = page.locator('[data-testid="playlist-card"]');
    await expect(playlists.first()).toBeVisible();
    const playlistCount = await playlists.count();
    expect(playlistCount).toBeGreaterThanOrEqual(5);

    // 3 activity items
    await expect(page.locator('[data-testid="activities-section"]')).toBeVisible();
    const activities = page.locator('[data-testid^="activity-"]');
    await expect(activities.first()).toBeVisible();
    const activityCount = await activities.count();
    expect(activityCount).toBeGreaterThanOrEqual(3);

    // Journal prompt is shown
    await expect(page.locator('[data-testid="journal-prompt"]')).toBeVisible();

    // Screenshot: Results screen
    await captureScreenshot(page, 'results-screen');
  });

  // ── 2. Happy path – Save session and view in history ─────────────────────

  test('2. happy path – save session and view it in history', async ({ page }) => {
    await completeQuestionnaire(page, 5, 5, '😊');

    // Write a journal entry
    await page.fill('[data-testid="journal-textarea"]', 'Feeling amazing today!');

    // Save the session
    await page.click('[data-testid="save-session-button"]');
    await expect(page.locator('[data-testid="session-saved-banner"]')).toBeVisible({ timeout: 5000 });

    // Navigate to History tab
    await page.click('[data-testid="nav-history"]');

    // Session card should appear
    await expect(page.locator('[data-testid="history-card"]')).toBeVisible({ timeout: 5000 });

    // Correct mood label
    await expect(page.locator('[data-testid="history-card-mood-label"]')).toContainText('Euphoric');

    // Today's date is shown (we just check the month abbreviation is present)
    const todayMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
    await expect(page.locator('[data-testid="history-card-date"]').first()).toContainText(todayMonth);

    // Screenshot: History screen (with one card)
    await captureScreenshot(page, 'history-screen');
  });

  // ── 3. Data persistence – reload and verify history ───────────────────────

  test('3. data persistence – session survives page reload', async ({ page }) => {
    await completeQuestionnaire(page, 5, 5, '😊');
    await page.fill('[data-testid="journal-textarea"]', 'Persistence test entry.');
    await page.click('[data-testid="save-session-button"]');
    await expect(page.locator('[data-testid="session-saved-banner"]')).toBeVisible({ timeout: 5000 });

    // Refresh the browser
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Navigate to history
    await page.click('[data-testid="nav-history"]');

    // Session card still visible
    await expect(page.locator('[data-testid="history-card"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-testid="history-card-mood-label"]')).toContainText('Euphoric');

    // Expand the card to check the journal entry
    await page.click('[data-testid="expand-button"]');
    await expect(page.locator('text=Persistence test entry.')).toBeVisible({ timeout: 5000 });
  });

  // ── 4. Edge case – Submit without optional emoji ──────────────────────────

  test('4. edge case – submit questionnaire without selecting optional emoji', async ({ page }) => {
    // Energy 3 (medium) + Positivity 3 (neutral) → Calm   (no emoji selected)
    await page.click('[data-testid="energy-3"]');
    await page.click('[data-testid="positivity-3"]');
    // Intentionally skip emoji selection
    await page.click('[data-testid="analyze-button"]');

    // Result card should still appear without errors
    await expect(page.locator('[data-testid="mood-result-card"]')).toBeVisible({ timeout: 8000 });
    // medium energy + neutral positivity → Calm
    await expect(page.locator('[data-testid="mood-label"]')).toContainText('Calm');
  });

  // ── 5. Edge case – Delete a session from history ─────────────────────────

  test('5. edge case – delete a session from history', async ({ page }) => {
    // Save a session
    await completeQuestionnaire(page, 5, 5, '😊');
    await page.click('[data-testid="save-session-button"]');
    await expect(page.locator('[data-testid="session-saved-banner"]')).toBeVisible({ timeout: 5000 });

    // Go to History
    await page.click('[data-testid="nav-history"]');
    await expect(page.locator('[data-testid="history-card"]')).toBeVisible({ timeout: 5000 });

    // Click the delete (trash) icon
    await page.click('[data-testid="delete-button"]');

    // Confirmation dialog must appear
    await expect(page.locator('[data-testid="delete-confirm-dialog"]')).toBeVisible({ timeout: 5000 });

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-button"]');

    // Card is gone from the list
    await expect(page.locator('[data-testid="history-card"]')).not.toBeVisible({ timeout: 5000 });

    // Reload – still gone (localStorage was updated)
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="nav-history"]');
    await expect(page.locator('[data-testid="empty-history"]')).toBeVisible({ timeout: 5000 });
  });

  // ── 6. Edge case – Multiple sessions in reverse chronological order ────────

  test('6. edge case – three sessions appear in reverse chronological order', async ({ page }) => {
    // Session 1: Euphoric (energy 5, positivity 5)
    await completeQuestionnaire(page, 5, 5);
    await page.fill('[data-testid="journal-textarea"]', 'Session 1 – Euphoric');
    await page.click('[data-testid="save-session-button"]');
    await expect(page.locator('[data-testid="session-saved-banner"]')).toBeVisible({ timeout: 5000 });
    await page.click('[data-testid="new-mood-button"]');

    // Session 2: Depleted (energy 1, positivity 1)
    await completeQuestionnaire(page, 1, 1);
    await page.fill('[data-testid="journal-textarea"]', 'Session 2 – Depleted');
    await page.click('[data-testid="save-session-button"]');
    await expect(page.locator('[data-testid="session-saved-banner"]')).toBeVisible({ timeout: 5000 });
    await page.click('[data-testid="new-mood-button"]');

    // Session 3: Content (energy 3, positivity 5)
    await completeQuestionnaire(page, 3, 5);
    await page.fill('[data-testid="journal-textarea"]', 'Session 3 – Content');
    await page.click('[data-testid="save-session-button"]');
    await expect(page.locator('[data-testid="session-saved-banner"]')).toBeVisible({ timeout: 5000 });

    // Navigate to History
    await page.click('[data-testid="nav-history"]');

    // All 3 cards visible
    await expect(page.locator('[data-testid="history-card"]').nth(2)).toBeVisible({ timeout: 5000 });
    const cards = page.locator('[data-testid="history-card"]');
    expect(await cards.count()).toBe(3);

    // Newest first: Content → Depleted → Euphoric
    const labels = page.locator('[data-testid="history-card-mood-label"]');
    await expect(labels.nth(0)).toContainText('Content');
    await expect(labels.nth(1)).toContainText('Depleted');
    await expect(labels.nth(2)).toContainText('Euphoric');
  });

  // ── 7. Spotify link functionality ─────────────────────────────────────────

  test('7. Spotify link – href contains spotify.com without breaking app state', async ({ page }) => {
    await completeQuestionnaire(page, 5, 5, '😊');

    // Playlist section is visible
    await expect(page.locator('[data-testid="playlist-suggestions"]')).toBeVisible();

    // The first Spotify button has a valid Spotify URL
    const firstLink = page.locator('[data-testid="spotify-link"]').first();
    await expect(firstLink).toBeVisible();
    const href = await firstLink.getAttribute('href');
    expect(href).toContain('spotify.com');

    // App state is undisturbed – result card is still showing
    await expect(page.locator('[data-testid="mood-result-card"]')).toBeVisible();
  });
});
