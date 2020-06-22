def scrapping(*fs):
    for d in fs[0]():
        for f in fs[1:-1]:
            d = f(d)

        fs[0] is not fs[-1] and fs[-1](d)
