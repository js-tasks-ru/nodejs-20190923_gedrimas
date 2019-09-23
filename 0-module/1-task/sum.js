function sum(a, b) {
  /* ваш код */
  [a, b].forEach((item) => {
    if (typeof item !== 'number') throw new TypeError()
  })
  return a + b
}

module.exports = sum;
