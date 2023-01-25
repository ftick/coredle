from better_profanity import profanity

FILE = "validGuesses_9.ts"

if __name__ == "__main__":
    profanity.load_censor_words()

    with open(FILE, "r") as myFile:
      t = myFile.read().replace("""',
  '""","\n").replace("',","").replace("  '","")
    censored_text = profanity.censor(t)
    arr = censored_text.split('\n')
    returnThis = ""
    for line in arr:
      if line != '' and "*" not in line:
        if "[" not in line and "]" not in line:
          returnThis += "  '" + line + "',\n"
        if "[" in line or "]" in line:
          returnThis += line + "\n"
    
    print("finished scanning")

    with open(FILE,"w") as out:
      out.write(returnThis)