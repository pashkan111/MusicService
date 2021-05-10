import pickle
import json
import os, sys

proj = os.path.dirname(os.path.abspath('manage.py'))
sys.path.append(proj)
os.environ['DJANGO_SETTINGS_MODULE'] = 'music_service.settings'

import django
django.setup()


from mainapp.models import Playlist, Profile, Song



data = open("tracks.pickle", "rb")
obj = pickle.load(data)
data = json.dumps(obj)
lst = []
count = 0
for i in obj:
    count +=1
    lst.append(i)
print(lst[count-1])
print(count)

for i in lst:
    v = Song(**i)
    v.save()

