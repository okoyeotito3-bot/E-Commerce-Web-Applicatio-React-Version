export default function Cart({title,description,price,rating,thumbnail}){
  return (
    <>
        <h1 
         className="font-bold">
           {title}</h1>
           
         <h2 
         className="opacity-75">
         {description}</h2>
         
         <span>Price:{price} $</span>
         <span>Rating:⭐⭐⭐{rating}</span>
         
         <img
         className="mt-auto"
         src={thumbnail}
         />
    </>
    )
}