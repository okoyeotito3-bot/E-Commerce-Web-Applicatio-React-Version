export default function Header({sideBar,appName,cartIcon}){
  return <div className="flex justify-between
items-center gap-4 h-full px-4">
      <div>{sideBar}</div>
      <div>{appName}</div>
      <div>{cartIcon}</div>
      </div>
}