import sys
import requests
from datetime import *
from urllib.parse import urlencode


def xmlrequest():
    pass


def jsonrequest(
        url='',
        headers={},
        params={},
        success=None,
        error=lambda e: print("%s : %s" % (e, datetime.now()), file=sys.stderr)):
    try:
        resp = requests.get(url, headers=headers, params=params)
        resp.raise_for_status()

        if resp.status_code == 200:
            json = resp.json()

            print('%s : success for request[%s?%s]' % (datetime.now(), url, urlencode(params)))

            if callable(success) is False:
                return json

            success(json)
    except Exception as e:
        callable(error) and error('%s %s?%s' % (str(e), url, urlencode(params)))
