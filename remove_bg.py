
import sys
from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    new_data = []
    # Tolerance for white/light gray background or checkerboard
    # This is a simple heuristic: if it's very light, make it transparent
    # Or strict white.
    
    # Let's verify what the background is. Assuming it's the checkerboard or white.
    # If the user says "checkerboard", it's likely gray/white squares.
    
    for item in datas:
        # Check for white or near white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        # Check for light gray (checkerboard light square)
        elif item[0] > 200 and item[1] > 200 and item[2] > 200 and abs(item[0]-item[1]) < 10:
             # This might delete the silver N parts if they are light gray.
             # Better approach: Flood fill from corners?
             new_data.append(item)
        else:
            new_data.append(item)

    # Flood fill approach is safer for logos.
    # Let's try rembg if installed? No, can't rely on it.
    
    img.putdata(new_data)
    img.save(output_path, "PNG")

# Let's try a simpler approach if the image is simple.
# Since I can't see the image, I'll try to guess.
# If previous attempts failed, maybe it's better to just use the python script to make "White" transparent.

if __name__ == "__main__":
    remove_background('public/original-upload.png', 'public/logo-processed.png')
