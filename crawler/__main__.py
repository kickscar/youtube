import api
import scrapetool


def d(data):
    for video in data:
        print(video['id'])

    print('================================')


if __name__ == '__main__':
    scrapetool.scrapping(api.youtube_searchlist, d)
