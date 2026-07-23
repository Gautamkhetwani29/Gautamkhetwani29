Add-Type -AssemblyName System.Drawing

function Crop-Resize-Image {
    param(
        [string]$InPath,
        [string]$OutPath,
        [int]$Left, [int]$Top, [int]$Right, [int]$Bottom,
        [int]$MaxWidth = 900,
        [int64]$Quality = 96
    )
    $src = [System.Drawing.Image]::FromFile($InPath)
    $cropW = $Right - $Left
    $cropH = $Bottom - $Top
    $cropRect = New-Object System.Drawing.Rectangle($Left, $Top, $cropW, $cropH)

    $cropped = New-Object System.Drawing.Bitmap($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,$cropW,$cropH)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $src.Dispose()

    $ratio = [Math]::Min(1.0, $MaxWidth / $cropW)
    $finalW = [int]([Math]::Round($cropW * $ratio))
    $finalH = [int]([Math]::Round($cropH * $ratio))

    $final = New-Object System.Drawing.Bitmap($finalW, $finalH)
    $final.SetResolution(96,96)
    $g2 = [System.Drawing.Graphics]::FromImage($final)
    $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g2.DrawImage($cropped, 0, 0, $finalW, $finalH)
    $g2.Dispose()
    $cropped.Dispose()

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
    $final.Save($OutPath, $jpegCodec, $encParams)
    $final.Dispose()

    $outSize = (Get-Item $OutPath).Length
    Write-Output ("{0,8:N0} KB  {1}x{2} -> {3}x{4}  {5}" -f ($outSize/1KB), $cropW, $cropH, $finalW, $finalH, $OutPath)
}

$root = "D:\Claude\website portfolio"
$src  = "$root\Gautam Portfolio assets\PS"
$dst  = "$root\assets\img\testimonials"

Remove-Item "$dst\nursery-11l-thread.jpg", "$dst\nursery-target-thread.jpg", "$dst\nursery-june-thread.jpg", "$dst\nursery-cross-11l-thread.jpg", "$dst\nursery-hey-everyone-thread.jpg", "$dst\nursery-good-work-thread.jpg" -ErrorAction SilentlyContinue

# left, top, right, bottom (source images are 828x1792, coordinates measured via ruler overlay)
Crop-Resize-Image -InPath "$src\P.S Client Feedback4.1.png"  -OutPath "$dst\nursery-cross-11l-thread.jpg"    -Left 0 -Top 195 -Right 828 -Bottom 1030
Crop-Resize-Image -InPath "$src\P.S Client Feedback 2.1.png" -OutPath "$dst\nursery-hey-everyone-thread.jpg" -Left 0 -Top 505 -Right 828 -Bottom 1270
Crop-Resize-Image -InPath "$src\P.S Client Feedback-1.png"   -OutPath "$dst\nursery-good-work-thread.jpg"    -Left 0 -Top 390 -Right 828 -Bottom 1170

Write-Output "DONE"
