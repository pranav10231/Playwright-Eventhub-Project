const{page, expect} = require('@playwright/test');

class EventsPage {

    constructor(page){
        this.page = page;
        this.searchPlaceholder = page.getByPlaceholder("Search events, venues…");
        this.categoryDropdown = page.getByRole('combobox').first(); 
        this.cityDropdown = page.getByRole('combobox').last();
        this.clearFiltersButton = page.getByRole("button", {name : 'Clear filters'});
        this.eventCards = page.locator('#event-card');
        this.worldTechEventCard = page.locator("#event-card", {hasText : 'World Tech Summit'});
        this.worldTechEventTtile = this.worldTechEventCard.locator('h3');
        this.worldTechEventPrice = this.worldTechEventCard.locator('.text-indigo-700').last();
        this.worldTechEventseats = this.worldTechEventCard.locator('.text-amber-600');
        this.bookNowButton = this.worldTechEventCard.locator("#book-now-btn");
        this.techEventName = "World Tech Summit";
        this.eventHeading = page.locator('h1').first();
        this.eventprice = page.locator(".text-indigo-700").nth(2);
        this.worldTechEventPriceText;
    }

    async filterTheEvent(){
        await this.searchPlaceholder.fill("World");
        // Info : Combobox is also one kind of dropdown 
        // await categoryDropdown.selectOption({label : 'Conference'});
        await this.categoryDropdown.selectOption('Conference');
        await this.cityDropdown.selectOption('Hyderabad');
        await this.clearFiltersButton.isVisible();
        // await clearFiltersButton.click();
     }

    async getEventCards(){
        const eventCount = await this.eventCards.count();
        console.log("the event count is : ", eventCount);
        return eventCount;
     }

    async checkfilteredEventCardVisible(){
        await this.eventCards.first().isVisible();
        await this.worldTechEventCard.isVisible();
    }

    async verifyEventCardElements(){
        // Extract text and reuse it in assertions
        // From the matching card, read and store:

        // eventTitle from the heading text
        const worldTechText = await this.worldTechEventTtile.textContent();
        console.log("Text Is : "+worldTechText);

        // eventPriceText from the visible price text
        this.worldTechEventPriceText = await this.worldTechEventPrice.textContent();
        console.log("Price of the event is :" +this.worldTechEventPriceText);

        // eventSeatsText from the visible seat text
        const worldTechEventseatsText = await this.worldTechEventseats.textContent();
        console.log("Seats available text is :" +worldTechEventseatsText);

        const numericSeatValue = worldTechEventseatsText.split(" ");
        console.log("Split words are : "+numericSeatValue);
        let seats;

        for(let i=0; i<numericSeatValue.length; i++){
            if(numericSeatValue[i] != "seats" && numericSeatValue[i] != "left!" ){
            seats = Number(numericSeatValue[i]);
            }
        }
        console.log(seats);

        //   Assert eventTitle equals World Tech Summit
        await expect(worldTechText).toEqual(this.techEventName);

        //    Assert eventPriceText contains $
        await expect(this.worldTechEventPriceText).toContain('$');
    
        //    Parse eventSeatsText using your parseSeatCount helper and assert the extracted value is greater than 0
        await expect(seats).toBeGreaterThan(0);
        
    }


    async clickOnBookNowButton(){
        // Inside the matching card, click the Book Now link using a locator scoped to that card only
        await this.bookNowButton.click();
    }

    async confirmBooking(){
        // Assert the page URL contains /events/
        await expect(this.page).toHaveURL(/events/);

        // Assert the h1 heading on the detail page equals the stored eventTitle
        const eventHeadingText = await this.eventHeading.textContent();
        console.log("The heading text of event is :"+eventHeadingText);
        await expect(eventHeadingText).toEqual(this.techEventName);

        // Assert the Price per ticket section contains eventPriceText
        const eventpriceText = await this.eventprice.textContent();
        console.log(eventpriceText);
        //const worldTechEventPriceText = await this.worldTechEventPrice.textContent();
        await expect(eventpriceText).toContain(this.worldTechEventPriceText);
    }

    async clearTheFiltersAndAssertEventList(){
        //Clear the search field
        await this.searchPlaceholder.fill("");

        // Reset category to All Categories
        await this.categoryDropdown.selectOption('All Categories');

        // Reset city to All Cities
        await this.cityDropdown.selectOption('All Cities');

        // Assert at least 3 event cards are visible
        const events = await this.getEventCards();
        console.log("Events displaying are :" + events);
        await expect(events).toBeGreaterThanOrEqual(3);
    }

    async compareSpecificItemsFromTheList(){
        // Step 2 — Compare specific items from the list
        // Read the heading text from the first event card
        const firstEventCardHeadingText = await this.eventCards.locator('h3').first().textContent();
        console.log("first Event Heading text is :" + firstEventCardHeadingText);
    
        // Read the heading text from the last event card
        const lastEventCardHeadingText = await this.eventCards.locator('h3').last().textContent();
        console.log("last Event Heading text is :" + lastEventCardHeadingText);

        // Read the heading text from the second event card using .nth(1)
        const secondEventCardHeadingText = await this.eventCards.locator('h3').nth(1).textContent();
        console.log("second Event Heading text is :" + secondEventCardHeadingText);

        // Assert all extracted titles are non-empty strings
        const allEventTitles = [
            firstEventCardHeadingText,
            secondEventCardHeadingText,
            lastEventCardHeadingText,
        ];
        console.log("All event titles :" + allEventTitles.join(', '));

        // Assert the first and last titles are not equal
        await expect(firstEventCardHeadingText).not.toEqual(lastEventCardHeadingText);
    }


}

module.exports = {EventsPage};
