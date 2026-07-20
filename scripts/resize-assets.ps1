Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param(
        [string]$InPath,
        [string]$OutPath,
        [int]$MaxDim,
        [int64]$Quality = 82,
        [switch]$KeepPng
    )
    $img = [System.Drawing.Image]::FromFile($InPath)
    $ratio = [Math]::Min(1.0, $MaxDim / [Math]::Max($img.Width, $img.Height))
    $newW = [int]([Math]::Round($img.Width * $ratio))
    $newH = [int]([Math]::Round($img.Height * $ratio))

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $bmp.SetResolution(96, 96)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()
    $img.Dispose()

    if ($KeepPng) {
        $bmp.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
        $bmp.Save($OutPath, $jpegCodec, $encParams)
    }
    $bmp.Dispose()
    $outSize = (Get-Item $OutPath).Length
    Write-Output ("{0,8:N0} KB  {1}" -f ($outSize/1KB), $OutPath)
}

$root = "D:\Claude\website portfolio"
$src  = "$root\Gautam Portfolio assets"
$dst  = "$root\assets\img"

# Headshot
Resize-Image -InPath "$src\Gautam Khetwani.png" -OutPath "$dst\headshot.jpg" -MaxDim 1000 -Quality 85

# Brand logos (keep PNG for transparency, modest size)
$logoFiles = Get-ChildItem "$src\Brand Logo" -Filter *.png | Sort-Object Name
$i = 1
foreach ($f in $logoFiles) {
    $outName = "logo-{0:D2}.png" -f $i
    Resize-Image -InPath $f.FullName -OutPath "$dst\logos\$outName" -MaxDim 320 -KeepPng
    $i++
}

# Case study proof screenshots -> jpg, max width 1400
$map = @{
    "$src\Piu\1 Jul-31 Oct'25 Meta ads Before.png"      = "$dst\case-studies\piu-ads-before.jpg"
    "$src\Piu\1-30 Nov'25 Meta ads After.png"            = "$dst\case-studies\piu-ads-after.jpg"
    "$src\Piu\1Jul-31 Oct shopify Before.png"            = "$dst\case-studies\piu-shopify-before.jpg"
    "$src\Piu\1-30 Nov'25 shopify After.png"             = "$dst\case-studies\piu-shopify-after.jpg"
    "$src\Piu\catalogue ad.png"                          = "$dst\case-studies\piu-catalogue-ad.jpg"

    "$src\PS\Q1.png"                                     = "$dst\case-studies\nursery-q1.jpg"
    "$src\PS\Q4.png"                                     = "$dst\case-studies\nursery-q4.jpg"
    "$src\PS\shopify Q1.png"                             = "$dst\case-studies\nursery-shopify-q1.jpg"
    "$src\PS\shopify Q4.png"                             = "$dst\case-studies\nursery-shopify-q4.jpg"
    "$src\PS\P.S Client Feedback-3.png"                  = "$dst\case-studies\nursery-proof-1.jpg"
    "$src\PS\P.S Client Feedback4.1.png"                 = "$dst\case-studies\nursery-proof-2.jpg"

    "$src\Basslila\Basslila Meta ads.png"                = "$dst\case-studies\basslila-ads.jpg"
    "$src\Basslila\Screenshot (107).png"                 = "$dst\case-studies\basslila-proof.jpg"
}

foreach ($kv in $map.GetEnumerator()) {
    if (Test-Path $kv.Key) {
        Resize-Image -InPath $kv.Key -OutPath $kv.Value -MaxDim 1400 -Quality 80
    } else {
        Write-Output "MISSING: $($kv.Key)"
    }
}

Write-Output "DONE"
