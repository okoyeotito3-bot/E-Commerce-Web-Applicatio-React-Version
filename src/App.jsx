import Product from "./Components/Product"
import Header from "./Components/Header"
import SideBarSection from "./Components/SideBarSection"
import Cart from "./Components/Cart"
import {
Menu,ShoppingCart,ShoppingBag,PackageOpen
,House,Settings,Heart,Package,User ,
Search} from 'lucide-react'
import {useState} from "react"
import {useEffect} from "react"

export default function App(){
  
const [fetchedData,setFetchData]=useState([])
const [sectionBar,setSection]=useState(false)
const [count,setCount]=useState([])
const [loading,setLoading]=useState(true)
const [error,errorState]=useState("")
const [wishListedItem,WishListState]
=useState([])
const [cart,itemInCart]=useState([])
const [qty,itemQty]=useState([])
const [cartPage,cartPageState]=useState(false)

//Add To Cart function
function addToCart(productId){
const alreadyInCount = count.includes(productId)
  
if(!alreadyInCount){
setCount(prev => [...prev,productId])
}
  
  
itemQty(prev => [...prev,productId]) 
itemInCart(prev => [...prev,productId])

}
 

//Remove from Cart function
function removeFromCart(productId){
  
const alreadyInCount = count.includes(productId)
 
if(alreadyInCount){
const isItemInCart = cart.filter(id => id === productId) 
 
if(isItemInCart.length === 1){
setCount(prev => {
const index = prev.indexOf(productId)
const newCount = [...prev]
newCount.splice(index,1)
return newCount})
   
}
}
 
  
  itemInCart(prev => {
  const index = prev.indexOf(productId) 
  if (index === -1) return prev
  const newCart = [...prev]
  newCart.splice(index, 1) 
  return newCart
  })
  
  itemQty(prev => {
  const index = prev.indexOf(productId) 
  const newQty =  [...prev]
  newQty.splice(index,1)
  return newQty
  })
  
}

//Add and remove from Wishlist button 
 function handleWishList(productId){
   WishListState(prev =>
   prev.includes(productId) ?
   prev.filter(id => id !== productId):
   [...prev,productId]
     
     )
 }
 
 //Ordered Item section
 function handleCartPage(){
   cartPageState(prev => true)
 }
 
//Get product from Api
  async function getData(){
    const url = import.meta.env.VITE_API_URL
    
    try{
    const response = await fetch(url)
    
    if(!response.ok){
      throw new Error(`HTTP REQUEST RETURNED ${response.status}`)
    }
    
  const data = await response.json()
  
  setFetchData(data.products)
    
 }catch(error){
   errorState(error.message)
 }finally{
   setLoading(false)
 }
    
    
    
    
  }
  
  
  useEffect(()=>{
    getData()
  },[])
 

const uniqueId = new Set(cart)
const destructUId = [...uniqueId]

const orderProducts = destructUId.map(id =>{

const product = fetchedData.find(p =>
p.id === id
)

const quantity = qty.filter(qid => qid === id)
  
const qtyLength = quantity.length

const cartItems ={...product,quantity:qtyLength}

return cartItems
})


  
  
  
  return (
    <>
<header className="fixed top-0 left-0 
w-full h-16 bg-white border-b 
border-gray-200 z-50">
  
<div className="flex justify-between
items-center gap-4 h-full px-4">
  
<Header
sideBar={
<Menu
className="w-6 h-6 text-gray-700
cursor-pointer hover:text-cyan-500
transition-colors"
onClick={()=>setSection(prev=>!prev)}/>
}
appName={
<div className="flex items-center gap-2">
<ShoppingBag className="w-6 h-6
text-cyan-500"/>
<span className="hidden sm:inline 
font-bold text-lg text-gray-900">GoodStore</span>
</div>
}

cartItem={
<div className="relative">
<ShoppingCart className="w-6 h-6 
text-gray-700 cursor-pointer hover:text-cyan-500 transition-colors" />

{count.length > 0 && (
<span className="absolute -top-2 -right-2  text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center bg-red-400">
{count.length > 8 ? 
"9+":
count.length}
</span>
)}
</div>}/>

</div>
</header>
      
<SideBarSection
isOpen={sectionBar}
onClose={()=>setSection(false)}
/>
      
<main className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2 pb-20 pt-20 bg-cyan-50"
onClick={()=>setSection(false)}>
  
{
cartPage ?

orderProducts.length === 0 ?

<h1>There Is Nothing Ordered</h1>:

orderProducts.map(product =>
<div key={product.id}>
 <Cart{...product}/> 
 <span>{product.quantity}</span>
 <button>Remove</button>
</div>):

loading ? 
<h1>Loading Data.....</h1> :

error ?
<h1>{error}</h1> :
  
fetchedData.map(product=> 
<div className=" flex flex-col gap-2 p-2 shadow-xl rounded-xl relative bg-white"key={product.id}>
<Product{...product}/>
<button className="absolute top-0 right-0 p-4 m-auto " onClick={()=> handleWishList(product.id)}>
{ wishListedItem.includes(product.id)?   
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

qty.filter(id => id === product.id).length
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
)}
</main>

<footer className="fixed bottom-0 left-0 w-full h-16 shadow-xl bg-white flex justify-around items-center">
  

<div className="flex flex-col gap-2 items-center">
<House/>
<span className="hidden sm:block font-bold">Home</span>
</div>

<div className="flex flex-col gap-2 items-center">
<Search/>
<span className="hidden sm:block font-bold">Search</span>
</div>

<div className="flex flex-col gap-2 items-center " onClick={handleCartPage}>
<div className="relative">
<ShoppingCart/>

{count.length > 0 && 
<span className="absolute -top-2 -right-2  text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center bg-red-400">
  {count.length > 8 ? 
  "9+":
  count.length
  }
</span>}
</div>

<span className="hidden sm:block font-bold">Cart</span>
</div>


<div className="flex flex-col gap-2 items-center">
<Heart/>
<span className="hidden sm:block font-bold">Wishlist</span>
</div>


<div className="flex flex-col gap-2 items-center">
<User/>  
<span className="hidden sm:block font-bold">Profile</span>
</div>

</footer>
  
    </>
    
    )
}