import api
import scrapetool


def d(data):
    print(data)


if __name__ == '__main__':
    scrapetool.scrapping(api.youtube_searchlist, d)
