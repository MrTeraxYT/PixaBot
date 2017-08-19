@echo off
ECHO Connecting...

cd %~dp0

where /q node
IF ERRORLEVEL 1 (
    ECHO Node is missing. Ensure it is installed using the default options.
    PAUSE
    EXIT /B
) ELSE (
    REM Node found, good to go.
)

node bot.js
PAUSE