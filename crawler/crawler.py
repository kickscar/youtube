from datetime import datetime, timedelta
import json
import os
from .api import api


RESULT_DIRECTORY = '__results__/crawing'


def preprocess_post(post):
    # 공유수
    if 'shares' not in post:
        post['count_shares'] = 0
    else:
        post['count_shares'] = post['shares']['count']
        del post['shares']

    # 전체 리액션 수
    if 'reactions' not in post:
        post['count_reactions'] = 0
    else:
        post['count_reactions'] = post['reactions']['summary']['total_count']
        del post['reactions']

    # 전체 코멘트 수
    if 'comments' not in post:
        post['count_comments'] = 0
    else:
        post['count_commentss'] = post['comments']['summary']['total_count']
        del post['comments']

    # KST = UTC+9
    kst = datetime.strptime(post['created_time'], '%Y-%m-%dT%H:%M:%S+0000')
    kst = kst + timedelta(hours=+9)
    post['created_time'] = kst.strftime('%Y-%m-%d %H:%M:%S')


def crawling(pagename, since, until):
    results = []
    filename = '%s/fb_%s_%s_%s.json' % (RESULT_DIRECTORY, pagename, since, until)

    for posts in api.fb_fetch_post(pagename, since, until):

        for post in posts:
            preprocess_post(post)

        results += posts

    # insert results to Mongo
    with open(filename, 'w', encoding='utf-8') as outfile:
        json_string = json.dumps(results, indent=4, sort_keys=True, ensure_ascii=False)
        outfile.write(json_string)

    return filename


if os.path.exists(RESULT_DIRECTORY) is False:
    os.makedirs(RESULT_DIRECTORY)
