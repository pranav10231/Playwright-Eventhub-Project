const {page, expect} = require('@playwright/test');


class HomePage {
    constructor(page){
        this.browseEventsButton  = page.getByRole("link", {name : 'Browse Events', exact: true});
        this.upcomingEventsTitle = page.locator(".mb-8 h1");
    }


    async clickOnBrowseEvents(){
        await this.browseEventsButton.click();
    }

    async WaitforUpcomingEventsTitleToLoad(){
        await this.upcomingEventsTitle.isVisible();
    }

}

module.exports = {HomePage};


