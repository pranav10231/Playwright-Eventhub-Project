/**
 * ============================================================================
 * ASSIGNMENT NOTE: Package Differences
 * * 1. 'playwright' package: 
 * This is the core automation library used to control browsers (Chromium, Firefox, WebKit). 
 * It provides the raw APIs for page interaction, but it does NOT include a test runner, 
 * assertions (like expect), or test reporting utilities out of the box.
 * * 2. '@playwright/test' package: 
 * This is the complete End-to-End testing framework. It wraps the core 'playwright' 
 * package and adds everything needed for testing: the test runner ('test' blocks), 
 * web-first assertions ('expect'), parallel execution, fixtures, and HTML reporting.
 * ============================================================================
 */
