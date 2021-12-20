/**
 * @param { Document } document
 *
 * @return { SizeLike }
 */
export function getDocumentSize (document) {
  const rect = document.body.getBoundingClientRect()

  return {
    width: rect.width,
    height: rect.height,
  }
}

/**
 * @param { Document } document
 *
 * @return { ClientRect }
 */
export function getDocumentRect (document) {
  const { pageXOffset, pageYOffset } = document.defaultView
  const rect = document.body.getBoundingClientRect()

  return {
    left: rect.left + pageXOffset,
    right: rect.right + pageXOffset,
    top: rect.top + pageYOffset,
    bottom: rect.bottom + pageYOffset,
    width: rect.width,
    height: rect.height,
  }
}

/**
 * @param { HTMLElement } element
 * @param { HTMLElement } [offsetElement]
 *
 * @return { BoundsLike }
 */
export function getOffsetRect (element, offsetElement) {
  const rect = element.getBoundingClientRect()
  const offsetRect = offsetElement ? offsetElement.getBoundingClientRect() : getDocumentRect(element.ownerDocument)

  return {
    left: rect.left - offsetRect.left,
    top: rect.top - offsetRect.top,
    right: offsetRect.right - rect.right,
    bottom: offsetRect.bottom - rect.bottom,
    width: rect.width,
    height: rect.height,
  }
}
