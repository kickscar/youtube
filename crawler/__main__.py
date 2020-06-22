import api
import scrapetools
import mongotools


def d(data):
    for video in data:
        print(video)

    print('================================')


if __name__ == '__main__':
    scrapetools.scrapping(
        api.youtube_searchlist,     # fetching
                                    # processing01
                                    # processing02
        d                           # storing
    )
