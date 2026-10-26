# Creates a transparent-background copy of the hero photo.
# Usage: powershell -File scripts/make-cutout.ps1
# Input:  src/image/hero-boy.png (original, not modified)
# Output: src/image/hero-boy-cutout.png
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class Cutout {
  public static void Run(string input, string output, int r0, int g0, int b0, double soft, double hard) {
    using (var src = new Bitmap(input))
    using (var bmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb)) {
      using (var g = Graphics.FromImage(bmp)) g.DrawImage(src, 0, 0, src.Width, src.Height);
      var rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int n = data.Stride * data.Height;
      var px = new byte[n];
      Marshal.Copy(data.Scan0, px, 0, n);
      for (int i = 0; i < n; i += 4) {
        int b = px[i], gg = px[i + 1], r = px[i + 2];
        double d = Math.Sqrt((r - r0) * (r - r0) + (gg - g0) * (gg - g0) + (b - b0) * (b - b0));
        double a = d <= hard ? 0 : d >= soft ? 1 : (d - hard) / (soft - hard);
        px[i + 3] = (byte)(px[i + 3] * a);
      }
      Marshal.Copy(px, 0, data.Scan0, n);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
    }
  }
}
"@
$root = Split-Path -Parent $PSScriptRoot
[Cutout]::Run("$root\src\image\hero-boy.png", "$root\src\image\hero-boy-cutout.png", 0xf8, 0xf8, 0xfc, 14.0, 4.0)
Write-Output "Saved src/image/hero-boy-cutout.png"
