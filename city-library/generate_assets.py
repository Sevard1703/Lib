from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

base = Path(__file__).resolve().parent
images_dir = base / 'images'
images_dir.mkdir(exist_ok=True)

# Create main library image assets
logo = Image.new('RGB', (220, 220), '#172b4d')
d = ImageDraw.Draw(logo)
d.rounded_rectangle((20, 20, 200, 200), radius=28, fill='#263f60')
d.text((76, 82), 'SK', fill='#c49a55', font=ImageFont.load_default())
logo.save(images_dir / 'logo.png')

main = Image.new('RGB', (1400, 900), '#d5cab6')
d = ImageDraw.Draw(main)
d.rectangle((0, 0, 1400, 900), fill='#d5cab6')
d.rounded_rectangle((120, 120, 1280, 780), radius=36, fill='#f1e7d9')
d.rectangle((200, 220, 1200, 680), fill='#c3b7a6')
d.text((480, 390), 'Shahar kutubxonasi', fill='#172b4d', font=ImageFont.load_default())
main.save(images_dir / 'library-main.jpg')

map_img = Image.new('RGB', (900, 500), '#f4f1eb')
d = ImageDraw.Draw(map_img)
d.rectangle((60, 60, 820, 430), fill='#e7dcc9', outline='#172b4d', width=3)
d.rectangle((120, 120, 360, 260), fill='#d7c39d', outline='#172b4d', width=2)
d.ellipse((460, 160, 670, 350), fill='#c49a55', outline='#172b4d', width=2)
d.rectangle((200, 310, 420, 390), fill='#a8b8d1', outline='#172b4d', width=2)
d.text((155, 175), 'Katalog', fill='#172b4d', font=ImageFont.load_default())
d.text((505, 230), 'Zal', fill='#172b4d', font=ImageFont.load_default())
d.text((238, 333), 'Tadbirlar', fill='#172b4d', font=ImageFont.load_default())
map_img.save(images_dir / 'library-map.jpg')

# Placeholder content for books/events/gallery folders
for folder, color in [('books', '#d6d0c9'), ('events', '#c6d0df'), ('gallery', '#e5d4b0')]:
    target = images_dir / folder
    target.mkdir(exist_ok=True)
    for idx in range(3):
        img = Image.new('RGB', (800, 1000), color)
        draw = ImageDraw.Draw(img)
        draw.rounded_rectangle((80, 90, 720, 910), radius=24, fill='#f5f0ea')
        draw.text((220, 420), f'{folder.upper()} {idx + 1}', fill='#172b4d', font=ImageFont.load_default())
        img.save(target / f'{folder}-{idx + 1}.jpg')

# PDF placeholder content: write basic PDF bytes
pdf_dir = base / 'documents'
pdf_dir.mkdir(exist_ok=True)
for name, text in [
    ('library-rules.pdf', 'Shahar kutubxonasi qoidalari\n'),
    ('membership-guide.pdf', "A'zo bo'lish bo'yicha qo'llanma\n"),
    ('reading-list.pdf', "O'qish ro'yxati\n"),
]:
    pdf = f"%PDF-1.4\n1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n4 0 obj<< /Length {len(text) + 30} >>stream\nBT /F1 12 Tf 20 100 Td ({text}) Tj ET\nendstream\nendobj\n5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000061 00000 n \n0000000122 00000 n \n0000000650 00000 n \n0000000900 00000 n \ntrailer\n<< /Root 1 0 R /Size 6 >>\nstartxref\n960\n%%EOF\n"
    (pdf_dir / name).write_bytes(pdf.encode('latin-1'))

# Audio and video placeholder files
(base / 'audio' / 'library-intro.mp3').write_bytes(b'placeholder-audio')
(base / 'video' / 'library-tour.mp4').write_bytes(b'placeholder-video')

print('Assets generated successfully.')
