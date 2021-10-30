export const changeTitle = (title = false, prefix = 'Library') => {
  if (title === false) {
    document.title = prefix
    return
  }

  document.title = `${prefix} :: ${title}`
}
