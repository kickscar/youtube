import api
import scrapetool


def c(data):
    return data


def d(data):
    for video in data:
        print(video['snippet']['title'])

    print('================================')


if __name__ == '__main__':
    scrapetool.scrapping(api.youtube_searchlist, c, d)
