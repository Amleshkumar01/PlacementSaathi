# Generates raster icons of the PlacementSaathi logo (Google Search needs PNG/ICO favicons).
# The drawing below matches public/logo.svg (32x32 viewBox), scaled to each size.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/make-icons.ps1
# Output: src/app/favicon.ico (16/32/48), src/app/icon.png (192), src/app/apple-icon.png (180), public/logo.png (512)
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot

function New-Logo([int]$size) {
  $s = $size / 32.0
  $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear([System.Drawing.Color]::Transparent)

  # Rounded square, rx = 9, gradient #2563eb -> #7c3aed (top-left to bottom-right)
  $r = 9 * $s; $d = 2 * $r
  $bg = New-Object System.Drawing.Drawing2D.GraphicsPath
  $bg.AddArc(0, 0, $d, $d, 180, 90)
  $bg.AddArc($size - $d, 0, $d, $d, 270, 90)
  $bg.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
  $bg.AddArc(0, $size - $d, $d, $d, 90, 90)
  $bg.CloseFigure()
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.PointF 0, 0), (New-Object System.Drawing.PointF $size, $size), ([System.Drawing.ColorTranslator]::FromHtml("#2563eb")), ([System.Drawing.ColorTranslator]::FromHtml("#7c3aed"))
  $g.FillPath($grad, $bg)

  $P = { param($x, $y) New-Object System.Drawing.PointF ([float]($x * $s)), ([float]($y * $s)) }

  # Cap top: M6.5 13 16 8.5 25.5 13 16 17.5 Z
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $g.FillPolygon($white, [System.Drawing.PointF[]]@((& $P 6.5 13), (& $P 16 8.5), (& $P 25.5 13), (& $P 16 17.5)))

  # Cap band: M10.5 15.2 v4.3 c0 1.4 2.5 2.8 5.5 2.8 s5.5-1.4 5.5-2.8 v-4.3 L16 17.8 Z (85% white)
  $band = New-Object System.Drawing.Drawing2D.GraphicsPath
  $band.AddLine((& $P 10.5 15.2), (& $P 10.5 19.5))
  $band.AddBezier((& $P 10.5 19.5), (& $P 10.5 20.9), (& $P 13 22.3), (& $P 16 22.3))
  $band.AddBezier((& $P 16 22.3), (& $P 19 22.3), (& $P 21.5 20.9), (& $P 21.5 19.5))
  $band.AddLine((& $P 21.5 19.5), (& $P 21.5 15.2))
  $band.AddLine((& $P 21.5 15.2), (& $P 16 17.8))
  $band.CloseFigure()
  $soft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(217, 255, 255, 255))
  $g.FillPath($soft, $band)

  # Tassel: M25.5 13 v5, stroke 1.6, round caps
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::White), ([float](1.6 * $s))
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine($pen, (& $P 25.5 13), (& $P 25.5 18))

  $g.Dispose(); $grad.Dispose(); $white.Dispose(); $soft.Dispose(); $pen.Dispose(); $bg.Dispose(); $band.Dispose()
  return $bmp
}

function Save-Png([string]$out, [int]$size) {
  $bmp = New-Logo $size
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

function Get-PngBytes([int]$size) {
  $bmp = New-Logo $size
  $ms = New-Object IO.MemoryStream
  $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  return ,$ms.ToArray()
}

Save-Png "$root\public\logo.png" 512
Save-Png "$root\src\app\icon.png" 192
Save-Png "$root\src\app\apple-icon.png" 180

# favicon.ico containing PNG-encoded 16, 32 and 48 px images
$sizes = 16, 32, 48
$pngs = foreach ($sz in $sizes) { ,(Get-PngBytes $sz) }
$ms = New-Object IO.MemoryStream
$w = New-Object IO.BinaryWriter $ms
$w.Write([UInt16]0); $w.Write([UInt16]1); $w.Write([UInt16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
  $w.Write([byte]$sizes[$i]); $w.Write([byte]$sizes[$i]); $w.Write([byte]0); $w.Write([byte]0)
  $w.Write([UInt16]1); $w.Write([UInt16]32); $w.Write([UInt32]$pngs[$i].Length); $w.Write([UInt32]$offset)
  $offset += $pngs[$i].Length
}
foreach ($b in $pngs) { $w.Write($b) }
[IO.File]::WriteAllBytes("$root\src\app\favicon.ico", $ms.ToArray())
Write-Output "Created favicon.ico, icon.png, apple-icon.png and public/logo.png"
