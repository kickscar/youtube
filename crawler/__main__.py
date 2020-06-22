import api
import scrapetools
import mongotools

if __name__ == '__main__':
    scrapetools.scrapping(
        api.youtube_searchlist,     # fetching
                                    # processing01
                                    # processing02
                                    # .
                                    # .
        mongotools.mongo_insert     # storing
    )
