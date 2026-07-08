from PIL import Image, ImageDraw, ImageFont
import os

# Create images folder if not exists
os.makedirs('public/images', exist_ok=True)

def create_image(filename, title, subtitle, color1, color2):
    """Create an image with gradient background and text"""
    width, height = 512, 512
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)
    
    # Create gradient
    for y in range(height):
        # Interpolate between color1 and color2
        r = int(color1[0] + (color2[0] - color1[0]) * (y / height))
        g = int(color1[1] + (color2[1] - color1[1]) * (y / height))
        b = int(color1[2] + (color2[2] - color1[2]) * (y / height))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add text
    try:
        font_large = ImageFont.truetype("arial.ttf", 48)
        font_medium = ImageFont.truetype("arial.ttf", 32)
        font_small = ImageFont.truetype("arial.ttf", 24)
    except:
        font_large = ImageFont.load_default()
        font_medium = font_large
        font_small = font_large
    
    # Draw title
    draw.text((256, 180), title, fill=(255, 255, 255), font=font_large, anchor="mm")
    
    # Draw subtitle
    draw.text((256, 270), subtitle, fill=(255, 255, 255, 200), font=font_medium, anchor="mm")
    
    # Save image
    image.save(f'public/images/{filename}')
    print(f"✓ Created: {filename}")

# Create Summit Kit V5
create_image(
    'summit-kit-v5.png',
    'SUMMIT KIT V5',
    'Tema Habeg 5-10 Checkpoint',
    (16, 185, 129),   # Emerald
    (8, 145, 178)     # Cyan
)

# Create Summit Kit V7
create_image(
    'summit-kit-v7.png',
    'SUMMIT KIT V7',
    'Tema Balap 15-30 Checkpoint',
    (6, 182, 212),    # Cyan
    (8, 145, 178)     # Darker Cyan
)

# Create Club Kit V1
create_image(
    'club-kit-v1.png',
    'CLUB KIT V1',
    'Tema Club seperti Salon',
    (236, 72, 153),   # Pink
    (217, 70, 239)    # Purple
)

# Create Upgrade System
create_image(
    'upgrade-system.png',
    'UPGRADE SYSTEM',
    'Jasa Perbaikan Script',
    (245, 158, 11),   # Amber
    (217, 119, 6)     # Orange
)

print("\n✅ Semua gambar berhasil dibuat!")
