Gyökérkönyvtár  ==> repository könyvtár

Új repository létrehozása GitHub-on:
	Jelentkezz be a GitHub-fiókodba.
	Kattints a New repository gombra.
	Add meg a repository nevét, leírását, és válaszd ki a láthatóságot (public vagy private).
	Ne inicializáld a repository-t README fájllal, .gitignore-gal vagy licenccel (mivel már van helyi repository-d)

A README.md fájlt érdemes a helyi mappában elkészíteni, mielőtt feltöltenéd az új GitHub repository-ba. 
A README.md egy alapvető fájl, amely leírja a projekt célját, használatát, telepítését és egyéb fontos információkat. 
Ha ezt a fájlt a helyi mappában hozod létre, akkor az is része lesz a Git verziókövetésnek, és automatikusan felkerül a GitHub-ra, amikor push-olod a kódot.


Új repository létrehozása helyileg:
	git init																Ez létrehozza a .git mappát a gyökérkönyvtárban
	git add .																Fájlok hozzáadása az új repository-hoz
	git commit -m "Initial commit"											Készíts egy kezdeti commit-ot
	git remote add origin https://github.com/felhasznalonev/uj-repo.git		Add hozzá a már előkészített távoli repository-t a helyi repository-hoz
	git remote -v															Ellenőrizd, hogy a távoli repository helyesen van-e beállítva
	git push -u origin main													Push-old fel a kódot a main (vagy master) branch-be. (A main ajánlott)
