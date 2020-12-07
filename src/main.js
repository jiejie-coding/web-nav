const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
console.log(xObject)
const hashMap = xObject || [
  {logo: 'A', url: 'https://www.acfun.cn'},
  {logo: 'B', url: 'https://www.bilibili.com'},
  {logo: 'G', url: 'https://www.google.com'},
  {logo: 'I', url: 'https://www.iconfont.cn'}
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {   
    const $li = $(`<li>
    <div class="wrap">
          <a href="${node.url}" target='_blank'>
            <div class="logo">${simplifyUrl(node.url)[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
          </a>
          <div class="close">
            <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
    </div>
  </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.addButton').on('click', ()=> {
  let url = window.prompt("请输入要添加的网址");
  if(url.indexOf("http") != 0) {
    url = "http://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  })
  render()
})

// window.onbeforeunload = () => {
//   const string = JSON.stringify(hashMap)
//   localStorage.setItem('x', string)
// }

$(document).on('keypress', (e) => {
  const {key} = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})