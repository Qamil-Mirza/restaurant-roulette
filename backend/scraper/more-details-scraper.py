from selenium import webdriver
from selenium.webdriver.common.by import By
import bs4 as bs
import time
import json

with open('restaurants.json', 'r') as file:
    data = json.load(file)

# Initialize the driver
driver = webdriver.Chrome()

def get_details(restaurant_name, details_link, location, contact, img_link):
    try:
        # Load the page
        driver.get(details_link)
        time.sleep(5)  # Wait for the page to load

        page_source = driver.page_source
        soup = bs.BeautifulSoup(page_source, 'lxml')

        # Check if the page is a 404 page
        body = soup.find('body')
        if 'error404' in body.get('class', []):
            raise Exception('404 Page Not Found')

        # Extract details
        description = soup.find('div', class_="row-1__desc").text.strip() if soup.find('div', class_="row-1__desc") else 'No description available'
        location = soup.find('li', class_="shopLotID").text if soup.find('li', class_="shopLotID") else location
        contact = soup.find('li', class_="shopContact").text.strip() if soup.find('li', class_="shopContact") else contact
        img_div = soup.find('div', class_="col-md-6")
        img_link = img_div.img['src'] if img_div and img_div.img else img_link

        # Get table data
        table = soup.find('tbody')
        rows = table.find_all('tr') if table else []
        cuisine = rows[0].find('td', class_="table-content").text if len(rows) > 0 else ''
        price_range = rows[3].find('td', class_="table-content").text if len(rows) > 3 else ''
        restaurant_website_link = rows[5].find('td', class_="table-content").a['href'] if len(rows) > 5 and rows[5].find('td', class_="table-content").a else ''
        other_info = rows[6].find('td', class_="table-content").text.replace('\n', '') if len(rows) > 6 else ''
        
        # Get review
        review_container = soup.find('div', class_="col-md-12")
        review = review_container.p.text if review_container and review_container.p else ''

    except Exception as e:
        print(f"An error occurred for {restaurant_name}: {e}")
        return {
            'restaurant_name': restaurant_name,
            'description': 'No description available',
            'location': location,
            'contact': contact,
            'img_link': img_link,
            'cuisine': '',
            'price_range': '',
            'restaurant_website_link': '',
            'other_info': '',
            'review': ''
        }
    
    restaurant = {
        'restaurant_name': restaurant_name,
        'description': description,
        'location': location,
        'contact': contact,
        'img_link': img_link,
        'cuisine': cuisine,
        'price_range': price_range,
        "restaurant_website_link": restaurant_website_link,
        'other_info': other_info,
        'review': review
    }

    return restaurant

all_restaurant_details = []

try:
    for restaurant in data:
        restaurant_name = restaurant['restaurant_name']
        details_link = restaurant['details_link']
        location = restaurant['location']
        contact = restaurant['contact']
        img_link = restaurant['img_link']

        restaurant_details = get_details(restaurant_name, details_link, location, contact, img_link)
        all_restaurant_details.append(restaurant_details)
finally:
    # Ensure the driver is properly closed
    driver.quit()

with open('restaurant_data.json', 'w') as file:
    json.dump(all_restaurant_details, file, indent=2)
