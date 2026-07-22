import os

EXPORT_FOLDER = "exports"

os.makedirs(EXPORT_FOLDER, exist_ok=True)


def export_bibtex(title, content):

    filename = f"{title.replace(' ','_')}.bib"

    filepath = os.path.join(EXPORT_FOLDER, filename)

    bib = f"""
@misc{{researchmind,

title = {{{title}}},

note = {{{content}}}

}}
"""

    with open(filepath, "w", encoding="utf-8") as f:

        f.write(bib)

    return filepath