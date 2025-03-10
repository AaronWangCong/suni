const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const FEISHU_WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/35c7ce83-def6-4a72-be63-0be2b1cba91e'
const PATH = path.resolve(__dirname, '../CHANGELOG.md')

async function sendFeishuNotification(message) {
  try {
    const response = await fetch(FEISHU_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({
        msg_type: 'post',
        content: {
          post: {
            zh_cn: message
          }
        }
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      console.error('Failed to send notification to Feishu:', await response.text())
    } else {
      console.log('Notification sent to Feishu successfully.')
    }
  } catch (error) {
    console.error('Error sending notification to Feishu:', error)
  }
}

function publishPackage() {
  try {
    // let data = fs.readFileSync(PATH, {
    //   encoding: 'utf-8'
    // })
    // const content = `📌sun-uni@[${data.toString().split('### [')[1]}`

    // const contentArr = content
    //   .replaceAll('##', '')
    //   .replaceAll('\r', '')
    //   .split('\n')
    //   .filter((i) => !!i)

    // const strArr = contentArr.map((i, index) => {
    //   const str = index > 0 ? `${i.split('(https')[0]})` : i
    //   if (i.includes('(https') && index > 0) {
    //     const pattern = /https:\/\/git\.shijizhongyun\.com\/Front\/sun-uni\/commit\/[a-f0-9]{40}/g
    //     const matches = i.match(pattern)
    //     return [
    //       {
    //         tag: 'a',
    //         text: str.replace('*', '  '),
    //         href: matches?.[0]
    //       }
    //     ]
    //   }
    //   return [
    //     {
    //       tag: 'text',
    //       text: str
    //     }
    //   ]
    // })

    // const msg_notify = {
    //   title: '🎉 新的 sun-uni 包版本已发布成功！',
    //   content: [
    //     ...strArr,
    //     [
    //       {
    //         tag: 'a',
    //         text: '详情请查看具体更改记录',
    //         href: 'https://suni.pages.dev/guide/changelog.html'
    //       }
    //     ]
    //   ]
    // }
    // 发布 npm 包
    execSync('pnpm run --prefix src/uni_modules/sun-uni push', { stdio: 'inherit' })
    // console.log(strArr)
    // 发布成功后，发送通知
    // sendFeishuNotification(msg_notify)
    console.log('🎉 版本发布成功')
  } catch (error) {
    console.error('Failed to publish package:', error)
  }
}

publishPackage()
