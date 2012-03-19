update:
	@rm -f js/jquery.slideshow.js
	@rm -f css/jquery.slideshow.css
	@(cd js && wget https://raw.github.com/sentientwaffle/jquery.slideshow.js/master/jquery.slideshow.js)
	@(cd css && wget https://raw.github.com/sentientwaffle/jquery.slideshow.js/master/jquery.slideshow.css)

.PHONY: update
