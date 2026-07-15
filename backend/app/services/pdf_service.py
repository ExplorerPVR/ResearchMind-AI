import fitz


class PDFService:

    @staticmethod
    def extract_text(pdf_path: str):

        document = fitz.open(pdf_path)

        text = ""

        for page in document:
            text += page.get_text()

        page_count = document.page_count

        document.close()

        return {
            "text": text,
            "page_count": page_count,
            "character_count": len(text)
        }