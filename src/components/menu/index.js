import { React, Filters } from 'x'

import Wrapper from './wrapper'

const buildFormatter = formatLink => function format(items) {
  items.map(item => {
    item.url = formatLink(item.url)
    if (Array.isArray(item.items)) format(item.items)
  })
}

export default props => {
  const formatter = buildFormatter(props.globalData.formatLink)

  props.menus.forEach(({ menu }) => {
    formatter(menu.items)
  })

  const data = {
    primary: props.menus.find(({ menu }) => menu.type === 'primary')?.menu,
    secondary: props.menus.find(({ menu }) => menu.type === 'secondary')?.menu,
    top: props.menus.find(({ menu }) => menu.type === 'top')?.menu,
  }

  return <Wrapper data={ data } { ...props } />
}
