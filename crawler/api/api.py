from urllib.parse import urlencode
from .config import searchparam
from .request import jsonrequest

YOUTUBE_SEARCHAPI_BASEURL = 'https://www.googleapis.com/youtube/v3/search'


def youtube_searchlist():
    for option in searchparam['options']:

        isnext = True
        while isnext is True:
            url = '%s?%s' % (YOUTUBE_SEARCHAPI_BASEURL, urlencode({**searchparam['basic'], **option}))
            jsonresult = jsonrequest(url=url)

            if len(jsonresult['items']) == 0:
                isnext = False
                continue

            searchparam['basic']['pageToken'] = jsonresult['nextPageToken']

            yield jsonresult['items']
