export default function FooterIcons ({icon,iconName,onClick}){
  return <div className="flex flex-col gap-2 items-center" onClick={onClick}>
       {icon}
<span className="hidden sm:block font-bold">{iconName}</span>
</div>
}