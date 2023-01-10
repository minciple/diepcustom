@echo off
: Check for node and npm installation
where /q node
IF ERRORLEVEL 1 (
	where /q npm
	IF ERRORLEVEL 1 (
		ECHO [ERROR] NODE.JS AND NPM NOT FOUND. Please install npm and node.js: https://nodejs.org/en/
	) ELSE (
		ECHO [ERROR] NODE.JS NOT FOUND. Please install it: https://nodejs.org/en/
	)
	TIMEOUT 15
) ELSE (
	where /q npm
	IF ERRORLEVEL 1 (
		node autom/installer.js
	) ELSE (
		ECHO [ERROR] NPM NOT FOUND. Please install it.
		TIMEOUT 15
	)
)
