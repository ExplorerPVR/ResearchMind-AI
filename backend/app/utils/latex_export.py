import os

EXPORT_FOLDER = "exports"

os.makedirs(EXPORT_FOLDER, exist_ok=True)


def export_latex(title, content):

    filename = f"{title.replace(' ','_')}.tex"

    filepath = os.path.join(EXPORT_FOLDER, filename)

    tex = rf"""
\documentclass{{article}}

\begin{{document}}

\title{{{title}}}

\maketitle

{content}

\end{{document}}
"""

    with open(filepath, "w", encoding="utf-8") as f:

        f.write(tex)

    return filepath