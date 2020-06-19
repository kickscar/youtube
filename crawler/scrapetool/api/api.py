from urllib.parse import urlencode
from .json_request import json_request

BASE_URL_FB_API = 'https://graph.facebook.com/v3.0'
ACCESS_TOKEN = 'EAACEdEose0cBACt92w5IOt4m8w3cCIrv3cWsY8ZBZBLezA8wJ9ITZCX6ZC3uhfbptToBfZAG2uyvH5sR8Kt6ZAZAZCnL1apl4hFdnvaP1YZC997IjG0nHdnlbyMbUYGERq78w5hfCz214i08a3ESj7SWJyLk6CH4zfUCZCPjXC6zZB9Bdst55ZCV48nLVN2B1rQ7WZAn1p5v4MJwZBhwZDZD'


def fb_gen_url(base=BASE_URL_FB_API, node='', **param):
    return '%s/%s/?%s' % (base, node, urlencode(param))


def fb_name_to_id(pagename):
    url = fb_gen_url(node=pagename, access_token=ACCESS_TOKEN)
    json_result = json_request(url)
    return json_result.get('id')


def fb_fetch_post(pagename, since, until):
    url = fb_gen_url(
        node=fb_name_to_id(pagename)+'/posts',
        fields='id,message,link,name,type,shares,created_time,\
reactions.limit(0).summary(true),\
comments.limit(0).summary(true)',
        since=since,
        until=until,
        limit=50,
        access_token=ACCESS_TOKEN)

    isnext = True
    while isnext is True:
        json_result = json_request(url=url)

        paging = None if json_result is None else json_result.get('paging')
        posts = None if json_result is None else json_result.get('data')

        url = None if paging is None else paging.get('next')
        isnext = url is not None

        yield posts