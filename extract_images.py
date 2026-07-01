import fitz
import os

os.makedirs("public/q_images", exist_ok=True)

doc = fitz.open("public/paper.pdf")
total_images = 0
for page_num in range(min(5, len(doc))):
    page = doc.load_page(page_num)
    images = page.get_images(full=True)
    print(f"Page {page_num+1} has {len(images)} images.")
    for i, img in enumerate(images):
        xref = img[0]
        base = doc.extract_image(xref)
        with open(f"public/q_images/p{page_num+1}_{i}.png", "wb") as f:
            f.write(base["image"])
        total_images += 1

print(f"Total images extracted from first 5 pages: {total_images}")
