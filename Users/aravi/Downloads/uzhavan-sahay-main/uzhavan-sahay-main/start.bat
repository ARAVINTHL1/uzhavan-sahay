@echo off
echo Starting Uzhavan Sahay Application...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm start"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Development Server...
start "Frontend Server" cmd /k "npm run dev"
echo.
echo Both servers are starting...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:8080
echo.
echo Press any key to exit this window (servers will continue running)
pause > nul
