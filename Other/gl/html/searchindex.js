Search.setIndex({"docnames": ["intro", "markdown-notebooks", "meissner", "scaling"], "filenames": ["intro.md", "markdown-notebooks.md", "meissner.ipynb", "scaling.md"], "titles": ["Ginzburg-Landau boundary value problems using scipy on the web", "Notebooks with MyST Markdown", "Meissner effect in one dimension", "Scaling the Ginzburg-Landau equations"], "terms": {"The": [0, 1, 2], "plan": 0, "here": 0, "see": [0, 1], "how": [0, 1], "put": 0, "stuff": 0, "my": 0, "websit": 0, "enabl": 0, "python": [0, 2], "calcul": 0, "simpl": [0, 2], "wai": 0, "possibl": 0, "scale": 0, "equat": 0, "meissner": 0, "effect": 0, "one": 0, "dimens": 0, "notebook": 0, "myst": 0, "markdown": 0, "jupyt": 1, "book": 1, "also": 1, "let": 1, "you": [1, 2], "write": 1, "text": 1, "base": 1, "us": [1, 2], "document": 1, "more": 1, "detail": 1, "instruct": 1, "thi": 1, "page": 1, "show": [1, 2], "off": 1, "written": 1, "With": 1, "can": 1, "defin": [1, 2], "code": 1, "direct": 1, "like": 1, "so": 1, "print": 1, "2": [1, 2], "4": [1, 2], "when": 1, "your": 1, "built": 1, "content": 1, "ani": 1, "block": 1, "execut": [1, 2], "default": 1, "kernel": [1, 2], "output": 1, "displai": [1, 2], "line": [1, 2], "rest": 1, "jupytext": 1, "convert": 1, "file": 1, "support": 1, "mani": 1, "other": 1, "ar": 1, "two": 1, "thing": 1, "need": [1, 2], "understand": 1, "should": 1, "includ": 1, "inform": 1, "about": 1, "top": 1, "presenc": 1, "which": 1, "That": 1, "s": [1, 2], "all": 1, "get": 1, "start": 1, "If": 1, "have": 1, "d": 1, "treat": 1, "run": 1, "follow": 1, "command": 1, "init": 1, "path": 1, "markdownfil": 1, "md": 1, "program": 2, "solv": 2, "gl": 2, "bvp": 2, "an": 2, "appli": 2, "field": 2, "h": 2, "x": 2, "0": 2, "half": 2, "infinit": 2, "superconductor": 2, "region": 2, "import": 2, "numpi": 2, "np": 2, "from": 2, "scipi": 2, "integr": 2, "solve_bvp": 2, "matplotlib": 2, "pyplot": 2, "plt": 2, "html": 2, "entiti": 2, "html5": 2, "ipywidget": 2, "widget": 2, "modulenotfounderror": 2, "traceback": 2, "most": 2, "recent": 2, "call": 2, "last": 2, "cell": 2, "In": 2, "1": 2, "5": 2, "3": 2, "No": 2, "modul": 2, "name": 2, "london": 2, "boundari": 2, "condit": 2, "b": 2, "da": 2, "b0": 2, "f": 2, "l": 2, "def": 2, "kappa": 2, "fun": 2, "y": 2, "df": 2, "return": 2, "vstack": 2, "bc": 2, "ya": 2, "yb": 2, "arrai": 2, "rng": 2, "linspac": 2, "20": 2, "zero": 2, "size": 2, "k": 2, "rang": 2, "initi": 2, "sol": 2, "x_plot": 2, "100": 2, "y_plot": 2, "plot": 2, "floatslid": 2, "descript": 2, "valu": 2, "length": 2, "10": 2, "xlabel": 2, "ylabel": 2, "6": 2, "7": 2, "textbox": 2, "pip": 2, "instal": 2, "ipympl": 2, "fig": 2, "ax": 2, "subplot": 2, "subplots_adjust": 2, "bottom": 2, "t": 2, "arang": 2, "001": 2, "zeros_lik": 2, "lw": 2, "submit": 2, "express": 2, "updat": 2, "function": 2, "new": 2, "math": 2, "string": 2, "its": 2, "independ": 2, "variabl": 2, "e": 2, "g": 2, "ydata": 2, "eval": 2, "set_ydata": 2, "relim": 2, "autoscale_view": 2, "draw": 2, "axbox": 2, "add_ax": 2, "05": 2, "8": 2, "075": 2, "text_box": 2, "evalu": 2, "textalign": 2, "center": 2, "on_submit": 2, "set_val": 2, "trigger": 2, "look": 2, "index": 2, "http": 2, "pypi": 2, "org": 2, "www": 2, "piwheel": 2, "requir": 2, "alreadi": 2, "satisfi": 2, "home": 2, "mike": 2, "local": 2, "lib": 2, "python3": 2, "9": 2, "site": 2, "packag": 2, "pillow": 2, "usr": 2, "dist": 2, "traitlet": 2, "14": 2, "ipython": 2, "18": 2, "genutil": 2, "26": 2, "stack": 2, "data": 2, "prompt": 2, "toolkit": 2, "41": 2, "43": 2, "pygment": 2, "jedi": 2, "16": 2, "19": 2, "exceptiongroup": 2, "decor": 2, "pexpect": 2, "inlin": 2, "type": 2, "extens": 2, "widgetsnbextens": 2, "comm": 2, "jupyterlab": 2, "parso": 2, "kiwisolv": 2, "pypars": 2, "23": 2, "fonttool": 2, "22": 2, "47": 2, "cycler": 2, "12": 2, "importlib": 2, "resourc": 2, "contourpi": 2, "dateutil": 2, "zipp": 2, "17": 2, "wcwidth": 2, "six": 2, "asttoken": 2, "pure": 2, "note": 2, "mai": 2, "restart": 2, "button": 2, "slider": 2, "parametr": 2, "amplitud": 2, "frequenc": 2, "sin": 2, "pi": 2, "1000": 2, "paramet": 2, "init_amplitud": 2, "init_frequ": 2, "creat": 2, "figur": 2, "we": 2, "manipul": 2, "set_xlabel": 2, "time": 2, "adjust": 2, "main": 2, "make": 2, "room": 2, "left": 2, "25": 2, "horizont": 2, "control": 2, "axfreq": 2, "65": 2, "03": 2, "freq_slid": 2, "label": 2, "hz": 2, "valmin": 2, "valmax": 2, "30": 2, "valinit": 2, "vertic": 2, "orient": 2, "axamp": 2, "0225": 2, "63": 2, "amp_slid": 2, "anytim": 2, "chang": 2, "val": 2, "canva": 2, "draw_idl": 2, "regist": 2, "each": 2, "on_chang": 2, "reset": 2, "resetax": 2, "025": 2, "04": 2, "hovercolor": 2, "975": 2, "event": 2, "on_click": 2}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"ginzburg": [0, 3], "landau": [0, 3], "boundari": 0, "valu": 0, "problem": 0, "us": 0, "scipi": 0, "web": 0, "notebook": 1, "myst": 1, "markdown": 1, "an": 1, "exampl": 1, "cell": 1, "creat": 1, "quickli": 1, "add": 1, "yaml": 1, "metadata": 1, "meissner": 2, "effect": 2, "one": 2, "dimens": 2, "scale": 3, "equat": 3}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinxcontrib.bibtex": 9, "sphinx": 56}})