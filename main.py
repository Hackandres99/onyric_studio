from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from time import sleep

def get_soup(url):
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    service = Service('driver/chromedriver.exe')

    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)
    sleep(3)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    driver.close()
    return soup

def get_artwork_links(soup):
    gallery = soup.find('user-projects', {'fetcher-method':'readByUser'})
    artworks = gallery.find_all(class_ = 'project-image')
    artwork_links = []
    for artwork in artworks:
        try:
            artwork_links.append(artwork['href'])
        except:
            pass
    return artwork_links

def get_artwork_description(artist, artwork):
    artstation_root = 'https://www.artstation.com'
    data = {
        'title': '', 
        'description': '',
        'likes': '',
        'views': '',
        'images': [],
        'software_names': [],
        'software_images': [],
        'tags': []
        }

    # Collecting data
    try:
        print('Wait while we collect the data.\n')
        soup = get_soup(artstation_root + artist)
        artwork_link = get_artwork_links(soup)[artwork - 1]
        description_soup = get_soup(artstation_root + artwork_link)

        data['title'] = description_soup.find(class_ = 'h3').text
        data['description'] = description_soup.find(class_ = 'project-description').text

        data['likes'] = description_soup.find(class_ = 'link-fake').text
        data['views'] = description_soup.find(class_ = 'd-flex align-items-center').text

        images = description_soup.find_all(class_ = 'img')
        for image in images:
            data['images'].append(image['src'])

        software_names = description_soup.find_all(class_ = 'project-software-name')
        for software_name in software_names:
            data['software_names'].append(software_name.text)

        software_images = description_soup.find_all(class_ = 'project-software-item')
        for software_image in software_images:
            data['software_images'].append(software_image.find('img')['src'])
        
        tags = description_soup.find_all(class_ = 'project-tag-item')
        for tag in tags:
            data['tags'].append(tag.text)

    except:
        print(f'Maybe the artist {artist} is not in artstation, please try again.')
        init()

    # Printing data
    print(f'Title: {data["title"]}\nDescription: {data["description"]}\nLikes: {data["likes"]}\nViews: {data["views"]}')

    print('Images:')
    for i, img in enumerate(data['images']):
        print(f'\t{i+1}.- {img}')

    print('Names of used softwares:')
    for i, soft_name in enumerate(data['software_names']):
        print(f'\t{i+1}.- {soft_name}')

    print('Images of used softwares:')
    for i, soft_img in enumerate(data['software_images']):
        print(f'\t{i+1}.- {soft_img}')
    
    print('Tags:')
    for i, tag in enumerate(data['tags']):
        print(f'\t{i+1}.- {tag}')

    # return data
    
    
        
def init():
    selected_artist = input('What artworks do you want to consult?\nPlease type an artist: ')
    selected_artist = 'onyricstudio'
    selected_artwork = int(input('Which artwork by that artist do you want to get a description?\n'))
    # print(get_artwork_description('/' + selected_artist, selected_artwork))
    get_artwork_description('/' + selected_artist, selected_artwork)

if __name__ == "__main__":
    init()