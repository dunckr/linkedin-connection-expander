test:
		@./node_modules/.bin/mocha \
		  		--require should \
						--reporter spec
						--watch

.PHONY: test
