# 🏛️ Adding the Real Zayed University Logo

## Instructions for Adding the Official ZU Logo

Since the platform currently uses a placeholder logo, follow these steps to add the official Zayed University logo:

---

## Option 1: Using an Online Logo (Recommended)

### Step 1: Get the Logo URL
Download the official Zayed University logo from one of these sources:
- **Official ZU Website**: https://www.zu.ac.ae
- **Logo Database**: https://iconape.com/zayed-university-logo-icon-svg-png.html
- **UAE Logos**: https://www.uaelogos.ae/logos/zayed-university

### Step 2: Update the Code

Open `/frontend/src/App.jsx` and replace the SVG placeholder logo with an `<img>` tag:

**Find this code (appears in 3 places):**
```jsx
<svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="#B8860B" stroke="#8B6914" strokeWidth="2"/>
  <text x="50" y="35" fontSize="20" fill="white" textAnchor="middle" fontWeight="bold">ZU</text>
  <text x="50" y="70" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">EST 1998</text>
</svg>
```

**Replace with:**
```jsx
<img 
  src="https://your-logo-url-here.png" 
  alt="Zayed University Logo" 
  className="w-[60px] h-[60px] object-contain"
/>
```

### Locations to Update:
1. **Login Screen** (line ~240): Large logo (80x80)
2. **Main Header** (line ~370): Small logo (60x60)
3. **Footer** (line ~1150): Small logo (40x40)

---

## Option 2: Using a Local Logo File

### Step 1: Add Logo to Project

1. Download the official ZU logo (PNG or SVG format)
2. Save it in `/frontend/public/` folder
3. Name it: `zu-logo.png` or `zu-logo.svg`

### Step 2: Update the Code

Replace the placeholder SVG with:

```jsx
<img 
  src="/zu-logo.png" 
  alt="Zayed University Logo" 
  className="w-[60px] h-[60px] object-contain"
/>
```

---

## Quick Find & Replace

### For Login Screen (Large Logo):
**Search for:**
```jsx
<svg width="80" height="80" viewBox="0 0 100 100"
```

**Replace entire SVG block with:**
```jsx
<img 
  src="/zu-logo.png" 
  alt="Zayed University Logo" 
  className="w-20 h-20 object-contain"
/>
```

### For Header (Medium Logo):
**Search for:**
```jsx
<svg width="60" height="60" viewBox="0 0 100 100"
```

**Replace entire SVG block with:**
```jsx
<img 
  src="/zu-logo.png" 
  alt="Zayed University Logo" 
  className="w-[60px] h-[60px] object-contain"
/>
```

### For Footer (Small Logo):
**Search for:**
```jsx
<svg width="40" height="40" viewBox="0 0 100 100"
```

**Replace entire SVG block with:**
```jsx
<img 
  src="/zu-logo.png" 
  alt="Zayed University Logo" 
  className="w-10 h-10 object-contain"
/>
```

---

## Complete Code Snippets

### Login Screen Logo (lines ~238-248):
```jsx
<div className="flex justify-center mb-4">
  <div className="bg-white rounded-lg p-3 shadow-lg">
    <img 
      src="/zu-logo.png" 
      alt="Zayed University Logo" 
      className="w-20 h-20 object-contain"
    />
  </div>
</div>
```

### Header Logo (lines ~367-377):
```jsx
<div className="bg-white rounded-lg p-3 shadow-lg">
  <img 
    src="/zu-logo.png" 
    alt="Zayed University Logo" 
    className="w-[60px] h-[60px] object-contain"
  />
</div>
```

### Footer Logo (lines ~1148-1158):
```jsx
<div className="bg-white rounded p-2">
  <img 
    src="/zu-logo.png" 
    alt="Zayed University Logo" 
    className="w-10 h-10 object-contain"
  />
</div>
```

---

## Where to Find the Official Logo

### Official Sources:
1. **Zayed University Website**: Contact ZU Communications Department
2. **Brand Guidelines**: Request from ZU Marketing Office
3. **Logo Databases**:
   - https://www.zu.ac.ae (check footer/about section)
   - https://iconape.com/zayed-university-logo
   - https://seeklogo.com/search?q=zayed+university

### Logo Specifications:
- **Format**: PNG (with transparent background) or SVG
- **Resolution**: At least 500x500px for PNG
- **Colors**: Official ZU gold/bronze colors
- **Usage**: Must comply with ZU brand guidelines

---

## Alternative: Contact Information

If you need the official logo and have authorization to use it:

**Zayed University**
- **Website**: https://www.zu.ac.ae
- **Email**: info@zu.ac.ae
- **Marketing/Communications Office**: Request official logo files

---

## Testing After Update

1. Save the changes to `App.jsx`
2. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
3. Check all three locations:
   - Login page
   - Main header
   - Footer

The logo should now display correctly!

---

## Notes

- The placeholder logo is temporary and should be replaced with the official ZU logo
- Ensure you have permission to use the official logo
- Maintain aspect ratio when sizing the logo
- Use transparent PNG or SVG for best results
- White background div helps logo stand out on colored backgrounds

---

## Quick Command

If you have the logo file ready, simply:

```bash
# Copy logo to public folder
cp /path/to/zu-logo.png frontend/public/

# Then update the code as described above
```

That's it! The real Zayed University logo will now appear throughout the platform.
