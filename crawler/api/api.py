from .config import requestconfig
from .request import jsonrequest

YOUTUBE_SEARCHAPI_BASEURL = 'https://www.googleapis.com/youtube/v3/search'


def youtube_searchlist():
    for option in requestconfig['parameters']['options']:
        isnext = True

        while isnext is True:
            jsonresult = jsonrequest(
                url=YOUTUBE_SEARCHAPI_BASEURL,
                headers=requestconfig['headers'],
                params={**requestconfig['parameters']['default'], **option})

            if len(jsonresult['items']) == 0:
                isnext = False
                continue

            requestconfig['parameters']['default']['pageToken'] = jsonresult['nextPageToken']

            yield jsonresult['items']
