import json, copy
import os, random

FILENAME = 'words_daily'
FILEFULL = FILENAME + '.json'
FILETEMP = FILENAME + '2.json'

def fyShuffle(arr):
  '''
  Shuffle using Fisher-Yates shuffle
  '''
  n = len(arr)
  for i in range(n-1):
    j = random.randint(i, n-1)
    tmp = copy.copy(arr[i])
    arr[i] = arr[j]
    arr[j] = tmp


# Parse Dex file into an array of not-banned tags and shuffle

fo = open(FILEFULL)

data = json.load(fo)
tags = []

for plyr in data:
  tags.append(plyr)

fo.close()
fyShuffle(tags)

# Replace tmpdaily.json answer key

if os.path.exists(FILETEMP):
  os.remove(FILETEMP)
fn = open(FILETEMP, 'x')
fn.write(json.dumps(tags))
fn.close()