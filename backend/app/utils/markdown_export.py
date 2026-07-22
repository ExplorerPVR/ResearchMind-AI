import os

EXPORT_FOLDER = "exports"

os.makedirs(EXPORT_FOLDER, exist_ok=True)


def export_markdown(
    title: str,
    content: str,
    output_path: str = None,
):

    # Used by Export feature
    if output_path is None:

        filename = f"{title.replace(' ', '_')}.md"

        output_path = os.path.join(
            EXPORT_FOLDER,
            filename,
        )

    with open(
        output_path,
        "w",
        encoding="utf-8",
    ) as f:

        f.write(f"# {title}\n\n")

        f.write(content)

    return output_path