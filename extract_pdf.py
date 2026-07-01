import fitz

def extract():
    doc = fitz.open("paper.pdf")
    text = ""
    for page_num in range(min(10, len(doc))):
        page = doc.load_page(page_num)
        text += f"--- PAGE {page_num+1} ---\n"
        text += page.get_text() + "\n"
    
    with open("extracted_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Extraction successful.")

if __name__ == "__main__":
    extract()
