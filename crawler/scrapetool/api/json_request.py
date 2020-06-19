import sys
import json
from urllib.request import Request, urlopen
from datetime import *


def xml_request():
    pass


def html_request():
    pass


def json_request(
        url='',
        encoding='utf-8',
        success=None,
        error=lambda e: print("%s : %s" % (e, datetime.now()), file=sys.stderr)):
    try:
        resp = urlopen(Request(url))
        if resp.getcode() == 200:
            resp_body = resp.read().decode(encoding)
            resp_json = json.loads(resp_body)

            print('%s : success for request[%s]' % (datetime.now(), url))

            if callable(success) is False:
                return resp_json
            success(resp_json)
    except Exception as e:
        callable(error) and error('%s %s' % (str(e), url))
