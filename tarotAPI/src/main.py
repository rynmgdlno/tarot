import random
from io import BytesIO, StringIO

from fastapi import Depends, FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from PIL import Image
from functools import lru_cache
from . import config
import httpx
import asyncio
import uvicorn


app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost",
    "https://localhost",
    "https://tarotcolor.com",
    "https://www.tarotcolor.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers={"*"}
)


@lru_cache()
def get_settings():
    return config.Settings()


def requestSync(url):
    response = httpx.get(url)
    return response


async def get_image(client, url):
    response = await client.get(url)
    image = Image.open(BytesIO(response.content))
    return image


def get_pixel(image, width, height):
    rand_x = random.randint(1, width - 1)
    rand_y = random.randint(1, height - 1)
    return image.getpixel((rand_x, rand_y))


@app.get('/')
async def tarot(query: str = "autumn", page: int = 1, settings: config.Settings = Depends(get_settings)):
    api_key = settings.api_key
    URL = f"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key={api_key}&tags={query}&page={page}&tag_mode=all&extras=url_s&per_page=20&format=json&nojsoncallback=1"

    response = requestSync(URL).json()
    pages = response["photos"]["pages"]
    page = response["photos"]["page"]
    photos = response["photos"]["photo"]
    photo_urls: list[str] = []

    for photo in photos:
        photo_urls.append(photo["url_s"])

    images = []
    palettes = []

    async with httpx.AsyncClient() as client:
        tasks = []
        for url in photo_urls:
            try:
                tasks.append(asyncio.ensure_future(get_image(client, url)))
            except Exception as error:
                continue
        temp_images = await asyncio.gather(*tasks)

    for image in temp_images:
        if image.mode == "RGB": 
            images.append(image)

    print(images)
    for image in images:
        # todo: redundant color data: reformat response shape
        # todo: (after making changes in frontend ofc):
        colors = []  # keeping track of colors to avoid duplicates
        palette = []
        width, height = image.size
        # todo: make n colors adjustable:
        print(image)
        while len(colors) < 5:
            try:
                pixel = get_pixel(image, width, height)
                hex_color = f"{pixel[0]:02x}{pixel[1]:02x}{pixel[2]:02x}"
                color_data = {
                    "id": len(colors),
                    "hex": hex_color,
                    "red": pixel[0],
                    "green": pixel[1],
                    "blue": pixel[2]
                }
                if hex_color not in colors:
                    colors.append(hex_color)
                    palette.append(color_data)
            except IndexError:
                continue
        palettes.append(palette)

    return ([page, pages, palettes])

if __name__ == "__main__":
    uvicorn.run(app, port=3002, host="0.0.0.0")