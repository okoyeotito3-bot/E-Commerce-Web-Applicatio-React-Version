export default function Header({sideBar,appName,cartIcon}){
  return <>
      <div>{sideBar}</div>
      <div>{appName}</div>
      <div>{cartIcon}</div>
      </>
}