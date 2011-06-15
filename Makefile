build: html css

html:
	haml index.haml > index.html

css:
	sass style.sass > style.css

