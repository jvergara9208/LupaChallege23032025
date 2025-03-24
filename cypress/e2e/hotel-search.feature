Feature: Hotel Search and Filters
  As a user
  I want to search for hotels in a specific city and apply filters
  So that I can find a suitable place to stay

  Scenario: Search for hotels in New York
    Given I am on the Booking.com homepage
    When I ensure the page has fully loaded
    And I ensure no pop-up is present
    And I enter "New York" in the search bar
    And I select check-in and check-out dates
    And I click the "Search" button
    Then I should see hotels in "New York" displayed
    And the availability should match the selected dates

  Scenario: Apply the "Guest Rating: 8+" filter
    Given I am viewing hotel search results for "New York"
    When I apply the "Guest Rating: 8+" filter
    Then only hotels with a guest rating of 8 or higher should be displayed

  Scenario: Sort results by "Lowest Price"
    Given I have applied filters for hotels in "New York"
    When I sort the results by "Lowest Price"
    Then the cheapest hotel should appear at the top of the results