import Product from "./Components/Product"
import Header from "./Components/Header"
import SideBarSection from "./Components/SideBarSection"
import Warn from "./Helpers/Warn"
import FooterIcons from "./Helpers/FooterIcon"
import CheckOut from "./Helpers/CheckOut"
import {
Menu,ShoppingCart,ShoppingBag,PackageOpen
,House,Settings,Heart,Package,User ,
Search,LayoutGrid} from 'lucide-react'
import {useState} from "react"
import {useEffect} from "react"
import categories from "./Helpers/Categories"
import HeaderElem from './Components/HeaderElem'

export default function App(){

//States
const [products,setProducts]=useState([])
const [isSidebarOpen,setIsSidebarOpen]=useState(false)
const [cartItemIds,setcartItemIds]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError]=useState("")
const [wishlist,setWishlist]=useState([])
const [cart,setCart]=useState([])
const [cartQuantities,setCartQuantities]=useState([])

const [page, setPage] = useState("Home")

function navigation(nav) {
  setPage(nav)
}



//Add To Cart function
function addToCart(productId){
const alreadyIncartItemIds = cartItemIds.includes(productId)
  
if(!alreadyIncartItemIds){
setcartItemIds(prev => [...prev,productId])
}
  
  
setCartQuantities(prev => [...prev,productId]) 
setCart(prev => [...prev,productId])

}
 

//Remove from Cart function
function removeFromCart(productId){
  
const alreadyIncartItemIds = cartItemIds.includes(productId)
 
if(alreadyIncartItemIds){
const issetCart = cart.filter(id => id === productId) 
 
if(issetCart.length === 1){
setcartItemIds(prev => {
const index = prev.indexOf(productId)
const newcartItemIds = [...prev]
newcartItemIds.splice(index,1)
return newcartItemIds})
   
}

}



 
  
  setCart(prev => {
  const index = prev.indexOf(productId) 
  if (index === -1) return prev
  const newCart = [...prev]
  newCart.splice(index, 1) 
  return newCart
  })
  
  setCartQuantities(prev => {
  const index = prev.indexOf(productId) 
  const newcartQuantities =  [...prev]
  newcartQuantities.splice(index,1)
  return newcartQuantities
  })
  
}

//toggle Wishlist button 
 function toggleWishlist(productId){
   setWishlist(prev =>
   prev.includes(productId) ?
   prev.filter(id => id !== productId):
   [...prev,productId]
     
     )
 }


//Get product from Api
  async function fetchProducts(){
    const url = import.meta.env.VITE_API_URL
    
    try{
    const response = await fetch(url)
    
    if(!response.ok){
      throw new Error(`HTTP REQUEST RETURNED ${response.status}`)
    }
    
  const data = await response.json()
  
  setProducts(data.products)
    
 }catch(error){
   setError(error.message)
 }finally{
   setLoading(false)
 }
    
    
    
    
  }
  

 
  
  useEffect(()=>{
    fetchProducts()
  },[])
 
{/*   Building Orderded Products page*/}
const uniqueCartIds = new Set(cart)
const uniqueCartIdsArray = [...uniqueCartIds]

const cartItems = uniqueCartIdsArray.map(id =>{

const product = products.find(p =>
p.id === id
)

const matchingQuantityEntries = cartQuantities.filter(qid => qid === id)
  
const itemQuantity = matchingQuantityEntries.length

const cartItems ={...product,quantity:itemQuantity}

return cartItems
})


const productCards =products.map(product=> {
return (
<div className=" flex flex-col gap-2 p-2 shadow-xl rounded-xl relative bg-white"key={product.id}>
  
  
<Product {...product}/>

<button 
className="absolute top-0 right-0 p-4 m-auto " 
onClick={()=> toggleWishlist(product.id)}>

{ wishlist.includes(product.id)?   
<Heart className="w-6 h-6 text-red-500 fill-red-500" /> :
<Heart className="w-7 h-7"/> 
}
</button>


<div>
{
cart.includes(product.id) ?
<div className="flex p-2 w-full">
  

<button
onClick ={()=>removeFromCart(product.id)}
className="border
p-4 bg-red-300 
text-white font-bold  w-1/3 font-bold">-
</button>


<button className="bg-cyan-50 w-1/3 font-bold leading-relaxed ">
<span className="mr-2">Qty</span>
{

cartQuantities.filter(id => id === product.id).length
}
</button> 



<button
onClick={()=>addToCart(product.id)}
className="border
 p-4 bg-green-300 
text-white font-bold w-1/3 font-bold">+
</button> 
</div>:


<button
onClick={()=>addToCart(product.id)}
className="border
rounded-xl p-4 bg-green-300 
text-white font-bold  w-full">
Order Now
</button>
}
</div>

  
</div>

)})


