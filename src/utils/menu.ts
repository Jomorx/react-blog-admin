import routes from "@/router/routes"
import { MenuProps } from "antd"

type MenuItem = Required<MenuProps>["items"][number]
const getItem=(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem =>{
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
export const menuItems: MenuItem[] = routes[0].children!.map((item) => {
  if (item.children?.length)
    return getItem(
      item.label,
      item.key,
      item.icon,
      item.children.map((item) => getItem(item.label, item.key))
    )
  else {
    return getItem(item.label, item.key, item.icon)
  }
})
