const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../Pages/LoginPage');
const {HomePage} = require('../Pages/HomePage');
const {EventsPage} = require('../Pages/EventsPage');

test('Use different locator strategies and filter the Events page',async ({page}) => {

   //  Call your login(page) helper
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForLoadState('networkidle');

    const homePage = new HomePage(page);
    await homePage.clickOnBrowseEvents();
    await homePage.WaitforUpcomingEventsTitleToLoad();

    const eventsPage = new EventsPage(page);
    await eventsPage.filterTheEvent();
    const eventCount = await eventsPage.getEventCards();
    await eventsPage.checkfilteredEventCardVisible();
    await eventsPage.verifyEventCardElements();
    await eventsPage.clickOnBookNowButton();
    // This we can use when next page is loading.
    await page.waitForLoadState('networkidle');
    await eventsPage.confirmBooking();

});

test('Practice nth, first, and last on the event list',async ({page}) => {

   //  Call your login(page) helper
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.waitForLoadState('networkidle');

    const homePage = new HomePage(page);
    await homePage.clickOnBrowseEvents();
    await homePage.WaitforUpcomingEventsTitleToLoad();

    const eventsPage = new EventsPage(page);
    await eventsPage.filterTheEvent();
    await eventsPage.getEventCards();
    await eventsPage.checkfilteredEventCardVisible();
    await eventsPage.verifyEventCardElements();
    await eventsPage.clickOnBookNowButton();
    // This we can use when next page is loading.
    await page.waitForLoadState('networkidle');
    await eventsPage.confirmBooking();

    await page.goBack();
    await eventsPage.clearTheFiltersAndAssertEventList();
    await eventsPage.compareSpecificItemsFromTheList();


});