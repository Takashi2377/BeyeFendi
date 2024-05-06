export function currency(num) {
  const n = parseInt(num, 10) // 將num依照十進位轉換成數字 (string-> num)
  return `${n
    .toFixed(0) // 四捨五入到小數點第0位 (等同取整數)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, '')
        : c
    )}` // 將數字加上千分號的方法
}

export function date(time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
  // toLocaleDateString() 方法可依本地時間把 Date 物件的日期部分轉換為字串，並回傳結果。
}
