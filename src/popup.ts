import { getMdLinkString } from "./getMdLinkString"
import './styles.scss'

window.onload = async () => {
  await insertPageTitleAndUrl()
}
// ボタンを押したら、クリップボードにコピーして、ポップアップを閉じる
document.getElementById("btn")?.addEventListener("click", async () => {
  try {
   const { title, url } = loadTitleAndUrlFromInput()
    const mdString = getMdLinkString(title, url)
    await navigator.clipboard.writeText(mdString)
    window.close()
  } catch(e) {
    alert("popup.ts: err!")
  }
});

// popup.htmlのinputにタイトル、URLを入れる
const insertPageTitleAndUrl = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id === undefined) return;
  let {title, url} = tab
  if (title === undefined || url === undefined) return;
  // popup.htmlのinputにタイトル、URLを入れる（エレメントがないパターンは消しておく）
  const titleElement = document.getElementById("title") as HTMLInputElement
  if (!titleElement) return
  const urlElement = document.getElementById("url") as HTMLInputElement
  if (!urlElement) return

  titleElement.value = title
  urlElement.value = url
  return
}
// popup.htmlのinputからタイトル、URLを取得する
const loadTitleAndUrlFromInput = () => {
  const undefinedValue = { title: "", url: "" }
  const titleElement = document.getElementById("title") as HTMLInputElement
  if (!titleElement) return undefinedValue
  const urlElement = document.getElementById("url") as HTMLInputElement
  if (!urlElement) return undefinedValue

  const title = titleElement.value
  const url = urlElement.value

  return { title, url }
}
