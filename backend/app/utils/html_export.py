import os

EXPORT_FOLDER = "exports"

os.makedirs(EXPORT_FOLDER, exist_ok=True)


def export_html(
    title: str,
    content: str,
    output_path: str = None,
):

    # Used by Export feature
    if output_path is None:

        filename = f"{title.replace(' ', '_')}.html"

        output_path = os.path.join(
            EXPORT_FOLDER,
            filename,
        )

    html = f"""
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>{title}</title>

<style>

body {{
    font-family: Arial, sans-serif;
    margin: 40px;
}}

h1 {{
    color: #1f4e79;
}}

pre {{
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 15px;
}}

</style>

</head>

<body>

<h1>{title}</h1>

<hr>

<pre>
{content}
</pre>

</body>

</html>
"""

    with open(
        output_path,
        "w",
        encoding="utf-8",
    ) as f:

        f.write(html)

    return output_path