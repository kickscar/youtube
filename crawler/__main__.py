import scrapetool

if __name__ == '__main__':
    items = [
        {'pagename': 'jtbcnews', 'since': '2018-05-01', 'until': '2018-05-31'},
        {'pagename': 'chosun', 'since': '2018-05-01', 'until': '2018-05-31'}
    ]

    for item in items:
        resultfile = scrapetool.scrapping(**item)
        item['resultfile'] = resultfile

