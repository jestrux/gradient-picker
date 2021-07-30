import Component from './Component.svelte'

function GradientPicker (id) {
  const el = document.querySelector(id)
  const target = document.createElement('div')
  el.parentNode.appendChild(target)
  el.style.display = 'none'

  // eslint-disable-next-line no-new
  new Component({
    target,
    props: {
      el
    }
  })
}

export default GradientPicker
