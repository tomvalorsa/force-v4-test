export const generateBaseStation = () => {
  let bs = Math.random()

  if (bs > 0.66) {
    bs = 'a'
  } else if (bs > 0.33) {
    bs = 'b'
  } else {
    bs = 'c'
  }

  return bs
}
