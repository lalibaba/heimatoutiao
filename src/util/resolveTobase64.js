export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.reaAsAsDateURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
