build: build-env build-find build-find-settings
build-env:
	rm -rf production
	mkdir production
build-find:
	cp -r index.html 404.html main.js styles.css opensearch.xml public public/favicon.ico ./production
build-find-settings:
	cd ./settings && yarn && yarn build
	mv ./settings/build ./production/settings
