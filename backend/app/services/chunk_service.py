from langchain_text_splitters import RecursiveCharacterTextSplitter


class ChunkService:

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    @classmethod
    def create_chunks(cls, text: str):

        return cls.splitter.split_text(text)