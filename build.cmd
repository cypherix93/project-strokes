@echo off

cls

:: Install NPM packages
cmd /c npm install

cls

:: Build and Package Application
cmd /c npm run package

:: Quit
exit /b %errorlevel%