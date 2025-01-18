import json

def get(file):
    with open(file, 'r') as fp:
        return json.load(fp)

def put(d,file):
    with open(file, 'w') as fp:
        json.dump(d, fp)

def STitem(caption,img,url,ref):
    return {'caption':caption,'img':img,'url':url,'ref':ref}

def addSTitem(d,month,item):
    if month in d.keys():
        d[month] += [item]
    else:
        d = {month:[item],**d}
    return d

def inputST(d):
    month=input('Month: ')
    caption=input('Caption: ')
    img=input('Image: ')
    href=input('Link: ')
    ref=input('Reference: ')
    return addSTitem(d,month,STitem(caption,img,href,ref))

if __name__ == "__main__":
	j=get('2025.json')
	put(j,'2025.json.bak')
	j=inputST(j)
	put(j,'2025.json')
