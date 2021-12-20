const { assign } = Object

export default function loadScript (params) {
  const script = assign(document.createElement('script'), { type: 'text/javascript', ...params })

  document.getElementsByTagName('head')[0].appendChild(script)

  return new Promise((resolve, reject) => {
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (['loaded', 'complete'].includes(script.readyState)) {
          script.onreadystatechange = null
          resolve()
        }
      }
    } else {
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Can't load ${params.src}`))
    }
  })
}
