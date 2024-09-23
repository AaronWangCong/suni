const fs = require('fs')
const path = require('path')
const fromPath = path.resolve(__dirname, '../CHANGELOG.md')
const toPath = path.resolve(__dirname, '../src/uni_modules/suni')
const docPath = path.resolve(__dirname, '../docs/guide')

try {
  const file = fs.readFileSync(fromPath, 'utf-8')
  fs.writeFileSync(`${toPath}/changelog.md`, file)
  fs.writeFileSync(`${docPath}/changelog.md`, file)
} catch (error) {
  console.log('CHANGELOG 获取失败')
}
