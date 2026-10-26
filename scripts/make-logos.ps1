# Normalises company logos: trims white margins and makes the white background transparent.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/make-logos.ps1
# Input:  original files in src/image/ (not modified)
# Output: src/image/logos/<slug>.png
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class LogoTool {
  // Pixels within `hard` of white become fully transparent; between hard and soft they fade.
  public static void Run(string input, string output, double hard, double soft, int pad) {
    using (var src = new Bitmap(input))
    using (var bmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb)) {
      using (var g = Graphics.FromImage(bmp)) { g.Clear(Color.White); g.DrawImage(src, 0, 0, src.Width, src.Height); }
      var rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride, w = bmp.Width, h = bmp.Height, n = stride * h;
      var px = new byte[n];
      Marshal.Copy(data.Scan0, px, 0, n);
      int minX = w, minY = h, maxX = -1, maxY = -1;
      for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
        int i = y * stride + x * 4;
        int b = px[i], gg = px[i + 1], r = px[i + 2];
        double d = Math.Sqrt((255 - r) * (255 - r) + (255 - gg) * (255 - gg) + (255 - b) * (255 - b));
        double a = d <= hard ? 0 : d >= soft ? 1 : (d - hard) / (soft - hard);
        if (a > 0 && a < 1) {
          // Un-premultiply from white so soft edges keep the logo colour instead of a grey halo.
          px[i]     = (byte)Math.Max(0, Math.Min(255, 255 - (255 - b) / a));
          px[i + 1] = (byte)Math.Max(0, Math.Min(255, 255 - (255 - gg) / a));
          px[i + 2] = (byte)Math.Max(0, Math.Min(255, 255 - (255 - r) / a));
        }
        px[i + 3] = (byte)(255 * a);
        if (a > 0.35) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
      }
      Marshal.Copy(px, 0, data.Scan0, n);
      bmp.UnlockBits(data);
      if (maxX < 0) throw new Exception("Logo is empty: " + input);
      minX = Math.Max(0, minX - pad); minY = Math.Max(0, minY - pad);
      maxX = Math.Min(w - 1, maxX + pad); maxY = Math.Min(h - 1, maxY + pad);
      var crop = new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
      using (var outBmp = bmp.Clone(crop, PixelFormat.Format32bppArgb)) outBmp.Save(output, ImageFormat.Png);
      Console.WriteLine(output + "  " + crop.Width + "x" + crop.Height);
    }
  }
}
"@
$root = Split-Path -Parent $PSScriptRoot
$out = "$root\src\image\logos"
New-Item -ItemType Directory -Force $out | Out-Null
$map = [ordered]@{
  "tcs"       = "tcs.jpg"
  "infosys"   = "infosys.png"
  "wipro"     = "images_2.jpg"
  "accenture" = "images_5.png"
  "capgemini" = "images.png"
  "amazon"    = "amzon.jpg"
}
foreach ($slug in $map.Keys) {
  [LogoTool]::Run("$root\src\image\$($map[$slug])", "$out\$slug.png", 12.0, 60.0, 4)
}