{/* Ordered Products */}

let cartHome =cartItems.map(product =>
<div
className=" flex flex-col gap-2 p-4 shadow-xl rounded-xl relative bg-white"
key={product.id}>
<Product {...product}/>


<span className="absolute  right-0  p-2 top-0 font-bold font-serif"
 >Qty:{product.quantity}</span>
 
 <button className="border
rounded-xl p-4 bg-red-300 
text-white font-bold  w-full">
   Remove</button>  

</div>
)  


{/*   Building wishlist Product Page*/}
const wishlistItems = wishlist.map(id =>{
return products.find(item => item.id ===id)
}).filter(Boolean)

{/*Wishlist Product*/}
const wishlistHome =wishlistItems.map(product =>
<div
className=" flex flex-col gap-2 p-4 shadow-xl rounded-xl relative bg-white"
key={product.id}>
  
<Product {...product}/>

 
 <button className="border
rounded-xl p-4 bg-red-300 
text-white font-bold  w-full">
   Remove From Wishlist</button>  
</div>)



{/* Building Categories Page */}



  return (
    <>
      
<HeaderElem
items={
<Header
sideBar={
<Menu
className="w-6 h-6 text-gray-700
cursor-pointer hover:text-cyan-500
transition-colors"
onClick={()=>setIsSidebarOpen(prev=>!prev)}/>
}
appName={
<div className="flex items-center gap-2">
<ShoppingBag className="w-6 h-6
text-cyan-500"/>
<span className="hidden sm:inline 
font-bold text-lg text-gray-900">GoodStore</span>
</div>
}

cartIcon={
<div className="relative"
onClick={() => navigation("Cart")}>
  
<ShoppingCart className="w-6 h-6 
text-gray-700 cursor-pointer hover:text-cyan-500 transition-colors " />

{cartItemIds.length > 0 && (
<span className="absolute -top-2 -right-2  text-white text-xs font-bold w-5 h-5 rounded-full flex items-center bg-red-400 justify-center ">
{cartItemIds.length > 8 ? 
"9+":
cartItemIds.length}
</span>
)}
</div>}/>  
  
}
/>

  





{/* SideBar */}
<SideBarSection
isOpen={isSidebarOpen}
hideSection={()=>setIsSidebarOpen(false)}
onClose={()=>setIsSidebarOpen(false)}
home={() => navigation("Home")}
order={() => navigation("Cart")}
/>


{/* Main */}
<main className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2 pb-20 pt-20 bg-cyan-50 relative"
onClick={()=>setIsSidebarOpen(false)}>
  
{


page === "Cart" ?(
<>
{cartHome}
<CheckOut
totalPrice=
{cartItems.reduce((acc, item) => {
return acc + item.price * item.quantity
},0).toFixed(2)}/>
</>
) :
page === "wishlist" ?(
wishlistItems.length >0 ?
wishlistHome:
<Warn
text="You have no wishlisted items"
/> ) :

loading ?
(<Warn text="Loading Data...." />) :
error ? (<Warn text={error} />) :
(productCards)
}
</main>


{/* Footer */}
<footer className="fixed bottom-0 left-0 w-full h-16 shadow-xl bg-white flex justify-around items-center">
  
<FooterIcons
onClick={() => navigation("Home")}
icon={<House/>}
iconName="Home"
/>

<FooterIcons
icon={<LayoutGrid/>}
iconName="Cartegories"
/>

<FooterIcons
onClick={() => navigation("Cart")}
icon={
<div className="relative">
<ShoppingCart/> 

{cartItemIds.length > 0 && 
<span className="absolute -top-2 -right-2  text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center bg-red-400">
  {cartItemIds.length > 8 ? 
  "9+":
  cartItemIds.length
  }
</span>}
</div>

}
iconName="Cart"
/>



<FooterIcons
onClick={()=>navigation("wishlist")}
icon={<Heart/>}
iconName="Wishlist"
/>

<FooterIcons
icon={<User/>}
iconName="Profile"
/>

</footer>
  
</>
)}