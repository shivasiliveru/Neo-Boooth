import { getFilterCSS } from './filters'

export async function generateStrip(photos, config) {
  return new Promise((resolve) => {
    const { layout, borderColor, borderStyle, showDate, filter, filterIntensity, sticker, customText, placedStickers, textColor, textFont } = config

    const photoWidth = 235
    const photoHeight = 235
    const padding = 20

    let totalHeight = 0
    let borderBottom = 0

    if (borderStyle === 'polaroid') {
      borderBottom = 60
    }

    totalHeight = layout * (photoHeight + padding) + padding * 2 + (borderStyle === 'polaroid' ? borderBottom * layout : padding)

    const canvas = document.createElement('canvas')
    canvas.width = photoWidth + padding * 2
    canvas.height = totalHeight
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, totalHeight)

    const imgPromises = photos.map((photoData, index) => {
      return new Promise((res) => {
        const img = new Image()
        img.onload = () => {
          res({ img, index })
        }
        img.src = photoData
      })
    })

    Promise.all(imgPromises).then((loadedImages) => {
      loadedImages.forEach(({ img, index }) => {
        const y = padding + index * (photoHeight + padding)

        let xOffset = padding
        let drawWidth = photoWidth
        let drawHeight = photoHeight

        if (borderStyle === 'polaroid') {
          ctx.fillStyle = borderColor
          const frameX = padding - 10
          const frameY = y - 10
          const frameW = photoWidth + 20
          const frameH = photoHeight + 20 + borderBottom
          ctx.fillRect(frameX, frameY, frameW, frameH)
          xOffset = padding
          drawWidth = photoWidth
          drawHeight = photoHeight
        } else if (borderStyle === 'thin') {
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 4
          ctx.strokeRect(padding - 2, y - 2, photoWidth + 4, photoHeight + 4)
        } else if (borderStyle === 'neon') {
          ctx.shadowColor = borderColor
          ctx.shadowBlur = 20
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.strokeRect(padding, y, photoWidth, photoHeight)
          ctx.shadowBlur = 0
        } else if (borderStyle === 'flower') {
          drawFlowers(ctx, padding, y, photoWidth, photoHeight, borderColor)
        } else if (borderStyle === 'stars') {
          drawStars(ctx, padding, y, photoWidth, photoHeight, borderColor)
        } else if (borderStyle === 'hearts') {
          drawHearts(ctx, padding, y, photoWidth, photoHeight, borderColor)
        }

        ctx.save()
        if (filter && filter !== 'none') {
          ctx.filter = getFilterCSS(filter, filterIntensity)
        }
        ctx.drawImage(img, xOffset, y, drawWidth, drawHeight)
        ctx.restore()

        if (borderStyle === 'polaroid') {
          ctx.fillStyle = 'rgba(255,255,255,0.7)'
          ctx.font = '12px Arial'
          ctx.fillText('NeoBooth', xOffset + 10, y + photoHeight + borderBottom - 15)
        }

        if (sticker) {
          ctx.font = '40px Arial'
          ctx.fillText(sticker, xOffset + photoWidth - 50, y + 40)
        }
      })

      if (showDate) {
        const now = new Date()
        const dateStr = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.font = '14px Arial'
        ctx.fillText(dateStr, padding, totalHeight - 10)
      }

      if (placedStickers && placedStickers.length > 0) {
        ctx.font = '40px Arial'
        placedStickers.forEach((sticker) => {
          const stickerX = padding + (sticker.x / 100) * photoWidth
          const stickerY = padding + (sticker.y / 100) * (totalHeight - padding * 2)
          ctx.fillText(sticker.emoji, stickerX, stickerY)
        })
      }

      if (customText && customText.trim()) {
        const txtColor = textColor || '#ff8fa3'
        const txtFont = textFont || 'Arial'
        
        if (borderStyle === 'polaroid') {
          ctx.fillStyle = txtColor
          ctx.font = `bold 20px ${txtFont}`
          ctx.textAlign = 'center'
          const lastPhotoY = padding + (layout - 1) * (photoHeight + padding)
          ctx.fillText(customText, canvas.width / 2, lastPhotoY + photoHeight + 40)
          ctx.textAlign = 'left'
        } else {
          ctx.fillStyle = txtColor
          ctx.font = `bold 24px ${txtFont}`
          ctx.textAlign = 'center'
          ctx.fillText(customText, canvas.width / 2, totalHeight - 40)
          ctx.textAlign = 'left'
        }
      }

      resolve(canvas.toDataURL('image/png'))
    })
  })
}

function drawFlowers(ctx, x, y, w, h, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  const positions = [[x+20, y+20], [x+w-20, y+20], [x+20, y+h-20], [x+w-20, y+h-20]]
  positions.forEach(([px, py]) => {
    ctx.beginPath()
    for(let i = 0; i < 6; i++) {
      const angle = (i * 60 * Math.PI) / 180
      ctx.moveTo(px, py)
      ctx.lineTo(px + Math.cos(angle) * 15, py + Math.sin(angle) * 15)
    }
    ctx.stroke()
  })
  ctx.beginPath()
  ctx.arc(x + w/2, y + h/2, 5, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawStars(ctx, x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  for(let i = 0; i < 5; i++) {
    const px = x + 30 + i * ((w - 60) / 4)
    drawStar(ctx, px, y + 25, 8)
  }
  for(let i = 0; i < 5; i++) {
    const px = x + 30 + i * ((w - 60) / 4)
    drawStar(ctx, px, y + h - 25, 8)
  }
}

function drawStar(ctx, cx, cy, size) {
  ctx.beginPath()
  for(let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * Math.PI / 180
    const x = cx + Math.cos(angle) * size
    const y = cy + Math.sin(angle) * size
    if(i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()
}

function drawHearts(ctx, x, y, w, h, color) {
  ctx.fillStyle = color
  const positions = [[x+25, y+25], [x+w-25, y+25], [x+25, y+h-25], [x+w-25, y+h-25]]
  positions.forEach(([px, py]) => {
    ctx.beginPath()
    ctx.moveTo(px, py + 5)
    ctx.bezierCurveTo(px, py, px - 10, py, px - 10, py + 10)
    ctx.bezierCurveTo(px - 10, py + 20, px, py + 25, px, py + 30)
    ctx.bezierCurveTo(px, py + 25, px + 10, py + 20, px + 10, py + 10)
    ctx.bezierCurveTo(px + 10, py, px, py, px, py + 5)
    ctx.fill()
  })
}

export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}