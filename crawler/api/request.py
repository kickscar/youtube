import sys
import json
from urllib.request import Request, urlopen
from datetime import *


def jsonrequest(
        url='',
        encoding='utf-8',
        success=None,
        error=lambda e: print("%s : %s" % (e, datetime.now()), file=sys.stderr)):
    try:
        resp = urlopen(Request(url))
        if resp.getcode() == 200:
            respbody = resp.read().decode(encoding)
            respjson = json.loads(respbody)

            print('%s : success for request[%s]' % (datetime.now(), url))

            if callable(success) is False:
                return respjson

            success(respjson)
    except Exception as e:
        callable(error) and error('%s %s' % (str(e), url))
