@for /D /r %%P in (.) do @for %%Q in ("%%~fP\migrations\0*.py") do del %%~ftzaQ

del db.sqlite3

@for /D %%i in (*.*) do python manage.py makemigrations %%i

python manage.py migrate

@for /D /r %%P in (.) do @for %%Q in ("%%~fP\fixtures\*.json") do python manage.py loaddata %%Q