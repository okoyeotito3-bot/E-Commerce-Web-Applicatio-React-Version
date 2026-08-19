export default function Header({sideBar,appName,cartItem}){
  return <>
      <div>{sideBar}</div>
      <div>{appName}</div>
      <div>{cartItem}</div>
      </>
}