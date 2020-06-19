from urllib.parse import urlencode
from .config import searchparam
from .request import jsonrequest

YOUTUBE_SEARCHAPI_BASEURL = 'https://www.googleapis.com/youtube/v3/search'


def youtube_searchlist():
    for option in searchparam['options']:
        url = '%s?%s' % (YOUTUBE_SEARCHAPI_BASEURL, urlencode({**searchparam['basic'], **option}))

        isnext = True
        while isnext is True:
            jsonresult = jsonrequest(url=url)
            yield jsonresult

    # isnext = True
    # while isnext is True:
    #     jsonresult = jsonrequest(url=url)
    #
    #     paging = None if jsonresult is None else jsonresult.get('paging')
    #     posts = None if jsonresult is None else jsonresult.get('data')
    #
    #     url = None if paging is None else paging.get('next')
    #     isnext = url is not None
    #
    #     yield posts
