import fs from 'fs'
import path from 'path'
import parse from '.'

test('should parse from altema', () => {
  const data = fs.readFileSync(
    path.join(__dirname, 'banners.html'),
    'utf8',
  )

  const result = parse(data)
  expect(result).toContainEqual({
    image: 'https://img.altema.jp/dffoo/gacha/main/109.jpg',
    weapons: [
      'ルーントリガー',
      '魔装銃',
      'ホークアイ',
      'スカイスラッシャー',
      'ワイトスレイヤー',
      '古代の剣',
    ],
  })
})
