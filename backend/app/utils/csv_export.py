import csv
import os

EXPORT_FOLDER = "exports"

os.makedirs(EXPORT_FOLDER, exist_ok=True)


def export_csv(
    title: str,
    content: str,
    output_path: str = None,
):

    # Used by Export feature
    if output_path is None:

        filename = f"{title.replace(' ', '_')}.csv"

        output_path = os.path.join(
            EXPORT_FOLDER,
            filename,
        )

    folder = os.path.dirname(output_path)

    if folder:
        os.makedirs(folder, exist_ok=True)

    paragraphs = [

        p.strip()

        for p in content.split("\n\n")

        if p.strip()

    ]

    with open(
        output_path,
        "w",
        newline="",
        encoding="utf-8",
    ) as file:

        writer = csv.writer(file)

        writer.writerow(
            [
                "Section No.",
                "Content",
            ]
        )

        for index, paragraph in enumerate(
            paragraphs,
            start=1,
        ):

            writer.writerow(
                [
                    index,
                    paragraph,
                ]
            )

    return output_path