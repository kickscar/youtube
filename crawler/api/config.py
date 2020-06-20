requestconfig = {
    'headers': {
        'User-Agent': 'yt-crawler-functional-prototype',
        'Accept': 'application/json'
    },
    'parameters': {
        'default': {
            'part': 'snippet',
            'maxResults': 50,
            'order': 'date',
            'pageToken': '',
            'type': 'video',
            'safeSearch': 'moderate',
            'regionCode': 'KR',
            'relevanceLanguage': 'ko',
            'videoCaption': 'any',
            'videoDefinition': 'any',
            'videoDimension': 'any',
            'videoDuration': 'any',
            'videoLicense': 'any',
            'videoSyndicated': 'any',
            'videoType': 'any',
            'key': 'YOUR APIKEY',
        },
        'options': [
            {'publishedAfter': '2019-01-01T00:00:00Z', 'publishedBefore': '2019-03-31T23:59:59Z', 'q': '여행'}
            # {'q': '여행'}
        ]
    }
}


