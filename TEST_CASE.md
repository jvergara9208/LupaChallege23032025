# TEST_CASES.md

## Feature: Hotel Search and Filters

### Scenario: Search for hotels in New York
- **Given** I am on the Booking.com homepage
  - **Action**: Navigate to the Booking.com homepage.
  - **Expected Result**: The URL should include "booking.com".

- **When** I ensure the page has fully loaded
  - **Action**: Check that the page has finished loading.
  - **Expected Result**: The body should not have the class 'loading', and both the header and footer should be visible.

- **And** I ensure no pop-up is present
  - **Action**: Check for and close any pop-up dialogs.
  - **Expected Result**: No pop-up dialogs should be present.

- **And** I enter "New York" in the search bar
  - **Action**: Enter "New York" in the search bar.
  - **Expected Result**: The search bar should contain the text "New York".

- **And** I select check-in and check-out dates
  - **Action**: Select check-in and check-out dates from the calendar.
  - **Expected Result**: The selected dates should be displayed correctly.

- **And** I click the "Search" button
  - **Action**: Click the search button.
  - **Expected Result**: The search results page should be displayed.

- **Then** I should see hotels in "New York" displayed
  - **Action**: Verify that the search results contain hotels in New York.
  - **Expected Result**: The results should contain the text "New York".

- **And** the availability should match the selected dates
  - **Action**: Verify that the availability matches the selected dates.
  - **Expected Result**: The results should show availability for the selected dates.

### Scenario: Apply the "Guest Rating: 8+" filter
- **Given** I am viewing hotel search results for "New York"
  - **Action**: Ensure that the search results for New York are displayed.
  - **Expected Result**: The results should contain the text "New York".

- **When** I apply the "Guest Rating: 8+" filter
  - **Action**: Apply the "Guest Rating: 8+" filter.
  - **Expected Result**: The filter should be applied successfully.

- **Then** only hotels with a guest rating of 8 or higher should be displayed
  - **Action**: Verify that the displayed hotels have a guest rating of 8 or higher.
  - **Expected Result**: All displayed hotels should have a guest rating of 8 or higher.

### Scenario: Sort results by "Lowest Price"
- **Given** I have applied filters for hotels in "New York"
  - **Action**: Ensure that filters for hotels in New York are applied.
  - **Expected Result**: The results should be filtered for hotels in New York.

- **When** I sort the results by "Lowest Price"
  - **Action**: Sort the results by "Lowest Price".
  - **Expected Result**: The results should be sorted by the lowest price.

- **Then** the cheapest hotel should appear at the top of the results
  - **Action**: Verify that the cheapest hotel appears at the top of the results.
  - **Expected Result**: The first result should be the cheapest hotel.