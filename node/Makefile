all : test

test: compile
	@mocha

compile: clean
	@coffee --bare --compile --output lib src/lib/*.coffee
	@coffee --bare --compile --output test src/test/*.coffee

clean:
	@rm -f lib/*.js
	@rm -f test/*.js
