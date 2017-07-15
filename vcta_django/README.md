# settings.json for Visual Studio Code
- `python.pythonPath` - Path to virtualenv python
```json
{
    "python.pythonPath": "D:/XXX/env_name/Scripts/python.exe",
    "python.linting.pylintArgs": ["--load-plugins", "pylint_django"]
}
```

# Installing
- Install 64bit miniconda 3.6 - https://conda.io/miniconda.html
- Use scripts in ./bin to create env
- Install using pip
    - check pip is the one from env using `which pip`
    - if not, `conda install pip`
- `pip install -r requirements.txt`
    - If any installs fail, e.g. twisted, try to install with conda `conda install twisted`
    - This could also be fixed with proper setup of C toolchain, but using conda is faster/easier
