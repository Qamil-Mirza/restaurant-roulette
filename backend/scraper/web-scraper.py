from selenium import webdriver
from selenium.webdriver.common.by import By
import bs4 as bs
import time
import json

# Init driver
driver = webdriver.Chrome()

# Get the page
driver.get('https://www.1utama.com.my/mall-shop/?storeCat=food-beverages')

# Wait for the page to load
time.sleep(10)

page_source = driver.page_source

# create a soup object
soup = bs.BeautifulSoup(page_source, 'lxml')

# find all divs with class card
cards = soup.find_all('div', class_='card')

# for card in cards, get the text of the h3 tag
data = []
for card in cards:
    # find restaurant names
    restaurant_name = card.h3.text.replace('\n', '')

    # find the p tag
    p = card.p.text
    p_cleaned = p.strip()
    elements = p_cleaned.split('\n')
    elements_filtered = [element.strip() for element in elements if element.strip()]
    location = elements_filtered[0]
    contact = elements_filtered[1] if len(elements_filtered) > 1 else None

    # find the image links
    img = card.img['src']

    payload = {
        'restaurant_name': restaurant_name,
        'location': location,
        'contact': contact,
        'img_link': img
    }
    data.append(payload)

# Convert data to JSON
json_data = json.dumps(data)

# Write JSON data to a file
with open('/home/qamil/code/restaurant-roulette/backend/data.json', 'w') as file:
    file.write(json_data)

driver.quit()