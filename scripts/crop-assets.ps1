Add-Type -AssemblyName System.Drawing

function Crop-Resize-Image {
    param(
        [string]$InPath,
        [string]$OutPath,
        [int]$Left, [int]$Top, [int]$Right, [int]$Bottom,
        [int]$MaxWidth = 1200,
        [int64]$Quality = 84
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
$src  = "$root\Gautam Portfolio assets"
$dst  = "$root\assets\img\case-studies"

# left, top, right, bottom
Crop-Resize-Image -InPath "$src\Basslila\Basslila Meta ads.png" -OutPath "$dst\basslila-ads.jpg" -Left 90 -Top 440 -Right 1920 -Bottom 840

Crop-Resize-Image -InPath "$src\Piu\1 Jul-31 Oct'25 Meta ads Before.png" -OutPath "$dst\piu-ads-before.jpg" -Left 90 -Top 440 -Right 1920 -Bottom 940
Crop-Resize-Image -InPath "$src\Piu\1-30 Nov'25 Meta ads After.png" -OutPath "$dst\piu-ads-after.jpg" -Left 90 -Top 440 -Right 1920 -Bottom 940
Crop-Resize-Image -InPath "$src\Piu\1-30 Nov'25 shopify After.png" -OutPath "$dst\piu-shopify-after.jpg" -Left 300 -Top 200 -Right 1920 -Bottom 615

Crop-Resize-Image -InPath "$src\PS\Q1.png" -OutPath "$dst\nursery-q1.jpg" -Left 85 -Top 320 -Right 1920 -Bottom 815
Crop-Resize-Image -InPath "$src\PS\Q4.png" -OutPath "$dst\nursery-q4.jpg" -Left 85 -Top 320 -Right 1920 -Bottom 815
Crop-Resize-Image -InPath "$src\PS\shopify Q1.png" -OutPath "$dst\nursery-shopify-q1.jpg" -Left 300 -Top 10 -Right 1920 -Bottom 435
Crop-Resize-Image -InPath "$src\PS\shopify Q4.png" -OutPath "$dst\nursery-shopify-q4.jpg" -Left 300 -Top 10 -Right 1920 -Bottom 435

Write-Output "DONE"
