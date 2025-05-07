import json
import pandas as pd

# brand to csv
with open("./data/brand.json", "r", encoding="utf-8") as f:
    brands = json.load(f)

brand_rows = [
    {"id": b["pk"], "name": b["fields"]["name"]}
    for b in brands
]

df_brand = pd.DataFrame(brand_rows)

df_brand.to_csv("./data/brand.csv", index=False)

# category to csv
with open("./data/category.json", "r", encoding="utf-8") as f:
    categories = json.load(f)

category_rows = [
    {"id": c["pk"], "name": c["fields"]["name"]}
    for c in categories
]

df_category = pd.DataFrame(category_rows)
df_category.to_csv("./data/fragrance_family.csv", index=False)

# note to csv
with open("./data/notes.json", "r", encoding="utf-8") as f:
    notes = json.load(f)

note_rows = [
    {"id": n["pk"], "name": n["fields"]["kor_name"]}
    for n in notes
]

df_note = pd.DataFrame(note_rows)
df_note = df_note.drop_duplicates(subset=["name"])  # 중복 제거
df_note.to_csv("./data/note.csv", index=False)

# perfume to csv

with open("./data/perfumes.json", "r", encoding="utf-8") as f:
    perfumes = json.load(f)

product_rows = []
product_note_rows = []

for perfume in perfumes:
    f = perfume["fields"]
    pid = perfume["pk"]

    # family_id는 categories[0]이 존재할 때만 유효
    if "categories" in f and f["categories"]:
        product_rows.append({
            "id": pid,
            "name": f["name"],
            "brand_id": f["brand"],
            "family_id": f["categories"][0],
            "image_url": f["thumbnail"] if "thumbnail" in f else "",
            "price": f["price"] if "price" in f else 0,
            "description_url": f["thumbnail"] if "thumbnail" in f else ""
        })

        # 노트는 family_id가 유효할 때만 처리
        for note_id in f.get("top_notes", []):
            product_note_rows.append({
                "product_id": pid,
                "note_id": note_id,
                "type": "TOP"
            })
        for note_id in f.get("middle_notes", []):
            product_note_rows.append({
                "product_id": pid,
                "note_id": note_id,
                "type": "MIDDLE"
            })
        for note_id in f.get("base_notes", []):
            product_note_rows.append({
                "product_id": pid,
                "note_id": note_id,
                "type": "BASE"
            })

# DataFrame 생성 및 저장
df_product = pd.DataFrame(product_rows).drop_duplicates(subset=["id"], keep="first")
df_product.to_csv("./data/product.csv", index=False, encoding="utf-8-sig")

df_note = pd.read_csv("./data/note.csv")
valid_note_ids = set(df_note["id"])

# ✅ product_note: 유효한 product_id + note_id만 남기기
valid_product_ids = set(df_product["id"])
df_product_note = pd.DataFrame(product_note_rows)
df_product_note = df_product_note[
    df_product_note["product_id"].isin(valid_product_ids) &
    df_product_note["note_id"].isin(valid_note_ids)
]
df_product_note.to_csv("./data/product_note.csv", index=False, encoding="utf-8-sig")